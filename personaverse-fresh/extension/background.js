// Background script - handles extension lifecycle and messaging

chrome.runtime.onInstalled.addListener(() => {
  console.log('Personaverse Avatar Companion installed!');
  
  // Set default settings
  chrome.storage.local.set({
    enabled: true,
    personality: 'wacky',
    position: { x: window.innerWidth - 150, y: window.innerHeight - 150 },
    size: 120,
    opacity: 0.9,
    showOnAllSites: true,
    blockedSites: [],
    chatHistory: []
  });
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getSettings':
      chrome.storage.local.get(null, (data) => {
        sendResponse(data);
      });
      return true; // Keep channel open for async
      
    case 'saveSettings':
      chrome.storage.local.set(request.data, () => {
        // Notify all tabs about settings change
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
              action: 'settingsUpdated',
              data: request.data
            }).catch(() => {}); // Ignore errors for inactive tabs
          });
        });
        sendResponse({ success: true });
      });
      return true;
      
    case 'toggleAvatar':
      chrome.storage.local.get(['enabled'], (data) => {
        const newState = !data.enabled;
        chrome.storage.local.set({ enabled: newState }, () => {
          // Notify all tabs
          chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
              chrome.tabs.sendMessage(tab.id, {
                action: 'toggleAvatar',
                enabled: newState
              }).catch(() => {});
            });
          });
          sendResponse({ enabled: newState });
        });
      });
      return true;
      
    case 'sendChat':
      // Forward chat to all tabs
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'chatMessage',
            message: request.message
          });
        }
      });
      sendResponse({ success: true });
      return true;
  }
});

// Handle tab updates to inject avatar
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if site is not blocked
    chrome.storage.local.get(['enabled', 'blockedSites'], (data) => {
      if (!data.enabled) return;
      
      const isBlocked = data.blockedSites?.some(site => 
        tab.url.includes(site)
      );
      
      if (!isBlocked) {
        chrome.tabs.sendMessage(tabId, {
          action: 'injectAvatar'
        }).catch(() => {});
      }
    });
  }
});
