console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);

    fetch(message.url, {
        "body": message.zpl,
        "method": "POST",
        "credentials": "omit"
    }).then(response => {
        sendResponse({ status: response.status })
    });

    return true;
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('options.html')
    });
});