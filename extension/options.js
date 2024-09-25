var printer = document.getElementById('printerAddress'),
    zpl = document.getElementById('zpl'),
    printButton = document.getElementById('print'),
    printConfigButton = document.getElementById('print_config'),
    detectLabelButton = document.getElementById('detect_label');

cookiePersistence(printer);
cookiePersistence(zpl);

printButton.addEventListener('click', (event) => {
    sendMessageToPrinter(
        'zebra_print_label',
        zpl.value,
        printer.value
    );
});

printConfigButton.addEventListener('click', (event) => {
    sendMessageToPrinter(
        'zebra_print_label',
        '~WC',
        printer.value
    );
});

detectLabelButton.addEventListener('click', (event) => {
    sendMessageToPrinter(
        'zebra_print_label',
        '~JL',
        printer.value
    );
});

function sendMessageToPrinter(type, zpl, address) {
    chrome.runtime.sendMessage({
        type: type,
        zpl: zpl,
        url: 'http://' + address + '/pstprnt'
    });
}

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

function cookiePersistence(el) {
    var last = getCookie(el.id);
    if (last) {
        el.value = last;
    }
    el.onblur = function () {
        setCookie(el.id, el.value, 365);
    }
}