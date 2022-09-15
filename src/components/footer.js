function Footer()
{
    return(
        <>
            <div className="footer">
                <div className="footer_container">
                    <ul className="footer_links">
                        <li className="footer_link">QUICK LINKS</li>
                        <li className="footer_link_a">About Us</li>
                        <li className="footer_link_a">Our Menu</li>
                        <li className="footer_link_a">Best sellers</li>
                        <li className="footer_link_a">Offers</li>
                    </ul>
                </div>
                <div className="footer_container">
                <ul className="footer_links">
                        <li className="footer_link">INFORMATION</li>
                        <li className="footer_link_a">Terms & Conditions</li>
                        <li className="footer_link_a">Refund Policy</li>
                        {/* <li className="footer_link_a"><a>Best sellers</a> </li>
                        <li className="footer_link_a"><a>Offers</a> </li> */}
                    </ul>
                </div>

                <div className="footer_container">
                <ul className="footer_links">
                        <li className="footer_link">CONTANT US</li>
                        <li className="footer_link_a">Track Orders</li>
                        <li className="footer_link_a">Capstone@favorategood.in</li>
                        <li className="footer_link_a">+91-7670905538</li>
                        <li className="footer_link_a">Timings : 10am - 10pm</li>
                        <li className="footer_link_a">Monday to Saturday</li>

                    </ul>
                </div>

                <div className="footer_container">
                <ul className="footer_links">
                        <li className="footer_link">SUBSCRIBE FOR DISCOUNTS</li>
                        <li>
                            <ul className="socialmedia_icons">
                                <li className="footer_link_a"><i class="fa-brands fa-facebook"></i></li>
                                <li className="footer_link_a"> <i class="fa-brands fa-instagram"></i></li>
                                <li className="footer_link_a"><i class="fa-brands fa-twitter"></i></li>
                                <li className="footer_link_a"><i class="fa-brands fa-youtube"></i></li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer