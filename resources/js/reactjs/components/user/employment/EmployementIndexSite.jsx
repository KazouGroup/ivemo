import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import Navemployements from "./inc/Navemployements";
import EmploymentListSkeleton from "../../inc/user/employment/EmploymentListSkeleton";
import Navlinknewemployment from "./treatement/Navlinknewemployment";
import SignalFromEmployementForShow from "./inc/SignalFromEmployementForShow";
import EmployementList from "./inc/EmployementList";
import HelmetSite from "../../inc/user/HelmetSite";
import Navemployementsbycity from "./inc/Navemployementsbycity";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    deleteItem,
    favoriteItem,
    loademployments,
    unactiveItem,
    unfavoriteItem
} from "../../../redux/actions/employment/employmentActions";
import EmptyItems from "../../inc/user/EmptyItems";

require("moment/min/locales.min");
moment.locale('fr');

class EmployementIndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return {visiable: old.visiable + 10}
        })
    }

    componentDidMount() {
        this.props.loademployments()
    }


    render() {
        const {employments} = this.props;
        const {visiable} = this.state;
        const mapEmployments = employments.length >= 0 ? (
            employments.slice(0, visiable).map(item => {
                return (
                    <>
                        <EmployementList key={item.id} {...item}
                                         favoriteItem={this.props.favoriteItem}
                                         unfavoriteItem={this.props.unfavoriteItem}
                                         deleteItem={this.props.deleteItem}
                                         unactiveItem={this.props.unactiveItem}/>
                    </>
                )
            })
        ) : (
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Emplois, Formation & Services - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent"
                         color-on-scroll="400">
                        <NavUserSite/>
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true"
                                 style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project16.jpg' + ")"}}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <h3 className="title">Proposez vos services, cherchez des partenaires et gérez
                                            tous vos événements & recrutements facilement et Gratuitement.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">

                                </div>
                            </div>

                            <div className="container">
                                <br/>
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {employments.length !== 0 ? <><Link
                                                className="btn btn-neutral btn-sm ivemoEmptyItemsCta mb-3" to="/"><i
                                                className="now-ui-icons arrows-1_minimal-left"></i> <b>Retour à
                                                l'Accueil</b></Link>
                                                {mapEmployments}</> :
                                            <EmptyItems syntaxe="d'" title={"Emplois & Services"}/>}

                                        <div className="text-center">
                                            {visiable < employments.length ?
                                                <button type="button" onClick={this.loadmoresItem}
                                                        className="btn btn-primary btn-lg btn-block">
                                                    <b>Voir plus d'annonces</b>
                                                </button>
                                                : null}
                                        </div>
                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment/>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">

                                                            <Navemployements/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">

                                                            <Navemployementsbycity/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <SignalFromEmployementForShow/>

                                </div>
                            </div>
                        </div>

                        <FooterBigUserSite/>
                    </div>
                </div>

            </>
        )
    }

}

EmployementIndexSite.propTypes = {
    loademployments: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    employments: store.employments.items

});

export default connect(mapStoreToProps,
    {
        loademployments,
        favoriteItem, unfavoriteItem,
        deleteItem, unactiveItem,
    }
)(EmployementIndexSite);
