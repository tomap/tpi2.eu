# Welcome to Minidyne, a minimalist hexo theme


![Screenshot of this site](https://hexo-theme-minidyne-demo.netlify.com/screenshot.png)

[Live Demo on Netlify](https://hexo-theme-minidyne-demo.netlify.com/)
([Source for the demo on Github](https://github.com/tomap/hexo-theme-minidyne-demo))

<!-- more -->

## Features Overview

- Responsive
- Tags Support
- Responsive Images
- Social Accounts configuration
- Pagination
- Pages
- Two languages (French & English)
- Stylus CSS preprocessor
- ejs HTML templates
- Standalone (single css file, no external file) 🥊
- Static (no js, one single css) 🧱
- Emoji Icons for blog posts ✨
- SVG for social icons (twitter, stackoverflow, linkedIn 📰)

## External libraries used

- [tachyons](https://tachyons.io/) for Css Framework
- [SimpleIcons](https://simpleicons.org/) for brands

## Installation

### Install the theme

Install the theme by using:

```
$ git clone https://github.com/tomap/hexo-theme-mindyne themes/minidyne
```

Then update your blog's main `_config.yml` to set the theme to `minidyne`:

i.e:

``` yaml
theme: minidyne
```

You'll also need the following hexo plugins for this theme to work.
Add them in the package.json (they should alread be there, but just in case):
```json
"dependencies": {
    "hexo-generator-archive": "^0.1.5",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.3.1",
    "hexo-renderer-stylus": "^0.3.3"
  }
```


## Limitations

This theme does not handle
- Categories (so you can drop the default dependency to "hexo-generator-category" )
- Images gallery

## Post Configuration

Each post supports the standard `title`, `date`, `tags`.

### Post Icon

On top of that, you can specify an icon (ascii/unicode emoji):

Example:

``` yaml
title: Welcome to Minidyne
tags: ["ThisIsATag", "Intro", "Welcome", "Minidyne"]
icon: 🤝
---
```
Pick one from https://emojipedia.org/

## Theme Configuration

The theme's global configuration is done in `/themes/minidyne/_config.yml`.

### Menu

The menu is configured in the theme's `_config.yml` or in the root `_config.yml`.

``` yaml
# Header
menu:
  Home: /
  Archives: /archives
  About: /about.html
```

The object key is the label and the value is the path.

### Blog's home page

The blog's icon & title is configured in the theme's `_config.yml`.

The icon should be an emoji. Pick one from https://emojipedia.org/

``` yaml
# Index Page
index_banner_text: Welcome to Minidyne

# Logo
index_icon: ❤️
```
### Default post title

The default post title (used when no title is specified) is configured in the theme's translation file in `/themes/minidyne/languages`.

``` yaml
default_post_title: "Untitled"
```

### Default post icon

The default post icon (used when no icon is specified) is configured in the theme's `_config.yml`.

``` yaml
default_post_icon: 🧙
```

### Archive Date Format

You can change the date format for the archive page if you so desire

``` yaml
# Archive Date Format
archive_date_format: MMM YYYY
```

### Social Account

Setup the links to your social pages in the theme's `_config.yml` as an array of objects. Links are in the footer.

Example:

``` yaml
# Social Media Platforms, also used for comments
social_platforms:
  - url: https://stackoverflow.com/users/12345/johndoe
    icon: stackoverflow
  - url: https://github.com/johndoe/
    icon: github
    type: github
    repository: johndoe.blog
  - url: https://linkedin.com/in/johndoe
    icon: linkedin
    type: linkedin
  - url: https://twitter.com/johndoe
    icon: twitter
    type: twitter
    account: johndoe
```

They are used for sharing comments on your posts. Some need more properties than others

## Creator

This theme was created by [Thomas Piart](https://tpî.eu) initially based upon (Anodyne Theme)(https://github.com/klugjo/hexo-theme-anodyne) by [Jonathan Klughertz](http://www.codeblocq.com/) and also influenced by other minimalist approaches like (mnmlist)[http://mnmlist.com/w/].

## Bugs

If you have a question, feature request or a bug you need me to fix, please [file an issue](https://github.com/tomap/hexo-theme-minidyne/issues/new).

## License

MIT