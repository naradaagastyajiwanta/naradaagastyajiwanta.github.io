// Helper functions for image handling
export const imageService = {
  // Compress and resize image before storing
  processImage: async (file: File, maxWidth = 1200, maxHeight = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }

          // Create canvas and resize image
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          // Convert to data URL with reduced quality
          const dataUrl = canvas.toDataURL("image/jpeg", quality)
          resolve(dataUrl)
        }

        img.onerror = () => {
          reject(new Error("Failed to load image"))
        }

        if (event.target?.result) {
          img.src = event.target.result as string
        } else {
          reject(new Error("Failed to read file"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsDataURL(file)
    })
  },

  // Check if localStorage has enough space
  checkStorageSpace: (): boolean => {
    try {
      // Try to store a 1MB test string
      const testKey = "_test_storage_"
      const testString = new Array(1024 * 1024).join("a")

      localStorage.setItem(testKey, testString)
      localStorage.removeItem(testKey)

      return true
    } catch (e) {
      console.error("Storage space check failed:", e)
      return false
    }
  },

  // Estimate remaining localStorage space (rough estimate)
  getRemainingStorageSpace: (): number => {
    try {
      let total = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          total += localStorage.getItem(key)?.length || 0
        }
      }

      // Most browsers have a 5MB limit
      const estimatedLimit = 5 * 1024 * 1024
      return Math.max(0, estimatedLimit - total)
    } catch (e) {
      console.error("Failed to estimate storage space:", e)
      return 0
    }
  },
}
