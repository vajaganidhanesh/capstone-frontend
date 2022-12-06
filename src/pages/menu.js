import '../pageCSS/menu.css'
import { createContext, useEffect,useRef, useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();
function Menu()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));
    let [items,setItems] = useState([]);
    let [cartItems,setCartItems] = useState([])
    let [itemconfirm,setItemconfirm] = useState(false);
    let [cartCount,setCartCount] = useState(0);
    let navigate = useNavigate();
    let loader = useRef();
   
    // loader.current.style.display = 'flex';
    
    useEffect(()=>{
        document.getElementById('email_loader').style.display='flex';
        fetch('http://localhost:8000/items/allitems',{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true )
            { 
                document.getElementById('email_loader').style.display='none';


                console.log(data);
                setItems(data.items)
            }
        }))
        .catch((err)=>{
            console.log(err);
            navigate('/userlogin')
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
            localStorage.setItem('cartItem',data.cart.cartItems.length);
            setCartCount(data.cart.cartItems.length);
            let datas = localStorage.getItem('cartItem');
            console.log(datas);

        })

        .catch((err)=>{
            console.log(err);
        })
    }
    function ItemConfirmation(itemData)
    {
        console.log(itemData);
        setCartItems(itemData)
        setItemconfirm(true)

    }
    return(
        <>
            <div  ref={loader} className="email_loading_effect" id="email_loader">
                <div className="email_loader_container">
                    
                    <div className="loading">
                        <img src="./assets/loading_effect.svg" alt="" />
                    </div>

                    <div className="loader_text">Please waiting!...</div>
                    
                </div>
            </div>
            {
                itemconfirm===true?(
                    <div className='update_item'onClick={()=>{
                        setItemconfirm(false)
                    }}>

                        <div className='confirmation_card' onClick={(e)=>{
                                    e.stopPropagation();
                                }}>

                            <div className='closing_model' onClick={()=>{
                                setItemconfirm(false)

                            }}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                            <h3 >
                                Item added Successfully
                            </h3>

                            <div className='selected_item_details'>
                                
                                <div className='selected_item_details_img_con'>
                                    <img src={cartItems.picture[0]} alt="item_img"/>
                                </div>

                                <div className='selected_item_details_det_con'>
                                    <div> <h1>{cartItems.name}</h1></div>
                                    <div><span>Quantity : </span>{cartItems.quantity}</div>
                                    <div><span>Price : </span>{cartItems.price}</div>
                                    <div><span>Restaurant : </span>{cartItems.restaurant.name}</div>
                                    <div><span>Description : </span>{cartItems.description}</div>
                                </div>
                            </div>
                            <button onClick={()=>{
                                navigate('/cart')
                            }}>Go to cart</button>
                        </div>
                       
                    </div>
                ):null
            }
            {/* <UserContext.Provider value={"1"}> */}
                <Header value={cartCount} />
            {/* </UserContext.Provider> */}
            

            <div className="allitems">
                
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
                                                    ItemConfirmation(items)
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