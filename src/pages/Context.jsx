import React, { createContext, useState } from 'react'

export const SatsetContext = createContext()

function SatsetProvider({ children }) {

  const testVal = "Test Value"
  const [tokenDt, setTokenDt] = useState("")
  const contactValue = {
    testVal,tokenDt, setTokenDt
  }
  return (
    <SatsetContext.Provider value={contactValue} >
      {children}
    </SatsetContext.Provider>
  )
}
export default SatsetProvider
