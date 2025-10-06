// @ts-check

import { lint as lintAsync } from "markdownlint/async";

import { globSync } from 'glob';

hexo.extend.filter.register("after_generate",function(){
    
    if(!hexo.config.markdown_lint || hexo.config.markdown_lint.enabled === false) {
        return;
    }
    const options = {
        "files" : globSync(hexo.config.markdown_lint.files),
        "config": hexo.config.markdown_lint || {}
    };

    // Makes an asynchronous call, uses result.toString for pretty formatting
    lintAsync(options, function callback(error, results) {
        if (!error && results) {
          console.log(results.toString());
        }
    });
});
