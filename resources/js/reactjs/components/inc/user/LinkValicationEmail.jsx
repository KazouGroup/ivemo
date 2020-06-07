import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

class LinkValicationEmail extends PureComponent {
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

            <div className="alert alert-danger" role="alert">
                <div className="container">
                    <div className="alert-icon">
                        <i className="now-ui-icons travel_info"></i>
                    </div>

                    <strong style={{ cursor: "pointer" }} onClick={() => this.sendItem()}>Confirmez votre adresse e-mail </strong>
                    pour accéder à toutes les fonctionnalités de <b>{$name_site}</b>.
                    Un message de confirmation a été à: <b>{$userIvemo.email}</b> <Link to={`/aide/`} className={`text-white`} >Aide?</Link>
                    {/*
                       <button type="button" className="close" data-dismiss="alert"
                            aria-label="Close">
                      <span aria-hidden="true">
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </span>
                    </button>
                    */}

                </div>
            </div>
        )
    }
}

export default LinkValicationEmail;
