using UnityEngine;
using UnityEngine.EventSystems;

namespace Personaverse.Room
{
    /// <summary>
    /// Handles room customization - furniture placement, themes, lighting
    /// </summary>
    public class RoomCustomizer : MonoBehaviour
    {
        [Header("Room Settings")]
        [SerializeField] private Transform roomContainer;
        [SerializeField] private Transform furnitureContainer;
        [SerializeField] private Material floorMaterial;
        [SerializeField] private Material wallMaterial;
        [SerializeField] private Light mainLight;
        
        [Header("Furniture Prefabs")]
        [SerializeField] private GameObject[] furniturePrefabs;
        [SerializeField] private Transform[] furnitureSpawnPoints;
        
        // Current room state
        private RoomData currentRoomData = new RoomData();
        private GameObject selectedFurniture;
        private bool isEditMode = false;
        
        [System.Serializable]
        public class RoomData
        {
            public string theme = "Modern";
            public Color floorColor = Color.gray;
            public Color wallColor = Color.white;
            public float lightIntensity = 1f;
            public Vector3 lightColor = Vector3.one;
            public FurnitureItem[] placedFurniture;
        }
        
        [System.Serializable]
        public class FurnitureItem
        {
            public string id;
            public string name;
            public Vector3 position;
            public Vector3 rotation;
            public Vector3 scale;
        }
        
        private void Start()
        {
            LoadDefaultRoom();
        }
        
        /// <summary>
        /// Load default modern room
        /// </summary>
        private void LoadDefaultRoom()
        {
            ApplyTheme("Modern");
        }
        
        /// <summary>
        /// Apply a room theme
        /// </summary>
        public void ApplyTheme(string themeName)
        {
            currentRoomData.theme = themeName;
            
            switch (themeName)
            {
                case "Modern":
                    SetColors(new Color(0.9f, 0.9f, 0.9f), new Color(0.95f, 0.95f, 0.95f));
                    SetLighting(1f, Color.white);
                    break;
                    
                case "Cozy":
                    SetColors(new Color(0.6f, 0.5f, 0.4f), new Color(0.9f, 0.8f, 0.7f));
                    SetLighting(0.7f, new Color(1f, 0.9f, 0.8f));
                    break;
                    
                case "Cyberpunk":
                    SetColors(new Color(0.1f, 0.1f, 0.15f), new Color(0.05f, 0.05f, 0.1f));
                    SetLighting(0.8f, new Color(0.8f, 0.2f, 0.9f));
                    break;
                    
                case "Nature":
                    SetColors(new Color(0.4f, 0.6f, 0.4f), new Color(0.8f, 0.9f, 0.8f));
                    SetLighting(1f, new Color(0.9f, 1f, 0.9f));
                    break;
                    
                case "Minimal":
                    SetColors(Color.white, Color.white);
                    SetLighting(1.2f, Color.white);
                    break;
            }
            
            // Notify JavaScript
            Application.ExternalCall("onRoomThemeChanged", themeName);
        }
        
        /// <summary>
        /// Set floor and wall colors
        /// </summary>
        private void SetColors(Color floor, Color wall)
        {
            currentRoomData.floorColor = floor;
            currentRoomData.wallColor = wall;
            
            if (floorMaterial != null)
                floorMaterial.color = floor;
                
            if (wallMaterial != null)
                wallMaterial.color = wall;
        }
        
        /// <summary>
        /// Set lighting intensity and color
        /// </summary>
        private void SetLighting(float intensity, Color color)
        {
            currentRoomData.lightIntensity = intensity;
            currentRoomData.lightColor = new Vector3(color.r, color.g, color.b);
            
            if (mainLight != null)
            {
                mainLight.intensity = intensity;
                mainLight.color = color;
            }
        }
        
        /// <summary>
        /// Add furniture to the room
        /// </summary>
        public void AddFurniture(string furnitureId)
        {
            GameObject prefab = GetFurniturePrefab(furnitureId);
            if (prefab == null) return;
            
            // Find empty spawn point
            Transform spawnPoint = GetEmptySpawnPoint();
            if (spawnPoint == null)
            {
                Debug.LogWarning("No empty spawn points available!");
                return;
            }
            
            // Instantiate furniture
            GameObject furniture = Instantiate(prefab, spawnPoint.position, spawnPoint.rotation, furnitureContainer);
            furniture.name = furnitureId;
            
            // Make it interactive
            AddFurnitureInteraction(furniture);
            
            // Notify JavaScript
            Application.ExternalCall("onFurnitureAdded", furnitureId);
            
            Debug.Log($"Added {furnitureId} to room");
        }
        
        /// <summary>
        /// Remove furniture from the room
        /// </summary>
        public void RemoveFurniture(GameObject furniture)
        {
            Destroy(furniture);
        }
        
        /// <summary>
        /// Get furniture prefab by ID
        /// </summary>
        private GameObject GetFurniturePrefab(string id)
        {
            // This would be replaced with actual prefab lookup
            // For now, return random prefab
            if (furniturePrefabs.Length > 0)
            {
                return furniturePrefabs[Random.Range(0, furniturePrefabs.Length)];
            }
            return null;
        }
        
        /// <summary>
        /// Find an empty spawn point
        /// </summary>
        private Transform GetEmptySpawnPoint()
        {
            foreach (Transform point in furnitureSpawnPoints)
            {
                if (point.childCount == 0)
                    return point;
            }
            return null;
        }
        
        /// <summary>
        /// Add interaction components to furniture
        /// </summary>
        private void AddFurnitureInteraction(GameObject furniture)
        {
            // Add collider if missing
            if (furniture.GetComponent<Collider>() == null)
            {
                furniture.AddComponent<BoxCollider>();
            }
            
            // Add click handler
            var clickHandler = furniture.AddComponent<FurnitureClickHandler>();
            clickHandler.Initialize(this);
        }
        
        /// <summary>
        /// Toggle edit mode for moving furniture
        /// </summary>
        public void ToggleEditMode()
        {
            isEditMode = !isEditMode;
            
            // Enable/disable furniture dragging
            foreach (Transform furniture in furnitureContainer)
            {
                var draggable = furniture.GetComponent<DraggableObject>();
                if (draggable == null)
                    draggable = furniture.gameObject.AddComponent<DraggableObject>();
                    
                draggable.enabled = isEditMode;
            }
            
            Application.ExternalCall("onEditModeChanged", isEditMode);
        }
        
        /// <summary>
        /// Save current room layout
        /// </summary>
        public void SaveRoom()
        {
            string json = JsonUtility.ToJson(currentRoomData);
            Application.ExternalCall("saveRoomData", json);
            Debug.Log("Room saved!");
        }
        
        /// <summary>
        /// Load room layout from JSON
        /// </summary>
        public void LoadRoom(string json)
        {
            RoomData data = JsonUtility.FromJson<RoomData>(json);
            if (data != null)
            {
                ApplyTheme(data.theme);
                SetColors(data.floorColor, data.wallColor);
                SetLighting(data.lightIntensity, new Color(data.lightColor.x, data.lightColor.y, data.lightColor.z));
                
                // Load furniture
                foreach (var item in data.placedFurniture)
                {
                    // Instantiate at saved position
                }
                
                Debug.Log("Room loaded!");
            }
        }
        
        /// <summary>
        /// Clear all furniture
        /// </summary>
        public void ClearRoom()
        {
            foreach (Transform child in furnitureContainer)
            {
                Destroy(child.gameObject);
            }
        }
        
        // JavaScript bridge methods
        
        /// <summary>
        /// Called from JavaScript to add furniture
        /// </summary>
        public void JS_AddFurniture(string furnitureId)
        {
            AddFurniture(furnitureId);
        }
        
        /// <summary>
        /// Called from JavaScript to change theme
        /// </summary>
        public void JS_ChangeTheme(string themeName)
        {
            ApplyTheme(themeName);
        }
        
        /// <summary>
        /// Called from JavaScript to save room
        /// </summary>
        public void JS_SaveRoom()
        {
            SaveRoom();
        }
        
        /// <summary>
        /// Called from JavaScript to load room
        /// </summary>
        public void JS_LoadRoom(string json)
        {
            LoadRoom(json);
        }
    }
    
    /// <summary>
    /// Handles click events on furniture
    /// </summary>
    public class FurnitureClickHandler : MonoBehaviour, IPointerClickHandler
    {
        private RoomCustomizer customizer;
        
        public void Initialize(RoomCustomizer customizer)
        {
            this.customizer = customizer;
        }
        
        public void OnPointerClick(PointerEventData eventData)
        {
            // Show furniture options
            Debug.Log($"Clicked on {gameObject.name}");
            
            // Could show context menu, move, delete, etc.
            if (eventData.button == PointerEventData.InputButton.Right)
            {
                // Right click - remove
                customizer.RemoveFurniture(gameObject);
            }
        }
    }
    
    /// <summary>
    /// Allows dragging objects in edit mode
    /// </summary>
    public class DraggableObject : MonoBehaviour
    {
        private bool isDragging = false;
        private Vector3 offset;
        private Camera mainCamera;
        
        private void Start()
        {
            mainCamera = Camera.main;
        }
        
        private void OnMouseDown()
        {
            isDragging = true;
            
            // Calculate offset from object center
            Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                offset = transform.position - hit.point;
            }
        }
        
        private void OnMouseUp()
        {
            isDragging = false;
        }
        
        private void Update()
        {
            if (!isDragging) return;
            
            // Move object with mouse
            Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
            Plane groundPlane = new Plane(Vector3.up, Vector3.zero);
            
            if (groundPlane.Raycast(ray, out float distance))
            {
                Vector3 point = ray.GetPoint(distance);
                transform.position = point + offset;
            }
        }
    }
}
