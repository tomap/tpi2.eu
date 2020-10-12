---
title: Flickr tag improved
tags: ["flickr", "hexo"]
date: 2020-10-10
icon: 🦥
---

I spent some time improving the **hexo-tag-flickr** plugin that displays images from flickr on this site.

Here is what I did:

## Live Urls

I switched from the `farm*.staticflickr.com` urls to *live.staticflickr.com*

By doing so, I spared myself a call to [flickr.photos.getInfo](https://www.flickr.com/services/api/explore/flickr.photos.getInfo) API for each images.

Because all that is needed is a call to [flickr.photos.getSizes](https://www.flickr.com/services/api/explore/flickr.photos.getSizes)

## Srcset

I included the *srcset* attribute. This attribute is useful to provide multiple size of the same image and let the browser decide which is better depending on the context. For example, on mobile, a small image might be enough, and on a desktop a bigger image might be needed.

A demonstration of this is below:

{% flickr 50435880733 o %}

```md
{% flickr 50435880733 o %}
```

I've embedded a **20000px** large image. And you have only downloaded a 2048px image (or smaller) because your browser determined it was enough. See here for more explanation: https://flaviocopes.com/html-responsive-images-srcset/

Unless you are still using IE, in which case, ... I'm sorry (see https://caniuse.com/srcset for support)

## The rest

I also did a bunch of other fixes. See https://github.com/tomap/hexo-tag-flickr/commit/f8d58bb6e44307ba5d03ba04c81d22cac640ded3 I let you check them out.
