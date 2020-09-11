import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import NavlinkmailmessageUser from "../inc/NavlinkmailmessageUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import HelmetSite from "../../../../inc/user/HelmetSite";
import {connect} from "react-redux";
import {
    loadAllcontactservices,
    readnotificationItem,
} from "../../../../../redux/actions/contactuserActions";
import NotificationsList from "./inc/NotificationsList";
import EmptyItems from "../../../../inc/user/EmptyItems";


class PersonalnotificationsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        //this.readnotificationItem = this.readnotificationItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 20 }
        })
    }

    loadItems() {
        this.props.loadAllcontactservices(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }


    render() {
        const { contactusersprofile } = this.props;
        const {  visiable } = this.state;
        const mapNotifications = contactusersprofile.notifications.length ? (
            contactusersprofile.notifications.slice(0, visiable).map(item => {
                return (

                    <NotificationsList key={item.id} {...item} readnotificationItem={this.props.readnotificationItem} />
                )
            })
        ) : (
            <></>
        );

        return (

            <>
                <HelmetSite title={`Notifications ${$userIvemo.first_name} - ${$name_site}`} />

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">


                                    <div className="col-lg-3 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessageUser {...this.props} {...contactusersprofile}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-sm-9 mx-auto">

                                        <div className="alert alert-info" role="alert">
                                            <div className="container text-center">
                                                <strong>Notifications</strong>
                                            </div>
                                        </div>

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">

                                            <div className="card-body">
                                                <table>
                                                    <tbody>

                                                        {mapNotifications.length ? <>{mapNotifications}</> : <EmptyItems syntaxe={"de Message"} title={"Notifications"}/>}

                                                    </tbody>
                                                </table>
                                            </div>


                                        {visiable < contactusersprofile.notifications.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        </div>

                                    </div>

                                </div>


                            </div>



                        </div>

                        <FooterBigUserSite />

                    </div>
                </div>


            </>

        )
    }
}

PersonalnotificationsUser.propTypes = {
    loadAllcontactservices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    contactusersprofile: state.contactusers.contactservices

});

export default connect(mapStateToProps, {
    loadAllcontactservices,
    readnotificationItem,
})(PersonalnotificationsUser);

