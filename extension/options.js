var address = document.getElementById('printerAddress');
var zpl = document.getElementById('zpl');
var print = document.getElementById('print');

var lastZpl = getCookie('zebra_printing_last_zpl');

if (lastZpl) {
    zpl.value = lastZpl;
}

zpl.onblur = function () {
    setCookie('zebra_printing_last_zpl', zpl.value, 365);
}

var lastAddress = getCookie('zebra_printing_last_printer_address');

if (lastAddress) {
    address.value = lastAddress;
    checkAddress(address.value);
}

function checkAddress(address) {
    console.log(address);
    setCookie('zebra_printing_last_printer_address', address, 365);

    fetch('http://' + address, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                console.log('network error');
                throw new Error('Network response was not ok');
            }
            return response.status
        })
        .then(data => {
            console.log('all good');
            //sendResponse({ status: 200 });
        })
        .catch(error => {
            console.log('error sending request');
            console.error('Error in sending request:', error);
            //sendResponse({ status: 500 });
        });
}

address.onblur = function () {
    checkAddress(address.value);
}

print.onclick = function () {
    console.log('Print button clicked.');
    chrome.runtime.sendMessage({
        type: 'zebra_print_label',
        zpl: document.getElementById('zpl').value,
        url: 'http://' + address.value + '/pstprnt'
    });
    return false;
}

var printConfig = document.getElementById('print_config');

printConfig.addEventListener("click", (event) => {
    console.log('Print config button clicked.');
    chrome.runtime.sendMessage({
        type: 'zebra_print_label',
        zpl: '~WC',
        url: 'http://' + address.value + '/pstprnt'
    });
});

var detectLabel = document.getElementById('detect_label');

detectLabel.addEventListener("click", (event) => {
    console.log('Detect label button clicked.');
    const sending = chrome.runtime.sendMessage({
        type: 'zebra_print_label',
        zpl: '~JL',
        url: 'http://' + address.value + '/pstprnt'
    });
    sending.then(function (message) {
        console.log("detect done");
        console.log(message);
    });
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}