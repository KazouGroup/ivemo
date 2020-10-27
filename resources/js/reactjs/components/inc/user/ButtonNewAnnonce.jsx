import React, { PureComponent } from "react";
import {NavLink} from 'react-router-dom';
import Swal from "sweetalert2";



class ButtonNewAnnonce extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};

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
        const {classNameDrop} = this.props;
        return (
            <>
                {$userIvemo.email_verified_at ?
                    <>
                        {$userIvemo.status_profile ?
                            <li className={`${classNameDrop} dropdown`}>
                                <a href={void(0)} style={{cursor:"pointer"}} className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                    <i className="now-ui-icons ui-1_simple-add" aria-hidden="true"/>
                                    <b>Poster votre annonce</b>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <NavLink to={`/al_data/locations/new/`} className="dropdown-item">
                                        <i className="now-ui-icons business_bank"/> Locations
                                    </NavLink>
                                    <NavLink to={`/ar_data/reservations/new/`} className="dropdown-item">
                                        <i className="now-ui-icons education_agenda-bookmark"/> Reservations
                                    </NavLink>
                                    <NavLink to={`/av_data/ventes/new/`} className="dropdown-item">
                                        <i className="now-ui-icons location_map-big"/> Ventes
                                    </NavLink>
                                    <NavLink to={`/employment/ab/new/`} className="dropdown-item">
                                        <i className="now-ui-icons business_briefcase-24"/> Emplois & Services
                                    </NavLink>
                                </div>
                            </li>
                            :
                            <li className={classNameDrop}>
                                <a href={void (0)} style={{cursor :"pointer"}} className="nav-link" onClick={() => this.infoItem()}>
                                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                                </a>
                            </li>
                        }
                    </>
                    :
                    <li className="nav-item">
                        <NavLink className="nav-link" to={`/email/verify/`}>
                            <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                        </NavLink>
                    </li>
                }
            </>


        )
    }
}


export default ButtonNewAnnonce;
