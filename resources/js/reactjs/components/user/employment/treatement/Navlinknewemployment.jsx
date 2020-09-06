import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';
import {Button} from "reactstrap";
import Swal from "sweetalert2";

class Navlinknewemployment extends Component  {
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

   render(){
    return (
        <div className="submit text-center">
            {!$guest ?
                <>
                {$userIvemo.email_verified_at ?
                     <>
                     {$userIvemo.status_profile ?
                       <NavLink className="btn btn-danger" to={`/employment/ab/new/`}>
                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                       </NavLink>
                     :
                     <Button
                          className="btn btn-danger" onClick={() => this.infoItem()}>
                         <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                      </Button>
                     }
                     </>
                    :
                    <NavLink className="btn btn-danger" to={`/email/verify/`}>
                         <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                    </NavLink>
                }
                </>
                :
                <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                </a>
            }
        </div>
    )
   }
}

export default React.memo(Navlinknewemployment);
