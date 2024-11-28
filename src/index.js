import { Terminal } from "@xterm/xterm";
import { CanvasAddon } from '@xterm/addon-canvas';
import "@xterm/xterm/css/xterm.css";
import Sockjs from 'sockjs-client';

var terminal = new Terminal();
terminal.open(document.getElementById("terminal"));
terminal.loadAddon(new CanvasAddon());


var socket = new Sockjs("http://192.168.145.25:10463/terminal/ws?context=&nameSpace=e3plus-dev&podName=e3plus-reconciliation-64cf75d845-zw884&container=&rows=37&cols=190");

socket.onmessage = function (e) {
    terminal.write(e.data);
};
socket.onclose = function (e) {
    terminal.write("session is close");
};

terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");

terminal.onData((e) => {
    socket.send(e);
})

