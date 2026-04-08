import http from 'http';

http.get('http://localhost:5173/', (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Response received (first 500 chars):');
        console.log(data.substring(0, 500));
    });
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
