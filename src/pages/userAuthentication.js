import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../components/footer";
import Header from "../components/header";


function UserAuthentication()
{
    let navigate=useNavigate();
    let form = useRef();
    let user={}

    function readValue(property,value)
    {
        user[property] = value;
        console.log(user);
    }

    function signup(){
        fetch("http://localhost:8000/user/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log(responseData);
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    return(
        <>
            <Header/>
            <div className='rest_main_class rest_main_login_class'>
                
                    <div className='restaurant_image landpage_image restaurant_login'>
                        <img src="../assets/user_registration.svg" alt='uploadimage'/>
                    </div>

                <div className='restaurant_authentication'>
                        <div className='landpage_container'>
                    
                        <h4>Hey Foodie signup!</h4>
                        <div className='restaurant_container'>
                            <form ref={form} className='restaurant_login_form'>

                                <input class="input_field" type='text' placeholder='enter name' onChange={(event)=>{
                                readValue('name',event.target.value)
                            }}/>
                                <input class="input_field" type='email' placeholder='enter email' required onChange={(event)=>{
                                readValue('email',event.target.value)
                            }}/>
                                <input class="input_field" type='password' placeholder='enter password' required onChange={(event)=>{
                                readValue('password',event.target.value)
                            }}/>
                                <input class="input_field" type='number' placeholder='enter mobile number' maxLength={10} min={10} required onChange={(event)=>{
                                readValue('mobile',event.target.value)
                            }}/>

                                <div className='btns_restaurant'>

                                    <button type="button" onClick={()=>{
                                        signup()
                                    }}>signup</button>

                                </div>
                                
                            </form>
                                <div className='signup_footer'>
                                    <p>already have an account?</p>
                                    <span onClick={()=>{
                                        navigate('/userlogin')
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

export default UserAuthentication