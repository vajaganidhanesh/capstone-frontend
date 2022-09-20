import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"

function Menu()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    let [items,setItems] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8000/items/allitems',{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
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

    return(
        <>
            <Header/>
            <div className="allitems">
                <div className='all_items'>
                    <h3>All Items</h3>
                    
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
                                                    // setItemDetails(items)
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