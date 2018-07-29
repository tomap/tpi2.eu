---
date : 2017-12-20
title : Testing Firebase hosting
icon: 🔥
tags: ["firebase", "hosting", "hexo", "travis"]
---

Using Travis CI, I tried deploying this hexo site to [firebase hosting](https://firebase.google.com/products/hosting/).

It includes 1Gb of storage and 10 Gb of data transfer monthly. So it would be a huge increase compared to OVH Start1m plan (also free).

It also supports Custom domain (So I could host this site or a subdomain on Firebase) & free SSL certificates.

I used the doc on travis to do that: https://docs.travis-ci.com/user/deployment/firebase/

Then I tried to generate encryption keys using travis command line:
https://docs.travis-ci.com/user/encryption-keys/

Unfortunately, it failed:
```
$ travis
-bash: /usr/local/bin/travis: /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/bin/ruby: bad interpreter: No such file or directory
```
From what I read here and there, it's an issue with the last MacOS update (High Sierra).

Here is the fix:
```
sudo gem install -n /usr/local/bin travis
```
Once this is fixed, it is possible to generate your encryption key:
```
travis encrypt "xyz<my ci key>wxy" --add deploy.token
```
Note that this will produce a warning that you can ignore.

Here is the full .travis.yml file:
```
language: node_js
node_js:
- node
git:
  depth: 2
branches:
  only:
  - master
before_install:
- npm install -g hexo-cli
install:
- npm install
script:
- hexo generate
before_deploy:
- cp firebase/robots.txt public/robots.txt
deploy:
  skip_cleanup: true
  provider: firebase
  token:
    secure: tEG0...V9g=
```
The current version is stored here: https://github.com/tomap/tpi2.eu/blob/master/.travis.yml

And the result can be seen here: https://tpi-eu.firebaseapp.com/ (I added a specific robots.txt to disallow search engine indexing)

Travis build logs are available here: https://travis-ci.org/tomap/tpi2.eu