const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Event listeners
  onChangePersonality: (callback) => {
    ipcRenderer.on('change-personality', (event, personality) => callback(personality));
  },
  onChangeTheme: (callback) => {
    ipcRenderer.on('change-theme', (event, theme) => callback(theme));
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Expose platform info
contextBridge.exposeInMainWorld('platform', {
  isElectron: true,
  platform: process.platform,
});
