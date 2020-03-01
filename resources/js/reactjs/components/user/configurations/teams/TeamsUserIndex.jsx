import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip,Tooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../inc/NavlinkconfigurationUser";


class TeamsUserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userteamusers:{teamusers:[]},
            visiable: 10,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 10}
        })
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
                    this.loadItems();

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

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.teamuserprivate', [itemuser])).then(response => this.setState({ userteamusers: response.data, }));
    }
    reload(){
        this.loadItems()
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }
    render() {
        const {userteamusers,visiable} = this.state;
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

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Ajouter un nouveau menbre</b>
                                            </NavLink>
                                        </div>

                                        <NavlinkconfigurationUser {...this.props} {...userteamusers} />

                                    </div>



                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="card">
                                            <div className="card-body">


                                                <div className="table-responsive">
                                                    <table id="datatable" className="table table-striped">
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
                                                        {userteamusers.teamusers.length >= 0 && (
                                                            <>
                                                                {userteamusers.teamusers.slice(0,visiable).map((item) =>(
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
                                                                                    < h6 className = "card-category text-success" >
                                                                                        Visible
                                                                                    </h6>
                                                                                    :
                                                                                    < h6 className = "card-category text-primary" >
                                                                                        Non visible
                                                                                    </h6>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            {item.status ?
                                                                                <>
                                                                                    <Button onClick={() => this.unactiveItem(item)}
                                                                                            className="btn btn-success btn-icon btn-sm" title={item.full_name} >
                                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                                    </Button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <Button onClick={() => this.activeItem(item)}
                                                                                            className="btn btn-primary btn-icon btn-sm" title={item.full_name} >
                                                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                    </Button>
                                                                                </>

                                                                            }
                                                                            <Link to={`/profile/${$userIvemo.slug}/personal_settings/teams/${item.id}/edit/`} className="btn btn-info btn-icon btn-sm btn-neutral" data-toggle="tooltip" data-placement="bottom" title={`Éditer cette ${item.full_name}`}>
                                                                                <i className="now-ui-icons ui-2_settings-90"/>
                                                                            </Link>

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

                                                {visiable < userteamusers.teamusers.length && (
                                                    <div className="row">
                                                        <div className="col-md-4 ml-auto mr-auto text-center">
                                                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                                <b>Voir plus </b>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

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
