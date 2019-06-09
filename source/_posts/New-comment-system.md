---
date: 2018-01-12
title: New Comment System
icon: 💬
tags: ["comment", "disqus", "github", "linkedin", "twitter"]
---

I dropped Disqus comment system from this site after reading this news: https://blog.disqus.com/disqus-and-zeta and the wikipedia page which raises many privacy concerns: https://en.wikipedia.org/wiki/Disqus#Criticism_and_privacy_concerns
Also, with this change, I have a fully static site, without any javascript.

So, I looked around to find a third party websites with a bit guarantee but could not find any.
So I decided to switch to asking reader to comment on third party sites like Twitter, LinkedIn and Github.

So I created links (see bellow this post) to share comments via those sites.

## Github

For Github, I could not find an official documentation describing the url format to create an issue with some fields prefilled but I found this: https://github.com/isaacs/github/issues/99 which explains how to prefill the title, body & label:
``https://github.com/account/repo/issues/new?labels=mylabel&title=myTitle&body=myBody``
Note that you can't prefill a random label. The label must b part of the project label list: https://help.github.com/articles/creating-a-label/

And here is the result:
{% flickr 24775863397 %}

## Twitter

For Twitter, there is a nice documentation: https://dev.twitter.com/web/tweet-button/web-intent

Here is the URL: ``https://twitter.com/intent/tweet?url=https://example.com/myPage&via=tomap`` 

And here is the result: 
{% flickr 27866246469 %}

To have a nice "card", I had to add a few missing Open Graph tags:
- `image`: I pointed to the PNG equivalent of the post icon (Font-Awesome) using this repository: https://github.com/encharm/Font-Awesome-SVG-PNG which provides Png equivalent of the Font-Awesome icons.
I relied on https://rawgit.com/ which converts Git Asset url to urls that can be included in your site: 
  ```html
  <% if (page.icon || theme.default_post_icon){ %>
    <meta property="og:image" 
      content="https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/30dda99e/black/png/256/<%= (page.icon || theme.default_post_icon).substr(3) %>.png" />
  <% } %>
  ```
  See [https://github.com/tomap/tpi2.eu/blob/master/themes/anodyne/layout/_partial/head.ejs#L48](https://github.com/tomap/tpi2.eu/blob/fd279cc51590975d97e1030bffc836b8db8611dc/themes/anodyne/layout/_partial/head.ejs#L48)
- `url`: I used [Hexo variable](https://hexo.io/docs/variables.html#Page-Variables) `permalink`:
  ```html
    <!-- Page permalink -->
    <% if (page.permalink){ %>
        <meta property="og:url" content="<%= page.permalink %>" />
    <% } %>
  ```

## LinkedIn

Open Graph tags were also needed for LinkedIn but what already existed in the theme and what I added for Twitter was enough.

To create the url, I used this documentation: https://developer.linkedin.com/docs/share-on-linkedin# > Click on "Customized URL" and here is the result: ``https://www.linkedin.com/shareArticle?mini=true&url=https://tpî.eu/2018/01/10/New-comment-system/`` 

And here is the result:
{% flickr 38747904405 %}

Then all I had to do was to add those links instead of Disqus comment system. See [https://github.com/tomap/tpi2.eu/blob/master/themes/anodyne/layout/_partial/comments.ejs#L3](https://github.com/tomap/tpi2.eu/blob/fd279cc51590975d97e1030bffc836b8db8611dc/themes/anodyne/layout/_partial/comments.ejs#L3)
