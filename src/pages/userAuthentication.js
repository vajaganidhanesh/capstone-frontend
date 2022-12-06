import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../components/footer";
import Header from "../components/header";


function UserAuthentication()
{
    let navigate=useNavigate();
    let form = useRef();
    let user={};
    let message = useRef();
    let inputForm1 = useRef();
    let inputForm2 = useRef();
    let error = useRef();

    function readValue(property,value)
    {
        user[property] = value;
        console.log(user);
    }

    function formvalidaton(name,email,password,mobile){

        // if(user.name !== )
    }

    function signup(){

        if(user.name !== undefined && user.password !== undefined && user.email !== undefined && user.mobile !== undefined){
            formvalidaton(user.name,user.email,user.password,user.mobile);
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
        inputForm1.current.style.border="1px solid red";
        inputForm2.current.style.border="1px solid red";
    }

    function moveSlider(){
        error.current.style.left="100%";
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
                        <img src="../assets/user_registration.svg" alt='uploadimage'/>
                    </div>

                <div className='restaurant_authentication'>
                    <div className='landpage_container landing_container_mobile'>
                    
                        <h4>Hey Foodie signup!</h4>
                        <div className='restaurant_container'>
                            <form ref={form} className='restaurant_login_form'>

                                <input className="input_field" type='text' ref={inputForm1} id="name" required={true} placeholder='enter name' onChange={(event)=>{
                                readValue('name',event.target.value)
                                }}/>

                                <input className="input_field" type='email'id="email" ref={inputForm2} required={true} placeholder='enter email' onChange={(event)=>{
                                readValue('email',event.target.value)
                                }}/>

                                <input className="input_field" type='password' id="password" required={true} placeholder='enter password' onChange={(event)=>{
                                readValue('password',event.target.value)
                                }}/>

                                <input className="input_field" type='number' id="number" required={true} placeholder='enter mobile number' maxLength={10} min={10}  onChange={(event)=>{
                                readValue('mobile',event.target.value)
                                }}/>

                                <div className='btns_restaurant'>

                                    <button type="button" className="button_iw" onClick={()=>{
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