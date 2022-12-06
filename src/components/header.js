import { useEffect,useRef,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import {UserContext} from '../pages/menu.js'

function Header({value})
{
    let cart = value;
    console.log(cart);
    let navigate = useNavigate();
    let navitems = useRef();
    let [navbar,setNavbar] = useState(false);
    // let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));
    let cartLength = useRef(localStorage.getItem('cartItem'));
    
    function navigation(){
        if(navbar === false){
            navitems.current.style.height="250px";
            navitems.current.style.width="100%";
            setNavbar(true);
        }
        else{
            navitems.current.style.height="0px";
            setNavbar(false);
        }
    }


    // useEffect(()=>{
    //     fetch(`http://localhost:8000/items/allcartitems/${loginDetails.current.userid}`,{
    //         headers:{
    //             "authorization":`Bearer ${loginDetails.current.token}`
    //         },
    //     })
    //     .then((res)=>res.json())
    //     .then((data=>{

    //         if(data.success=true)
    //         { 
                
    //             console.log(data.data);
    //             setItems(data.data)

    //         }
    //     }))
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // },[])

    return(
        <>
            <div></div>
            <header id="header" className="header">
                <nav className="navbar_container" id="navbar">
                    <div className="logo_section">
                        <img className='logo' src="../assets/capstone_logo.svg" alt='logo_image' onClick={()=>{
                            navigate('/landingpage')
                        }}/>

                        
                    </div>
                    <div className="nav_container">
                        <ul className="nav_links" ref={navitems} id="nav_links">
                            <Link to="/menu"><li className="nav_link">menu</li></Link>

                            <Link to="/restaurants"><li className="nav_link">restaurants</li></Link>

                            <Link to="/restaurantLogin"><li className="nav_link">admin</li></Link>

                            <Link to="/userlogin"><li className="nav_link">user</li></Link>

                            <Link to="/order"><li className="nav_link">orders</li></Link>

                            {/* <Link to="/cart"><li className="nav_link_cart">
                                
                                    <div className="section_img header_img_cart">
                                      <i className="fa-solid fa-cart-shopping"></i>
                                      <div className='product_count'>{items?.length}</div>
                                     <UserContext.Consumer>
                                            {
                                                value =>count.current = value
                                            }
                                     </UserContext.Consumer>
                                    </div>
                                
                                </li></Link> */}

                            {/* <i className="fa-solid fa-cart-shopping"></i> */}
                        </ul>
                    </div>
                    <div className='cart_section_mobile'>
                    <div className="mobile">
                            <i className="fa-solid fa-bars" id="icon" onClick={()=>{navigation()}}></i>
                        </div>
                        <Link to="/cart"><li className="nav_link_cart">
                                    
                                    <div className="section_img header_img_cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <div className='product_count'>{cartLength.current}</div>
                                    {/* <UserContext.Consumer>
                                            {
                                                value =>count.current = value
                                            }
                                    </UserContext.Consumer> */}
                                    </div>
                                
                        </li></Link>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header