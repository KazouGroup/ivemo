import React, { Component,Fragment } from "react";
import {Link, NavLink} from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import {Helmet} from "react-helmet";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import AnnonceslocationList from "../annonces/annonceloaction/inc/AnnonceslocationList";
import AnnoncesListSkeleton from "../../inc/user/annonce/AnnoncesListSkeleton";
import InfopageshowUserList from "./inc/InfopageshowUserList";


class ConditionutilisationIndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conditionutilisations:{user:[]},
        };
    }

    // lifecycle method
    componentDidMount() {
        fetch(route('api.sites_conditionutilisations')).then(res => res.json()).then((result) => {
            this.setState({
                conditionutilisations: [...result]
            });
        });
    }

    render() {
        const {conditionutilisations} = this.state;
        const mapConditionutilisations = conditionutilisations.length >= 0 ? (
            conditionutilisations.map(item => {
                return(
                    <InfopageshowUserList key={item.id} {...item} />
                )
            })
        ):(
            <></>
        );
        return (
            <Fragment>

                <Helmet title={`Condition utilisations - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="card">
                                    <div className="card-body">

                                        <div className="card card-plain ">

                                            <div className="container">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-12 ml-auto mr-auto">
                                                        {!$guest &&(
                                                            <>
                                                                {!$userIvemo.email_verified_at &&(
                                                                    <LinkValicationEmail/>
                                                                )}
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-10 ml-auto mr-auto">

                                                        {mapConditionutilisations}

                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>




                        <FooterBigUserSite />
                    </div>

                </div>

            </Fragment>

        )
    }
}

export default ConditionutilisationIndexSite;
