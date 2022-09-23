import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
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
            <Header/>
                <div className='rest_main_class'>
                    <div className='restaurant_image landpage_image'>
                        <img src="../assets/Upload.svg" alt='uploadimage'/>
                    </div>
                    <div className='restaurant_authentication'>
                        <div className='landpage_container'>
                    
                            <h4>Register your restaurant into Capstone</h4>
                            <div className='restaurant_container'>
                                <form className='restaurant_login_form'>

                                    <div className='input_block_one'>

                                        <input class="input_field" type='text' placeholder='enter restaurant name'onChange={(event)=>{
                                            readValue("name",event.target.value)
                                        }}/>

                                        <input class="input_field" type='email' placeholder='enter restaurant email' onChange={(event)=>{
                                            readValue("email",event.target.value)
                                        }}/>

                                    </div>

                                    <div className='input_block_one'>

                                        <input class="input_field" type='password' placeholder='password' onChange={(event)=>{
                                            readValue("password",event.target.value)
                                        }}/>
                                        <input class="input_field" type='number' placeholder='enter mobile number' onChange={(event)=>{
                                            readValue("mobile",event.target.value)
                                        }}/>

                                    </div>
                                    <textarea placeholder='enter address' name="" id="textarea" cols="10" rows="10" class="input_textarea" onChange={(event)=>{
                                        readValue("address",event.target.value)
                                    }}></textarea>
                                    

                                    <div className='input_block_one'>

                                        <input class="input_field" type='text' placeholder='enter opening time' onChange={(event)=>{
                                            readValue("opening_time",event.target.value)
                                        }}/>
                                        <input class="input_field" type='text' placeholder='enter closing time'onChange={(event)=>{
                                            readValue("closing_time",event.target.value)
                                        }}/>
                                    </div>

                                    <div className='btns_restaurant'>

                                        <button class="button" type='button' onClick={()=>{
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

                </div>
            <Footer/>    
        </>
    )
}

export default RestaurantAuthentication