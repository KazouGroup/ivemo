import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link, NavLink} from 'react-router-dom';

class NavAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    // get all the tasks from backend
    loadItems() {
        axios.get(`/account/user`).then(response =>
            this.setState({user: response.data}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return window.location.pathname === routeName ? "active" : "";
    };
    render() {
        const {user} = this.state;
        return (
            <div className="sidebar" data-color={this.props.backColor} data-background-color={this.props.backgroundColor}>
                <div className="logo">
                    <a href="/" className="simple-text logo-mini">
                        <b>IV</b>
                    </a>
                    <a href="/" className="simple-text logo-normal">
                        <b>IVEMO</b>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img alt={user.first_name} src={user.avatar}/>
                        </div>
                        <div className="user-info">
                            <a data-toggle="collapse" href="#collapseExample" className="username">
                                <span>
                                    <b>{user.first_name}</b>
                                    <b className="caret"/>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <Link to={'/dashboard/profile/'} className="nav-link">
                                            <span className="sidebar-mini"><b>MP</b></span>
                                            <span className="sidebar-normal"><b>My Profile</b></span>
                                        </Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link to={'/dashboard/profile/edit/'} className="nav-link">
                                            <span className="sidebar-mini">EP</span>
                                            <span className="sidebar-normal"><b>Edit Profile</b></span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <span className="sidebar-mini"><b>MS</b></span>
                                            <span className="sidebar-normal">
                                                <b>Member since:12/02/2019</b>
                                            </span>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li className={`nav-item ${this.activeRoute('/dashboard/')}`}>
                            <NavLink to={'/dashboard/'} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p><b>Dashboard</b></p>
                            </NavLink>
                        </li>
                        <li className={`nav-item ${this.activeRoute('/dashboard/faqs/','/dashboard/categoryfaqs/')}`}>
                            <a className="nav-link" data-toggle="collapse" href="#faqsExamples">
                                <i className="material-icons">contact_support</i>
                                <p><b>FAQs</b>
                                    <b className="caret"/>
                                </p>
                            </a>
                            <div className="collapse" id="faqsExamples">
                                <ul className="nav">
                                    <li className={`nav-item ${this.activeRoute('/dashboard/categoryfaqs/')}`}>
                                        <NavLink to={'/dashboard/categoryfaqs/'} className="nav-link">
                                            <span className="sidebar-mini"><b>CF</b></span>
                                            <span className="sidebar-normal"><b>Category FAQs</b></span>
                                        </NavLink>
                                    </li>
                                    <li className={`nav-item ${this.activeRoute('/dashboard/faqs/')}`}>
                                        <NavLink to={'/dashboard/faqs/'} className="nav-link">
                                            <span className="sidebar-mini"><b>FQ</b></span>
                                            <span className="sidebar-normal"><b>FAQs</b></span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" data-toggle="collapse" href="#administrationExamples">
                                <i className="material-icons">person_outline</i>
                                <p><b>Administrations</b>
                                    <b className="caret"/>
                                </p>
                            </a>
                            <div className="collapse" id="administrationExamples">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <NavLink to={'/dashboard/permissions/'} className="nav-link">
                                            <span className="sidebar-mini"><b>PM</b></span>
                                            <span className="sidebar-normal"><b>Permissions</b></span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/dashboard/roles/'} className="nav-link">
                                            <span className="sidebar-mini"><b>RL</b></span>
                                            <span className="sidebar-normal"><b>Roles</b></span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


        );
    }
}
NavAdmin.defaultProps = {
    showNotification: false,
    backColor: "orange",
    backgroundColor: "black",
    minimizeSidebar: () => {}
};

NavAdmin.propTypes = {
    // if you want to show a notification when switching between mini sidebar and normal
    showNotification: PropTypes.bool,
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "blue",
        "black",
        "yellow",
        "green",
        "orange",
        "red"
    ]),
    // function that is called upon pressing the button near the logo
    minimizeSidebar: PropTypes.func
};
export default NavAdmin;
