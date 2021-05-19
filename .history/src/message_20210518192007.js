import React from 'react'
import { CometChatGroupListScreen } from "./cometchat";
import { AuthContext } from './authcontext'

export const Message = () => {
    const { logout } = React.useContext(AuthContext)


    return (
        <div>
            <button onClick={logout}>logout</button>
            <CometChatGroupListScreen />
        </div>


    )
}