import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';

class PremiumVerticalNavUserSite extends PureComponent {

    render() {
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
                                <img src={$userIvemo.avatar} />
                            </div>
                            <div className="user-info">
                                <a data-toggle="collapse" href="#collapseProfile" className="username">
                                  <span>
                                    {$userIvemo.first_name}
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
                                {$userIvemo.status_user && (
                                <a className="nav-link" href="/dashboard/">
                                    <i className="material-icons">vertical_split</i>
                                    <p> Dashboard {$name_site}</p>
                                </a>
                                )}
                            </li>
                            <li className="nav-item ">
                                <NavLink to={`/dashboard/premium/${$userIvemo.slug}/`} className="nav-link">
                                    <i className="material-icons">dashboard</i>
                                    <p> Dashboard </p>
                                </NavLink>
                            </li>

                            <li className="nav-item ">
                                <a className="nav-link" data-toggle="collapse" href="#mapsServicesemploie">
                                    <i className="material-icons">dialpad</i>
                                    <p> Formation & emploi
                                        <b className="caret"></b>
                                    </p>
                                </a>
                                <div className="collapse" id="mapsServicesemploie">
                                    <ul className="nav">
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${$userIvemo.slug}/employments/`}>
                                                <span className="sidebar-mini"> ALS </span>
                                                <span className="sidebar-normal"> Formation & emploi </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" data-toggle="collapse" href="#mapsBlogs">
                                    <i className="material-icons">view_headline</i>
                                    <p> Blogs & Articles
                                        <b className="caret"></b>
                                    </p>
                                </a>
                                <div className="collapse" id="mapsBlogs">
                                    <ul className="nav">
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/`}>
                                                <span className="sidebar-mini"> ALS </span>
                                                <span className="sidebar-normal"> Articles blog locations </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_reservations/`}>
                                                <span className="sidebar-mini"> ABR </span>
                                                <span className="sidebar-normal"> Articles blog reservations </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link" to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`}>
                                                <span className="sidebar-mini"> ABV </span>
                                                <span className="sidebar-normal"> Articles blog ventes </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item ">
                                <NavLink to={`/dashboard/premium/${$userIvemo.slug}/teams/`} className="nav-link">
                                    <i className="material-icons">people_alt</i>
                                    <p> Notre Team </p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

            </>

        )
    }
}

export default PremiumVerticalNavUserSite;
