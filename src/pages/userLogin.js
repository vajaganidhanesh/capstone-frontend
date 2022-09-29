import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

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

        if(userCred.email !== undefined || userCred.password !== undefined)

        {

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
                    navigate('/menu')
                    
                }
                else{
                    document.getElementById("cmts").style.display="block"
                    document.getElementById("cmts").innerText="Incorrect password or email"
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })

        }

        else
        {
            document.getElementById("cmts").style.display="block"

        }

        
    }
    return(
        <>
            <Header/>
                <div className='rest_main_class rest_main_login_class'>

                    <div className='restaurant_image landpage_image restaurant_login'>
                        <img src="../assets/user_login.svg" alt='uploadimage'/>
                    </div>

                    <div className='restaurant_authentication'>
                        <div className='landpage_container'>
                        <h4>Please login Foodie..</h4>
                        <div className='restaurant_container'>
                            <form className='restaurant_login_form'>

                                <input className="input_field" type='text' placeholder='enter name or email' required onChange={(event)=>{
                                    readValue('email',event.target.value)
                                }}/>

                                <div className="button_iw">
                                    <input className="input_field" type='password' placeholder='enter password' required onChange={(event)=>{
                                        readValue('password',event.target.value)
                                    }}/>
                                    <small id="cmts" className="comments">please provide input values</small>
                                </div>

                                <div className='btns_restaurant'>
                               
                                    <button type="button" className="button_iw" onClick={()=>{

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
                </div>
            <Footer/>
        </>
    )
}

export default UserLogin;