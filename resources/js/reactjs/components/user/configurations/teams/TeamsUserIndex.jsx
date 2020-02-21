import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import moment from "moment";
import { Remarkable } from "remarkable";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../inc/NavlinkconfigurationUser";


class TeamsUserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamusers:[],
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }
    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes vous sure de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                const url = route('profile_team_users_destroy.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.teamusers.filter(isNotId);
                    this.setState({teamusers: updatedItems});
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Donné suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }
    activeItem(item){
        Swal.fire({
            title: 'Confirmer l\'activation?',
            text: "êtes vous sure de vouloir confirmer cette action?",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                //Envoyer la requet au server
                let url = route('profile_team_users_active.site',[item.id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //,
                            message: 'Utilisateur activé avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    /** End alert ***/
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    unactiveItem(item){
        Swal.fire({
            title: 'Désactiver l\'utilisateur?',
            text: "êtes vous sure de vouloir confirmer cette action?",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                //Envoyer la requet au server
                let url = route('profile_team_users_unactivated.site',[item.id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'Utilisateur désactiver avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    /** End alert ***/
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    mydatatables(){
        $( function () {
            $('#datatable').DataTable({
                "pagingType": "full_numbers",
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                },
                responsive: true,
                destroy: true,
                retrieve:true,
                autoFill: true,
                colReorder: true,
                "sPaginationType": "full_numbers",

            });
        });
    }

    loadItems() {
        fetch(route('api.teamuserprivate')).then(res => res.json())
            .then((result) => {
                this.setState({
                    teamusers: result
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            })
    }
    reload(){
        this.loadItems()
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }
    render() {
        const {teamusers} = this.state;
        const avatar_style = {
            width: "40px",
            height: "40px",
            top: "15px",
            left: "15px",
            borderRadius: "50%"
        };
        return (

            <>
                <Helmet>
                    <title>Teams {`${$userIvemo.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <NavlinkconfigurationUser/>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="card">
                                            <div className="card-body">

                                                <table id="datatable" className="table table-striped table-bordered"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Profile</b></th>
                                                        <th><b>Nom complet</b></th>
                                                        <th><b>Position Job</b></th>
                                                        <th className="text-center"><b>Status</b></th>
                                                        <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Profile</th>
                                                        <th>Nom complet</th>
                                                        <th>Position Job</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {teamusers.length >= 0 && (
                                                        <>
                                                            {teamusers.map((item) =>(
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        <Link to={'/dashboard/users/'}>
                                                                            <img src={item.photo} alt={item.full_name} style={avatar_style}/>
                                                                        </Link>
                                                                    </td>
                                                                    <td>{item.full_name}</td>
                                                                    <td>{item.role}</td>
                                                                    <td>
                                                                        <div className="timeline-heading">
                                                                            {item.status ?
                                                                                <span
                                                                                    className="badge badge-success"><b>Visible</b></span>
                                                                                :
                                                                                <span
                                                                                    className="badge badge-primary"><b>Non visible</b></span>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        {item.status ?
                                                                           <>
                                                                               <button type="button" rel="tooltip" onClick={() => this.unactiveItem(item)}
                                                                                       className="btn btn-success btn-icon btn-sm" id={'TooltipDesactiver'}>
                                                                                   <i className="now-ui-icons ui-1_check"/>
                                                                               </button>
                                                                               <UncontrolledTooltip placement="bottom" target="TooltipDesactiver" delay={0}>
                                                                                   Desactiver l'utilisateur
                                                                               </UncontrolledTooltip>
                                                                           </>
                                                                            :
                                                                          <>
                                                                              <button type="button" onClick={() => this.activeItem(item)}
                                                                                      className="btn btn-primary btn-icon btn-sm"
                                                                                      id={'TooltipActiver'}>
                                                                                  <i className="now-ui-icons ui-1_simple-delete"/>
                                                                              </button>
                                                                              <UncontrolledTooltip placement="bottom" target="TooltipActiver" delay={0}>
                                                                                  Activer l'utilisateur
                                                                              </UncontrolledTooltip>
                                                                          </>

                                                                        }
                                                                        <Link to={`/profile/personal_settings/teams/${item.id}/edit/`} className="btn btn-info btn-icon btn-sm btn-neutral" id={'TooltipEditer'}>
                                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                                        </Link>
                                                                        <UncontrolledTooltip placement="bottom" target="TooltipEditer" delay={0}>
                                                                            Éditer cette utilisateur
                                                                        </UncontrolledTooltip>

                                                                        <button type="button" id={'TooltipDelete'} onClick={() => this.deleteItem(item.id)}
                                                                                className="btn btn-danger btn-icon btn-sm btn-neutral">
                                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                                        </button>
                                                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                                            Supprimer
                                                                        </UncontrolledTooltip>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}




                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>



                                    </div>


                                </div>


                            </div>



                        </div>


                        <FooterBigUserSite />
                    </div>
                </div>

            </>

        )
    }
}
export default TeamsUserIndex;
