import React, { Component } from "react";

class LogoutModalUser extends Component {
    constructor(props) {
        super(props);

        this.navLogout = this.navLogout.bind(this);
    }

    navLogout() {
        axios.post('/logout')
            .then(() => {
                $.notify(`Merci ${$userIvemo.username} de votre visite sur Ivemo.`, {
                    allow_dismiss: false,
                    type: 'success',
                    animate: {
                        enter: 'animate__animated animate__bounceInDown',
                        exit: 'animate__animated animate__bounceOutUp'
                    }
                });
                setTimeout(() => {window.location.reload(true);}, 1000);
            });
    }

    render() {
        return (
            <div className="modal fade modal-mini modal-primary" id="logoutModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <div className="modal-profile">
                                <i className="now-ui-icons sport_user-run"></i>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link btn-neutral" data-dismiss="modal"><i className="now-ui-icons ui-1_simple-remove" /> Non</button>
                            <button type="button" className="btn btn-link btn-neutral"
                                    onClick={() => this.navLogout()}><i className="now-ui-icons ui-1_check" /> Oui
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogoutModalUser;
