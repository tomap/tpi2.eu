# Welcome to Minidyne

[![Screenshot](http://www.codeblocq.com/img/hexo-theme-thumbnail/hexo-theme-anodyne-screenshot.jpg)](http://www.codeblocq.com/assets/projects/hexo-theme-anodyne/)

[Live Demo Here]()

<!-- more -->

## Features Overview

- Responsive
- Tags Support
- Responsive Images
- Responsive YouTube and Vimeo videos
- Social Accounts configuration
- Pagination
- Pages
- Stylus CSS preprocessor
- ejs HTML templates
- Standalone (single css file, no external file)
- Static (no js, none)
- Emoji Icons & SVG for social icons

## External libraries used

- [tachyons](http://tachyons.io/)

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
Add them in the package.json:
```json
"dependencies": {
    "hexo-generator-archive": "^0.1.5",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.3.1",
    "hexo-renderer-stylus": "^0.3.3"
  }
```

## Post Configuration

Each post supports the standard `title`, `date`, `tags`.

### Post Icon

On top of that, you can specify an icon (ascii/unicode emoji) in the front matter:

Example:

``` yaml
title: Welcome to Minidyne
tags: ["ThisIsATag", "Intro", "Welcome", "Minidyne"]
icon: 🤝
---
```

## Theme Configuration

The theme's global configuration is done in `/themes/hexo-theme-minidyne/_config.yml`.

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

### Blog's main icon (as emoji)

The blog's icon is configured in the theme's `_config.yml`.

It should be an emoji. Pick one from https://emojipedia.org/

``` yaml
# Logo
index_icon: ❤️
```

### Default post title

The default post title (used when no title is specified) is configured in the theme's translation file in `/themes/hexo-theme-minidyne/languages`.

``` yaml
default_post_title: "Untitled"
```

### Default post icon

The default post icon (used when no icon is specified) is configured in the theme's `_config.yml`.

``` yaml
default_post_icon: 🧙
```

### Home page configuration

Likewise, you can configure the home page's title, subtitle and icon in the `_config.yml`

``` yaml
# Index Page
index_banner_text: Welcome to Minidyne
index_icon: 🧙
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
# Social Accounts
social_platforms:
  - url: https://twitter.com/?lang=en
    icon: twitter
  - url: https://github.com/tomap
    icon: github
```

## Creator

This theme was created by [Thomas Piart](https://tpî.eu) initialy based upon (Anodyne Theme)(https://github.com/klugjo/hexo-theme-anodyne) by [Jonathan Klughertz](http://www.codeblocq.com/) and also influenced by other minimalist approaches like (mnmlist)[http://mnmlist.com/w/].

## Bugs

If you have a question, feature request or a bug you need me to fix, please [click here](https://github.com/tomap/hexo-theme-minidyne/issues/new) to file an issue.

## License

MIT