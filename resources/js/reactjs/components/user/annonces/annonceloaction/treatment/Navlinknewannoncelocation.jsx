import React, { PureComponent } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import {Button} from "reactstrap";
import Swal from "sweetalert2";


class Navlinknewannoncelocation extends PureComponent {
    constructor(props) {
        super(props);
        this.infoItem = this.infoItem.bind(this);

    }

    infoItem() {
        Swal.fire({
            title: 'Bon à savoir',
            text: "Pour poster une annonce, vueillez passer au status professionel",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, modifier le profile',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                window.location = "/profile/account";
            }
        });
    }

    render() {
        return (
            <>
                {!$guest ?
                    <>
                        {$userIvemo.email_verified_at ?
                            <>
                                {$userIvemo.status_profile ?
                                    <NavLink className="btn btn-danger" to={`/al_data/${this.props.match.params.annoncetype}/new/`}>
                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en location</b>
                                    </NavLink>
                                    :
                                    <Button
                                        className="btn btn-danger" onClick={() => this.infoItem()}>
                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en location</b>
                                    </Button>
                                }
                            </>
                            :
                            <NavLink className="btn btn-danger" to={`/al_data/${this.props.match.params.annoncetype}/new/`}>
                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en location</b>
                            </NavLink>
                        }
                    </>
                    :
                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien a location</b>
                    </a>
                }

            </>

        )
    }
}
export default withRouter(Navlinknewannoncelocation);
