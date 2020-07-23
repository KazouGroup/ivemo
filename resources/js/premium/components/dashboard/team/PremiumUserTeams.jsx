import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
import LoaderLdsDefaultPage from "../../inc/annimation/LoaderLdsDefaultPage";
require("moment/min/locales.min");
moment.locale('fr');

const abbrev = ['', 'k', 'M', 'B', 'T'];
const avatar_style = {
    width: "40px",
    height: "40px",
    top: "15px",
    left: "15px",
    borderRadius: "50%"
};


class PremiumUserTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams_count: [],
            teamsactive_count: [],
            teamsunactive_count: [],
            teams:{user:[]},

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes vous sure de vouloir executer cette action?",
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
                            message: 'Donnée supprimée avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
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
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    unactiveItem(item){
        Swal.fire({
            title: 'Déactiver l\'utilisateur?',
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
                            message: 'Utilisateur désactivé avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

   mydatatables(){
       $(function() {
           $('#datatables').DataTable({
               "pagingType": "full_numbers",
               "lengthMenu": [
                   [10, 25, 50, -1],
                   [10, 25, 50, "All"]
               ],
               responsive: true,
               retrieve:true,
               destroy: true,
               colReorder: true,
               language: {
                   search: "<i class='material-icons'>search</i>",
                   searchPlaceholder: "Search Record"
               },
               sPaginationType: "full_numbers"

           });
       });
   }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.teams_premium_count',[itemuser])).then(response =>
            this.setState({teams_count: response.data}));

        dyaxios.get(route('api.teams_premiumactive_count',[itemuser])).then(response => {
            this.setState({teamsactive_count: response.data})});

        dyaxios.get(route('api.teams_premiumunactive_count',[itemuser])).then(response =>
            this.setState({teamsunactive_count: response.data}));

        dyaxios.get(route('api.teams_premium',[itemuser])).then(response => {
            this.mydatatables();
            this.setState({teams: response.data})
        });

    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(teams_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teams_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teams_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(teamsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(teamsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {teams,teams_count,teamsactive_count,teamsunactive_count} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />

                <PremiumVerticalNavUserSite {...this.props}/>

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite/>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-primary card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">people_alt</i>
                                            </div>
                                            <p className="card-category"><b>Membres</b></p>
                                            <h3 className="card-title"><b>{this.data_countFormatter(teams_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">people_alt</i>
                                                Membres de votre équipe
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">done</i>
                                            </div>
                                            <p className="card-category"><b>Actives</b></p>
                                            <h3 className="card-title"><b>{this.dataactive_countFormatter(teamsactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i>  Activés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-danger card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">remove</i>
                                            </div>
                                            <p className="card-category"><b>Désactives</b></p>
                                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(teamsunactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Désactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                            <div className="card-icon">
                                                <i className="material-icons">people_alt</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Tous les membres de votre équipe</b>
                                            </p>
                                            <h3 className="card-title" style={{color: "red"}}>
                                                <b>{this.data_countFormatter(teams_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">people_alt</i>
                                                <b>Tous les membres de votre équipe</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 className="card-title">
                                                        <b>Membres de votre équipe</b>
                                                    </h4>
                                                    <p className="card-title">Membres de votre équipe</p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                <span>
                                                    <i id="tooltipSize" className="material-icons">people_alt</i>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="toolbar">
                                                <div className="text-center">
                                                    <div className="submit text-center">
                                                        <Link to={`/dashboard/premium/${$userIvemo.slug}/teams/create/`}
                                                              className="btn btn-primary btn-raised ">
                                                             <span className="btn-label">
                                                               <i className="material-icons">add</i>
                                                             </span>
                                                            <b className="title_hover">Ajouter un nouveau membre à votre equipe</b>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>

                                            {teams.length >= 0 ?
                                                <div className="material-datatables">
                                                    <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing={0} width="100%" style={{width:"100%"}}>
                                                        <thead>
                                                        <tr>
                                                            <th><b>Profile</b></th>
                                                            <th><b>Nom</b></th>
                                                            <th><b>Role</b></th>
                                                            <th><b>Status</b></th>
                                                            <th><b>Date</b></th>
                                                            <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tfoot>
                                                        <tr>
                                                            <th>Profile</th>
                                                            <th>Nom</th>
                                                            <th>Role</th>
                                                            <th>Status</th>
                                                            <th>Date</th>
                                                            <th className="text-right">Actions</th>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>
                                                        {teams.map((item) => (
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
                                                                            <span className="badge badge-success"><b>Visible</b></span>
                                                                            :
                                                                            <span className="badge badge-rose"><b>Désactivé</b></span>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>{moment(item.created_at).fromNow()}</td>
                                                                <td className="text-right">
                                                                    {item.status ?
                                                                        <>
                                                                            <Button onClick={() => this.unactiveItem(item)}
                                                                                    className="btn btn-success btn-just-icon btn-sm" title={`Desactiver ${item.full_name}`} >
                                                                                <i className="material-icons">done</i>
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.activeItem(item)}
                                                                                    className="btn btn-rose btn-just-icon btn-sm" title={`Activer ${item.full_name}`} >
                                                                                <i className="material-icons">remove</i>
                                                                            </Button>
                                                                        </>

                                                                    }

                                                                    <Link to={`/dashboard/premium/${item.user.slug}/teams/${item.id}/edit/`} className="btn btn-info btn-sm btn-just-icon" data-toggle="tooltip" data-placement="bottom" title={`Éditer cette ${item.full_name}`}>
                                                                        <i className="material-icons">edit</i>
                                                                    </Link>

                                                                    <Button onClick={() => this.deleteItem(item.id)}
                                                                            className="btn btn-danger btn-sm btn-just-icon" title="Supprimer">
                                                                        <i className="material-icons">delete_forever</i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                :
                                                <LoaderLdsDefaultPage/>}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <FooterPremiumUser/>

                </div>
            </>

        )
    }
}

export default PremiumUserTeams;
