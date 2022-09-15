import { useRef } from "react";
import { useNavigate } from "react-router-dom"


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
        
            <div className='restaurant_authentication'>
                    <div className='landpage_container'>
                
                    <h3>Hey Foodie signup into Capstone</h3>
                    <div className='restaurant_container'>
                        <form ref={form} className='restaurant_login_form'>

                            <input type='text' placeholder='enter restaurant name' onChange={(event)=>{
                            readValue('name',event.target.value)
                        }}/>
                            <input type='email' placeholder='enter restaurant email' required onChange={(event)=>{
                            readValue('email',event.target.value)
                        }}/>
                            <input type='password' placeholder='password' required onChange={(event)=>{
                            readValue('password',event.target.value)
                        }}/>
                            <input type='number' placeholder='enter mobile number' maxLength={10} min={10} required onChange={(event)=>{
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
            
                    
        </>
    )
}

export default UserAuthentication