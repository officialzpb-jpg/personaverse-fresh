using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Personaverse.UI
{
    /// <summary>
    /// In-game chat UI controller
    /// </summary>
    public class ChatUI : MonoBehaviour
    {
        [Header("UI References")]
        [SerializeField] private GameObject chatPanel;
        [SerializeField] private Transform messageContainer;
        [SerializeField] private TMP_InputField inputField;
        [SerializeField] private Button sendButton;
        [SerializeField] private ScrollRect scrollRect;
        
        [Header("Prefabs")]
        [SerializeField] private GameObject userMessagePrefab;
        [SerializeField] private GameObject avatarMessagePrefab;
        
        [Header("Settings")]
        [SerializeField] private int maxMessages = 50;
        
        private AI.AvatarAI avatarAI;
        
        private void Start()
        {
            avatarAI = FindObjectOfType<AI.AvatarAI>();
            
            sendButton.onClick.AddListener(SendMessage);
            inputField.onSubmit.AddListener((text) => SendMessage());
            
            // Hide by default
            chatPanel.SetActive(false);
        }
        
        public void ToggleChat()
        {
            chatPanel.SetActive(!chatPanel.activeSelf);
            
            if (chatPanel.activeSelf)
            {
                inputField.Select();
                inputField.ActivateInputField();
            }
        }
        
        public void ShowChat()
        {
            chatPanel.SetActive(true);
            inputField.Select();
        }
        
        public void HideChat()
        {
            chatPanel.SetActive(false);
        }
        
        private void SendMessage()
        {
            string message = inputField.text.Trim();
            if (string.IsNullOrEmpty(message)) return;
            
            // Add user message
            AddMessage(message, true);
            
            // Clear input
            inputField.text = "";
            
            // Send to avatar AI
            if (avatarAI != null)
            {
                avatarAI.OnUserMessage(message);
            }
        }
        
        public void AddMessage(string text, bool isUser)
        {
            GameObject prefab = isUser ? userMessagePrefab : avatarMessagePrefab;
            GameObject messageObj = Instantiate(prefab, messageContainer);
            
            TextMeshProUGUI textComponent = messageObj.GetComponentInChildren<TextMeshProUGUI>();
            if (textComponent != null)
            {
                textComponent.text = text;
            }
            
            // Limit message count
            if (messageContainer.childCount > maxMessages)
            {
                Destroy(messageContainer.GetChild(0).gameObject);
            }
            
            // Scroll to bottom
            Canvas.ForceUpdateCanvases();
            scrollRect.verticalNormalizedPosition = 0f;
        }
        
        public void ClearChat()
        {
            foreach (Transform child in messageContainer)
            {
                Destroy(child.gameObject);
            }
        }
    }
}
