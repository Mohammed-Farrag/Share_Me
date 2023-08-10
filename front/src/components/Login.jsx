import React from 'react'
import { GoogleLogin , GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import shareVideo from '../assets/share.mp4';
import { client } from '../client' 
import logo  from '../assets/logowhite.png';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const naviage = useNavigate()
    const responseGoogle = (res) => {
        const {name, picture ,sub} = jwt_decode(res.credential);
        localStorage.setItem('user', JSON.stringify({name, picture ,sub}))
        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }
        client.createIfNotExists(user).then(() => naviage('/', { replace: true}))
    }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className="relative w-full h-full">

        <video 
            src={shareVideo}
            typeof='video/mp4'
            autoPlay
            muted
            loop
            controls={false}
            className='w-full h-full object-cover'
            />

            <div className="absolute 
            flex justify-center items-center
            flex-col bottom-0 top-0 left-0 right-0
             bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width={130} alt="logo" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleOAuthProvider 
                            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                            >
                               
                                <GoogleLogin  
                                    
                                    onSuccess={responseGoogle}
                                    onError={responseGoogle}
                                    
                                    />
                               
                        </GoogleOAuthProvider>
                    </div>
             </div>
        </div>
    </div>
  )
}

export default Login