using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Personaverse.AI
{
    /// <summary>
    /// Main AI controller for the avatar - handles autonomous behavior and chat
    /// </summary>
    public class AvatarAI : MonoBehaviour
    {
        [Header("AI Settings")]
        [SerializeField] private float actionInterval = 5f;
        [SerializeField] private float chatResponseTime = 2f;
        [SerializeField] private string openAIEndpoint = "https://api.openai.com/v1/chat/completions";
        
        [Header("Personality")]
        [TextArea(3, 10)]
        [SerializeField] private string systemPrompt = "You are a wacky, fun AI avatar living in a digital world. " +
            "You're energetic, playful, and love to make people smile. " +
            "Keep responses short (1-2 sentences) and fun!";
        
        [Header("Movement")]
        [SerializeField] private float walkSpeed = 2f;
        [SerializeField] private float rotationSpeed = 5f;
        [SerializeField] private Vector3 roomBounds = new Vector3(10f, 0f, 10f);
        
        // State
        private AvatarState currentState = AvatarState.Idle;
        private Vector3 targetPosition;
        private Animator animator;
        private bool isChatting = false;
        private Queue<string> messageQueue = new Queue<string>();
        
        // Animation hashes
        private int idleHash;
        private int walkHash;
        private int danceHash;
        private int talkHash;
        
        public enum AvatarState
        {
            Idle,
            Walking,
            Dancing,
            Talking,
            Sleeping
        }
        
        private void Awake()
        {
            animator = GetComponent<Animator>();
            
            // Cache animation hashes
            idleHash = Animator.StringToHash("Idle");
            walkHash = Animator.StringToHash("Walk");
            danceHash = Animator.StringToHash("Dance");
            talkHash = Animator.StringToHash("Talk");
        }
        
        private void Start()
        {
            // Start AI behavior loop
            InvokeRepeating(nameof(DecideNextAction), 2f, actionInterval);
        }
        
        private void Update()
        {
            HandleMovement();
        }
        
        /// <summary>
        /// AI decides what to do next
        /// </summary>        private void DecideNextAction()
        {
            if (isChatting) return;
            
            float random = Random.value;
            
            if (random < 0.4f)
            {
                // 40% chance to walk to new spot
                SetRandomDestination();
                SetState(AvatarState.Walking);
            }
            else if (random < 0.6f)
            {
                // 20% chance to dance
                SetState(AvatarState.Dancing);
                Invoke(nameof(StopDancing), 5f);
            }
            else if (random < 0.8f)
            {
                // 20% chance to idle with random emote
                SetState(AvatarState.Idle);
                ShowRandomEmote();
            }
            else
            {
                // 20% chance to sleep/relax
                SetState(AvatarState.Sleeping);
                Invoke(nameof(WakeUp), 8f);
            }
        }
        
        /// <summary>
        /// Handle avatar movement
        /// </summary>
        private void HandleMovement()
        {
            if (currentState != AvatarState.Walking) return;
            
            Vector3 direction = targetPosition - transform.position;
            direction.y = 0;
            
            if (direction.magnitude < 0.1f)
            {
                SetState(AvatarState.Idle);
                return;
            }
            
            // Rotate towards target
            Quaternion targetRotation = Quaternion.LookRotation(direction);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            
            // Move forward
            transform.position += transform.forward * walkSpeed * Time.deltaTime;
        }
        
        /// <summary>
        /// Set a random destination within room bounds
        /// </summary>
        private void SetRandomDestination()
        {
            targetPosition = new Vector3(
                Random.Range(-roomBounds.x, roomBounds.x),
                0,
                Random.Range(-roomBounds.z, roomBounds.z)
            );
        }
        
        /// <summary>
        /// Change avatar state and animation
        /// </summary>
        private void SetState(AvatarState newState)
        {
            currentState = newState;
            
            // Reset all animations
            animator.SetBool(idleHash, false);
            animator.SetBool(walkHash, false);
            animator.SetBool(danceHash, false);
            animator.SetBool(talkHash, false);
            
            // Set new animation
            switch (newState)
            {
                case AvatarState.Idle:
                    animator.SetBool(idleHash, true);
                    break;
                case AvatarState.Walking:
                    animator.SetBool(walkHash, true);
                    break;
                case AvatarState.Dancing:
                    animator.SetBool(danceHash, true);
                    break;
                case AvatarState.Talking:
                    animator.SetBool(talkHash, true);
                    break;
                case AvatarState.Sleeping:
                    // Use idle animation but slower
                    animator.SetBool(idleHash, true);
                    animator.SetFloat("Speed", 0.5f);
                    break;
            }
        }
        
        /// <summary>
        /// Show a random emote/speech bubble
        /// </summary>
        private void ShowRandomEmote()
        {
            string[] emotes = {
                "Hey there! 👋",
                "Having fun! 🎉",
                "*dances* 💃",
                "So spacious! 🏠",
                "I love this room! ❤️",
                "*spins around* 🌀",
                "What's next? 🤔",
                "Wheeee! 🎈"
            };
            
            string emote = emotes[Random.Range(0, emotes.Length)];
            ShowSpeechBubble(emote);
        }
        
        /// <summary>
        /// Display speech bubble (called from JavaScript)
        /// </summary>
        public void ShowSpeechBubble(string text)
        {
            // Send message to JavaScript to show bubble
            Application.ExternalCall("showAvatarSpeech", text);
        }
        
        /// <summary>
        /// Handle user chat message
        /// </summary>
        public async void OnUserMessage(string message)
        {
            if (isChatting) return;
            
            isChatting = true;
            SetState(AvatarState.Talking);
            
            // Get AI response
            string response = await GetAIResponse(message);
            
            // Show response
            ShowSpeechBubble(response);
            
            // Wait then return to idle
            await Task.Delay((int)(chatResponseTime * 1000));
            isChatting = false;
            SetState(AvatarState.Idle);
        }
        
        /// <summary>
        /// Call OpenAI API for chat response
        /// </summary>
        private async Task<string> GetAIResponse(string userMessage)
        {
            // This would call your backend API which then calls OpenAI
            // For now, return a fun placeholder response
            string[] responses = {
                "That's so cool! Tell me more! 🎉",
                "I'm just an avatar but I think you're awesome! 😊",
                "*does a little dance* I love chatting! 💃",
                "Wow, really? That's fascinating! 🤯",
                "You're the best visitor I've had all day! 🌟",
                "Can we be friends? I promise I'm fun! 🎈",
                "My room is pretty cool, right? I decorated it myself! 🏠",
                "*spins excitedly* This is so much fun! 🌀"
            };
            
            return responses[Random.Range(0, responses.Length)];
        }
        
        private void StopDancing()
        {
            if (currentState == AvatarState.Dancing)
            {
                SetState(AvatarState.Idle);
            }
        }
        
        private void WakeUp()
        {
            if (currentState == AvatarState.Sleeping)
            {
                animator.SetFloat("Speed", 1f);
                SetState(AvatarState.Idle);
                ShowSpeechBubble("*yawns* Good morning! ☀️");
            }
        }
        
        // Public methods for JavaScript bridge
        
        /// <summary>
        /// Called from JavaScript when user clicks avatar
        /// </summary>        public void OnAvatarClicked()
        {
            ShowSpeechBubble("Hey! You found me! 👋");
            SetState(AvatarState.Dancing);
            Invoke(nameof(StopDancing), 3f);
        }
        
        /// <summary>
        /// Called from JavaScript to change room theme
        /// </summary>
        public void OnRoomThemeChanged(string theme)
        {
            ShowSpeechBubble($"Ooh, I love the {theme} theme! 🎨");
        }
        
        /// <summary>
        /// Called from JavaScript when furniture is added
        /// </summary>
        public void OnFurnitureAdded(string furnitureName)
        {
            ShowSpeechBubble($"A {furnitureName}! Perfect! 🛋️");
        }
    }
}
