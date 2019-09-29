const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const DataStore = require('./MusicDataStore')
const myStore = new DataStore({ name: 'MusicData' })
// console.log(app.getPath('userData'))
class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }
    // const finalConfig = Object.assign(basicConfig, config)
    const finalConfig = { ...basicConfig, ...config}
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  ipcMain.on('add-music-window', (event, content) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })
  ipcMain.on('open-music-file', (event, content) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }, (files) => {
      if (files) {
        event.sender.send('selected-file', files)
      }
    })
  })
  ipcMain.on('add-tracks', (event, tracks) => {
    const updatedTracks = myStore.addTracks(tracks).getTracks()
    console.log(updatedTracks)
  })
})