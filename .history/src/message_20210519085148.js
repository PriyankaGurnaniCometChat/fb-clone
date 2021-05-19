import React from 'react'
import { CometChat } from "./CometChat";
// /Users/randysteele/projects/fb-clone/src/CometChatWorkspace/src/components/Groups/CometChatGroupList
import { AuthContext } from './authcontext'

export const Message = () => {
    const { logout } = React.useContext(AuthContext)


    return (
        <div>
            <button onClick={logout}>logout</button>
            <CometChat />
        </div>


    )
}