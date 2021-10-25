import React, { createContext } from 'react'

export const DataController = createContext()

export default function DataProvider({ children }) {
    

    return (
        <DataController.Provider
            value={{
                
            }}
        >
            {children}
        </DataController.Provider>
    )
}
