using UnityEngine;
using System.Runtime.InteropServices;

namespace Personaverse.WebGL
{
    /// <summary>
    /// Bridge between Unity WebGL and JavaScript/React
    /// Handles all communication between the game and the website
    /// </summary>
    public class WebGLBridge : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private AI.AvatarAI avatarAI;
        [SerializeField] private Room.RoomCustomizer roomCustomizer;
        
        // Singleton instance
        public static WebGLBridge Instance { get; private set; }
        
        // JavaScript callbacks
        private System.Action<string> onChatMessageReceived;
        private System.Action<string> onThemeChanged;
        private System.Action<string> onFurnitureAdded;
        
        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        
        private void Start()
        {
            // Register with JavaScript
            RegisterJSBridge();
        }
        
        /// <summary>
        /// Register this bridge with JavaScript
        /// </summary>
        private void RegisterJSBridge()
        {
            Application.ExternalCall("registerUnityBridge", gameObject.name);
        }
        
        #region JavaScript → Unity Calls
        
        /// <summary>
        /// Receive chat message from JavaScript
        /// Called by: window.unityInstance.SendMessage('WebGLBridge', 'ReceiveChatMessage', 'Hello!')
        /// </summary>
        public void ReceiveChatMessage(string message)
        {
            Debug.Log($"[WebGL Bridge] Chat message received: {message}");
            
            if (avatarAI != null)
            {
                avatarAI.OnUserMessage(message);
            }
            
            onChatMessageReceived?.Invoke(message);
        }
        
        /// <summary>
        /// Change room theme from JavaScript
        /// </summary>
        public void ChangeTheme(string themeName)
        {
            Debug.Log($"[WebGL Bridge] Changing theme to: {themeName}");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.JS_ChangeTheme(themeName);
            }
            
            onThemeChanged?.Invoke(themeName);
        }
        
        /// <summary>
        /// Add furniture from JavaScript
        /// </summary>
        public void AddFurniture(string furnitureId)
        {
            Debug.Log($"[WebGL Bridge] Adding furniture: {furnitureId}");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.JS_AddFurniture(furnitureId);
            }
            
            onFurnitureAdded?.Invoke(furnitureId);
        }
        
        /// <summary>
        /// Load room data from JavaScript
        /// </summary>
        public void LoadRoomData(string jsonData)
        {
            Debug.Log($"[WebGL Bridge] Loading room data");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.JS_LoadRoom(jsonData);
            }
        }
        
        /// <summary>
        /// Save room data (triggered from JS)
        /// </summary>
        public void SaveRoomData()
        {
            Debug.Log($"[WebGL Bridge] Saving room data");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.JS_SaveRoom();
            }
        }
        
        /// <summary>
        /// Toggle edit mode from JavaScript
        /// </summary>
        public void ToggleEditMode()
        {
            Debug.Log($"[WebGL Bridge] Toggling edit mode");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.ToggleEditMode();
            }
        }
        
        /// <summary>
        /// Clear room from JavaScript
        /// </summary>
        public void ClearRoom()
        {
            Debug.Log($"[WebGL Bridge] Clearing room");
            
            if (roomCustomizer != null)
            {
                roomCustomizer.ClearRoom();
            }
        }
        
        /// <summary>
        /// Set avatar mood from JavaScript
        /// </summary>
        public void SetAvatarMood(string mood)
        {
            Debug.Log($"[WebGL Bridge] Setting avatar mood: {mood}");
            
            // This would trigger specific animations
            // e.g., "happy", "sad", "excited", "sleepy"
        }
        
        /// <summary>
        /// Teleport avatar to position from JavaScript
        /// </summary>
        public void TeleportAvatar(string positionJson)
        {
            Debug.Log($"[WebGL Bridge] Teleporting avatar");
            
            // Parse JSON and move avatar
            // positionJson format: "{\"x\": 1.5, \"y\": 0, \"z\": 2.0}"
        }
        
        #endregion
        
        #region Unity → JavaScript Calls
        
        /// <summary>
        /// Send chat response to JavaScript
        /// </summary>
        public void SendChatResponse(string response)
        {
            Application.ExternalCall("unityChatResponse", response);
        }
        
        /// <summary>
        /// Show speech bubble in JavaScript UI
        /// </summary>
        public void ShowSpeechBubble(string text)
        {
            Application.ExternalCall("showAvatarSpeech", text);
        }
        
        /// <summary>
        /// Notify JavaScript that avatar was clicked
        /// </summary>
        public void NotifyAvatarClicked()
        {
            Application.ExternalCall("onAvatarClicked");
        }
        
        /// <summary>
        /// Send room data to JavaScript for saving
        /// </summary>
        public void SendRoomData(string jsonData)
        {
            Application.ExternalCall("onRoomDataSaved", jsonData);
        }
        
        /// <summary>
        /// Notify JavaScript that room theme changed
        /// </summary>
        public void NotifyThemeChanged(string themeName)
        {
            Application.ExternalCall("onRoomThemeChanged", themeName);
        }
        
        /// <summary>
        /// Notify JavaScript that furniture was added
        /// </summary>
        public void NotifyFurnitureAdded(string furnitureId)
        {
            Application.ExternalCall("onFurnitureAdded", furnitureId);
        }
        
        /// <summary>
        /// Notify JavaScript that edit mode changed
        /// </summary>
        public void NotifyEditModeChanged(bool isEditMode)
        {
            Application.ExternalCall("onEditModeChanged", isEditMode);
        }
        
        /// <summary>
        /// Send avatar position to JavaScript
        /// </summary>
        public void SendAvatarPosition(Vector3 position)
        {
            string json = $"{{\"x\": {position.x}, \"y\": {position.y}, \"z\": {position.z}}}";
            Application.ExternalCall("onAvatarPositionUpdate", json);
        }
        
        /// <summary>
        /// Notify JavaScript that Unity is ready
        /// </summary>
        public void NotifyUnityReady()
        {
            Application.ExternalCall("onUnityReady");
        }
        
        /// <summary>
        /// Send loading progress to JavaScript
        /// </summary>
        public void SendLoadingProgress(float progress)
        {
            Application.ExternalCall("onLoadingProgress", progress);
        }
        
        #endregion
        
        #region Event Registration
        
        public void RegisterChatCallback(System.Action<string> callback)
        {
            onChatMessageReceived += callback;
        }
        
        public void RegisterThemeCallback(System.Action<string> callback)
        {
            onThemeChanged += callback;
        }
        
        public void RegisterFurnitureCallback(System.Action<string> callback)
        {
            onFurnitureAdded += callback;
        }
        
        #endregion
    }
}
