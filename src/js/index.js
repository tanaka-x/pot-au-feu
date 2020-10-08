'use strict';

const electron = require('electron');
const tunnel = require('tunnel-ssh');
let server;

document.addEventListener('DOMContentLoaded', () => {
  // 接続
  let connect = document.getElementById('connect');
  connect.addEventListener('click', function () {
    $('#connect').prop('disabled', true);
    $('#disconnect').prop('disabled', true);
    let local_host = document.getElementById('local_host').value;
    let local_port = document.getElementById('local_port').value;
    let step_host = document.getElementById('step_host').value;
    let step_port = document.getElementById('step_port').value;
    let step_username = document.getElementById('step_username').value;
    let step_password = document.getElementById('step_password').value;
    let dst_host = document.getElementById('dst_host').value;
    let dst_port = document.getElementById('dst_port').value;

    // tunnel.js
    let config = {
      host: step_host,
      port: step_port,
      username: step_username,
      password: step_password,
      keepaliveInterval: 60000,
      keepAlive: true,
      dstHost: dst_host,
      dstPort: dst_port,
      localHost: local_host,
      localPort: local_port,
    };

    server = tunnel(config, async (err, server) => {
      if (err) {
        $('#error_msg').remove();
        $('#error_msg').append(err);
        $('#modal1').modal('show');
        $('#connect').prop('disabled', false);
        $('#disconnect').prop('disabled', true);
      } else {
        $('.state-disconnect').remove();
        $('#connect').append(
          '<div class="state-connect"><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> connecting...</div>'
        );
        $('#connect').prop('disabled', true);
        $('#disconnect').prop('disabled', false);
      }
    });
  });
  // 切断
  let disconnect = document.getElementById('disconnect');
  disconnect.addEventListener('click', function () {
    server.close();
    $('.state-connect').remove();
    $('#connect').append('<div class="state-disconnect">Connect</div>');
    $('#connect').prop('disabled', false);
    $('#disconnect').prop('disabled', true);
  });
});
