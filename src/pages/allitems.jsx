import '../pageCSS/allitems.css'
import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer";
import Header from "../components/header";
import { Link } from 'react-router-dom';


function Allitems()
{
    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    
    let [items,setItems] = useState([]);
    let [updateItem,setUpdateItem] = useState(false);
    let [itemData ,setItemData] = useState({})
    let updateItemData = new FormData();
    // let navigate= useNavigate({})

    useEffect(()=>{

        fetch(`http://localhost:8000/items/getitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{

            if(data.success === true)
            {
                
                console.log(data);
                setItems(data.items)


            }
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])
    

    function readValue(property,value)
    {
        updateItemData.append(property,value)
        
        
    }

    function updateUi()
    {

        fetch(`http://localhost:8000/items/getitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })

        .then((response)=>response.json())
        .then((data)=>{

            if(data.success === true)
            {
                
                console.log(data);
                setItems(data.items)


            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function setItemDetails(items)
    {
        setUpdateItem(true)
        setItemData(items)
       
    }

    function updateData(itemData)
    {
        fetch(`http://localhost:8000/items/update/${itemData._id}`,{
            method:'PUT',
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
            body:updateItemData
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.success === true)
            {
                
                console.log(data);
                setUpdateItem(false)
                updateUi();
            
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    function deleteItem(items){

        let itemdata = {...items}
        fetch(`http://localhost:8000/items/deleteitem/${itemdata._id}`,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.success === true)
            {
                
                console.log(data);
                updateUi();
            
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        
        <>

            {
                updateItem===true?(
                    <div className='update_item' onClick={()=>{
                        setUpdateItem(false)
                    }}>

                    <div className='update_model_container'onClick={(e)=>{
                            e.stopPropagation();
                        }}>
                        <h4>Please update your item</h4>
    
                        <form className='restaurant_login_form'>
    
                            <input type='text' className="input_field" placeholder='enter item name'onChange={(event)=>{
                                readValue('name',event.target.value)
                            }} defaultValue={itemData?.name}/>
    
                            <input type='number' className="input_field" placeholder='enter quantity'onChange={(event)=>{
                                readValue('quantity',event.target.value)
                            }} defaultValue={itemData?.quantity}/>
    
                            <input type='number' className="input_field" placeholder='enter price'onChange={(event)=>{
                                readValue('price',event.target.value)
                            }} defaultValue={itemData?.price}/>

                            <input type='number' className="input_field" placeholder='enter available stock'onChange={(event)=>{
                                readValue('stock',event.target.value)
                            }} defaultValue={itemData?.stock}/>

                            <input className='input_field' type='text' placeholder='enter item description'  required onChange={(event)=>{
                                    readValue('description',event.target.value)
                                }} defaultValue={itemData?.description}/>
    
                            <input className='input_field' type='file' placeholder='enter item pic'  required onChange={(event)=>{
                                readValue('picture',event.target.files[0])
                            }} />
    
                            <div className='btns_restaurant'>
                                <button type="button" onClick={()=>{
                                    updateData(itemData)
                                }}>Update</button>
    
                            </div>
    
                        </form>
                    </div>
               </div>
    
                ):null
            }

            <Header/>
            <div className="allitems allitems_main">
                <div className='all_items'>
                    <h3>Your Restaurant items</h3>
                    <Link to='/createitem'><button>add more</button></Link>
                </div>
                    <div className='item_container all_item_container'>
                        
                        {
                            items.length!==0?
                                items.map((items,index)=>{
                                    return(
                                        <div className='item_details' key={index}>

                                            <div className='image_container'>
                                                <img src={items.picture[0]} alt='food_item'/>
                                            </div>

                                            <div className='item_description'>

                                                <div className='item_name'>
                                                    <span className='item_name_dish'>{items.name}</span>
                                                </div>
                                                <div className='item_quantity'>

                                                     <div>Quantity <span>{items.quantity} packs</span></div>

                                                    <div className='item_price'>
                                                        Price <span>{items.price} /-</span>
                                                    </div>

                                                </div>
                                                <div>Available stock <span>{items.stock}</span></div>

                                                <div>ingredients <span>{items.description}</span> </div>
                                                

                                                <div className='feature_buttons'>
                                                    <button onClick={()=>{
                                                        setItemDetails(items)
                                                    }}>edit</button>
                                                    <button onClick={()=>{
                                                        deleteItem(items)
                                                    }}>delete</button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }):
                                (
                                    <div className='add_items_container'>
                                       
                                        <div className='add_items_image'>
                                            
                                            <img src="../assets/start_cooking.svg" alt='uploadimage'/>

                                            <div>
                                               
                                                <Link to='/createitem'><button>additems</button></Link>

                                            </div>
                                        </div>
                                       
                                    </div>
                                )
                        }
                         
                    </div>

            </div>

            <Footer/>
        </>

    )
}

export default Allitems