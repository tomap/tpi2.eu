/* global hexo */

'use strict';

const markdownLint = require('markdownlint');

const glob = require('glob');

hexo.extend.filter.register("after_generate",function(){
    
    if(!hexo.config.markdown_lint || hexo.config.markdown_lint.enabled === false) {
        return;
    }
    const options = {
        "files" : glob.sync(hexo.config.markdown_lint.files),
        "config": hexo.config.markdown_lint || {}
    };
    
    markdownLint(options, function callback(err, result) {
        if (!err && result.toString().length > 0) {
            hexo.log.warn(result.toString());
        }
    });
});
