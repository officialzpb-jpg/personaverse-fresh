// Popup script

document.addEventListener('DOMContentLoaded', async () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const personalitySelect = document.getElementById('personality');
  const sizeSlider = document.getElementById('size');
  const sizeValue = document.getElementById('sizeValue');
  const opacitySlider = document.getElementById('opacity');
  const opacityValue = document.getElementById('opacityValue');
  const chatBtn = document.getElementById('chatBtn');
  const danceBtn = document.getElementById('danceBtn');
  
  // Load current settings
  const settings = await chrome.storage.local.get(['enabled', 'personality', 'size', 'opacity']);
  
  // Update UI
  toggleBtn.textContent = settings.enabled !== false ? 'Hide Avatar' : 'Show Avatar';
  toggleBtn.classList.toggle('disabled', settings.enabled === false);
  
  personalitySelect.value = settings.personality || 'wacky';
  sizeSlider.value = settings.size || 120;
  sizeValue.textContent = settings.size || 120;
  opacitySlider.value = (settings.opacity || 0.9) * 100;
  opacityValue.textContent = Math.round((settings.opacity || 0.9) * 100);
  
  // Toggle button
  toggleBtn.addEventListener('click', async () => {
    const response = await chrome.runtime.sendMessage({ action: 'toggleAvatar' });
    const isEnabled = response.enabled;
    
    toggleBtn.textContent = isEnabled ? 'Hide Avatar' : 'Show Avatar';
    toggleBtn.classList.toggle('disabled', !isEnabled);
  });
  
  // Personality change
  personalitySelect.addEventListener('change', async () => {
    await chrome.runtime.sendMessage({
      action: 'saveSettings',
      data: { personality: personalitySelect.value }
    });
  });
  
  // Size slider
  sizeSlider.addEventListener('input', () => {
    sizeValue.textContent = sizeSlider.value;
  });
  
  sizeSlider.addEventListener('change', async () => {
    await chrome.runtime.sendMessage({
      action: 'saveSettings',
      data: { size: parseInt(sizeSlider.value) }
    });
  });
  
  // Opacity slider
  opacitySlider.addEventListener('input', () => {
    opacityValue.textContent = opacitySlider.value;
  });
  
  opacitySlider.addEventListener('change', async () => {
    await chrome.runtime.sendMessage({
      action: 'saveSettings',
      data: { opacity: parseInt(opacitySlider.value) / 100 }
    });
  });
  
  // Quick chat
  chatBtn.addEventListener('click', async () => {
    const message = prompt('Say something to your avatar:');
    if (message) {
      await chrome.runtime.sendMessage({
        action: 'sendChat',
        message: message
      });
    }
  });
  
  // Dance
  danceBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'chatMessage', message: '/dance' });
  });
});
