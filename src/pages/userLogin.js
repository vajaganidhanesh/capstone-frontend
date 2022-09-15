import { useNavigate } from "react-router-dom";

function UserLogin()
{
    let navigate = useNavigate();
    let userCred={}

    function readValue(property,value)
    {
        userCred[property] = value;
        console.log(userCred);
    }

    function loginDetails(){
        fetch("http://localhost:8000/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userCred)
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            if(responseData.success===true)
            {
                console.log(responseData);
                localStorage.setItem("login_details",JSON.stringify(responseData));
                
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

            <div className='restaurant_authentication'>
                <div className='landpage_container'>
                <h3>Please login Foodie..</h3>
                <div className='restaurant_container'>
                    <form className='restaurant_login_form'>

                        <input type='text' placeholder='enter name or email' onChange={(event)=>{
                            readValue('email',event.target.value)
                        }}/>
                        <input type='password' placeholder='enter password' onChange={(event)=>{
                            readValue('password',event.target.value)
                        }}/>
                        <div className='btns_restaurant'>

                            <button type="button" onClick={()=>{
                                loginDetails()
                            }}>Login</button>

                        </div>

                    </form>

                    <div className='signup_footer'>
                            <p>Don't have an customer account?</p>
                            <span onClick={()=>{
                                navigate('/userAuthentication')
                            }}>signup</span>
                        </div>
                </div>
                </div> 
            </div>

        </>
    )
}

export default UserLogin;