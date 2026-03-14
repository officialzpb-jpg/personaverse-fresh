// Content script - injects avatar into web pages

(function() {
  'use strict';
  
  // Prevent multiple injections
  if (window.personaverseAvatarInjected) return;
  window.personaverseAvatarInjected = true;
  
  let avatarContainer = null;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let settings = {};
  
  // Initialize
  chrome.storage.local.get(null, (data) => {
    settings = data;
    if (settings.enabled !== false) {
      injectAvatar();
    }
  });
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'toggleAvatar':
        if (request.enabled) {
          injectAvatar();
        } else {
          removeAvatar();
        }
        break;
        
      case 'settingsUpdated':
        settings = { ...settings, ...request.data };
        updateAvatarSettings();
        break;
        
      case 'injectAvatar':
        if (!avatarContainer && settings.enabled !== false) {
          injectAvatar();
        }
        break;
        
      case 'chatMessage':
        handleChatMessage(request.message);
        break;
    }
  });
  
  function injectAvatar() {
    if (avatarContainer) return;
    
    // Create container
    avatarContainer = document.createElement('div');
    avatarContainer.id = 'personaverse-avatar';
    avatarContainer.className = 'pv-avatar-container';
    
    // Set initial position
    const x = settings.position?.x || (window.innerWidth - 150);
    const y = settings.position?.y || (window.innerHeight - 150);
    const size = settings.size || 120;
    
    avatarContainer.style.cssText = `
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: ${size}px;
      height: ${size}px;
      z-index: 2147483647;
      cursor: grab;
      user-select: none;
      pointer-events: auto;
    `;
    
    // Create avatar element (using CSS animation for now, can be replaced with canvas/WebGL)
    avatarContainer.innerHTML = `
      <div class="pv-avatar-wrapper">
        <div class="pv-avatar-body">
          <div class="pv-avatar-head">
            <div class="pv-avatar-face">
              <div class="pv-avatar-eyes">
                <span class="pv-eye"></span>
                <span class="pv-eye"></span>
              </div>
              <div class="pv-avatar-mouth"></div>
            </div>
          </div>
          <div class="pv-avatar-torso"></div>
          <div class="pv-avatar-arms">
            <div class="pv-arm pv-arm-left"></div>
            <div class="pv-arm pv-arm-right"></div>
          </div>
        </div>
        <div class="pv-avatar-shadow"></div>
        <div class="pv-speech-bubble" style="display: none;">
          <span class="pv-speech-text"></span>
          <button class="pv-speech-close">×</button>
        </div>
        
        <div class="pv-chat-input" style="display: none;">
          <input type="text" placeholder="Say something..." />
          <button class="pv-send-btn">➤</button>
        </div>
        
        <div class="pv-avatar-menu" style="display: none;">
          <button class="pv-menu-btn pv-chat-btn" title="Chat">💬</button>
          <button class="pv-menu-btn pv-dance-btn" title="Dance">💃</button>
          <button class="pv-menu-btn pv-sleep-btn" title="Sleep">😴</button>
          <button class="pv-menu-btn pv-settings-btn" title="Settings">⚙️</button>
        </div>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(avatarContainer);
    
    // Setup interactions
    setupInteractions();
    
    // Start idle animation
    startIdleAnimation();
    
    // Show welcome message
    setTimeout(() => {
      showSpeechBubble("Hey! I'm your web companion! 👋");
    }, 1000);
  }
  
  function removeAvatar() {
    if (avatarContainer) {
      avatarContainer.remove();
      avatarContainer = null;
    }
  }
  
  function setupInteractions() {
    if (!avatarContainer) return;
    
    const wrapper = avatarContainer.querySelector('.pv-avatar-wrapper');
    const menu = avatarContainer.querySelector('.pv-avatar-menu');
    const chatInput = avatarContainer.querySelector('.pv-chat-input');
    const speechBubble = avatarContainer.querySelector('.pv-speech-bubble');
    
    // Drag functionality
    wrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pv-chat-input') || e.target.closest('.pv-speech-bubble')) return;
      
      isDragging = true;
      dragOffset.x = e.clientX - avatarContainer.offsetLeft;
      dragOffset.y = e.clientY - avatarContainer.offsetTop;
      wrapper.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      avatarContainer.style.left = x + 'px';
      avatarContainer.style.top = y + 'px';
      avatarContainer.style.right = 'auto';
      avatarContainer.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        wrapper.style.cursor = 'grab';
        
        // Save position
        const rect = avatarContainer.getBoundingClientRect();
        chrome.storage.local.set({
          position: { x: rect.left, y: rect.top }
        });
      }
    });
    
    // Click to toggle menu
    wrapper.addEventListener('click', (e) => {
      if (isDragging) return;
      
      const menuVisible = menu.style.display !== 'none';
      menu.style.display = menuVisible ? 'none' : 'flex';
      
      if (!menuVisible) {
        playAnimation('bounce');
      }
    });
    
    // Menu buttons
    menu.querySelector('.pv-chat-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      chatInput.style.display = chatInput.style.display === 'none' ? 'flex' : 'none';
      menu.style.display = 'none';
      if (chatInput.style.display === 'flex') {
        chatInput.querySelector('input').focus();
      }
    });
    
    menu.querySelector('.pv-dance-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      playAnimation('dance');
      menu.style.display = 'none';
    });
    
    menu.querySelector('.pv-sleep-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      playAnimation('sleep');
      menu.style.display = 'none';
    });
    
    menu.querySelector('.pv-settings-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      chrome.runtime.openOptionsPage();
      menu.style.display = 'none';
    });
    
    // Chat input
    const input = chatInput.querySelector('input');
    const sendBtn = chatInput.querySelector('.pv-send-btn');
    
    const sendMessage = () => {
      const message = input.value.trim();
      if (!message) return;
      
      input.value = '';
      chatInput.style.display = 'none';
      
      // Send to API
      handleChatMessage(message);
    };
    
    sendBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sendMessage();
    });
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Close speech bubble
    speechBubble.querySelector('.pv-speech-close').addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.style.display = 'none';
    });
  }
  
  function startIdleAnimation() {
    if (!avatarContainer) return;
    
    const body = avatarContainer.querySelector('.pv-avatar-body');
    
    // Random idle animations
    setInterval(() => {
      if (Math.random() > 0.7) {
        playAnimation('blink');
      }
    }, 3000);
    
    setInterval(() => {
      if (Math.random() > 0.8) {
        const animations = ['bounce', 'wiggle', 'look-around'];
        playAnimation(animations[Math.floor(Math.random() * animations.length)]);
      }
    }, 10000);
  }
  
  function playAnimation(name) {
    if (!avatarContainer) return;
    
    const body = avatarContainer.querySelector('.pv-avatar-body');
    body.classList.remove('pv-anim-bounce', 'pv-anim-dance', 'pv-anim-sleep', 'pv-anim-wiggle', 'pv-anim-blink');
    
    // Trigger reflow
    void body.offsetWidth;
    
    body.classList.add(`pv-anim-${name}`);
    
    // Remove animation class after completion
    setTimeout(() => {
      body.classList.remove(`pv-anim-${name}`);
    }, 1000);
  }
  
  function showSpeechBubble(text) {
    if (!avatarContainer) return;
    
    const bubble = avatarContainer.querySelector('.pv-speech-bubble');
    const textSpan = bubble.querySelector('.pv-speech-text');
    
    textSpan.textContent = text;
    bubble.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      bubble.style.display = 'none';
    }, 5000);
  }
  
  async function handleChatMessage(message) {
    showSpeechBubble("Thinking... 🤔");
    
    try {
      const response = await fetch('https://www.personaverse.space/api/avatar/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          personality: settings.personality || 'wacky'
        })
      });
      
      const data = await response.json();
      showSpeechBubble(data.response);
      playAnimation('bounce');
      
    } catch (error) {
      const fallbacks = [
        "I'm having trouble connecting! 🌐",
        "My internet is fuzzy! Try again? 📡",
        "Oops! Something went wrong! 🌀"
      ];
      showSpeechBubble(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }
  }
  
  function updateAvatarSettings() {
    if (!avatarContainer) return;
    
    const size = settings.size || 120;
    avatarContainer.style.width = size + 'px';
    avatarContainer.style.height = size + 'px';
  }
})();
