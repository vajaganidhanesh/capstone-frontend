import { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

import Header from "../components/header"
function CreateItem()
{
    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    // let navigate = useNavigate();

    let form = useRef();

    let items= new FormData();

    items.append("restaurant",loginDetails.current.userid);

    function readValue(property,value)
    {
        items.append(property,value)
        console.log(items);
    }

    function itemcreation(){
        
        fetch('http://localhost:8000/items/create',{
            method:"POST",
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
            body:items
            
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            console.log("hello");

            if(data.success === true)
            {
                // navigat('/homepage')
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <Header/>
            <div className='restaurant_authentication createItem'>
                    <div className='landpage_container'>
                
                    <h3>please enter available cusine or dish details</h3>
                    <div className='restaurant_container'>
                        <form ref={form} className='restaurant_login_form'>

                            <input type='text' placeholder='enter name of the dish' onChange={(event)=>{
                            readValue('name',event.target.value)
                        }}/>
                            <input type='number' placeholder='enter restaurant quantity' required onChange={(event)=>{
                            readValue('quantity',event.target.value)
                        }}/>
                            <input type='number' placeholder='enter price' required onChange={(event)=>{
                            readValue('price',event.target.value)
                        }}/>
                            <input type='text' placeholder='enter mobile description'  required onChange={(event)=>{
                            readValue('description',event.target.value)
                        }}/>
                            <input type='file' placeholder='enter mobile pic'  required onChange={(event)=>{
                            readValue('picture',event.target.files[0])
                        }}/>
                          

                                <button type='button' onClick={()=>{
                                    itemcreation()
                                }}>createItem</button>
                            
                        </form>
                            <div className='signup_footer'>
                                <p>lets check the your order</p>
                                <span onClick={()=>{
                                    // navigate('/userlogin')
                                }}>Login</span>
                            </div>
                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateItem