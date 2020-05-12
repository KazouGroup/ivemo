import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';

class PremiumVerticalNavUserSite extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {userData:[]};
        this.navLogout = this.navLogout.bind(this);
    }

    navLogout(e) {
        axios.post('/logout')
            .then(() => {
                window.location.reload();
            });
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.premium_user_index.site',[itemuser])).then(response =>
            this.setState({userData: response.data}));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userData} = this.state;
        return (
            <>
                <div className="sidebar" data-color="rose" data-background-color="black" data-image="/assets/img/sidebar-1.jpg">

                    <div className="logo">
                        <a href="/" className="simple-text logo-mini">
                            IV
                        </a>
                        <a href="/" className="simple-text logo-normal">
                            {$name_site}
                        </a>
                    </div>

                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <img src={userData.avatar} />
                            </div>
                            <div className="user-info">
                                <a data-toggle="collapse" href="#collapseProfile" className="username">
                                  <span>
                                    {userData.first_name}
                                    <b className="caret"></b>
                                  </span>
                                </a>
                                <div className="collapse" id="collapseProfile">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <span className="sidebar-mini"> MP </span>
                                                <span className="sidebar-normal"> My Profile </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <span className="sidebar-mini"> EP </span>
                                                <span className="sidebar-normal"> Edit Profile </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <span className="sidebar-mini"> S </span>
                                                <span className="sidebar-normal"> Settings </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item ">
                                <NavLink to={`/dashboard/premium/${userData.slug}/`} className="nav-link">
                                    <i className="material-icons">dashboard</i>
                                    <p> Dashboard </p>
                                </NavLink>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" data-toggle="collapse" href="#pagesExamples">
                                    <i className="material-icons">image</i>
                                    <p> Pages
                                        <b className="caret"></b>
                                    </p>
                                </a>
                                <div className="collapse" id="pagesExamples">
                                    <ul className="nav">
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/pricing.html">
                                                <span className="sidebar-mini"> P </span>
                                                <span className="sidebar-normal"> Pricing </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/rtl.html">
                                                <span className="sidebar-mini"> RS </span>
                                                <span className="sidebar-normal"> RTL Support </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/timeline.html">
                                                <span className="sidebar-mini"> T </span>
                                                <span className="sidebar-normal"> Timeline </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/login.html">
                                                <span className="sidebar-mini"> LP </span>
                                                <span className="sidebar-normal"> Login Page </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/register.html">
                                                <span className="sidebar-mini"> RP </span>
                                                <span className="sidebar-normal"> Register Page </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/lock.html">
                                                <span className="sidebar-mini"> LSP </span>
                                                <span className="sidebar-normal"> Lock Screen Page </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/user.html">
                                                <span className="sidebar-mini"> UP </span>
                                                <span className="sidebar-normal"> User Profile </span>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="../../examples/pages/error.html">
                                                <span className="sidebar-mini"> E </span>
                                                <span className="sidebar-normal"> Error Page </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item ">
                                <a className="nav-link" data-toggle="collapse" href="#mapsExamples">
                                    <i className="material-icons">view_headline</i>
                                    <p> Blogs & Articles
                                        <b className="caret"></b>
                                    </p>
                                </a>
                                <div className="collapse" id="mapsExamples">
                                    <ul className="nav">
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${userData.slug}/blogs/annonce_locations/`}>
                                                <span className="sidebar-mini"> ALS </span>
                                                <span className="sidebar-normal"> Articles blogs locations </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${userData.slug}/blogs/annonce_reservations/`}>
                                                <span className="sidebar-mini"> ABR </span>
                                                <span className="sidebar-normal"> Articles blogs reservations </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${userData.slug}/blogs/annonce_ventes/`}>
                                                <span className="sidebar-mini"> ABV </span>
                                                <span className="sidebar-normal"> Articles blogs ventes </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </>





        )
    }
}

export default PremiumVerticalNavUserSite;
