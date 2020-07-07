var print = document.getElementById('print');

print.onclick = function () {
    console.log('Print button clicked.');
    chrome.extension.sendMessage({
        type: "zebra_print_label",
        zpl: document.getElementById('zpl').value,
        url: "http://" + document.getElementById('printerAddress').value + "/pstprnt"
    });
    return false;
}