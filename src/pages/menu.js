import '../pageCSS/menu.css'
import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { useNavigate } from 'react-router-dom';

function Menu()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));
    let [items,setItems] = useState([]);
    let [cartItems,setCartItems] = useState([])
    let [itemconfirm,setItemconfirm] = useState(false)
    let navigate = useNavigate()
  

    useEffect(()=>{
        fetch('http://localhost:8000/items/allitems',{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true)
            { 
                console.log(data);
                setItems(data.items)
            }
        }))
        .catch((err)=>{
            console.log(err);
        })
    },[])

    
    function addToCart(product)
    {   
        
        let itemdata = {...product}
        let cartItem = {

            cartItems:{
                item : itemdata._id,
                quantity : itemdata.quantity,
                price : itemdata.price,
                restaurant:itemdata.restaurant._id
            }
        }

        console.log(cartItem);
        
        fetch(`http://localhost:8000/items/addtocart/${loginDetails.current.userid}`,{
            method:'POST',
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cartItem)
        })
        .then((res)=>res.json())
        .then((data)=>{

            console.log(data);
            setCartItems(data.cart.cartItems)
        })

        .catch((err)=>{
            console.log(err);
        })
    }
    function ItemConfirmation()
    {
        setItemconfirm(true)

    }
    return(
        <>
            {
                itemconfirm===true?(
                    <div className='update_item'onClick={()=>{
                        setItemconfirm(false)
                    }}>

                        <div className='confirmation_card'onClick={(e)=>{
                                    e.stopPropagation();
                                }}>
                            <div>
                                item added into the cart
                            </div>
                        </div>

                    </div>
                ):null
            }

            <Header/>
            <div className="allitems">
                <div className='all_items menu_bar'>
                    <h3>All Items</h3>

                    <div className='cart_header'>

                        <div className='cart_addmore'>your cart</div>
                        <div className='cart_section'>
                            <i className="fa-sharp fa-solid fa-cart-shopping" onClick={()=>{
                                navigate("/cart")
                            }}></i>
                            {/* <span>{cartItems}</span> */}
                        </div>

                    </div>
                </div>
                    <div className='item_container'>
                        
                        {
                            
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
                                            <div>Stock left <span>{items.stock}</span></div>

                                            <div>Ingredients <span>{items.description}</span> </div>
                                            

                                            
                                                <button onClick={()=>{
                                                     addToCart(items)
                                                    ItemConfirmation()
                                                }}>Add to cart</button>
                                                
                                            
                                        </div>

                                    </div>
                                )
                            })
                                
                        }
                         
                    </div>

            </div>
            <Footer/>
        </>
    )
}

export default Menu