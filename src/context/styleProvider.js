import React, { createContext, useState } from 'react'

export const StyleController = createContext()

export default function StyleProvider({ children }) {
    const [contextStyle, setContextStyle] = useState({

    })
    
    return (
        <StyleController.Provider
            value={{
                contextStyle, setContextStyle
            }}
        >
            {children}
        </StyleController.Provider>
    )
}
