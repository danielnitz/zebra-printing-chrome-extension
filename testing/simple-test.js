/*
 * Working example. Copy & paste it into your Chrome Console and a test label
 * will be printed.
 */
var request = new XMLHttpRequest();
request.open('POST', 'http://52j173100627.intern/pstprnt', true);
request.send('^XA^PW400^LL200^FO20,20^A0N,30,30^FDThis is a TEST^FS^XZ');