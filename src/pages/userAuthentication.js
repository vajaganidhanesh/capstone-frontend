import { useState } from "react"

function UserAuthentication()
{
    let [user,setUser]=useState(true)
    return(
        <>
            {
                user===true?(
                    <>
                    <div className='restaurant_authentication'>
                       <div className='landpage_container'>
                        <h3>Please login Foodie..</h3>
                        <div className='restaurant_container'>
                            <form className='restaurant_login_form'>

                                <input type='text' placeholder='enter name or email'/>
                                <input type='password' placeholder='enter password'/>
                                <div className='btns_restaurant'>

                                    <button>Login</button>

                                </div>

                            </form>

                            <div className='signup_footer'>
                                    <p>Don't have an admin account?</p>
                                    <span onClick={()=>{
                                        setUser(false)
                                    }}>signup</span>
                                </div>
                        </div>
                        </div> 
                    </div>
                    </>
                ):
                (
                    <>
                    <div className='restaurant_authentication'>
                            <div className='landpage_container'>
                        
                            <h3>Hey Foodie signup into Capstone</h3>
                            <div className='restaurant_container'>
                                <form className='restaurant_login_form'>

                                    <input type='text' placeholder='enter restaurant name'/>
                                    <input type='email' placeholder='enter restaurant email'/>
                                    <input type='password' placeholder='password'/>
                                    <input type='number' placeholder='enter mobile number'/>

                                    <div className='btns_restaurant'>

                                        <button>signup</button>

                                    </div>
                                    
                                </form>
                                    <div className='signup_footer'>
                                        <p>already have an admin account?</p>
                                        <span onClick={()=>{
                                            setUser(true)
                                        }}>Login</span>
                                    </div>
                                    
                            </div>
                        </div>
                        </div>
                    
                    </>
                )
            }
        </>
    )
}

export default UserAuthentication