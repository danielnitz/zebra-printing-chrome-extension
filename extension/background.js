
function handleMessage(message, sender, sendResponse) {
    if (message.type == 'zebra_print_label') {
        printLabel(message, sendResponse);
    }
}

async function printLabel(message) {
    const response = await fetch(message.url, {
        method: 'POST',
        body: message.zpl
    });
    await response.text();
}

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.runtime.getURL('options.html')
    });
});

chrome.runtime.onMessage.addListener(handleMessage);
