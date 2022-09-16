import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

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
                navigate('/createitem')
            }
            else{

            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <Header/>
            <div className='restaurant_authentication'>
                <div className='landpage_container'>
                <h3>Please Login as Restaurant Admin</h3>
                <div className='restaurant_container'>
                    <form className='restaurant_login_form'>

                        <input type='text' class="input_field" placeholder='enter admin email'onChange={(event)=>{
                            readValue('email',event.target.value)
                        }}/>
                        <input type='password' class="input_field" placeholder='enter password'onChange={(event)=>{
                            readValue('password',event.target.value)
                        }}/>
                        <div className='btns_restaurant'>

                            <button type="button" onClick={()=>{
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
        <Footer/>
        </>
    )
}

export default RestaurantLogin;