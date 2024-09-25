// Notify current website about the existence of this chrome extension
window.postMessage({
    ZebraPrintingExtensionId: chrome.runtime.id,
    ZebraPrintingVersion: chrome.runtime.getManifest().version
}, '*');

// Listen to messages from the current website
window.addEventListener('message', function (event) {
    var prefix = 'zebra_print_';
    if (event.data.type.substring(1, prefix.length) != prefix) {
        return;
    }

    chrome.runtime.sendMessage(event.data);
});
