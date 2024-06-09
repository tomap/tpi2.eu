---
date : 2024-06-09
title : Structured Logging in ASP.Net with ELK - thinking beyond the basics
icon: ✂️
tags: ["csharp", "aspnetcore"]
---
## Why are we still talking about it?

This article is on how to go beyond structured logging, especially in the context of Logging in Json when the Json is ingested by Elastic Search via Filebeat (or equivalent)

There are constraints in this case that needs to be taken into account if you want to optimize your logging output

## What you are doing

So you are logging for Elastic Search.

Your logs are going to be scrapped from the console and sent to Elastic and you are going to be able to display them nicely in Kibana.

Using Microsoft.Extensions.Logging (`ILogger<T>`) and JsonConsoleFormatter, you should have code logging like that:

```csharp
// This is set via injection
private readonly ILogger<MyClass> _logger;

/*...*/
int countMessages = 5000;
_logger.LogInformation("Starting Process");
// This is a scope declared high up in the process
using var globalLogScope = _logger.BeginScope(new List<KeyValuePair<string, object>> { new("TransactionId", "ABCDE") });
// This is a more local scope applied to only part of the process
using var logScope = _logger.BeginScope(new List<KeyValuePair<string, object>> { new("RecordId", 1234) });
_logger.LogWarning("Too many messages: {Count}", countMessages);
```

And this will produce the following result:

```json
{
    "EventId": 0,
    "LogLevel": "Information",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Starting Process",
    "State": {
        "Message": "Starting Process",
        "{OriginalFormat}": "Starting Process"
    }
}
{
    "EventId": 0,
    "LogLevel": "Warning",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Too many messages: 5000",
    "State": {
        "Message": "Too many messages: 5000",
        "Count": 5000,
        "{OriginalFormat}": "Too many messages: {Count}"
    },
    "Scopes": [
        {
            "Message": "System.Collections.Generic.List\u00601[System.Collections.Generic.KeyValuePair\u00602[System.String,System.Object]]",
            "TransactionId": "ABCDE"
        },
        {
            "Message": "System.Collections.Generic.List\u00601[System.Collections.Generic.KeyValuePair\u00602[System.String,System.Object]]",
            "RecordId": 1234
        }
    ]
}
```

I have indented those two Jsons, but by default (and this is good for parser), each json will be serialized on a single line. The initial size is 718 bytes

## Can we improve ?

Right... There are plenty of issues with this output. Let's address them :)

This is **super verbose and redundant** and this is an issue because we are logging to the console.
By default, if a message is longer than ~16k, it will be split over multiple lines, and FileBeat will have a hard time parsing it.

Note that the max size of the console line can be different on your system, and you (or your DevOps) can change it but the longer it is, the longer your message can be, and that might be an issue for Filebeat (or the equivalent on your system) in terms of performances, throughput, ...

So our objective will be to reduce verbosity and redundancy when possible

* There are useless properties
  * Default values could be skipped, like EventId = 0. I rarely use EventId, but when I use it, it's nice to be able to filter by this value in Kibana
* There are redundant properties:
  * Message is duplicated in Message and in State.Message, even when there is no placeholder
  * It is nice to have access to State.{OriginalFormat} because I can easily filter on this type of message in Kibana

## How do we do that ?

Let's take the json console log formatter from Microsoft : [JsonConsoleFormatter](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging.Console/src/JsonConsoleFormatter.cs) (and [the specific commit at the time of writing](https://github.com/dotnet/runtime/blob/02ddff3430d976a7cb3a785b1ec7e33e80796e71/src/libraries/Microsoft.Extensions.Logging.Console/src/JsonConsoleFormatter.cs))

And adapt it to our needs.

If we copy this class in our project, we'll also need to create a CompactJsonConsoleFormatterOptions (the equivalent of [JsonConsoleFormatterOptions](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging.Console/src/JsonConsoleFormatterOptions.cs) )

```csharp
public class CompactJsonConsoleFormatterOptions : ConsoleFormatterOptions
{
    public CompactJsonConsoleFormatterOptions() { }

    public JsonWriterOptions JsonWriterOptions { get; set; }
}
```

And the [PooledByteBufferWriter](https://github.com/dotnet/runtime/blob/main/src/libraries/Common/src/System/Text/Json/PooledByteBufferWriter.cs) (internal ATTOW)

I'm going to skip most default values:

```csharp
// before
writer.WriteNumber(nameof(logEntry.EventId), eventId);

// after
if (eventId > 0)
{
    writer.WriteNumber(nameof(logEntry.EventId), eventId);
}
```

Same for all the items (scope or state):

```csharp
// before
writer.WriteBoolean(key, boolValue);

// after
if (boolValue)
{
    writer.WriteBoolean(key, boolValue);
}
```

I'm also merging scope and state, and renaming them to something shorter (`Sc`):

```csharp
// before
if (logEntry.State != null)
{
    writer.WriteStartObject(nameof(logEntry.State));
    writer.WriteString("Message", logEntry.State.ToString());
    if (logEntry.State is IReadOnlyCollection<KeyValuePair<string, object>> stateProperties)
    {
        foreach (KeyValuePair<string, object> item in stateProperties)
        {
            WriteItem(writer, item);
        }
    }
    writer.WriteEndObject();
}
WriteScopeInformation(writer, scopeProvider);

// after
 writer.WriteStartObject("Sc");

 if (logEntry.State != null)
 {
     writer.WriteString("Message", logEntry.State.ToString());
     if (logEntry.State is IReadOnlyCollection<KeyValuePair<string, object>> stateProperties)
     {
         foreach (KeyValuePair<string, object> item in stateProperties)
         {
             WriteItem(writer, item);
         }
     }
 }
 WriteScopeInformation(writer, scopeProvider);
 
 writer.WriteEndObject();
```

The _small_ issue with this code is that I'm always creating the "Sc" Object in Json, whether of not there is a scope or state in this log entry.

Now let's flatten Scopes:

```csharp
// before
private void WriteScopeInformation(Utf8JsonWriter writer, IExternalScopeProvider? scopeProvider)
{
    if (FormatterOptions.IncludeScopes && scopeProvider != null)
    {
        writer.WriteStartArray("Scopes");
        scopeProvider.ForEachScope((scope, state) =>
        {
            if (scope is IEnumerable<KeyValuePair<string, object>> scopeItems)
            {
                state.WriteStartObject();
                state.WriteString("Message", scope.ToString());
                foreach (KeyValuePair<string, object> item in scopeItems)
                {
                    WriteItem(state, item);
                }
                state.WriteEndObject();
            }
            else
            {
                state.WriteStringValue(ToInvariantString(scope));
            }
        }, writer);
        writer.WriteEndArray();
    }
}

// after:
private void WriteScopeInformation(Utf8JsonWriter writer, IExternalScopeProvider? scopeProvider)
{
    if (FormatterOptions.IncludeScopes && scopeProvider != null)
    {
        scopeProvider.ForEachScope((scope, state) =>
        {
            if (scope is IEnumerable<KeyValuePair<string, object>> scopeItems)
            {
                state.WriteString("Message", scope.ToString());
                foreach (KeyValuePair<string, object> item in scopeItems)
                {
                    WriteItem(state, item);
                }
            }
            else
            {
                state.WriteStringValue(ToInvariantString(scope));
            }
        }, writer);
    }
}
```

The new json looks like this:

```json
{
    "LogLevel": "Information",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Starting Process",
    "Sc": {
        "Message": "Starting Process",
        "{OriginalFormat}": "Starting Process"
    }
}
{
    "LogLevel": "Warning",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Too many messages: 5000",
    "Sc": {
        "Message": "Too many messages: 5000",
        "Count": 5000,
        "{OriginalFormat}": "Too many messages: {Count}",
        "Message": "System.Collections.Generic.List\u00601[System.Collections.Generic.KeyValuePair\u00602[System.String,System.Object]]",
        "TransactionId": "ABCDE",
        "Message": "System.Collections.Generic.List\u00601[System.Collections.Generic.KeyValuePair\u00602[System.String,System.Object]]",
        "RecordId": 1234
    }
}
```

As you can see, we have invalid json with a duplicate property: `Message`.
The good news is that the state message is redundant with the field message so we can remove it

Also, in the case of scope messages, it's a `.ToString()` of the scope object.
In our case, it's just a `List<T>`, so it is useless.
In the case of Microsoft Scopes (request scopes), the object used is a bit more interesting, it is an internal object [ActivityLogScope](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging/src/LoggerFactoryScopeProvider.cs#L186) overloading the `ToString()` function.
However this implementation is just repeating the same exact information that we have as properties later in the message, so we can remove this Message also.

Here is the new json:

```json
{
    "LogLevel": "Information",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Starting Process",
    "Sc": {
        "{OriginalFormat}": "Starting Process"
    }
}
{
    "LogLevel": "Warning",
    "Category": "MyApplication.Controllers.MyController",
    "Message": "Too many messages: 5000",
    "Sc": {
        "Count": 5000,
        "{OriginalFormat}": "Too many messages: {Count}",
        "TransactionId": "ABCDE",
        "RecordId": 1234
    }
}
```

We can go further :)

The Category property represents the namespace of the class emitting the log.
What is expected is that  most of the logs will come from our own namespace (in my case `MyApplication.`) so we could replace this with something shorter (a `-`).
Also, when there is no state (no placeholder in our message), the state property `{OriginalFormat}` contains the same information as our Message, so we can drop it.

```json
{
    "LogLevel": "Information",
    "Category": "-Controllers.MyController",
    "Message": "Starting Process",
    "Sc": {}
}
{
    "LogLevel": "Warning",
    "Category": "-Controllers.MyController",
    "Message": "Too many messages: 5000",
    "Sc": {
        "Count": 5000,
        "{OriginalFormat}": "Too many messages: {Count}",
        "TransactionId": "ABCDE",
        "RecordId": 1234
    }
}
```

We are now at 318 bytes, less than half of the initial size

Also, if we log a large message, it won't be duplicated in the json if it contains no placeholder.
So if you are dumping potentially large payload in your message and you make sure you are not using placeholders, then you can cut the size of your logs in two

Is if all great, but we have just created an issue which was not present before:

If two scopes share the same property, they could collide! Same for a scope and a state sharing the same property

Ex:

```csharp
using var globalLogScope = _logger.BeginScope(new List<KeyValuePair<string, object>> { new("Collide", "ABCDE"), });
// This is a more local scope applied to only part of the process
using var logScope = _logger.BeginScope(new List<KeyValuePair<string, object>> { new("Collide", 1234), });
_logger.LogWarning("Too many messages: {Collide}", countMessages);
```

Will produce:

```json
{
    "LogLevel": "Warning",
    "Category": "-Controllers.MyController",
    "Message": "Too many messages: 5000",
    "Sc": {
        "Collide": 5000,
        "{OriginalFormat}": "Too many messages: {Collide}",
        "Collide": "ABCDE",
        "Collide": 1234
    }
}
```

So let's fix this by using a small HashSet to detect collisions and resolve them with a suffix number

```csharp
var suffixString = "";
var suffixNumber = 0;
while(keys.Contains(item.Key + suffixString) && suffixNumber < 10){
    suffixNumber++;
    suffixString = suffixNumber.ToString();
}
keys.TryAdd(item.Key + suffixString);
writer.WriteString(item.Key + suffixString, item.Value.ToString());
```

This code is not bullet proof, but I have rarely seen more than one collision.

Et voila, a much optimized Json Console formatter.
