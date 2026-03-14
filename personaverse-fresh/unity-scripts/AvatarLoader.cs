using UnityEngine;
using GLTFast;
using System.Threading.Tasks;

namespace Personaverse.Avatar
{
    /// <summary>
    /// Loads and manages GLB avatar models
    /// </summary>
    public class AvatarLoader : MonoBehaviour
    {
        [Header("Settings")]
        [SerializeField] private Transform avatarParent;
        [SerializeField] private Vector3 avatarScale = Vector3.one;
        [SerializeField] private Vector3 avatarPosition = Vector3.zero;
        [SerializeField] private Vector3 avatarRotation = Vector3.zero;
        
        [Header("Animation")]
        [SerializeField] private RuntimeAnimatorController animatorController;
        
        private GameObject currentAvatar;
        private Animator avatarAnimator;
        
        /// <summary>
        /// Load avatar from StreamingAssets path
        /// </summary>
        public async void LoadAvatar(string glbPath)
        {
            // Remove existing avatar
            if (currentAvatar != null)
            {
                Destroy(currentAvatar);
            }
            
            string fullPath = System.IO.Path.Combine(Application.streamingAssetsPath, glbPath);
            
            if (!System.IO.File.Exists(fullPath))
            {
                Debug.LogError($"Avatar file not found: {fullPath}");
                return;
            }
            
            try
            {
                // Load GLB using glTFast
                var gltf = new GltfImport();
                
                bool success = await gltf.Load(fullPath);
                
                if (success)
                {
                    // Instantiate avatar
                    currentAvatar = new GameObject("Avatar");
                    currentAvatar.transform.SetParent(avatarParent);
                    currentAvatar.transform.localPosition = avatarPosition;
                    currentAvatar.transform.localRotation = Quaternion.Euler(avatarRotation);
                    currentAvatar.transform.localScale = avatarScale;
                    
                    // Add glTFast component
                    var instantiator = new GameObjectInstantiator(gltf, currentAvatar.transform);
                    success = await gltf.InstantiateMainSceneAsync(instantiator);
                    
                    if (success)
                    {
                        // Setup animator
                        SetupAnimator();
                        
                        // Add AI controller
                        var ai = currentAvatar.AddComponent<AI.AvatarAI>();
                        
                        Debug.Log("Avatar loaded successfully!");
                    }
                    else
                    {
                        Debug.LogError("Failed to instantiate avatar");
                    }
                }
                else
                {
                    Debug.LogError("Failed to load GLB file");
                }
                
                gltf.Dispose();
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error loading avatar: {e.Message}");
            }
        }
        
        /// <summary>
        /// Load default avatar (procedural fallback)
        /// </summary>
        public void LoadDefaultAvatar()
        {
            // Create simple capsule avatar as fallback
            if (currentAvatar != null)
            {
                Destroy(currentAvatar);
            }
            
            currentAvatar = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            currentAvatar.name = "DefaultAvatar";
            currentAvatar.transform.SetParent(avatarParent);
            currentAvatar.transform.localPosition = avatarPosition;
            currentAvatar.transform.localScale = new Vector3(0.5f, 1f, 0.5f);
            
            // Add simple face
            GameObject face = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            face.name = "Face";
            face.transform.SetParent(currentAvatar.transform);
            face.transform.localPosition = new Vector3(0, 0.5f, 0.2f);
            face.transform.localScale = new Vector3(0.6f, 0.4f, 0.3f);
            
            // Add AI controller
            var ai = currentAvatar.AddComponent<AI.AvatarAI>();
            
            Debug.Log("Default avatar created");
        }
        
        private void SetupAnimator()
        {
            avatarAnimator = currentAvatar.GetComponent<Animator>();
            
            if (avatarAnimator == null)
            {
                avatarAnimator = currentAvatar.AddComponent<Animator>();
            }
            
            if (animatorController != null)
            {
                avatarAnimator.runtimeAnimatorController = animatorController;
            }
        }
        
        public Animator GetAnimator()
        {
            return avatarAnimator;
        }
        
        public GameObject GetAvatar()
        {
            return currentAvatar;
        }
    }
}
