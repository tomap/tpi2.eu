---
date : 2018-07-31
title : Switching to Emoji Theme
icon: 😊
tags: ["theme", "emoji"]
---

In the past weeks, I have transformed the theme of this blog to use emoji instead of FontAwesome icons (FA).

FA icons were of great service, but I was only using few of them, and it was needlessly adding latency and using bandwidth.

The latency was caused by the fact that the font needed to be loaded after the CSS was loaded, and the bandwidth usage was caused by the weight of the font file. See [the .woff2 file for example](https://github.com/tomap/tpi2.eu/blob/975f9a247fff11d360085b0ef971f88e01f889df/themes/anodyne/source/fonts/fontawesome-webfont.woff2): 72KB.

For the CSS and font files, I had two possibilities:
* either reference them from a CDN, and hope that they were already cached by the client. If not, the client had to download the font + the full CSS (31KB or 7KB gzipped)
* or embed them in the site, and by using [uncss](https://github.com/uncss/uncss) be able to strip down the CSS for the icons I was not using. Only a few bytes.

I experimented both, and ended up using the 2nd option: embedding FontAwesome to leverage uncss with hexo-uncss.

Then I looked at the very few icons I was using, and realized I could use Emoji instead.

I made a map [FA <> Emoji](https://github.com/tomap/tpi2.eu/blob/0fe8e130dffd87a1d9e631637ddfb99b03f1d5d0/FontAwesomeToUnicode.md). I found an equivalent for every icons except the brands (LinkedIn, Twitter, ...). For them, I switched from Font Icons to SVG of those icons (first using FA SVG's, and then SVG from [SimpleIcons](https://simpleicons.org/), with a more permissive license CC Zero)

Here are the technical changes I made to do that:

## Emojis

I used emojis for pages & posts titles and for the "tags" & "share" icons (see at the bottom of the page).

In the header of the post, instead of mentioning:
```
icon: fa-fire
```
I can use the emoji directly:
```
icon: 🔥
```

This will the reference the css `.ec-🔥` which will display the icon as a `content: '🔥'`

I also had to change the open graph image used when sharing to Twitter or LinkedIn. For the, I found this service https://i❤️.ws/emoji-image/🔥.png which provides a png from an emoji. See [the article on Medium](https://medium.com/@Emoji_Domains/free-emoji-image-generator-api-c0b7eaefa586) for more explanation.

By default, emoji are displayed with colors, see the fire or smiley 🔥 😊.
In order to keep something closer to FA, I applied a `filter: sepia(90%);` which gave them a nicer render.

# Brands

For brands, I used the brand icons from SimpleIcons.org. They have pretty much every brand you can ask for, and if they don't have it, you can [ask for it](https://github.com/simple-icons/simple-icons/issues/625#issuecomment-361242420).

It's a manual process: I copied the brand icon from they site, optimized it using https://jakearchibald.github.io/svgomg/, manually removed some more useless stuff and paste them as inline background images.

Original SVG (twitter)
```
<svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>
```
Resulting CSS (in Stylus):
```
.ic-twitter
    background-image url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.9044 4.9044 0 0 1-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827a4.9631 4.9631 0 0 1-2.212.085c.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z'/></svg>")
```

And here we are:
* Home page HTML is now 9.91kb from 9.97kb
* CSS is now 8.96kb from 7.84kb
* no more Font file downloaded (was 75.9kb)

So it's lighter overall, but a bit bigger for CSS.

Next step will be to create a nice theme and share it on https://hexo.io/themes/