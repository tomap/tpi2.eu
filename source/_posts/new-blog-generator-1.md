---
date : 2017-02-05
title : New site generator (take 1)
icon: 🚫
tags: ["hugo", "static", "go"]
---
I was trying to change the site generator to something simpler and that would also support including images hosted elsewhere.

After [some research](https://www.staticgen.com/), I found [Hugo](https://gohugo.io). Hugo is a static site generator using Go.

The change was simple.

I followed the [quick start tutorial](https://gohugo.io/overview/quickstart/), then picked a new theme: [hugo-frais](https://github.com/the2ne/hugo-frais) and transferred posts from the old site.

Post headers are similar. Before:
```
---
title: My progress in setting this site up
layout: post
tags: [setup,progress,site]
date: '2013-01-26'
---
```
After:
```
+++
title= "My progress in setting this site up"
tags= ["setup","progress","site"]
date= "2013-01-26"
+++
```
Not so complicated.

However, in then end, I looked at the source code and found some ugliness:
```
    <base href="https://xn--tp-rja.eu/">
    <meta name="generator" content="Hugo 0.18.1" />
    <link rel="canonical" href="https://xn--tp-rja.eu/">
    <link href="https://tp%C3%AE.eu/index.xml" rel="alternate" type="application/rss+xml" title="Thomas Piart" />
```
After some digging in the options, it found two options:
```
canonifyURLs = true
relativeURLs = true
```
they made some url relative, but some were still broken and here did not seem to be an easy way to solve that.

I raised some issues on github, but eventually choose not to use Hugo.