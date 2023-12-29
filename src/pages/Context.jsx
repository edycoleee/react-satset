import React, { createContext, useState } from 'react'
import { OrganisationID } from '../util'

export const SatsetContext = createContext()

function SatsetProvider({ children }) {

  const testVal = "Test Value"
  const [tokenDt, setTokenDt] = useState("")
  const [OrgId, setOrgId] = useState(OrganisationID)

  const contactValue = {
    testVal, tokenDt, setTokenDt, OrgId, setOrgId
  }
  return (
    <SatsetContext.Provider value={contactValue} >
      {children}
    </SatsetContext.Provider>
  )
}
export default SatsetProvider
