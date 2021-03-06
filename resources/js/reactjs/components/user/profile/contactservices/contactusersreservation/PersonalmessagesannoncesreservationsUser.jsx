import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import NavlinkmailmessageUser from "../../mail/inc/NavlinkmailmessageUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    activecontactaddItem, activecontactremoveItem,
    archvementaddItem, archvementremoveItem, deletecontactItem,
    favoriteaddItem, favoriteremoveItem,
    loadAllcontactservices
} from "../../../../../redux/actions/annoncereservation/contactuserannoncereservationActions";
import HelmetSite from "../../../../inc/user/HelmetSite";
import MailcontactserviceList from "../inc/MailcontactserviceList";
import EmptyTableItems from "../../../../inc/user/EmptyTableItems";
import NavlinkmailmessagesendUser from "../../mail/inc/NavlinkmailmessagesendUser";


class PersonalmessagesannoncesreservationsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        this.readItem = this.readItem.bind(this);
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


    readItem(item) {
        const url = route('contactservice_red', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/messages/ars/${item.from.slug}/${item.contactserviceable.annoncetype.slug}/${item.contactserviceable.slugin}/`);
        })
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        const { contactusersprofile } = this.props;
        const {  visiable } = this.state;
        const mapContactusers = contactusersprofile.contactservicesannoncereservations.length ? (
            contactusersprofile.contactservicesannoncereservations.slice(0, visiable).map(item => {
                return (

                    <MailcontactserviceList key={item.id} {...item}
                                            favoriteaddItem={this.props.favoriteaddItem}
                                            favoriteremoveItem={this.props.favoriteremoveItem}
                                            archvementaddItem={this.props.archvementaddItem}
                                            archvementremoveItem={this.props.archvementremoveItem}
                                            activecontactaddItem={this.props.activecontactaddItem}
                                            activecontactremoveItem={this.props.activecontactremoveItem}
                                            readItem={this.readItem} deletecontactItem={this.props.deletecontactItem} />
                )
            })
        ) : (
            <></>
        );

        return (

            <>
                <HelmetSite title={`Messages contact ${$userIvemo.first_name} - ${$name_site}`} />

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">


                                    <div className="col-lg-4 col-md-12 mx-auto">

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

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessagesendUser {...this.props} {...contactusersprofile}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="alert alert-info" role="alert">
                                            <div className="container text-center">
                                                <strong>Boite de r??ception des reservations</strong>
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

                                                    {contactusersprofile.contactservicesannoncereservations.length >= 0 ?
                                                        <>
                                                            {contactusersprofile.contactservicesannoncereservations.length >= 1 ? <>{mapContactusers}</>:<EmptyTableItems syntaxe={"de Message"} title={"Contacts Reservations "}/>}
                                                        </>:null}

                                                    </tbody>
                                                </table>
                                            </div>


                                            {visiable < contactusersprofile.contactservicesannoncereservations.length && (
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
PersonalmessagesannoncesreservationsUser.propTypes = {
    loadAllcontactservices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    contactusersprofile: state.contactusers.contactservices

});

export default connect(mapStateToProps, {
    loadAllcontactservices,
    favoriteaddItem,favoriteremoveItem,
    archvementaddItem,archvementremoveItem,
    activecontactaddItem,activecontactremoveItem,
    deletecontactItem
})(PersonalmessagesannoncesreservationsUser);
