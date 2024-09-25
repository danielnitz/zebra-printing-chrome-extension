// Notify current website about the existence of this chrome extension
window.postMessage({
    ZebraPrintingExtensionId: chrome.runtime.id,
    ZebraPrintingVersion: chrome.runtime.getManifest().version
}, '*');

// Listen to messages from the current website
window.addEventListener('message', function (event) {
    if (typeof event.data.type === 'undefined') {
        return;
    }

    if (event.data.type != 'zebra_print_label') {
        return;
    }

    chrome.runtime.sendMessage(event.data);
});
