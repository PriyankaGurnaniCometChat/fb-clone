import React from 'react'
import { CometChatGroupListScreen } from "../CometChat";
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