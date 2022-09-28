import { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header(props)
{

    console.log(props);

    let cartdata = {props}
    console.log(cartdata);
    return(
        <>
            <header id="header" className="header ">
                <nav className="navbar" id="navbar">
                    <div className="logo_section">
                        <Link to={'/landingpage'}><p className="logo">Capstone</p></Link>
                        <div className="mobile">
                            {/* <i className="fa-solid fa-bars" id="icon" onClick="navbar()"></i> */}
                        </div>
                    </div>
                    <div className="nav_container">
                        <ul className="nav_links" id="nav_links">
                            <Link to="/menu"><li className="nav_link">menu</li></Link>

                            <Link to="/restaurants"><li className="nav_link">restaurants</li></Link>

                            <Link to="/restaurantLogin"><li className="nav_link">admin</li></Link>

                            <Link to="/userlogin"><li className="nav_link">user</li></Link>

                            <Link to=""><li className="nav_link">orders</li></Link>

                            <Link to="/cart"><li className="nav_link">
                                
                                    <div className="section_img header_img_cart">
                                      <i className="fa-solid fa-cart-shopping"></i>
                                      <div className='product_count'>2</div>
                                    </div>
                                
                                </li></Link>

                            {/* <i className="fa-solid fa-cart-shopping"></i> */}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header