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
    if ("translate.google.cn" == domain ||
    "translate.google.com.hk == domain")
        textarea = document.getElementById("source");
    else if ("fanyi.baidu.com" == domain)
        textarea = document.getElementById("baidu_translate_input");

    /* Remove all the newline in String. */
    var string = textarea.value;
    var re = new RegExp("\\n", "gm");
    string = string.replace(re, " ");
    //console.log(string);

    /* Let every sentence separated by a blank line. */
    re = new RegExp("[\.!;]\\s*");
    var sentences = string.split(re, 100);
    var result = sentences[0]+"."; /* TODO: Use the original punctuation */
    for (var i = 1; i < sentences.length-1; i++) // length-1: remove the extra blank lines.
    {
        result += "\n";
        result += sentences[i]+"."; /* TODO: Use the original punctuation */
    }
    /* Rewrite the textarea. */
    //console.log(result);
    //document.getElementById("gt-submit").blur();
    textarea.value = result;
    //textarea.focus();
}

function inject(){
    //console.log("inject success!");
    var domain = document.domain;
    //console.log(domain);
    var button;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk == domain"){
        //input = document.getElementById("gt-submit");
        //input.value = "去除换行并翻译";
        inject_div = document.getElementsByClassName(
            "source-footer-wrap source-or-target-footer");
        console.log("injet_div length: " + inject_div.length);
        if (inject_div.length == 1){
            button = document.createElement("button");
            button.innerText = "修正换行";
            button.setAttribute("id", "gt-remove-button");
            inject_div[0].appendChild(button);
        }
    }
    else if ("fanyi.baidu.com" == domain)
        button = document.getElementById("translate-button");
    /*
    * gt-submit本身有一个click事件-> translate
    * 添加第二个事件，该事件触发应该在click之前，保证先去除回车
    * 再翻译，选取mousedown事件。
    */
    button.addEventListener("mousedown", removeNewLine);
    //console.log("OK?");
}

inject();
