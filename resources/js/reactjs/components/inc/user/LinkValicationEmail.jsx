import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';

class LinkValicationEmail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.sendItem = this.sendItem.bind(this);
    }

    sendItem(e) {
        dyaxios.post(route('verification.resend')).then(() => {

                $.notify(
                    {
                        message: `Message de confirmation à <b>${$userIvemo.email}</b>`,
                    },
                    {
                        allow_dismiss: false,
                        type: 'success',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
                        },
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
                    Un message de confirmation a été à: <b>temgoua2011@yahoo.it</b> <Link to={`/aide/`} className={`text-white`} >Aide?</Link>
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
