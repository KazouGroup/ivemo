import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
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
            teams:[],

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

   mydatatables(){
       $(function() {
           $('#datatable').DataTable({
               "pagingType": "full_numbers",
               "lengthMenu": [
                   [10, 25, 50, -1],
                   [10, 25, 50, "All"]
               ],
               responsive: true,
               retrieve:true,
               destroy: true,
               autoFill: true,
               colReorder: true,
               language: {
                   search: "_INPUT_",
                   searchPlaceholder: "Search records",
               }

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

        fetch(route('api.teams_premium',[itemuser])).then(res => res.json())
            .then((result) => {
                this.mydatatables();
                this.setState({teams: result});

            })
    }

    // lifecycle method
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
        const mapTeamsusers = teams.length ? (
            teams.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <Link to={'/dashboard/users/'}>
                                <img src={item.photo} alt={item.full_name} style={avatar_style}/>
                            </Link>
                        </td>
                        <td>{item.full_name}</td>
                        <td>{item.role}</td>
                        <td className="text-center">
                            <div className="timeline-heading">
                                {item.status ?
                                    <span className="badge badge-success"><b>Visible</b></span>
                                    :
                                    <span className="badge badge-primary"><b>Desactivé</b></span>
                                }
                            </div>
                        </td>
                        <td>{moment(item.created_at).fromNow()}</td>
                        <td className="text-right">
                            {item.status ?
                                <>
                                    <Button onClick={() => this.unactiveItem(item)}
                                            className="btn btn-success btn-icon btn-sm btn-round" title={`Desactiver ${item.full_name}`} >
                                        <i className="now-ui-icons ui-1_check"/>
                                    </Button>
                                </>
                                :
                                <>
                                    <Button onClick={() => this.activeItem(item)}
                                            className="btn btn-primary btn-icon btn-sm btn-round" title={`Activer ${item.full_name}`} >
                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                    </Button>
                                </>

                            }
                            <Link to={`/dashboard/premium/${item.user.slug}/teams/${item.id}/edit/`} className="btn btn-info btn-icon btn-sm btn-info btn-round" title={`Éditer cette ${item.full_name}`}>
                                <i className="now-ui-icons ui-2_settings-90"/>
                            </Link>

                            <button type="button" title={'Supprimer'} onClick={() => this.deleteItem(item.id)}
                                    className="btn btn-danger btn-icon btn-sm btn-danger btn-round">
                                <i className="far fa-trash-alt"/>
                            </button>
                        </td>
                    </tr>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />


                <div className="wrapper ">

                    <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h3 className="title">Teams vos membre</h3>
                                <p className="text-white">Votre teams ou utilisateurs</p>
                            </div>
                        </div>

                        <div className="content">

                            <div className="row">
                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-primary icon-circle">
                                                                <i className="now-ui-icons text_align-center"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.data_countFormatter(teams_count)}</h3>
                                                            <h6 className="stats-title">Membres</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons text_align-center"></i> Membres créer
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-success icon-circle">
                                                                <i className="now-ui-icons ui-1_check"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.dataactive_countFormatter(teamsactive_count)}</h3>
                                                            <h6 className="stats-title">Actives</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_check"/> Membres actives
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-danger icon-circle">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.dataunactive_countFormatter(teamsunactive_count)}</h3>
                                                            <h6 className="stats-title">Desactivés</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_simple-delete"/> Membres désactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="toolbar">

                                                <div className="submit text-center">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/teams/create/`}
                                                          className="btn btn-primary btn-raised btn-round">
                                                           <span className="btn-label">
                                                            <i className="now-ui-icons ui-1_simple-add"></i>
                                                          </span>
                                                        <b className="title_hover">Ajouter un nouveau menbre</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <table id="datatable" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                <thead>
                                                <tr>
                                                    <th><b>Profile</b></th>
                                                    <th><b>Nom complet</b></th>
                                                    <th><b>Position Job</b></th>
                                                    <th className="text-center"><b>Status</b></th>
                                                    <th><b>Crée</b></th>
                                                    <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                </tr>
                                                </thead>
                                                <tfoot>
                                                <tr>
                                                    <th>Profile</th>
                                                    <th>Nom complet</th>
                                                    <th>Position Job</th>
                                                    <th className="text-center">Status</th>
                                                    <th>Crée</th>
                                                    <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                                </tfoot>
                                                <tbody>

                                                {mapTeamsusers}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterPremiumUser/>

                    </div>
                </div>
            </>

        )
    }
}

export default PremiumUserTeams;
