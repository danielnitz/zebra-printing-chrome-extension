console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    const controller = new AbortController();
    const {signal} = controller;

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: message.zpl,
        signal,
    };

    fetch(message.url, requestOptions);

    setTimeout(() => {
        controller.abort();
    }, 750);

    return true;
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('options.html')
    });
});
