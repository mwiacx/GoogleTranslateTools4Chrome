function removeNewLine(){
/*
   var script = '' +
        'function removeNewLine(){\n' +
        'var textarea = document.getElementById("source");\n' +
        //'console.log(textarea.value);' +
        //'document.body.style.backgroundColor = "' + color + '";' +
        'var string = textarea.value;\n' +
        'var re = new RegExp(\'\\n\',"gm");\n' +
        'var result = string.replace(re, "");\n' +
        //'console.log(result);' +
        'textarea.value = result;\n' +
        '}\n' +
        'var input = document.getElementById("gt-submit");\n' +
        'let oldfunc = input.onclick;\n' +
        'input.onclick = function(element) {\n' +
        'removeNewLine();\n' +
        'oldfunc(element);\n' +
        '};';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: script});
    });
*/
    var domain = document.domain;
    var textarea;
    if ("translate.google.cn" == domain)
        textarea = document.getElementById("source");
    else if ("fanyi.baidu.com" == domain)
        textarea = document.getElementById("baidu_translate_input");
    var string = textarea.value;
    var re = new RegExp("\\n", "gm");
    var result = string.replace(re, " ");
    //console.log(result);
    textarea.value = result;
}

function inject(){
    //console.log("inject success!");
    var domain = document.domain;
    //console.log(domain);
    var input;
    if ("translate.google.cn" == domain){
        input = document.getElementById("gt-submit");
        input.value = "去除换行并翻译";
    }
    else if ("fanyi.baidu.com" == domain)
        input = document.getElementById("translate-button");
    /*
    * gt-submit本身有一个click事件-> translate
    * 添加第二个事件，该事件触发应该在click之前，保证先去除回车
    * 再翻译，选取mousedown事件。
    */
    input.addEventListener("mousedown", removeNewLine);
    //console.log("OK?");
}

inject();