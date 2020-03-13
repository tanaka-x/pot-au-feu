'use strict'

const electron = require('electron')
const tunnel = require('tunnel-ssh');
let server;

document.addEventListener('DOMContentLoaded', () => {
    let connect = document.getElementById('connect')
    connect.addEventListener('click', function () {

        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        let hostname = document.getElementById('hostname').value
        let hostport = document.getElementById('hostport').value
        let dstname = document.getElementById('dstname').value
        let dstport = document.getElementById('dstport').value
        let localport = document.getElementById('localport').value

        // tunnel.js
        var config = {
            host: hostname,
            port: hostport,
            username: username,
            password: password,
            keepaliveInterval: 60000,
            keepAlive: true,
            dstHost: dstname,
            dstPort: dstport,
            localHost: 'localhost',
            localPort: localport
        };

        server = tunnel(config, async (err, server) => {
            if (err) {
                throw err;
            } else {
                let connect = document.getElementById('text')
                connect.value = "connected";
            }
        });
    })
    let disconnect = document.getElementById('disconnect')
    disconnect.addEventListener('click', function () {
        server.close();
        let connect = document.getElementById('text')
        connect.value = "disconnected";
    })
})