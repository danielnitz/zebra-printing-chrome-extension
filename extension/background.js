console.log('Zebra Printing: background.js loaded');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);

    fetch(message.url, {
        method: 'POST',
        body: message.zpl
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.status
        })
        .then(data => {
            sendResponse({ status: 200 });
        })
        .catch(error => {
            console.error('Error in sending request:', error);
            sendResponse({ status: 500 });
        });

    return true;
});

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.runtime.getURL('options.html')
    });
});
