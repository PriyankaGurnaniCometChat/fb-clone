import React from 'react'
import { CometChatConversationListScreen } from "./lib/cometchat";
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