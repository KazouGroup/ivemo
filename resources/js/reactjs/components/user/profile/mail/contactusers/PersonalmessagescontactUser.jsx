import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import NavlinkmailmessageUser from "../inc/NavlinkmailmessageUser";
import HeadermailmessageUser from "../inc/HeadermailmessageUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import HelmetSite from "../../../../inc/user/HelmetSite";
import {connect} from "react-redux";
import {
    activecontactaddItem, activecontactremoveItem,
    archvementaddItem, archvementremoveItem, deletecontactItem,
    favoriteaddItem,favoriteremoveItem,
    loadAllcontactservices,
} from "../../../../../redux/actions/contactuserActions";
import EmptyItems from "../../../../inc/user/EmptyItems";


class PersonalmessagescontactUser extends Component {
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
        this.props.loadAllcontactservices();
    }


    readItem(item) {

        const url = route('personal_contactusers_mails_unactive.site', [item.id]);
        dyaxios.post(url).then(() => {
            this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/contacts/${item.slug}/`);
        })

    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }


    render() {
        const { contactusersprofile } = this.props;
        const {  visiable } = this.state;
        const mapContactusers = contactusersprofile.contactusers.length ? (
            contactusersprofile.contactusers.slice(0, visiable).map(item => {
                return (

                    <HeadermailmessageUser key={item.id} {...item} readItem={this.readItem} deletecontactItem={this.props.deletecontactItem}
                        activecontactaddItem={this.props.activecontactaddItem} activecontactremoveItem={this.props.activecontactremoveItem}
                        archvementaddItem={this.props.archvementaddItem} archvementremoveItem={this.props.archvementremoveItem}
                        favoriteremoveItem={this.props.favoriteremoveItem} favoriteaddItem={this.props.favoriteaddItem} />
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


                                    <div className="col-lg-9 col-md-12 mx-auto">

                                        <div className="alert alert-info" role="alert">
                                            <div className="container text-center">
                                                <strong>Boite de Réception</strong>
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

                                                        {contactusersprofile.contactusers.length >= 0 ?
                                                            <>
                                                                {contactusersprofile.contactusers.length >= 1 ? <>{mapContactusers}</>:<EmptyItems syntaxe={"de Message"} title={"Contacts"}/>}
                                                            </>:null}


                                                    </tbody>
                                                </table>
                                            </div>


                                        {visiable < contactusersprofile.contactusers.length && (
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

PersonalmessagescontactUser.propTypes = {
    loadAllcontactservices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    contactusersprofile: state.contactusers.contactservices

});

export default connect(mapStateToProps, {
    //loadContactusers,
    loadAllcontactservices,
    favoriteaddItem,favoriteremoveItem,
    archvementaddItem,archvementremoveItem,
    activecontactaddItem,activecontactremoveItem,
    deletecontactItem
})(PersonalmessagescontactUser);

