import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import {Button, FormGroup, Row} from "reactstrap";
import {Helmet} from "react-helmet";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";


class VerifyEmailUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sendItem = this.sendItem.bind(this);
    }

    sendItem(e) {
        dyaxios.post(route('verification.resend')).then(() => {

            Swal.fire({
                text: `Un nouveau lien de vérification a été envoyé à votre adresse e-mail ${$userIvemo.email}`,
                icon: 'success',
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info",
                confirmButtonText: 'Ok, compris',
                reverseButtons: true,
            });
        });
    }
    render() {
        return (
            <div className="register-page sidebar-collapse">

                <Helmet title={`Vérifiez votre adresse e-mail - ${$name_site}`}/>

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
                                            <div className="row justify-content-center ">
                                                <div className="col-lg-8 ml-auto mr-auto">
                                                    <h3 className="title text-center">Vérifiez votre adresse e-mail</h3>
                                                    <h5 className="title text-center">
                                                        Avant de continuer, veuillez vérifier votre e-mail pour un lien de vérification. Si vous n'avez pas reçu l'e-mail,
                                                        <Button  className="btn btn-info" onClick={() => this.sendItem()}>cliquez ici pour en demander un autre</Button>
                                                    </h5>
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
        )
    }
}

export default VerifyEmailUser;
