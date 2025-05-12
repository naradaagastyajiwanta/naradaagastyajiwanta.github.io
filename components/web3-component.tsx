"use client"

import { useEffect, useState } from "react"
import { isEthereumAvailable, getEthereumProvider } from "@/lib/ethereum-utils"

export default function Web3Component() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Safely check if ethereum is available
    if (!isEthereumAvailable()) {
      console.log("Ethereum provider not available")
      return
    }

    const provider = getEthereumProvider()

    // Now we can safely use the provider
    if (provider && provider.isConnected) {
      setIsConnected(provider.isConnected())
    }

    // Add event listeners if needed
    const handleAccountsChanged = (accounts: string[]) => {
      setIsConnected(accounts.length > 0)
    }

    if (provider && provider.on) {
      provider.on("accountsChanged", handleAccountsChanged)

      // Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
        }
      }
    }
  }, [])

  return (
    <div>
      {isEthereumAvailable() ? (
        <p>Wallet status: {isConnected ? "Connected" : "Disconnected"}</p>
      ) : (
        <p>No Ethereum wallet detected</p>
      )}
    </div>
  )
}
