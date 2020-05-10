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

            <div className="sidebar" data-color="orange">

                <div className="logo">
                    <a href="/" className="simple-text logo-mini">
                       IV
                    </a>
                    <a href="/" className="simple-text logo-normal">
                        {$name_site}
                    </a>
                    <div className="navbar-minimize">
                        <button id="minimizeSidebar" className="btn btn-simple btn-icon btn-neutral btn-round">
                            <i className="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
                            <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
                        </button>
                    </div>
                </div>
                <div className="sidebar-wrapper" id="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src={userData.avatar}/>
                        </div>
                        <div className="info">
                            <a data-toggle="collapse" href="#collapseExample" className="collapsed">
                                      <span>
                                        {userData.first_name}
                                        <b className="caret"></b>
                                      </span>
                            </a>
                            <div className="clearfix"></div>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">MP</span>
                                            <span className="sidebar-normal">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">EP</span>
                                            <span className="sidebar-normal">Edit Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">S</span>
                                            <span className="sidebar-normal">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li>
                            <NavLink to={`/dashboard/premium/${userData.slug}/`} >
                                <i className="now-ui-icons design_app"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li>
                            <a data-toggle="collapse" href="#pagesExamples">
                                <i className="now-ui-icons design_image"></i>
                                <p>
                                    Pages
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="pagesExamples">
                                <ul className="nav">
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">P</span>
                                            <span className="sidebar-normal"> Pricing </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a data-toggle="collapse" href="#blogsExamples">
                                <i className="now-ui-icons text_align-center"/>
                                <p>
                                    Blogs & articles
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="blogsExamples">
                                <ul className="nav">
                                    <li>
                                        <NavLink to={`/dashboard/premium/${userData.slug}/blogs/annonce_locations/`}>
                                            <span className="sidebar-mini-icon">ALS</span>
                                            <span className="sidebar-normal"> Articles blogs locations </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/dashboard/premium/${userData.slug}/blogs/annonce_reservations/`}>
                                            <span className="sidebar-mini-icon">ALR</span>
                                            <span className="sidebar-normal"> Articles blogs reservations </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/dashboard/premium/${userData.slug}/blogs/annonce_ventes/`}>
                                            <span className="sidebar-mini-icon">ALV</span>
                                            <span className="sidebar-normal"> Articles blogs ventes </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/premium/${userData.slug}/teams/`} >
                                <i className="now-ui-icons users_circle-08"></i>
                                <p>Votre Teams</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>



        )
    }
}

export default PremiumVerticalNavUserSite;
