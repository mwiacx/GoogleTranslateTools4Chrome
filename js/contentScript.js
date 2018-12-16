function removeNewLine(){

    var domain = document.domain;
    var textarea;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain)
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
    reviseRe = new RegExp(".*et al$"); // 修正et al.的换行问题
    var sentences = string.split(re, 100);
    var result = "";
    for (var i = 0; i < sentences.length-1; i++) // length-1: remove the extra blank lines.
    {
        if (sentences[i].search(reviseRe) == -1)
            result += sentences[i]+".\n"; /* TODO: Use the original punctuation */
        else
            result += sentences[i]+ ". ";
    }
    /* Rewrite the textarea. */
    textarea.value = result;
}

function inject(){
    //console.log("inject success!");
    var domain = document.domain;
    //console.log(domain);
    var button = null;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain){
        inject_div = document.getElementsByClassName(
            "source-footer-wrap source-or-target-footer");
        //console.log("injet_div length: " + inject_div.length);
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
    if (button)
        button.addEventListener("mousedown", removeNewLine);
    //console.log("OK?");
}

inject();
