import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../../inc/user/FooterBigUserSite";
import PrivateUserAnnonceslocationList from "../../../../annonces/annonceloaction/inc/PrivateUserAnnonceslocationList";
import NavlinkconfigurationUser from "../../../../configurations/inc/NavlinkconfigurationUser";
import LinkValicationEmail from "../../../../../inc/user/LinkValicationEmail";
import Navannoncelocationsbyuser from "../../../../annonces/annonceloaction/inc/Navannoncelocationsbyuser";
import HelmetSite from "../../../../../inc/user/HelmetSite";
import AnnoncesListSkeleton from "../../../../../inc/user/annonce/AnnoncesListSkeleton";
import Navlinknewannoncelocation from "../../../../annonces/annonceloaction/treatment/Navlinknewannoncelocation";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    unactiveprivatealsItem,
    activeaslItem,
    loadannoncebyuserprivate,
    loadProfileusersforprivate,
} from "../../../../../../redux/actions/annoncelocation/annoncelocationActions";


class PrivateUserAnnonceLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 10,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
    }

    loadItems() {
        this.props.loadannoncebyuserprivate(this.props);
        this.props.loadProfileusersforprivate(this.props);
    }


   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const { annoncelocations,userPrivate } = this.props;
        const {  visiable } = this.state;
        const mapAnnoncelocations = annoncelocations.length >= 0 ? (
                annoncelocations.slice(0, visiable).map(item => {
                return (

                    <PrivateUserAnnonceslocationList key={item.id} {...item} deleteItem={this.deleteItem} activeaslItem={this.props.activeaslItem} unactiveprivatealsItem={this.props.unactiveprivatealsItem} />
                )
            })
        ) : (
            <AnnoncesListSkeleton />
            );
        return (
            <>
                <HelmetSite title={`Annonces locations ${$userIvemo.first_name} - ${$name_site}`}/>

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
                                        <div className="submit text-center">
                                            <Navlinknewannoncelocation {...this.props} />
                                        </div>

                                        <NavlinkconfigurationUser {...this.props} {...userPrivate} />


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navannoncelocationsbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapAnnoncelocations}

                                        {visiable < annoncelocations.length && (
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
                        <FooterBigUserSite />
                    </div>
                </div>

            </>

        )
    }
}

PrivateUserAnnonceLocations.propTypes = {
    loadannoncebyuserprivate: PropTypes.func.isRequired,
    loadProfileusersforprivate: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncelocations: store.annoncelocations.annoncelocations,
    userPrivate: store.profile.profiluser,

});

export default connect(mapStoreToProps,
    {
        loadannoncebyuserprivate,
        loadProfileusersforprivate,
        unactiveprivatealsItem,
        activeaslItem,
        deleteItem,
    }
)(PrivateUserAnnonceLocations);
