using UnityEngine;

namespace Personaverse
{
    /// <summary>
    /// Main game manager - initializes all systems
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        [Header("Systems")]
        [SerializeField] private Avatar.AvatarLoader avatarLoader;
        [SerializeField] private Room.RoomCustomizer roomCustomizer;
        [SerializeField] private WebGL.WebGLBridge webGLBridge;
        [SerializeField] private UI.ChatUI chatUI;
        
        [Header("Settings")]
        [SerializeField] private string defaultAvatarPath = "Avatars/meshy-avatar-v2.glb";
        [SerializeField] private string defaultTheme = "Modern";
        
        private static GameManager instance;
        public static GameManager Instance { get { return instance; } }
        
        private void Awake()
        {
            if (instance != null && instance != this)
            {
                Destroy(gameObject);
                return;
            }
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        
        private void Start()
        {
            InitializeGame();
        }
        
        private void InitializeGame()
        {
            Debug.Log("[GameManager] Initializing Avatar Hub...");
            
            // Load avatar
            if (avatarLoader != null)
            {
                #if UNITY_WEBGL && !UNITY_EDITOR
                // In WebGL, load from StreamingAssets
                avatarLoader.LoadAvatar(defaultAvatarPath);
                #else
                // In editor, use default capsule for testing
                avatarLoader.LoadDefaultAvatar();
                #endif
            }
            else
            {
                Debug.LogError("[GameManager] AvatarLoader not assigned!");
            }
            
            // Setup room
            if (roomCustomizer != null)
            {
                roomCustomizer.ApplyTheme(defaultTheme);
            }
            
            // Notify JavaScript that Unity is ready
            if (webGLBridge != null)
            {
                webGLBridge.NotifyUnityReady();
            }
            else
            {
                // Direct call for WebGL
                Application.ExternalCall("onUnityReady");
            }
            
            Debug.Log("[GameManager] Initialization complete!");
        }
        
        /// <summary>
        /// Load a different avatar
        /// </summary>
        public void LoadAvatar(string path)
        {
            if (avatarLoader != null)
            {
                avatarLoader.LoadAvatar(path);
            }
        }
        
        /// <summary>
        /// Change room theme
        /// </summary>
        public void ChangeTheme(string themeName)
        {
            if (roomCustomizer != null)
            {
                roomCustomizer.ApplyTheme(themeName);
            }
        }
        
        /// <summary>
        /// Add chat message to UI
        /// </summary>
        public void AddChatMessage(string text, bool isUser)
        {
            if (chatUI != null)
            {
                chatUI.AddMessage(text, isUser);
            }
        }
        
        /// <summary>
        /// Toggle chat panel
        /// </summary>
        public void ToggleChat()
        {
            if (chatUI != null)
            {
                chatUI.ToggleChat();
            }
        }
    }
}
