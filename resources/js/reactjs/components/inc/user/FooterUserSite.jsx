import React, { Component } from "react";
import {Link} from 'react-router-dom';
import LoginModalUser from "../../user/auth/LoginModalUser";


class FooterUserSite extends Component {

    render() {

        return (
            <>
                <LoginModalUser/>

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
                                    <Link to={`/about/`}>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/blog/`}>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/contact/`}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="copyright" id="copyright">
                            &copy;
                            { new Date().getFullYear()}, Designed by
                            <Link to={`/`}> {$name_site}</Link>. Coded by
                            <a href="https://www.kazougroup.com" target="_bank"> KazouGroup Srl</a>.
                        </div>
                    </div>
                </footer>
            </>

        )
    }
}
export default FooterUserSite;
