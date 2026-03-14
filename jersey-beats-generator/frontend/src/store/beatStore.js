import { create } from 'zustand'

export const useBeatStore = create((set, get) => ({
  // State
  isGenerating: false,
  generationProgress: 0,
  currentBeat: null,
  queue: [],
  history: [],
  
  // Actions
  setGenerating: (status) => set({ isGenerating: status }),
  setProgress: (progress) => set({ generationProgress: progress }),
  
  addToQueue: (item) => set((state) => ({ 
    queue: [...state.queue, { ...item, id: Date.now(), status: 'pending' }] 
  })),
  
  updateQueueItem: (id, updates) => set((state) => ({
    queue: state.queue.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  removeFromQueue: (id) => set((state) => ({
    queue: state.queue.filter(item => item.id !== id)
  })),
  
  setCurrentBeat: (beat) => set({ currentBeat: beat }),
  
  addToHistory: (beat) => set((state) => ({
    history: [beat, ...state.history].slice(0, 20) // Keep last 20
  })),
  
  // Async actions
  generateFromUpload: async (files, options) => {
    const { addToQueue, updateQueueItem, setCurrentBeat, addToHistory } = get()
    
    const queueItem = {
      type: 'upload',
      files: files.map(f => f.name),
      options
    }
    
    addToQueue(queueItem)
    const id = get().queue[get().queue.length - 1].id
    
    try {
      updateQueueItem(id, { status: 'uploading' })
      
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('options', JSON.stringify(options))
      
      const response = await fetch('http://localhost:8000/api/remix', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Generation failed')
      
      updateQueueItem(id, { status: 'processing' })
      
      const result = await response.json()
      
      updateQueueItem(id, { status: 'completed', result })
      setCurrentBeat(result)
      addToHistory(result)
      
      return result
    } catch (error) {
      updateQueueItem(id, { status: 'failed', error: error.message })
      throw error
    }
  },
  
  generateFromPrompt: async (prompt, options) => {
    const { addToQueue, updateQueueItem, setCurrentBeat, addToHistory } = get()
    
    const queueItem = {
      type: 'prompt',
      prompt,
      options
    }
    
    addToQueue(queueItem)
    const id = get().queue[get().queue.length - 1].id
    
    try {
      updateQueueItem(id, { status: 'generating' })
      
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, options })
      })
      
      if (!response.ok) throw new Error('Generation failed')
      
      const result = await response.json()
      
      updateQueueItem(id, { status: 'completed', result })
      setCurrentBeat(result)
      addToHistory(result)
      
      return result
    } catch (error) {
      updateQueueItem(id, { status: 'failed', error: error.message })
      throw error
    }
  }
}))
