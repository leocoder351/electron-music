const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')
let musicFilePaths = []

$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})
$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-tracks', musicFilePaths)
})

const renderListHTML = (paths) => {
  const musicList = $('music-list')
  const musicItemHTML = paths.reduce((html, music) => {
    return html += `<li class="list-group-item">${path.basename(music)}</li>`
  }, '')
  musicList.innerHTML = `<ul class="list-group">${musicItemHTML}</ul>`
}
ipcRenderer.on('selected-file', (event, paths) => {
  if (Array.isArray(paths)) {
    renderListHTML(paths)
    musicFilePaths = paths
  }
})