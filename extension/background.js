console.log('background.js loaded');

// This is the normal ip for HID 5427 CK
const NFC_READER_URL = 'http://192.168.63.99';

chrome.runtime.onMessage.addListener(
    async function(message, sender, sendResponse) {
        if (message.url && message.zpl) {
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

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'zpl', status: 'printed', data: 'none'},
                    function(response) {});
            });

            return {status: '200', text: 'excellent'};
        }

        if (message.nfc) {
            let iter = 0;

            while (iter < 10) {
                iter++;
                const response = await fetch(
                    `${NFC_READER_URL}/comet?_=${Math.random()}`);

                if (response.status !== 200) {
                    continue;
                }
                const payload = await response.text();

                if (payload.length === 82) {
                    console.info(
                        'NFC Payload discarded; interim config or ATR');
                    continue;
                }

                if (payload.length > 106 || payload.length < 66) {
                    console.info(
                        'NFC Payload discarded; too long or too short, will never know..');
                    continue;
                }
                const url = `https://ebay.mtag.io/nh02?tagID=${payload.slice(52,
                    66)}`;
                console.info(`NFC Payload processed, received: ${url}`);
                window.postMessage({type: 'nfc', data: url}, '*');

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: 'nfc', status: 'read', data: {url, key: payload.slice(52, 66)}},
                        function(response) {});
                });

                return url;
            }

            return `Unable to read from reader.`;
        }

        return false;
    });

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('options.html'),
    });
});
