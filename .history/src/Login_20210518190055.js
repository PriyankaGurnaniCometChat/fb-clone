import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase"
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { AuthContext } from '../context/authcontext';


const Login = () => {
    const [state, dispatch] = useStateValue();
    const { login } = React.useContext(AuthContext)
    const { username, setUsername } = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const formsubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const data = await login(username)
        if (data) {
            setIsSubmitting(false)
            setUsername('')
        }
    }

    <div className="authContainer">

        <div className='container'>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className="formContainer-1">
                        <h3 className="mb-5">Welcome to CometChatApp</h3>
                        <div className='row'>
                            <div className='ml-5' onClick={() => { login('superhero1') }}>
                                <img src='https://data-us.cometchat.io/assets/images/avatars/ironman.png' height='50px' width='50px' alt='superher1' />
                                <p>superhero1</p>
                            </div>
                            <div className='ml-5' onClick={() => { login('superhero2') }}>
                                <img src='https://data-us.cometchat.io/assets/images/avatars/captainamerica.png' height='50px' width='50px' alt='superher2' />
                                <p>superhero2</p>
                            </div>
                            <div className='ml-5' onClick={() => { login('superhero3') }}>
                                <img src='https://data-us.cometchat.io/assets/images/avatars/spiderman.png' height='50px' width='50px' alt='superher3' />
                                <p>superhero3</p>
                            </div>
                        </div>
                        <br></br>
                        <form onSubmit={formsubmit}>
                            <div className='form-group'>
                                <input className='form-control' value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            {/* <div className='form-group'> */}
                            <div className="mt-5">
                                <button type='submit' className='button' variant="secondary btn-action" size="lg" disabled={isSubmitting}>
                                    LOGIN {isSubmitting ? (<i className="fa fa-spinner fa-spin"></i>) : null}
                                </button>
                            </div>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div>
            <div className='col-md-4'></div>
        </div>

    </div>


    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo%282019%29.svg.png" alt="login logo" />
                <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="logo" />
            </div>
            <Button type="submit" onClick={signIn}>
                SignIn
            </Button>

        </div>
    );
};

export default Login;