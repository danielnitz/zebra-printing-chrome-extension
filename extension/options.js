var print = document.getElementById('print');

print.onclick = function() {
    console.log('Print button clicked.');
    chrome.extension.sendMessage({
        type: 'zebra_print_label',
        zpl: document.getElementById('zpl').value,
        url: 'http://' + document.getElementById('printerAddress').value +
            '/pstprnt',
    });
    return false;
};

var read = document.getElementById('read');

read.onclick = function() {
    console.log('Read button clicked.');
    chrome.extension.sendMessage({
        type: 'read_nfc_tag',
        nfc: true,
        eem: 'http://192.168.63.99',
    });
    return false;
};

window.addEventListener('message', (event) => {
    console.log('window message event', event);
}, false);