const { app, Menu, ipcMain, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const AppWindow = require('./AppWindow.js');
const menuItems = require('./menu.config.js');
const path = require('path');
const fs = require("fs");


// const http = require('http');
// const server = http.createServer((req,res)=>{
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 		//允许的header类型
// 	res.setHeader("Access-Contro1-Allow-Headers", "content-type");
// 		//跨域允许的请求方式
// 	res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	
// 	const data =  fs.readFileSync("./easyDoc.html");
// 	res.end(data.toString())
 	
// })
// server.listen(777,'127.0.0.1',()=>{
//  	console.log('服务器启动成功');
// });

app.on('ready', () => {
  const mainWindowConfig = {
    width: 1200,
    height: 1000,
	frame :true,
  };
  const urlLocation = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './index.html')}`;
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  globalShortcut.register('CommandOrControl+R', () => {
      console.log('CommandOrControl+R is pressed')
	  mainWindow.webContents.send('refresh-load');
   })
  // require('@electron/remote/main').initialize();
  // require('@electron/remote/main').enable(mainWindow.webContents);

  // const divWindowConfig = {
  //   width: 1440,
  //   height: 768,
  // };
  // const divUrlLocation = "xxxxx"
  // const divWindow = new AppWindow(divWindowConfig, divUrlLocation);
  // require('@electron/remote/main').enable(divWindow.webContents);
   
   //const menu = Menu.buildFromTemplate(menuItems);
   //Menu.setApplicationMenu(menu);
   Menu.setApplicationMenu(null)
  ipcMain.handle('file-write', async (event, content, filePath, fileName) => {
	  
	  fs.exists("./database/"+filePath, function(exists) {
			if(!exists){
				fs.mkdir("./database/"+filePath, function(err){
				   if (err) {
				       return console.error(err);
				   }
				   fs.writeFile("./database/"+filePath+fileName, content,  function(err) {
				      if (err) {
				          return console.error(err);
				      }
				   });
				});
			} else {
				fs.writeFile("./database/"+filePath+fileName, content,  function(err) {
				   if (err) {
				       return console.error(err);
				   }
				});
			}
	  });
	  
  });
  ipcMain.handle('file-read', async (event, filePath, fileName) => {
  	  const data =  fs.readFileSync("./database/"+filePath+fileName);
	  return  data.toString();
  });
  mainWindow.on('close', () => {
    app.quit();
  });
});

