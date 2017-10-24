
---
date : 2017-04-24
title : Travis CI Setup attempt
icon: fa-thumbs-down
tags: ["travis", "github"]
---

I wanted to be able to publish this site using [Travis](https://travis-ci.org/) instead of AppVeyor, just to try.

I found this with Google: https://github.com/jkeylu/deploy-hexo-site-by-travis-ci/blob/master/_travis.yml

I'm not pushing to GitHub pages but to a FTP so I had to slightly modify the yml following [this documentation from Travis site](https://docs.travis-ci.com/user/deployment/custom/#FTP):
```
env:
  global:
    - "FTP_USER=user"
    - "FTP_PASSWORD=password"
after_success:
    "curl --ftp-create-dirs -T uploadfilename -u $FTP_USER:$FTP_PASSWORD ftp://sitename.com/directory/myfile"
```

Unfortunately, there are multiple issues with this:
- One, it only uploads one file, not a full folder
- Two, if the upload fails, it does not break the build.

To upload a full folder, I found this [on Stack Overflow](http://stackoverflow.com/a/14020013/383029):
```
find mydir -type f -exec curl -u xxx:psw --ftp-create-dirs -T {} ftp://192.168.1.158/public/demon_test/{} \;
```
It is closer but I had to replace **-exec** parameter by piping to **[xargs](http://www.computerhope.com/unix/xargs.htm) because **-exec** does not return a -1 exit code in case of failure.

For escaping data to yaml, I used https://www.json2yaml.com/

In then end, the solution of using after_success is not cool, because in my case, that I consider build is publishing the site to the ftp. So if this step fails, I want the build to fail.

With after_success, the build is still green if this step fails. See https://docs.travis-ci.com/user/customizing-the-build/#Breaking-the-Build

I also tried that: http://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines
(did not worked)

So, in the end, I dropped Travis.