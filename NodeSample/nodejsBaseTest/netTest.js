/**
 * Created by yangjie on 2017/5/17.
 */
const net = require('net');
const server = net.createServer((c) => {
    // 'connection' listener
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.write('hello\r\n');
    c.pipe(c);
});
server.on('error', (err) => {
    throw err;
});
console.log( server )
server.listen(8124, 'localhost', () => {
    console.log('server bound');
    //res.write('response back')
});