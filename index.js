
'use strict';

function calId(filePath, rules){
    var fileId = null;
    for(var i=0, len=rules.length; i<len; i++){
        var match = filePath.match(rules[i].reg);
        if(match){
            fileId = filePath.replace(rules[i].reg, rules[i].id);
            break;
        }
    }
    if(!fileId){
        fileId = filePath.replace(/(^\/)|(\..+$)/i, '');
    }
	
    return fileId.replace(/\//g, '-');
}

module.exports = function(content, file, conf){

    var fileId = calId(file.subpath, conf.rules);

    return content.replace(/X__X/g, fileId)
        .replace(/X__/g, fileId+'__');
};