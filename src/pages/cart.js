import '../pageCSS/cart.css'

import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer";
import Header from "../components/header";
import { Link, useNavigate } from 'react-router-dom';

function Cart()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));
    let navigate = useNavigate();
    let [items,setItems]=useState([]);
    let [totalData,setTotalData] = useState({})


    useEffect(()=>{
        fetch(`http://localhost:8000/items/allcartitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true)
            { 
                console.log(data);
                setItems(data.data)

                let price = null;
                let quantity = null;
                let total = {}
                
                data.data.map((value,index)=>{

                    quantity = quantity + value.cartItems.quantity
                    price = price+value.cartItems.price

                    total = {quantity,price}
                })
                console.log(total);
                setTotalData(total)
            }
        }))
        .catch((err)=>{
            console.log(err);
        })
    },[])


    function updateui()
    {
        fetch(`http://localhost:8000/items/allcartitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true)
            { 
                console.log(data);
                setItems(data.data)

                let price = null;
                let quantity = null;
                let total = {}
                
                data.data.map((value,index)=>{

                    quantity = quantity + value.cartItems.quantity
                    price = price+value.cartItems.price

                    total = {quantity,price}
                })
                console.log(total);
                setTotalData(total)
            }   
        }))
        .catch((err)=>{
            console.log(err);
        })
    }

    function removeItem(item)
    {
        let itemId = {...item}

        console.log(itemId.cartItems.item);

        fetch(`http://localhost:8000/items/cart/deleteitem/${loginDetails.current.userid}/${itemId.cartItems.item}`,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true)
            {
                updateui()
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <Header/>
            
                <div className='item_confirmation'>

                        <div className='item_model'></div>

                    </div>


                    <div className='cart_container'>

                        <div className='all_items menu_bar'>
                            <h3>Your cart</h3>

                            <div className='cart_header'>

                                <div className='cart_addmore'>Add more</div>

                                <div className='cart_section'>

                                    <i className="fa-sharp fa-solid fa-cart-shopping" onClick={()=>{
                                            navigate("/menu")
                                        }}></i>

                                    <span className='cart_quantity'>{totalData?.quantity}</span>
                                </div>
                            </div>
                        </div>


                    <div className='cart_main_container'>
                        <div className='cart_item_container'>

                            {
                                
                                items.length!==0?
                                    items.map((value,index)=>{
                                        return(
                                            <div className='cart_card' key={index}>
                                            
                                                <div className='cart_image_container'>
                                                    <img src={value.itemdetails.picture[0]} alt='cartItem'/>
                                                </div>
                                    
                                                <div className='cart_details_container'>

                                                    <h3 className='cart_item_name'>{value.itemdetails.name}</h3>
                                                    <div className='cart_item_details'><span >Quantity : </span>{value.cartItems.quantity}</div>
                                                    <div className='cart_item_details'><span >Price : </span>{value.cartItems.price}</div>
                                                    <div className='cart_item_details'><span >Description : </span>{value.itemdetails.description}</div>
                                                    <div className='cart_item_details'><span >Dish from </span>{value.restaurant.name}</div>
                                                    
                                                    <div className='cart_features'>

                                                        <button>addmore</button>
                                                        <button onClick={()=>{
                                                            removeItem(value)
                                                        }}>remove</button>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }):
                                    (
                                        <div className='add_items_container'>
                                        
                                            <div className='cart_items_image'>
                                                
                                                <img src="../assets/emptycart.svg" alt='uploadimage'/>

                                                <div>
                                                
                                                <Link to="/menu"><button>additems</button></Link>    
                                                </div>
                                            </div>
                                        
                                        </div>
                                    )
                                
                            }

                            {
                                items.length!==0?(
                                    <div className='total_amount'>
                                        <h3>Total bill</h3>

                                        <div className='total_items_container'>

                                            <div>No.of items : {totalData.quantity}</div>

                                            <div>Payable amount : {totalData.price}</div>
                                            
                                            <button>Place Order</button>
                                        </div>
                                    </div>
                                ):null
                            }
                        </div>

                    </div>

                </div>
            <Footer/>
        </>
    )
}

export default Cart