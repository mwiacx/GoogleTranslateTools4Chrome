var excludedRegExps = new Array(
    /* i.e. */
    "(?<=i\\.e)\\.|(?<=i)\\.(?=e)",
    /* e.g. */
    "(?<=e\\.g)\\.|(?<=e)\\.(?=g)",
    /* et. al */
    "(?<=et)\\.",
    /* sec 2.3.4 */
    "(?<=[0-9]+)\\.(?=[0-9]+)")

function genSrcSentences(){
    /* 1. get textarea */
    var domain = document.domain;
    var textarea;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain)
        textarea = document.getElementById("source");
    else if ("fanyi.baidu.com" == domain)
        textarea = document.getElementById("baidu_translate_input");

    /* 2. remove all the newline in string. */
    var string = textarea.value;
    var re = new RegExp("\\n", "g");
    string = string.replace(re, " ");
    //console.log("Before replace: " + string);

    /* 3. replace the periods that need to be excluded */
    for (i in excludedRegExps) {
        //console.log("ere: " + excludedRegExps[i]);
        string = string.replace(new RegExp(excludedRegExps[i], "g"),
            String.fromCharCode(7));
    }

    //console.log("After replace: " + string);

    /* 4. let every sentence separated by a blank line. */
    re = new RegExp("[\\.!;]\\s*");
    var sentences = string.split(re);

    /* 5. restore the periods that be replaced */
    re = new RegExp(String.fromCharCode(7), "g");
    for (i in sentences) {
        sentences[i] = sentences[i].replace(re, ".") + ".\n";
        //console.log("After split: " + sentences[i]);
    }

    /* 6. return */
    return sentences;
}

function genDstSentences() {
    /* Get translate text, src text is already in sentences array*/
    var translateSpan = document.getElementsByClassName("tlid-translation translation");
    if (translateSpan.length != 1)
        return;

    //console.log(translateSpan[0].innerText);
    var allText = translateSpan[0].innerText;
    var re = new RegExp("\\n", "g");
    allText = allText.replace(re, " ");
    /* split translated text into sentences */
    re = new RegExp("[。！；]\\s*");
    tSentences = allText.split(re, 100);

    return tSentences;
}

function removeNewLine(){
    var domain = document.domain;
    var textarea;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain)
        textarea = document.getElementById("source");
    else if ("fanyi.baidu.com" == domain)
        textarea = document.getElementById("baidu_translate_input");

    var sentences = genSrcSentences();
    var result = "";
    // length-1: remove the extra blank lines.
    for (var i = 0; i < sentences.length-1; i++) 
    {
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
    inject_div = inject_divs[0];
    /* Create constrast */
    var sSentences = genSrcSentences();
    var tSentences = genDstSentences();
    for (var i = 0; i < sSentences.length-1; i++) {
        var entryDiv = document.createElement("div");
        entryDiv.setAttribute("class", "ijt_constrast_entry");
        var leftTextDiv = document.createElement("div");
        leftTextDiv.setAttribute("class", "ijt_constrast_left_text");
        leftTextDiv.innerText = sSentences[i];
        var rightTextDiv = document.createElement("div");
        rightTextDiv.setAttribute("class", "ijt_constrast_right_text");
        rightTextDiv.innerText = tSentences[i] + "。";
        entryDiv.appendChild(leftTextDiv);
        entryDiv.appendChild(rightTextDiv);
        mainDiv.appendChild(entryDiv);
    }
    inject_div.appendChild(mainDiv);

    delete(tSentences);
}

/* all the routine */

function clipboardJsImport() {
    /*
     * <script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
     */
    new_element=document.createElement("script");
    new_element.setAttribute("type","text/javascript");
    new_element.setAttribute("src","https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js");
    document.body.appendChild(new_element);
}

function allRoutine() {
    /* 1. copy clipboardData to input */
    var domain = document.domain;
    var textarea;
    if ("translate.google.cn" == domain ||
        "translate.google.com.hk" == domain)
        textarea = document.getElementById("source");
    else if ("fanyi.baidu.com" == domain)
        textarea = document.getElementById("baidu_translate_input");

    /* 2. clear and focus on textarea */
    textarea.focus();
    textarea.value = "";
    textarea.focus();
    /* 3. call paste command */
    document.execCommand("paste");
    /* 4. remove newline */
    removeNewLine();
    /* 5. wait for translate then call contrast */
    setTimeout("translateContrast()", 2000);
}

function inject(){
    //console.log("inject success!");
    var domain = document.domain;
    //console.log(domain);
    var button_newline = null;
    var button_contrast = null;
    var button_oneshot = null;
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
            /* add one-shot button into inject_div */
            button_oneshot = document.createElement("button");
            button_oneshot.innerText = "一键翻译";
            button_oneshot.setAttribute("id", "gt-oneshot-button");
            inject_div[0].appendChild(button_oneshot);
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
    if (button_oneshot)
        button_oneshot.addEventListener("mousedown", allRoutine);
    //console.log("OK?");
}

inject();
