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
                    
                    <h3 className='landing_heading_capstone'>CAPSTONE Online food delivery app</h3>
                
                    <div className='navigations'>
                        <div className='restaurant_navigation website_features'>
                            <p>Lets spread your taste</p>
                            <ul className="landpage_navigations">
                                <li className="footer_link_a">Make your Restaurant Globalize</li>
                                <li className="footer_link_a">Huge no of customers</li>
                                <li className="footer_link_a">Easy money transaction</li>
                                <li className="footer_link_a">Best selling quality</li>
                            </ul>
                            <button onClick={()=>{
                                navigate('/restaurantLogin')
                            }}>Lets sell</button>
                        </div>
                        <div className='restaurant_navigation website_features'>
                            <p>Lets taste our food</p>
                            <ul className="landpage_navigations">
                                <li className="footer_link_a">No of restaurants </li>
                                <li className="footer_link_a">Best prices</li>
                                <li className="footer_link_a">Fresh items</li>
                                <li className="footer_link_a">Fast Delivery</li>
                            </ul>
                            <button onClick={()=>{
                                navigate('/userlogin')
                            }}>Lets buy</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;