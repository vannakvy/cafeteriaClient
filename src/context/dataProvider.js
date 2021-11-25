import { useLazyQuery } from '@apollo/client'
import { onAuthStateChanged } from '@firebase/auth'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { auth } from '../api/config'
import { noticeAction } from '../functions/fn'
import { GET_USER_CONTENT_BY_UID } from '../graphql/user'
import { initState } from './initialState'
import { ACTION, reducer } from './reducer'

export const DataController = createContext()

export default function DataProvider({ children }) {
    const [user, setUser] = useState({})
    const [logined, loginedDispatch] = useReducer(reducer, initState.logined)

    const [getContentById, { data: content }] = useLazyQuery(GET_USER_CONTENT_BY_UID, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
        fetchPolicy: "network-only",
        errorPolicy: 'all'
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user)
                setUser(user)
                getContentById({
                    variables: {
                        input: {
                            id: user.uid
                        }
                    }
                })
            } else {
                // User is signed out
                // ...
                // console.log(user)
                setUser(user)
                // console.log(content)
            }
        });
    }, [getContentById])

    console.log(content)

    useEffect(() => {
        setTimeout(() => {
          loginedDispatch({ type: ACTION.ADD_PAYLOAD, payload: false })
        }, 3000)
      }, [loginedDispatch, logined])

    return (
        <DataController.Provider
            value={{
                content,
                logined, loginedDispatch,
                user
            }}
        >
            {children}
        </DataController.Provider>
    )
}
