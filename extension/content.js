console.log('content.js loaded');

window.postMessage({
    ZebraPrintingExtensionId: chrome.runtime.id,
    ZebraPrintingVersion: chrome.runtime.getManifest().version
}, "*");

window.addEventListener("message", function (event) {
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