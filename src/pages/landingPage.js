import '../pageCSS/landingpage.css'

import {useNavigate} from 'react-router-dom' 

function LandingPage(){

    let navigate = useNavigate();
    return(
        <>
            <div className='landpage'>
                <div className='landpage_container'>
                    <h1>Capstone Foodie</h1>
                </div>
                <div className='navigations'>
                    <div className='restaurant_navigation'>
                        <p>Lets spread your taste</p>
                        <button onClick={()=>{
                            navigate('/userAuthentication')
                        }}>Lets sell</button>
                    </div>
                    <div className='restaurant_navigation'>
                        <p>Lets taste our food</p>
                        <button onClick={()=>{
                            navigate('/restaurantAuthentication')
                        }}>Lets buy</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LandingPage;