// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('Trans_Engine', function(data) {
    var selected = data.Trans_Engine;
    var trans_select_google = document.getElementById('sel-google');
    var trans_select_baidu = document.getElementById('sel-baidu');  
    if ('Google' == selected){
        trans_select_google.className = 'popup-select popup-select-on';
        trans_select_baidu.className = 'popup-select';
    }
    else if ('Baidu' == selected){
        trans_select_google.className = 'popup-select';
        trans_select_baidu.className = 'popup-select popup-select-on';
    }
    //changeColor.style.backgroundColor = data.color;
    //changeColor.setAttribute('value', data.color);
    /*
    changeColor.onclick = function(element) {
        let color = element.target.value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: 'document.body.style.backgroundColor = "' + color + '";'});
        });
    };
    */
    /*
     * Remove extra newline in copied pdf text.
     */
    trans_select_baidu.onclick = function(element) {
        trans_select_google.className = 'popup-select';
        trans_select_baidu.className = 'popup-select popup-select-on';
        chrome.storage.sync.set({Trans_Engine: 'Baidu'}, function(){});
        window.open("http://fanyi.baidu.com");
    };
    trans_select_google.onclick = function(element) {
        trans_select_google.className = 'popup-select popup-select-on';
        trans_select_baidu.className = 'popup-select';
        chrome.storage.sync.set({Trans_Engine: 'Google'}, function(){});
        window.open("https://translate.google.cn");
    };
});