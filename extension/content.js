const browser = window.browser || window.chrome;

// Notify current website about the existence of this extension
window.postMessage({
    ZebraPrintingExtensionId: browser.runtime.id,
    ZebraPrintingVersion: browser.runtime.getManifest().version
}, '*');

// Listen to messages from the current website
window.addEventListener('message', function (event) {
    if (typeof event.data.type === 'undefined') {
        return;
    }

    if (event.data.type != 'zebra_print_label') {
        return;
    }

    browser.runtime.sendMessage(event.data);

    if (event.source) {
        event.source.postMessage({
            msg: 'Zebra extension received message',
            id: (event.data.id ? event.data.id : '')
        }, '*');
    }
});
