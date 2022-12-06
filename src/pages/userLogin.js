import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

function UserLogin()
{
    let navigate = useNavigate();
    let userCred={}
    let error = useRef();
    let message = useRef();
    let inputForm1 = useRef();
    let inputForm2 = useRef();
    let form = useRef(); 


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
                    error.current.display="flex";
                    navigate('/menu')
                    
                }
                else{
                    form.current.reset();
                    let null_message = "Please provide valid details!..."
                    errorMessage(null_message);

                    setTimeout(() => {
                        moveSlider();
                    }, 5000);
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })

        }

        else
        {
            let null_message = "Please provide the details!..."
            errorMessage(null_message);

            setTimeout(() => {
                moveSlider();
            },5000);

        }
    
    }

    function errorMessage(null_message){
        error.current.style.left="0%";
        error.current.style.color="red";
        message.current.innerText=null_message;
        error.current.style.backgroundColor="#fb000026";
        inputForm1.current.style.border="1px solid red";
        inputForm2.current.style.border="1px solid red";
    }

    function moveSlider(){
        error.current.style.left="100%"
        inputForm1.current.style.border="1px solid transparent";
        inputForm2.current.style.border="1px solid transparent";
        
    }
    return(
        <>
           
            <Header/>
                <div className="notification" id="notification" ref={error}>
                    <div className="notification_message">
                        <div ref={message}></div>

                        <div className="messageIcon" onClick={()=>{moveSlider()} }>
                            <i id="messageIcon"   className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
                
                <div className='rest_main_class rest_main_login_class'>

                    <div className='restaurant_image landpage_image restaurant_login'>
                        <img src="../assets/user_login.svg" alt='uploadimage'/>
                    </div>

                    <div className='restaurant_authentication'>
                        <div className='landpage_container landing_container_mobile'>
                        <h4>Please login Foodie..</h4>
                        <div className='restaurant_container'>
                            <form ref={form} className='restaurant_login_form'>

                                <input ref={inputForm1} className="input_field" type='text' placeholder='enter name or email' required onChange={(event)=>{
                                    readValue('email',event.target.value)
                                }}/>

                                <div className="button_iw">
                                    <input className="input_field" ref={inputForm2} type='password' placeholder='enter password' required onChange={(event)=>{
                                        readValue('password',event.target.value)
                                    }}/>
                                    <small id="cmts" className="comments">please provide input values</small>
                                </div>

                                <div className='btns_restaurant'>
                               
                                    <button type="button" className="button_iw button" onClick={()=>{

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