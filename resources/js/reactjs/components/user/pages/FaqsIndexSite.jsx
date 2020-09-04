import React, { useState,useEffect,Fragment } from "react";
import { Link } from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import ContactFromFaqAndOderPageIndex from "./inc/ContactFromFaqAndOderPageIndex";
import FaqUserList from "./inc/FaqUserList";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import HelmetSite from "../../inc/user/HelmetSite";


const FaqsIndexSite = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        dyaxios.get(route('api.sites_faqs'))
            .then(response => {
                setFaqs(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    const mapFaqs = faqs.length >= 0 ? (
        faqs.map(item => {
            return(
                <FaqUserList key={item.id} {...item} />
            )
        })
    ):(
        <></>
    );
    return (
        <Fragment>

            <HelmetSite title={`Questions fréquentes posées aux particuliers (FAQ)  - ${$name_site}`}/>

            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/project20.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">Assistence</h2>
                                </div>
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
                                    <h3 className="text-center title">Questions fréquentes posées aux particuliers</h3>
                                    <h5 className="text-center description">Dans cette rubrique, vous trouverez une réponse aux doutes les plus fréquents de nos utilisateurs.</h5>

                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                        {mapFaqs}

                                    </div>
                                </div>
                            </div>

                        </div>


                        <ContactFromFaqAndOderPageIndex/>

                    </div>



                    <FooterBigUserSite />
                </div>
            </div>

        </Fragment>

    );
};

export default FaqsIndexSite;
