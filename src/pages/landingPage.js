import '../pageCSS/landingpage.css'

import {useNavigate} from 'react-router-dom' 

function LandingPage(){

    let navigate = useNavigate();
    return(
        <>
            <div className='landpage landpage_main'>
                <div className='landpage_image'>
                    <img src="../assets/Upload 1.svg" alt="landing page" />
                </div>
                <div className='landpage_container landpage_contant'>
                    
                    <h3>Capstone Online food delivery app</h3>
                
                    <div className='navigations'>
                        <div className='restaurant_navigation'>
                            <p>Lets spread your taste</p>
                            <button onClick={()=>{
                                navigate('/restaurantLogin')
                            }}>Lets sell</button>
                        </div>
                        <div className='restaurant_navigation'>
                            <p>Lets taste our food</p>
                            <button onClick={()=>{
                                navigate('/userAuthentication')
                            }}>Lets buy</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;