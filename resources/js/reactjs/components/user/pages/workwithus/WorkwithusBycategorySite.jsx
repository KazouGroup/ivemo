import React, { useState,useEffect,Fragment } from "react";
import {Link, NavLink} from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import WorkwithusList from "./WorkwithusList";
import HelmetSite from "../../../inc/user/HelmetSite";

const WorkwithusBycategorySite = (props) => {
    const [workwithuses, setWorkwithuses] = useState([]);
    useEffect(() => {
        let itemCategoryworkwithus = props.match.params.categoryworkwithus;
        dyaxios.get(route('api.work_with_uscategoryworkwithus_site',[itemCategoryworkwithus]))
            .then(response => {
                setWorkwithuses(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    const mapWorkwithuses = workwithuses.length >= 0 ? (
        workwithuses.map(item => {
            return(
                <WorkwithusList key={item.id} {...item} />
            )
        })
    ):(
        <></>
    );
    return (

        <Fragment>

            <HelmetSite title={`Travailler avec nous - ${$name_site}`}/>

            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg40.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h3 className="title">
                                        L'immobilier change. Changeons-le ensemble.
                                    </h3>
                                    <Link to={`/work_with_us/`} className="text-white">
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour</b>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main main-raised">

                        <div className="container">

                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <h3 className="text-center title">Qui sommes nous</h3>
                                    <h5 className="text-center description">
                                        {$name_site} est <Link to={`/`}><b>le portail immobilier n ° 1 au (en) {$country}</b></Link>. Il a été lancé en 2020, dans le but d'offrir la meilleure plate-forme pour la publication et la recherche d'annonces immobilières.
                                    </h5>
                                </div>

                                {workwithuses.length >= 1 && (
                                    <Fragment>
                                        <div className="col-md-10 mx-auto">
                                            <h3 className="text-center title">Rejoignez-nous!</h3>
                                            <h5 className="text-center description">
                                                Si vous aimez les défis et souhaitez travailler dans un environnement jeune et dynamique, <b>{$name_site}</b> vous offrira le meilleur pour exprimer tout votre potentiel.
                                            </h5>
                                        </div>


                                        <div className="col-md-12 mx-auto">
                                            <div className="card card-plain">
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <tbody>

                                                            {mapWorkwithuses}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </div>


                        </div>



                    </div>



                    <FooterBigUserSite />
                </div>
            </div>

        </Fragment>
    );
}

export default WorkwithusBycategorySite;
