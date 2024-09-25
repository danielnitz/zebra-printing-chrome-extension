/*
 * Working example. Copy & paste it into your Chrome Console and a test label
 * will be printed.
 */
fetch('http://localhost:8080/pstprnt', {
    method: 'POST',
    body: '^XA^FO20,20^A0N,30,30^FDThis is a TEST^FS^XZ'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.status;
    })
    .then(data => {
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error in sending request:', error);
    });
