---
date : 2017-02-19
title : AppVeyor Setup
icon: ⏩
tags: ["appveyor", "github"]
---
I just configured AppVeyor Continuous Deployment.

To do that, I went to [AppVeyor](https://www.appveyor.com/), [logged in](https://ci.appveyor.com/projects), then [Project](https://ci.appveyor.com/projects) and click [New Project link on top](https://ci.appveyor.com/projects/new), then pick the GitHub Repository that you want to build and deploy ([GitHub.com/tomap/tpi2.eu](https://github.com/tomap/tpi2.eu) in my case).

After that, in the new project, I went to settings, https://ci.appveyor.com/project/tomap/tpi2-eu/settings, in the Build part, I choose Script and added the following:
```
npm install
npm -g install hexo-cli
hexo generate
```
that generates the site in the **public** folder.

Then I went to Artifact and selected the content of this folder:
```
public\**\*
```

Then I went to Deploy, choose FTP deployment. And that when issues started :(

FTP is always something messy. Active or not. FTP, SFTP or FTPS. I tried them all without success. Then start googleing and although my issue was not exactly the same, I tried the suggestion from [AppVeyor Support Forum](https://help.appveyor.com/discussions/problems/3236-cant-deploy-via-ftp-because-of-error-message-450) and guess what, it worked! The solution was to enable a "Beta FTP" option, ... of course. 

Well, at first, I wanted to use SFTP (you know, for security, ...), which is supposed to be enabled on my OVH account, but it did not work. So that's for another day.

To test the deployment, I set the FTP folder to __/www/test/__. Strangely, AppVeyor decided that the best folder to deploy my files was: __/www/test/**public**/..._ instead of directly __/www/test/...__ it was one folder too deep.

I googled again and found [that AppVeyor documentation page that helped me](https://www.appveyor.com/docs/packaging-artifacts/#pushing-artifacts-from-scripts). So my solution was to remove the artifact and instead use a PowerShell to publish the files so that their path was __index.html__ instead of __public/index.html__.

After some trial and errors (~40 of them), I end up with something working. This is all nice and great, but I don't like having all the configuration in AppVeyor, I prefer to have it in my Git Repository, so I can reproduce it somewhere else and I can share it also :)

Here is the exported version of my configuration: **AppVeyor.yml**
```
version: 1.1.{build}
build_script:
- cmd: >-
    npm install
    npm -g install hexo-cli
    hexo generate
test: off
before_deploy:
- ps: $root = Resolve-Path .\public; [IO.Directory]::GetFiles($root.Path, '*.*', 'AllDirectories') | % { Push-AppveyorArtifact $_ -FileName $_.Substring($root.Path.Length + 1) -DeploymentName www }
deploy:
- provider: FTP
  host: ftp.cluster014.hosting.ovh.net
  protocol: ftp
  username: xntprja
  password:
    secure: xXShqZFpQ6Jeg8O86XJ8fiqe7AiTHWrFaS6ic4AVTtE=
  folder: /www/test
  artifact: www
  active_mode: false
  beta: true
  debug: false
```
It takes around 2 minutes to build (due to npm package restore and FTP upload, mainly).
You can see the latest logs here: https://ci.appveyor.com/project/tomap/tpi2-eu
And the AppVeyor.yaml is pushed on my repo: https://github.com/tomap/tpi2.eu/blob/master/appveyor.yml
I also added an indispensable badge in my [ReadMe](https://github.com/tomap/tpi2.eu/blob/master/Readme.md): [![Build status](https://ci.appveyor.com/api/projects/status/amvptl7n6hj3j8i6?svg=true)](https://ci.appveyor.com/project/tomap/tpi2-eu)

EDIT: 
It seems that when using **appveyor.yml** to store the configuration, AppVeyor uses a different virtual machine with a lower version of NodeJS. So, google again, and I found [help in their support page again](https://www.appveyor.com/docs/lang/nodejs-iojs/), and I had to add:
```
...
install:
- ps: Install-Product node ''
...
```

Which should install latest version of node (7.x) :)