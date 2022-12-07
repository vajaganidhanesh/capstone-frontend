import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../components/footer";
import Header from "../components/header";
import { emailRegex } from "./email";

function UserAuthentication()
{
    let navigate=useNavigate();
    let form = useRef();
    let user={};
    let message = useRef();
    let inputForm1 = useRef();
    let inputForm2 = useRef();
    let inputForm3 = useRef();
    let inputForm4 = useRef();
    let name = useRef();
    let email = useRef();
    let password = useRef();
    let mobile = useRef();
    let error = useRef();

    let FormsInputs = [inputForm1,inputForm2,inputForm3,inputForm4];
    let Tags = [name,email,password,mobile,error];

    function readValue(property,value)
    {
        user[property] = value;
        console.log(user);
    }

    function formvalidaton(){

        fetch("http://localhost:8000/user/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            body:JSON.stringify(user)
            })
            .then((response)=>response.json())
            .then((responseData)=>{

                if(responseData.success===true)
                {

                    console.log(responseData);
                    localStorage.setItem("login_details",JSON.stringify(responseData));
                    error.current.display="flex";
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
    function inputErrorMessage(message,input,text){
        message.current.style.marginLeft= "0%";
        input.current.style.border="1px solid red";
        message.current.innerText= text;
    }
    

    function signup(){
        if(user.name !== undefined && user.password !== undefined && user.email !== undefined && user.mobile !== undefined){
            
            if(user.name.length <= 5){
                let nameMessage = "please enter full name"
                inputErrorMessage(name,inputForm1,nameMessage)
                inputError(name,inputForm1);
            }
            
             if(!emailRegex.test(user.email) && user.email.length <=5){
                let emailMessage = "please enter valid email"
                inputErrorMessage(email,inputForm2,emailMessage);
                inputError(email,inputForm2);
            }

            if(user.password.length <=6){
                let passwordMessage = "enter 6 digits or more";
                inputErrorMessage(password,inputForm3,passwordMessage);
                inputError(password,inputForm3);
            }

             if(user.mobile.toString().length <=9 || user.mobile.toString().length >=11){
                let mobileMessage = "enter valid phone number";

                inputErrorMessage(mobile,inputForm4,mobileMessage);
                inputError(mobile,inputForm4);
                
            }
            else{
                // formvalidaton();
                console.log("submition");
            }


        }
        else{
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

        FormsInputs.map((value,index)=>{
            value.current.style.border="1px solid red";
        })

        Tags.map((value,index)=>{
            value.current.style.marginLeft="0%"
        })
    }

    function moveSlider(){
        
        error.current.style.left="100%";
        
        FormsInputs.map((value,index)=>{
            value.current.style.border="1px solid transparent";
        })
        Tags.map((value,index)=>{
            value.current.style.marginLeft="100%"
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
                        <img src="../assets/user_registration.svg" alt='uploadimage'/>
                    </div>

                <div className='restaurant_authentication'>
                    <div className='landpage_container landing_container_mobile'>
                    
                        <h4>Hey Foodie signup!</h4>
                        <div className='restaurant_container'>
                            <form ref={form} className='restaurant_login_form'>

                                <div>
                                    <input className="input_field" type='text' ref={inputForm1} id="name" required={true} placeholder='enter name' onChange={(event)=>{
                                    readValue('name',event.target.value)
                                    }}/>
                                    <small id="name" ref={name}>enter valid name</small>
                                </div>
                                
                                <div>

                                    <input className="input_field" type='email'id="email" ref={inputForm2} required={true} placeholder='enter email' onChange={(event)=>{
                                    readValue('email',event.target.value)
                                    }}/>
                                    <small id="email" ref={email}>enter valid email</small>
                                </div>

                                <div>
                                    <input className="input_field" type='password' id="password" ref={inputForm3} required={true} placeholder='enter password' onChange={(event)=>{
                                    readValue('password',event.target.value)
                                    }}/>
                                    <small id="password" ref={password}>enter 6 digits or more </small>
                                </div>

                                <div>
                                    <input className="input_field" type='number' id="number" ref={inputForm4} required={true} pattern="[0-9]*" placeholder='enter mobile number' maxLength={10} min={10}  onChange={(event)=>{
                                    readValue('mobile',event.target.value)
                                    }}/>
                                    <small id="mobile" ref={mobile}>enter valid number</small>
                                </div>

                                <div className='btns_restaurant'>

                                    <button type="button" className="button_iw button" onClick={()=>{
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