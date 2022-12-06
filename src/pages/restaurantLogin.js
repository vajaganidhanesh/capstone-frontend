import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import '../pageCSS/restaurantLogin.css';


function RestaurantLogin()
{
    let navigate = useNavigate();
    let restaurantCred = {}

    function readValue(property,value){

        restaurantCred[property]=value;

        console.log(restaurantCred);
        
    }

    function restaurantLogin()
    {
        if(restaurantCred.email!==undefined && restaurantCred.password!==undefined)
        {
            
            fetch("http://localhost:8000/restaurant/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(restaurantCred)
            })
            .then((response)=>response.json())
            .then((responseData)=>{
                if(responseData.success===true)
                {
                    console.log(responseData);
                    localStorage.setItem("rest_login_details",JSON.stringify(responseData));
                    navigate('/allitems')
                }
                else{
                    document.getElementById("cmt").style.display="block"
                    document.getElementById("cmt").innerText="Incorrect password or email"
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else
        {
            document.getElementById("cmt").style.display="block"
        }
    }
    return(
        <>
        <Header/>
            <div className='rest_main_class rest_main_login_class'>
                    <div className='restaurant_image landpage_image restaurant_login'>
                        <img src="../assets/admin login.svg" alt='uploadimage'/>
                    </div>
                <div className='restaurant_authentication restaurant_auth_login'>
                    <div className='landpage_container landing_container_mobile'>
                        <h4>Restaurant Admin</h4>
                            <div className='restaurant_container'>
                                <form className='restaurant_login_form'>

                                    <input type='text' className="input_field" placeholder='enter admin email'onChange={(event)=>{
                                        readValue('email',event.target.value)
                                    }}/>

                                    <div className="button_iw">
                                        <input type='password' className="input_field" placeholder='enter password'onChange={(event)=>{
                                            readValue('password',event.target.value)
                                        }}/>
                                        <small id="cmt" className="comments">please provide input values</small>
                                    </div>
                                        
                                    <div className='btns_restaurant'>

                                        <button type="button" className="button_iw button" onClick={()=>{
                                            restaurantLogin()
                                        }}>Login</button>

                                    </div>

                                </form>

                                <div className='signup_footer'>
                                        <p>Don't have an admin account?</p>
                                        <span onClick={()=>{
                                            navigate('/restaurantAuthentication')
                                        }}>signup</span>
                                    </div>
                            </div>
                    </div> 
                </div>
            </div>
        <Footer/>
        </>
    )
}

export default RestaurantLogin;