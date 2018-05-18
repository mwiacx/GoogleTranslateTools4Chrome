// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
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
    changeColor.onclick = function(element) {
        let color = element.target.value;
        var script = '' +
            'function removeNewLine(){' +
            'var textarea = document.getElementById("source");' +
            'console.log(textarea.value);' +
            //'document.body.style.backgroundColor = "' + color + '";' +
            'var string = textarea.value;' +
            'var re = new RegExp(\'\\n\',"gm");' +
            'var result = string.replace(re, "");' +
            'console.log(result);' +
            'textarea.value = result;' +
            '}' +
            'removeNewLine();';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {code: script}
            );
        });
    };
});

