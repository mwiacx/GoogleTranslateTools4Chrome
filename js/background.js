// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({Trans_Engine: 'Google'}, function() {
        console.log("The Translate Engine is Google.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                        //pageUrl: {hostEquals: 'fanyi.baidu.com'},              
                        })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

});
