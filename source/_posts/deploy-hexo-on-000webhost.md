---
date: 2021-03-19
title: Deploy hexo on 000webhost
icon: 🧓
tags: ["hexo", "000webhost", "hosting"]
---

Deploying a Hexo site on **000webhost** is super easy!

Let's remind some basics:

* [Hexo](https://hexo.io) is a static site generator. Meaning that you can generate a pure HTML site that does not rely on a backend server (PHP, nodejs, ...)
* [000webhost](https://www.000webhost.com/) is a very classic web hosting provider, it allow you to host a static web sites as well as a more traditional dynamic site with PHP. They try very hard to make you upgrade to their paid offer.

## Pre requisites

You'll need your Hexo site built.

If you don't have one already, you can [follow this doc to create one](https://hexo.io/docs/#Installation) or even simpler, [fork the hexo-starter repository](https://github.com/hexojs/hexo-starter).

Then run the command `hexo g` or `npx hexo g` (if you don't have hexo installed globally on your machine). If your configuration is standard, you should find your site in the folder `public`.

## First Deploy

Once you are ready, go to https://www.000webhost.com/free-website-sign-up

I chose to login with my google account, but you can choose to create a local account

You'll then be prompted to create a site with their site builder tool. You can skip that part :)

Just create a new website with a new random password

You'll be able to use this password to upload your site via FTP (the alternative it to use their file manager, which isn't usable to upload a site with multiple sub folders)

Via you ftp client (Filezilla for instance), login to `files.000webhost.com`. The username is the website name you chose above, same for the password.

Once your site is uploaded, you can also tweak the `.htaccess` file to handle your 404 page (if you have one). Here is the minimal content you could use:

```csv
ErrorDocument 404 /assets/404.html
```

If you want to automate ftp upload from github, you can probably use something like what I did with ftp upload to OVH:
https://github.com/tomap/tpi2.eu/blob/master/.github/workflows/nodejs.yml#L53
or see my previous post on the subject: [Travis setup](/2017/04/24/Travis-setup/)

## Custom Domain

You can configure a domain to point to your site.

If your site url is tpi2-eu.000webhostapp.com like mine is, you can add a CNAME like this one:

CNAME: 000webhost.xn--tp-rja.eu -> tpi2-eu.000webhostapp.com

For me, the result is here:

* https://tpi2-eu.000webhostapp.com/
* http://000webhost.xn--tp-rja.eu/

## Conclusion

You should not use them. There are much bette offer out there for free hosting.

1. They add an ugly banner at the bottom of each pages (after thinking a bit about it, you should probably be able to kill it using CSP, and disallowing inline JS, but they might kick you out). I made a [PR about that on free-for-dev](https://github.com/ripienaar/free-for-dev/pull/1749)
2. They don't provide SSL certificate if you use your own custom domain
3. They got breached in 2015, with clear passwords: https://haveibeenpwned.com/PwnedWebsites#000webhost
