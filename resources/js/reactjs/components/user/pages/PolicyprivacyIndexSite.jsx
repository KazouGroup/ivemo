import React, {useState,useEffect,Fragment } from "react";
import {Link, NavLink} from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import InfopageshowUserList from "./inc/InfopageshowUserList";
import HelmetSite from "../../inc/user/HelmetSite";


const PolicyprivacyIndexSite = () => {
    const [policyprivacies, setPolicyprivacies] = useState([]);

    useEffect(() => {

        dyaxios.get(route('api.sites_policyprivacies'))
            .then(response => {
                setPolicyprivacies(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    const mapPolicyprivacies = policyprivacies.length >= 0 ? (
        policyprivacies.map(item => {
            return(
                <InfopageshowUserList key={item.id} {...item} />
            )
        })
    ):(
        <></>
    );
    return (

        <Fragment>

            <HelmetSite title={`Politique de confidentialité - ${$name_site}`}/>

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

                                                    {mapPolicyprivacies}

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
};

export default PolicyprivacyIndexSite;
