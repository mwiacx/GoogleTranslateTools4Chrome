var sentences = null;
var tSentences = null;

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
    sentences = string.split(re, 100);
    var result = "";
    for (var i = 0; i < sentences.length-1; i++) // length-1: remove the extra blank lines.
    {
        if (sentences[i].search(reviseRe) == -1)
            sentences[i] += ".\n"; /* TODO: Use the original punctuation */
        else
            sentences[i] += " ";
        /* copy to result */
        result += sentences[i];
    }
    /* Rewrite the textarea. */
    textarea.value = result;
}

function translateContrast(){
    /* Clean pre translate contrast */
    var mainDiv = document.getElementById("ijt_constrast_main");
    if (mainDiv) { /* clean */
        mainDiv.innerText = "";
    }
    else { /* create */
        mainDiv = document.createElement("div");
        mainDiv.setAttribute("id", "ijt_constrast_main");
    }

    var inject_divs = document.getElementsByClassName(
        "tlid-source-target main-header"
    );
    if (inject_divs.length != 1)
        return;
    
    /* Get translate text, src text is already in sentences array*/
    var translateSpan = document.getElementsByClassName("tlid-translation translation");
    if (translateSpan.length != 1 || sentences == null)
        return;

    var translationEntrys = translateSpan[0].childNodes;
    tSentences = new Array();
    for(var i = 0, j = 0; i < translationEntrys.length; i+=2, j++) {
        var entry = translationEntrys[i];
        //console.log(entry.innerText);
        tSentences[j] = entry.innerText;
    }
    /* Create constrast */
    inject_div = inject_divs[0];
    for (var i = 0; i < sentences.length-1; i++) {
        var entryDiv = document.createElement("div");
        entryDiv.setAttribute("class", "ijt_constrast_entry");
        var leftTextDiv = document.createElement("div");
        leftTextDiv.setAttribute("class", "ijt_constrast_left_text");
        leftTextDiv.innerText = sentences[i];
        var rightTextDiv = document.createElement("div");
        rightTextDiv.setAttribute("class", "ijt_constrast_right_text");
        rightTextDiv.innerText = tSentences[i];
        entryDiv.appendChild(leftTextDiv);
        entryDiv.appendChild(rightTextDiv);
        mainDiv.appendChild(entryDiv);
    }
    inject_div.appendChild(mainDiv);

    delete(tSentences);
}

function inject(){
    //console.log("inject success!");
    var domain = document.domain;
    //console.log(domain);
    var button_newline = null;
    var button_contrast = null;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain){

        inject_div = document.getElementsByClassName(
            "source-footer-wrap source-or-target-footer");
        //console.log("injet_div length: " + inject_div.length);
        if (inject_div.length == 1){
            /* add contrast button into inject_div */
            button_contrast = document.createElement("button");
            button_contrast.innerText = "翻译对照";
            button_contrast.setAttribute("id", "gt-contrast-button");
            inject_div[0].appendChild(button_contrast);
            /* add revise newline button into
            inject_div */
            button_newline = document.createElement("button");
            button_newline.innerText = "修正换行";
            button_newline.setAttribute("id", "gt-remove-button");
            inject_div[0].appendChild(button_newline);
        }
    }
    else if ("fanyi.baidu.com" == domain)
    button_newline = document.getElementById("translate-button");
    /*
    * gt-submit本身有一个click事件-> translate
    * 添加第二个事件，该事件触发应该在click之前，保证先去除回车
    * 再翻译，选取mousedown事件。
    */
    if (button_newline)
        button_newline.addEventListener("mousedown", removeNewLine);
    if (button_contrast)
        button_contrast.addEventListener("mousedown", translateContrast);
    //console.log("OK?");
}

inject();
