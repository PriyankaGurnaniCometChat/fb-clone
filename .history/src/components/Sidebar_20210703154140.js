import { ExpandMoreOutlined } from '@material-ui/icons';
import React from 'react';
import "../styles/Sidebar.css"
import SidebarRow from "../components/SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { useStateValue } from "../adapters/StateProvider";
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import CometChatUI from "@cometchat-pro/chat"
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CometChat } from '@cometchat-pro/chat'





function Sidebar() {
    const [{ user, setUser }] = useState([]);
    const [dms, setDms] = useState([])
    const history = useHistory()


    const getDirectMessages = () => {
        const limit = 10
        const usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(limit)
            .friendsOnly(true)
            .build()

        usersRequest
            .fetchNext()
            .then((userList) => setDms(userList))
            .catch((error) => {
                console.log('User list fetching failed with error:', error)
            })
    }

    const getChannels = () => {
        const limit = 30
        const groupsRequest = new CometChat.GroupsRequestBuilder()
            .setLimit(limit)
            .joinedOnly(true)
            .build()

        groupsRequest
            .fetchNext()
            .then((groupList) => setChannels(groupList))
            .catch((error) => {
                console.log('Groups list fetching failed with error', error)
            })
    }
    const logOut = () => {
        auth
            .signOut()
            .then(() => {
                localStorage.removeItem('user')
                history.push('/login')
            })
            .catch((error) => console.log(error.message))


        useEffect(() => {
            const data = localStorage.getItem('user')
            setUser(JSON.parse(data))

            getDirectMessages()
        }, [])


        return (
            <div className="sidebar">

                <SidebarRow src={user?.photoURL} title={user?.displayName} />
                <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
                <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
                <SidebarRow Icon={PeopleIcon} title="Friends" />
                <Router><SidebarRow Icon={ChatIcon} title="Messenger" /></Router>
                <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
                <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
                <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" />



            </div>
        );
    };
}
export default Sidebar;