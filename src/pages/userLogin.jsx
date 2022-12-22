import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

import { emailRegex } from "./email";



function UserLogin()
{
    let navigate = useNavigate();
    let userCred={}
    let error = useRef();
    let message = useRef();
    let form = useRef(); 
    let inputForm1 = useRef();
    let inputForm2 = useRef();
    let email = useRef();
    let password = useRef();

    let inputs = [inputForm1,inputForm2];
    let input_values = [email,password];

    function readValue(property,value)
    {
        userCred[property] = value;
        console.log(userCred);
    }

    function loginRequest(){
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
                    let null_message = "Wrong Email or Password please provide valid one..."
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

    function inputErrorMessage(message,input,text){
        message.current.style.marginLeft= "0%";
        input.current.style.border="1px solid red";
        message.current.innerText= text;
    }
    

    function loginDetails(){

        if(userCred.email !== undefined || userCred.password !== undefined)

        {
            if(!emailRegex.test(userCred.email) ){
                let emailMessage = "please enter valid email"
                inputErrorMessage(email,inputForm1,emailMessage);
                inputError(email,inputForm1);
            }

            else if(userCred.password.length <6){
                let passwordMessage = "enter 6 digits or more";
                inputErrorMessage(password,inputForm2,passwordMessage);
                inputError(password,inputForm2);
            }
            else{
                console.log("call login function");
                loginRequest();
            }

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

        inputs.map((val,index)=>{
           return val.current.style.border="1px solid red";
        })

        input_values.map((value,index)=>{
           return value.current.style.marginLeft="0%"
        })
        
    }

    function moveSlider(){
        error.current.style.left="100%"
        inputs.map(val=>{
            return val.current.style.border="1px solid transparent";
        })
        input_values.map((value,index)=>{
            return value.current.style.marginLeft="100%"
        })
    }

    function inputError(message,input){
        setTimeout(() => {
            message.current.style.marginLeft= "100%";
            input.current.style.border="1px solid transparent";    
            }, 5000);
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
                                <div>

                                <input ref={inputForm1} className="input_field" type='text' placeholder='enter name or email' required onChange={(event)=>{
                                    readValue('email',event.target.value)
                                }}/>
                                    <small ref={email}>enter valid email</small>
                                </div>
                                

                                <div >
                                    <input className="input_field" ref={inputForm2} type='password' placeholder='enter password' required onChange={(event)=>{
                                        readValue('password',event.target.value)
                                    }}/>
                                    <small ref={password}>Please enter correct password</small>
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