// Safely check and access ethereum object
export const getEthereumProvider = () => {
  // Check if window is defined (for SSR)
  if (typeof window === "undefined") return null

  // Return the existing ethereum provider if available
  return (window as any).ethereum || null
}

// Safely check if ethereum is available
export const isEthereumAvailable = (): boolean => {
  return getEthereumProvider() !== null
}

// Initialize ethereum related functionality safely
export const initializeEthereum = () => {
  // Only run in browser
  if (typeof window === "undefined") return

  // Don't try to redefine ethereum if it already exists
  if ((window as any).ethereum) {
    console.log("Ethereum provider already exists")
    return
  }

  // If you need to provide a fallback ethereum implementation,
  // do it here, but only if window.ethereum doesn't already exist
  // Example: (window as any).ethereum = yourFallbackImplementation;
}
