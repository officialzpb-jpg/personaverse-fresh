const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

let mainWindow;
let tray;
let isQuitting = false;

// Default settings
const defaultSettings = {
  windowSize: { width: 400, height: 600 },
  windowPosition: null,
  alwaysOnTop: true,
  opacity: 0.95,
  avatarPersonality: 'wacky',
  roomTheme: 'Modern',
  notifications: true,
  autoStart: false,
};

function createWindow() {
  const settings = { ...defaultSettings, ...store.get('settings') };
  
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  
  // Default position: bottom-right corner
  const defaultX = screenWidth - settings.windowSize.width - 20;
  const defaultY = screenHeight - settings.windowSize.height - 20;
  
  const windowPosition = settings.windowPosition || { x: defaultX, y: defaultY };

  mainWindow = new BrowserWindow({
    width: settings.windowSize.width,
    height: settings.windowSize.height,
    x: windowPosition.x,
    y: windowPosition.y,
    
    // Frameless for floating avatar look
    frame: false,
    transparent: true,
    opacity: settings.opacity,
    
    // Always on top
    alwaysOnTop: settings.alwaysOnTop,
    skipTaskbar: true,
    
    // Visual settings
    resizable: true,
    minimizable: false,
    maximizable: false,
    
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    
    // Icon
    icon: path.join(__dirname, 'assets', 'icon.png'),
    
    // Show when ready
    show: false,
  });

  // Load the app
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000/avatar-hub');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    // Load production build
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    
    // Save window position
    const bounds = mainWindow.getBounds();
    store.set('settings.windowPosition', { x: bounds.x, y: bounds.y });
    store.set('settings.windowSize', { width: bounds.width, height: bounds.height });
  });

  // Handle window moved
  mainWindow.on('moved', () => {
    const bounds = mainWindow.getBounds();
    store.set('settings.windowPosition', { x: bounds.x, y: bounds.y });
  });

  // Handle window resized
  mainWindow.on('resized', () => {
    const bounds = mainWindow.getBounds();
    store.set('settings.windowSize', { width: bounds.width, height: bounds.height });
  });
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'tray-icon.png');
  tray = new Tray(iconPath);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Avatar Hub',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    {
      label: 'Toggle Always on Top',
      type: 'checkbox',
      checked: store.get('settings.alwaysOnTop', true),
      click: (menuItem) => {
        const alwaysOnTop = menuItem.checked;
        mainWindow.setAlwaysOnTop(alwaysOnTop);
        store.set('settings.alwaysOnTop', alwaysOnTop);
      }
    },
    { type: 'separator' },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Personality: Wacky',
          type: 'radio',
          checked: store.get('settings.avatarPersonality') === 'wacky',
          click: () => {
            store.set('settings.avatarPersonality', 'wacky');
            mainWindow.webContents.send('change-personality', 'wacky');
          }
        },
        {
          label: 'Personality: Chill',
          type: 'radio',
          checked: store.get('settings.avatarPersonality') === 'chill',
          click: () => {
            store.set('settings.avatarPersonality', 'chill');
            mainWindow.webContents.send('change-personality', 'chill');
          }
        },
        {
          label: 'Personality: Smart',
          type: 'radio',
          checked: store.get('settings.avatarPersonality') === 'smart',
          click: () => {
            store.set('settings.avatarPersonality', 'smart');
            mainWindow.webContents.send('change-personality', 'smart');
          }
        },
        {
          label: 'Personality: Sassy',
          type: 'radio',
          checked: store.get('settings.avatarPersonality') === 'sassy',
          click: () => {
            store.set('settings.avatarPersonality', 'sassy');
            mainWindow.webContents.send('change-personality', 'sassy');
          }
        },
        { type: 'separator' },
        {
          label: 'Room Theme',
          submenu: [
            {
              label: 'Modern',
              type: 'radio',
              checked: store.get('settings.roomTheme') === 'Modern',
              click: () => {
                store.set('settings.roomTheme', 'Modern');
                mainWindow.webContents.send('change-theme', 'Modern');
              }
            },
            {
              label: 'Cozy',
              type: 'radio',
              checked: store.get('settings.roomTheme') === 'Cozy',
              click: () => {
                store.set('settings.roomTheme', 'Cozy');
                mainWindow.webContents.send('change-theme', 'Cozy');
              }
            },
            {
              label: 'Cyberpunk',
              type: 'radio',
              checked: store.get('settings.roomTheme') === 'Cyberpunk',
              click: () => {
                store.set('settings.roomTheme', 'Cyberpunk');
                mainWindow.webContents.send('change-theme', 'Cyberpunk');
              }
            },
            {
              label: 'Nature',
              type: 'radio',
              checked: store.get('settings.roomTheme') === 'Nature',
              click: () => {
                store.set('settings.roomTheme', 'Nature');
                mainWindow.webContents.send('change-theme', 'Nature');
              }
            },
            {
              label: 'Minimal',
              type: 'radio',
              checked: store.get('settings.roomTheme') === 'Minimal',
              click: () => {
                store.set('settings.roomTheme', 'Minimal');
                mainWindow.webContents.send('change-theme', 'Minimal');
              }
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Opacity',
          submenu: [
            {
              label: '100%',
              type: 'radio',
              checked: store.get('settings.opacity') === 1,
              click: () => {
                store.set('settings.opacity', 1);
                mainWindow.setOpacity(1);
              }
            },
            {
              label: '90%',
              type: 'radio',
              checked: store.get('settings.opacity') === 0.9,
              click: () => {
                store.set('settings.opacity', 0.9);
                mainWindow.setOpacity(0.9);
              }
            },
            {
              label: '80%',
              type: 'radio',
              checked: store.get('settings.opacity') === 0.8,
              click: () => {
                store.set('settings.opacity', 0.8);
                mainWindow.setOpacity(0.8);
              }
            },
            {
              label: '70%',
              type: 'radio',
              checked: store.get('settings.opacity') === 0.7,
              click: () => {
                store.set('settings.opacity', 0.7);
                mainWindow.setOpacity(0.7);
              }
            }
          ]
        },
        {
          label: 'Auto-start on Login',
          type: 'checkbox',
          checked: store.get('settings.autoStart', false),
          click: (menuItem) => {
            store.set('settings.autoStart', menuItem.checked);
            app.setLoginItemSettings({
              openAtLogin: menuItem.checked,
              path: app.getPath('exe')
            });
          }
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('Personaverse Avatar Hub');
  tray.setContextMenu(contextMenu);
  
  // Click tray icon to toggle window
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// IPC handlers
ipcMain.handle('get-settings', () => {
  return { ...defaultSettings, ...store.get('settings') };
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('settings', { ...store.get('settings'), ...settings });
  return true;
});

ipcMain.handle('minimize-window', () => {
  mainWindow.hide();
});

ipcMain.handle('close-window', () => {
  mainWindow.hide();
});

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createTray();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}
