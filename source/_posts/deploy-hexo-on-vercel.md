---
date: 2020-12-30
title: Deploy hexo on Vercel
icon: ▲
tags: ["hexo", "vercel", "hosting"]
---

Deploying a Hexo site on **Vercel** is super easy!

Let's remind some basics:

* [Hexo](https://hexo.io) is a static site generator. Meaning that you can generate a pure HTML site that does not rely on a backend server (PHP, nodejs, ...)
* [Vercel](https://vercel.com/) is a bit like Netlify, it allows you to host your static site, and offers you features to make it more dynamic (authentication, lambda functions)

At Vercel, they made a great job at making the onboarding easy and complete.

## Pre requisites

Your Hexo site sources must be hosted on GitHub (also works with GitLab and Bitbucket).

If you don't have one already, you can [follow this doc to create one](https://hexo.io/docs/#Installation) or even simpler, [fork the hexo-starter repository](https://github.com/hexojs/hexo-starter).

## First Deploy

Once you are ready, go to https://vercel.com

Choose the GitHub login (button "Continue with GitHub")

Then click on "Continue" below "Import Git Repository".

Paste your git repository url: `https://github.com/<username>/hexo-starter`

Vercel will ask you if it's your repository or not. Say Yes.

It will redirect you to GitHub Authorization screen, where you need to allow Vercel to have access to your repository.

Once you are done, Vercel will deploy your site to their domain: https://my-site.vercel.app

## Custom Domain

You can easily configure a domain to point to your Vercel deployment via the Menu: *My Project* > Settings > Domains where they ask you to provide the domain name you want to define, and then you have to add a **CNAME** to your DNS

And voila :)

For me, the result is here:

* https://tpi2-eu.vercel.app/
* https://vercel.tpî.eu/
