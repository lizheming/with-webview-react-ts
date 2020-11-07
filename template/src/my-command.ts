/// <reference types="sketch-app-types" />

import BrowserWindow, { BrowserWindowOptions } from 'sketch-module-web-view';
import UI from 'sketch/ui';

const webviewIdentifier = '{{ slug }}.webview';

export default function () {
  const options:BrowserWindowOptions = {
    identifier: webviewIdentifier,
    width: 240,
    height: 180,
    show: false
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', _ => browserWindow.show());

  const webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on('did-finish-load', _ => UI.message('UI loaded!'));

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    UI.message(s);
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error);
  });

  browserWindow.loadURL(require('../resources/webview.html'))
}