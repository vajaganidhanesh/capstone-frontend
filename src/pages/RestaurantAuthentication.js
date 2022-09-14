import '../pageCSS/RestaurantAuthentication.css'

import { useState } from "react"

function RestaurantAuthentication()
{
    let [login,setLogin] = useState(true)
    return(
        <>
            {
                login===true?(
                    <div className='restaurant_authentication'>
                        <h3>Please Login as Restaurant Admin</h3>
                        <div className='restaurant_container'>
                            <form className='restaurant_login_form'>

                                <input type='text' placeholder='enter restaurant name'/>
                                <input type='password' placeholder='enter restaurant name'/>
                                <div className='btns_restaurant'>

                                    <button>Login</button>

                                </div>

                            </form>

                            <div className='signup_footer'>
                                    <p>Don't have an admin account?</p>
                                    <span onClick={()=>{
                                        setLogin(false)
                                    }}>signup</span>
                                </div>
                        </div>
                    </div>
                ):(
                    <>
                        <div className='restaurant_authentication'>
                        <h3>Register your restaurant into Capstone</h3>
                        <div className='restaurant_container'>
                            <form className='restaurant_login_form'>

                                <input type='text' placeholder='enter restaurant name'/>
                                <input type='email' placeholder='enter restaurant email'/>
                                <input type='password' placeholder='password'/>
                                <input type='number' placeholder='enter mobile number'/>
                                <input type='text' placeholder='enter restaurant address'/>
                                <input type='text' placeholder='enter opening time'/>
                                <input type='text' placeholder='enter closing time'/>

                                <div className='btns_restaurant'>

                                    <button>signup</button>

                                </div>
                                
                            </form>
                                <div className='signup_footer'>
                                    <p>already have an admin account?</p>
                                    <span onClick={()=>{
                                        setLogin(true)
                                    }}>Login</span>
                                </div>
                        </div>
                    </div>
                    </>
                )
            }
        </>
    )
}

export default RestaurantAuthentication