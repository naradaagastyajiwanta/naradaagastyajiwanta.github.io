import { ethers } from "ethers"
import { getEthereumProvider } from "./ethereum-utils"

// Create a provider safely
export const getProvider = () => {
  const ethereum = getEthereumProvider()

  if (!ethereum) {
    console.log("No ethereum provider available")
    return null
  }

  try {
    return new ethers.BrowserProvider(ethereum)
  } catch (error) {
    console.error("Error creating provider:", error)
    return null
  }
}

// Get signer safely
export const getSigner = async () => {
  const provider = getProvider()
  if (!provider) return null

  try {
    return await provider.getSigner()
  } catch (error) {
    console.error("Error getting signer:", error)
    return null
  }
}
