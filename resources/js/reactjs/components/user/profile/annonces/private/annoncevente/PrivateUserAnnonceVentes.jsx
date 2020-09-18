import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../../configurations/inc/NavlinkconfigurationUser";
import PrivateUserAnnonceventeList from "../../../../annonces/annoncevente/inc/PrivateUserAnnonceventeList";
import LinkValicationEmail from "../../../../../inc/user/LinkValicationEmail";
import Navannonceventesbyuser from "../../../../annonces/annoncevente/inc/Navannonceventesbyuser";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    activeaslItem,unactiveprivatealsItem,
    deleteItem,
    loadannoncebyuserprivate,
    loadProfileusersforprivate,
} from "../../../../../../redux/actions/annoncevente/annonceventeActions";
import HelmetSite from "../../../../../inc/user/HelmetSite";
import Navlinknewannoncevente from "../../../../annonces/annoncevente/treatment/Navlinknewannoncevente";
import AnnoncesListSkeleton from "../../../../../inc/user/annonce/AnnoncesListSkeleton";


class PrivateUserAnnonceVentes extends Component {
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


   // Lifecycle Component Method
    componentDidMount() {
        this.props.loadannoncebyuserprivate(this.props);
        this.props.loadProfileusersforprivate(this.props);
    }

    render() {
        const { annonceventes,userPrivate } = this.props;
        const {  visiable } = this.state;
        const mapAnnonceventes = annonceventes.length >= 0 ? (
            annonceventes.slice(0, visiable).map(item => {
                return (

                    <PrivateUserAnnonceventeList key={item.id} {...item} deleteItem={this.props.deleteItem} activeaslItem={this.props.activeaslItem} unactiveprivatealsItem={this.props.unactiveprivatealsItem} />
                )
            })
        ) : (
            <AnnoncesListSkeleton />
            );
        return (
            <>
                <HelmetSite title={`Annonces ventes ${$userIvemo.first_name} - ${$name_site}`}/>


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
                                            <Navlinknewannoncevente {...this.props} />
                                        </div>

                                        <NavlinkconfigurationUser {...this.props} {...userPrivate} />

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navannonceventesbyuser/>

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

                                        {mapAnnonceventes}

                                        {visiable < annonceventes.length && (
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

PrivateUserAnnonceVentes.propTypes = {
    loadannoncebyuserprivate: PropTypes.func.isRequired,
    loadProfileusersforprivate: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annonceventes: store.annonceventes.annonceventes,
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
)(PrivateUserAnnonceVentes);
