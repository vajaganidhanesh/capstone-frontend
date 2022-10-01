import '../pageCSS/order.css'

import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect,useRef, useState } from 'react'
import{Link} from 'react-router-dom'

function Order()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));

    let [items,setItems] = useState([])

    useEffect(()=>{

        fetch(`http://localhost:8000/items/allOrdersDetails/${loginDetails.current.userid}`,{

            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data);
            if(data.success === true)
            {
                console.log(data.data);
                setItems(data.data)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return(

        <>
            <Header/>

                <div className='order_container'>

                <div className='cart_main_container'>
                            <div className='cart_item_container'>

                                {
                                    
                                    items.length!==0?
                                        items.map((value,index)=>{
                                            return(
                                                <div className='cart_card' key={index}>
                                                
                                                    <div className='cart_image_container'>
                                                        <img src={value.itemsdetails.picture[0]} alt='cartItem'/>
                                                    </div>
                                        
                                                    <div className='cart_details_container'>

                                                        <h3 className='cart_item_name'>{value.itemsdetails.name}</h3>
                                                         <div className='cart_item_details'><span >Quantity : </span>{value.quantity}</div> 
                                                        <div className='cart_item_details'><span >Price : </span>{value.price}</div>
                                                        <div className='cart_item_details'><span >Description : </span>{value.itemsdetails.description}</div>
                                                        {/* <div className='cart_item_details'><span >Dish from </span>{value.restaurant.name}</div> */}
                                                        
                                                        {/* <div className='cart_features'>
                                                            <div className="section_img" onClick={()=>{
                                                                addQuantity(value)
                                                            }}> <i className="fa-solid fa-plus"></i></div>
                                                            <div className="section_img" onClick={()=>{
                                                                subQuantity(value)
                                                            }}><i className="fa-solid fa-minus"></i></div>
                                                            <div className="section_img remove_button"  onClick={()=>{
                                                                removeItem(value)
                                                            }}>remove</div>

                                                        </div> */}
                                                    </div>

                                                </div>
                                            )
                                        }):
                                        (
                                            <div className='add_items_container'>
                                            
                                                <div className='cart_items_image'>
                                                    
                                                    <img src="../assets/emptyorder.svg" alt='uploadimage'/>

                                                    <div>
                                                    
                                                    <Link to="/cart"><button>buy Now</button></Link>    
                                                    </div>
                                                </div>
                                            
                                            </div>
                                        )
                                    
                                }

                                {/* {
                                    items.length!==0?(
                                        <div className='total_amount'>
                                            <h3>Total bill</h3>

                                            <div className='total_items_container'>

                                                <div>No.of items : {totalData.quantity}</div>

                                                <div>Payable amount : {totalData.price}</div>
                                                
                                                <div className="section_img remove_button"  onClick={()=>{
                                                                placeOrder()
                                                }}>Place Order</div>
                                            </div>
                                        </div>
                                    ):null
                                } */}
                            </div>

                        </div>

                </div>

            <Footer/>


        </>

    )
}

export default Order