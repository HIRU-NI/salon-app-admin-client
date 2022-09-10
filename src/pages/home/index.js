import { React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

const Home = () => {

    const navigate = useNavigate()

    const { user } = useSelector( state => state.auth)

    useEffect(() => {
      if(!user) navigate('/login')
    }, [user, navigate])
    
    
    return (
        <div>
            Content
        </div>
    )
}

export default Home;