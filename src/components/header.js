import { Link } from 'react-router-dom';
import './header.css';

function Header()
{
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
                            <li className="nav_link">menu</li>
                            <li className="nav_link">restaurants</li>
                            <li className="nav_link">items</li>
                            <li className="nav_link">admin</li>
                            <li className="nav_link">user</li>
                            {/* <i className="fa-solid fa-cart-shopping"></i> */}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header