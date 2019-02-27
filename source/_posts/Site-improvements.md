---
date : 2017-12-18
title : Site improvements
icon: ⬆
tags: ["hexo", "nodejs", "security"]
---

In the last weeks, I have slightly modified this site to bring the following nice improvements:
* Remove most of the JavaScript (Except to launch Disqus. See [https://github.com/tomap/tpi2.eu/blob/master/themes/anodyne/layout/_partial/comments.ejs](https://github.com/tomap/tpi2.eu/blob/a3cbd3a1ed1fd72b483a010f102a7f1e13d98624/themes/anodyne/layout/_partial/comments.ejs#L4))
* Add HSTS header & nosniff header. See https://github.com/tomap/tpi2.eu/blob/master/source/.htaccess#L416
* Include the assets I use (namely FontAwesome & tachyon) in the dev dependencies of package.json so that I can easily spot if thy are updated. Either here: https://david-dm.org/tomap/tpi2.eu?type=dev or using [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
* Enable [hexo-filter-cleanup](https://github.com/mamboer/hexo-filter-cleanup) plugin which compresses my HTML & CSS

After all that this site weights less than 200 KB!

Next I'll post about Firebase :)
