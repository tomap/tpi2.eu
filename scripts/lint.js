/* global hexo */
'use strict';

const { lint } = require('markdownlint/async');

const { globSync } = require('glob');

hexo.extend.filter.register("after_generate",function(){
    
    if(!hexo.config.markdown_lint || hexo.config.markdown_lint.enabled === false) {
        return;
    }
    const options = {
        "files" : globSync(hexo.config.markdown_lint.files),
        "config": hexo.config.markdown_lint || {}
    };
    
    lint(options, function callback(err, result) {
        if (!err && Object.values(result).some((errors) => errors.length > 0)) {
            hexo.log.warn(JSON.stringify(result, null, 2));
        }
    });
});
