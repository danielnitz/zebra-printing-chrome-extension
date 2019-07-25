console.log('content.js loaded');

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window) {
        return;
    }

    if (typeof event.data.type === 'undefined') {
        return;
    }

    if (event.data.type != 'zebra_print_label') {
        return;
    }

    console.log('Forwarding message to background.js');

    chrome.runtime.sendMessage(event.data, function (response) {
        console.log(response);
    });
}, false);