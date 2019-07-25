console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);

    var request = new XMLHttpRequest();

    request.onload = function () {
        sendResponse({ status: request.status });
    }

    request.open('POST', message.url, true);
    request.send(message.zpl);

    return true;
});