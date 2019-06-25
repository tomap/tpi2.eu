---
date : 2017-02-10
title : New site generator (take 2)
icon: ➕
tags: ["hexo", "static", "nodejs"]
---
After trying Hugo, I tried [Hexo](https://hexo.io).

Like Docpad, Hexo is also based upon NodeJS.

Basically, you can write your posts in Markdown, HTML, [EJS](http://www.embeddedjs.com/), like with Docpad.

It has many themes. I picked [Anodyne](https://github.com/klugjo/hexo-theme-anodyne) and simplified it.
Unlike Hugo, you can easily modify the theme's CSS (or [Stylus](http://stylus-lang.com/)), and when you generate the site, it also regenerate the CSS.

Next steps:

- Integrate this plugin https://github.com/visioncan/hexo-tag-flickr to have images back
- Setup AppVeyor to publish the site when committing
- Setup SSL (with Cloudflare or OVH if it's free)

PS: [old site still exists on GitHub](https://github.com/tomap/tpi.eu)
