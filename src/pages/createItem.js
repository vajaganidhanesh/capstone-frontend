import { useRef } from 'react';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

import Header from "../components/header"
function CreateItem()
{
    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    let navigate = useNavigate();

    let form = useRef();

    let items= new FormData();

    items.append("restaurant",loginDetails.current.userid);

    function readValue(property,value)
    {
        items.append(property,value)
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
            if(data.success === true)
            {
                navigate('/allitems')
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <Header/>
            <div className='rest_main_class rest_main_login_class'>
                    <div className='restaurant_image landpage_image restaurant_login'>
                        <img src="../assets/cooking.svg" alt='uploadimage'/>
                    </div>

                <div className='restaurant_authentication'>
                    <div className='landpage_container'>
                    
                        <h3>Post your cusine or dish details</h3>
                        <div className='restaurant_container'>
                            <form ref={form} className='restaurant_login_form'>

                               
                                        
                                <input className='input_field' type='text' placeholder='enter name of the dish' onChange={(event)=>{
                                readValue('name',event.target.value)
                                }}/>

                                <div className='input_block_one'>

                                    <input className='input_field' type='number' placeholder='enter food quantity' required onChange={(event)=>{
                                    readValue('quantity',event.target.value)
                                    }} defaultValue={1}/>

                                    
                                    <input className='input_field' type='number' placeholder='enter price' required onChange={(event)=>{
                                    readValue('price',event.target.value)
                                    }}/>

                                </div>
                                <input className='input_field' type='number' placeholder='enter available stock' required onChange={(event)=>{
                                    readValue('stock',event.target.value)
                                    }}/>

                                <input className='input_field' type='text' placeholder='enter item description'  required onChange={(event)=>{
                                readValue('description',event.target.value)
                                }}/>

                                <input className='input_field' type='file' placeholder='enter item pic'  required onChange={(event)=>{
                                readValue('picture',event.target.files[0])
                                }}/>
                            

                                <button type='button' onClick={()=>{
                                    itemcreation()
                                }}>createItem</button>
                                
                            </form>
                                <div className='signup_footer'>
                                    <p>lets check the your items..</p>
                                    <span onClick={()=>{
                                        navigate('/allitems')
                                    }}>Items</span>
                                </div>
                                
                        </div>
                    </div>
                </div>

                    
                </div>
            <Footer/>
        </>
    )
}

export default CreateItem