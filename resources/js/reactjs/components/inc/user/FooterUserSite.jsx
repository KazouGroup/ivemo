import React, { Component } from "react";
import {Link} from 'react-router-dom';
import LoginModalUser from "../../user/auth/LoginModalUser";
import LogoutModalUser from "../../user/auth/LogoutModalUser";


class FooterUserSite extends Component {

    render() {

        return (
            <>
                <LoginModalUser/>
                <LogoutModalUser />

                <footer className="footer">
                    <div className=" container ">
                        <nav>
                            <ul>
                                <li>
                                    <Link to={`/`}>
                                        {$name_site}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/faqs/`}>
                                        Faqs
                                    </Link>
                                </li>
                                {/*
                                 <li>
                                    <Link to={`/about/`}>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/blogs/`}>
                                        Blog
                                    </Link>
                                </li>
                                */}

                                <li>
                                    <Link to={`/contact/`}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="copyright" id="copyright">
                            Copyright &copy; 2020 - {new Date().getFullYear()}. Designed by
                            <Link to={`/`}> {$name_site}</Link>. Coded by
                            <a href="/" target="_bank"> KazouGroup Srl</a>.
                        </div>
                    </div>
                </footer>
            </>

        )
    }
}
export default FooterUserSite;
