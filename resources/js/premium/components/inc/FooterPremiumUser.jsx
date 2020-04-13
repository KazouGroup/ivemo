import React from "react";


function FooterPremiumUser(props) {

    return(

        <>
            <footer className="footer">
                <div className=" container-fluid ">
                    <nav>
                        <ul>
                            <li>
                                <a href="/">
                                    {$name_site}
                                </a>
                            </li>
                            <li>
                                <a href="http://presentation.creative-tim.com">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="http://blog.creative-tim.com">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright" id="copyright">
                      2020 - Copyright © {new Date().getFullYear()}, Ivemo All Rights Reserved Realisé par
                        <a href="/"> KazouGroup Srl</a>.
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterPremiumUser;
