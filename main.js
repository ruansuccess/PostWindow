const { app, Menu, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const AppWindow = require('./AppWindow.js');
const menuItems = require('./menu.config.js');
const path = require('path');

app.on('ready', () => {
  const mainWindowConfig = {
    width: 1440,
    height: 768,
  };
  const urlLocation = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './index.html')}`;
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // require('@electron/remote/main').initialize();
  // require('@electron/remote/main').enable(mainWindow.webContents);

  // const divWindowConfig = {
  //   width: 1440,
  //   height: 768,
  // };
  // const divUrlLocation = "xxxxx"
  // const divWindow = new AppWindow(divWindowConfig, divUrlLocation);
  // require('@electron/remote/main').enable(divWindow.webContents);
  // const menu = Menu.buildFromTemplate(menuItems);
  // Menu.setApplicationMenu(menu);
  ipcMain.on('open-login-window', () => {
    const loginWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow,
    };
    const loginFileLocation = isDev
      ? 'http://localhost:3000/#/login'
      : `file://${path.join(__dirname, './index.html#login')}`;
    loginWindow = new AppWindow(loginWindowConfig, loginFileLocation);
    ipcMain.on('close-login-window', () => {
      loginWindow.close();
    });
    loginWindow.on('closed', () => {
      loginWindow = null;
    });
    require('@electron/remote/main').enable(loginWindow.webContents);
  });
  mainWindow.on('close', () => {
    app.quit();
  });
});
