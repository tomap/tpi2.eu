---
title: Flickr restored
tags: ["flickr"]
date: 2017-02-26
icon: 🖼
---
I restored Flickr images on my site:
{% flickr 32865582372 %}

It is less convenient than the [plugin I developed for Docpad](https://github.com/tomap/docpad-plugin-flickrimages) because I have to manually upload images to Flickr myself. Once it is uploaded, I just grab the picture id and stick it inside a tag:
```
{% flickr 32865582372 %}
```

Also, I still have to add something like fancyBox which btw seem to have a [version 3 available](https://fancyapps.com/fancybox/3/).

So my todo list for this site:
- add fancyBox
- restore images on previous posts
- maybe test a bit Travis just in case AppVeyor breaks
- ~~Install a SSL Certificate with CloudFlare~~ [or NOT](https://arstechnica.com/security/2017/02/serious-cloudflare-bug-exposed-a-potpourri-of-secret-customer-data/)
- Add a button to display Disqus comments. So they are not loaded by default. 
- Publish my resume :)
