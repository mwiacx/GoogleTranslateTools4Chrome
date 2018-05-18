'use strict';

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
    var textarea = document.getElementById("source");
    var string = textarea.value;
    var re = new RegExp("\\n", "gm");
    var result = string.replace(re, "");
    //console.log(result);
    textarea.value = result;

}

function inject(){
    var input = document.getElementById("gt-submit");
    /*
     * gt-submit本身有一个click事件-> translate
     * 添加第二个事件，该事件触发应该在click之前，保证先去除回车
     * 再翻译，选取mousedown事件。
     */
    input.value = "去除换行并翻译";
    input.addEventListener("mousedown", removeNewLine);
    //console.log("OK?");
}

inject();
