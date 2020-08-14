import React, {Component, Fragment, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import ContactFromPublicitePageIndex from "./inc/ContactFromPublicitePageIndex";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import HelmetSite from "../../inc/user/HelmetSite";



const PubliciteIndexSite = () => {

    return (

        <Fragment>

            <HelmetSite title={`Publicité sur la plate forme - ${$name_site}`}/>

            <div className="landing-page sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg40.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <h2 className="title">Vos clients recherchent de l'immobilier?
                                    Avec nous, vous frappez la marque</h2>
                            </div>
                        </div>
                    </div>

                    <div className="main main-raised">
                        <br/>
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

                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <h3 className="text-center title">{$name_site}<small><sub>{$country_sigle}</sub></small></h3>
                                    <h5 className="text-center description">
                                        <b> Nous soutenons votre campagne de communication auprès de clients potentiels avec des campagnes de bannières, des positions exclusives sur une base géographique, le marketing par e-mail, en fournissant également un soutien pour le développement graphique</b>
                                    </h5>
                                    <h5 className="text-center title">Appelez le {$phone_number} ou <a className="btn btn-primary" href="#recallForm">Demandez à être contacté</a></h5>
                                </div>
                            </div>


                            <div className="row">

                                <div className="card card-plain card-blog">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <h3 className="card-title">
                                                Nos clients
                                            </h3>
                                            <p className="card-description">
                                                Nos clients sont des entreprises de nombreux secteurs.
                                                Évidemment du secteur immobilier, comme les agences immobilières et les entreprises de construction,
                                                ou du secteur de la maison et du meuble. Mais aussi des sociétés de services
                                                telles que l'assurance, la téléphonie, le gaz et l'électricité et des institutions
                                                du secteur financier telles que les banques et les sociétés de courtage de crédit.
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="card-image">
                                                <img className="img img-raised rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain card-blog">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <h3 className="card-title">
                                                Page d'accueil
                                            </h3>
                                            <p className="card-description">
                                                La page d'accueil est une page Web dédiée à une campagne particulière,
                                                c'est un outil extrêmement efficace dans le cas de nouveaux développements
                                                présenter les propositions de manière complète et articulée.
                                                La page montre les forces, les concepts derrière le
                                                projet et localisation dans le but de maximiser le nombre de contacts générés.
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="card-image">
                                                <img className="img img-raised rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain card-blog">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <h3 className="card-title">
                                                Conception de bannière
                                            </h3>
                                            <p className="card-description">
                                                Les campagnes de bannières sont efficaces à la fois
                                                dans la communication de contenu visuel (par exemple des éléments
                                                d'une nouvelle construction) et dans le soutien de la reconnaissance de la marque.
                                                Grâce à la recherche géolocalisée, il est possible de communiquer avec des
                                                utilisateurs dans des zones géographiques spécifiques, voire exclusivement.
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="card-image">
                                                <img className="img img-raised rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <ContactFromPublicitePageIndex/>

                    </div>


                </div>

                <FooterBigUserSite />
            </div>

        </Fragment>
    );
};

export default PubliciteIndexSite;
