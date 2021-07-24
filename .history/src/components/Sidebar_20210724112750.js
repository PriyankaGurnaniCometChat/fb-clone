import '../styles/Sidebar.css'
import { useState, useEffect } from 'react'
import SidebarRow from "../components/SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { BrowserRouter as Router } from 'react-router-dom'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { CometChat } from '@cometchat-pro/chat'
import { useHistory } from 'react-router-dom'

function Sidebar() {
    // const [channels, setChannels] = useState([])
    const [user, setUser] = useState(null)
    const [setDms] = useState([])
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


    // const logOut = () => {
    //     auth
    //         .signOut()
    //         .then(() => {
    //             localStorage.removeItem('user')
    //             CometChat.logout()
    //             history.push('/login')

    //         })
    //         .catch((error) => console.log(error.message))
    // }
    const logOut = () => {
        CometChat.logout().then(
            () => {
                console.log("Logout completed successfully");
                setUser(null);
                localStorage.removeItem('user');
            },
            (error) => {
                console.log("Logout failed with exception:", { error });
            }
        );
    }
    useEffect(() => {
        const data = localStorage.getItem('user')
        setUser(JSON.parse(data))

        getDirectMessages()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>
                    </h2>
                    <SidebarRow src={user?.photoURL} title={user?.displayName} />
                    <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
                    <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
                    <SidebarRow Icon={PeopleIcon} title="Friends" />
                    <Router><SidebarRow Icon={ChatIcon} title="Messenger" /></Router>
                    <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
                    <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
                    <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Marketplace" />

                </div>
            </div>
            <button className="sidebar__logout" onClick={logOut}>
                Logout
            </button>
        </div>
    )
}

export default Sidebar