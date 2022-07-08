const { BrowserWindow } = require('electron');

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: false, //上下文隔离
        nodeIntegration: true, 
        enableRemoteModule: true, //远程模块
        nodeIntegrationInWorker: true, //Web Workers使用nodejs
      },
      show: false,
      backgroundColor: '#ffffff',
    };
    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    //this.webContents.openDevTools();
    this.loadURL(urlLocation);
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

module.exports = AppWindow;
