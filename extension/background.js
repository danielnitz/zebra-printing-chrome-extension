
function handleMessage(message, sender, sendResponse) {
    if (message.type == 'zebra_print_label') {
        printLabel(message, sendResponse);
    }

    if (message.type == 'zebra_print_check_printer') {
        checkPrinter(message, sendResponse);
    }
}

function checkPrinter(message, sendResponse) {
    return "printer checked";
}

function printLabel(message, sendResponse) {
    fetch(message.url, {
        method: 'POST',
        body: message.zpl
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.status;
        })
        .then(data => {
            sendResponse({ status: 200 });
        })
        .catch(error => {
            console.error('Error in sending request:', error);
            sendResponse({ status: 500 });
        });
}

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.runtime.getURL('options.html')
    });
});

chrome.runtime.onMessage.addListener(handleMessage);
