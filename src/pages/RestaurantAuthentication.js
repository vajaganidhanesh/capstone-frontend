import { useNavigate } from 'react-router-dom';
import '../pageCSS/RestaurantAuthentication.css'

// import { useRef } from "react"

function RestaurantAuthentication()
{
    
    let admin={};
    let navigate = useNavigate();
    // let form =useRef()

    function readValue(property,value)
    {
        admin[property] = value;
        console.log(admin);
    }
    function resSignup()
    {
        fetch("http://localhost:8000/restaurant/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(admin)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>    
            <div className='restaurant_authentication'>
                <div className='landpage_container'>
            
                <h3>Register your restaurant into Capstone</h3>
                <div className='restaurant_container'>
                    <form className='restaurant_login_form'>

                        <input type='text' placeholder='enter restaurant name'onChange={(event)=>{
                            readValue("name",event.target.value)
                        }}/>

                        <input type='email' placeholder='enter restaurant email' onChange={(event)=>{
                            readValue("email",event.target.value)
                        }}/>

                        <input type='password' placeholder='password' onChange={(event)=>{
                            readValue("password",event.target.value)
                        }}/>
                        <input type='number' placeholder='enter mobile number' onChange={(event)=>{
                            readValue("mobile",event.target.value)
                        }}/>
                        <input type='text' placeholder='enter restaurant address' onChange={(event)=>{
                            readValue("address",event.target.value)
                        }}/>
                        <input type='text' placeholder='enter opening time' onChange={(event)=>{
                            readValue("opening_time",event.target.value)
                        }}/>
                        <input type='text' placeholder='enter closing time'onChange={(event)=>{
                            readValue("closing_time",event.target.value)
                        }}/>

                        <div className='btns_restaurant'>

                            <button onClick={()=>{
                                resSignup()
                            }}>signup</button>

                        </div>
                        
                    </form>
                        <div className='signup_footer'>
                            <p>already have an admin account?</p>
                            <span onClick={()=>{
                                navigate('/restaurantLogin')
                            }}>Login</span>
                        </div>
                </div>
            </div>
            </div>
                  
        </>
    )
}

export default RestaurantAuthentication