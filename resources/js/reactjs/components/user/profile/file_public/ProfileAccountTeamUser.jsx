import React, { PureComponent } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


class ProfileAccountTeamUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            teamusers: [],
            visiable: 6,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return {visiable: old.visiable + 6}
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

                const url = route('profile_team_users_destroy.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.teamusers.filter(isNotId);
                    this.setState({teamusers: updatedItems});
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Donné suprimée avec succès'
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

    // Lifecycle Component Method
    componentDidMount() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.teamuserpublique', [itemuser])).then(response =>
            this.setState({
                teamusers: [...response.data],
            }));
    }

    getDescription(item) {
        return {__html: item.description};
    }

    render() {
        const {teamusers, visiable} = this.state;
        return (
            <>
                {teamusers.length > 0 && (

                    <div className="card">
                        <div className="card-body">
                            <div className="card-header text-center">
                                <h4 className="card-title"><b>Team</b></h4>
                            </div>

                            <div className="row">

                                {teamusers.slice(0, visiable).map((item) => (

                                    <div key={item.id} className="col-md-4 mx-auto">
                                        <div className="card card-profile card-plain">
                                            <div className="card-avatar">
                                                <img className="img img-raised" src={item.photo}/>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">{item.full_name}</h4>
                                                <h6 className="category text-primary">
                                                    {item.role}
                                                </h6>
                                                <h6 className="category"
                                                    dangerouslySetInnerHTML={this.getDescription(item)}/>

                                            </div>


                                            {!$guest && (
                                                <>
                                                    {$userIvemo.id === item.user.id && (
                                                        <>
                                                            <UncontrolledTooltip placement="bottom"
                                                                                 target="TooltipEditer" delay={0}>
                                                                Éditer cette utilisateur
                                                            </UncontrolledTooltip>
                                                            <NavLink
                                                                to={`/profile/${$userIvemo.slug}/personal_settings/teams/${item.id}/edit/`}
                                                                className="btn btn-sm btn-info btn-icon btn-sm"
                                                                id="TooltipEditer">
                                                                <i className="now-ui-icons ui-2_settings-90"/>
                                                            </NavLink>
                                                            <button type="button" id={'TooltipDelete'}
                                                                    onClick={() => this.deleteItem(item.id)}
                                                                    className="btn btn-icon btn-sm btn-danger">
                                                                <i className="now-ui-icons ui-1_simple-remove"/>
                                                            </button>
                                                            <UncontrolledTooltip placement="bottom"
                                                                                 target="TooltipDelete" delay={0}>
                                                                Supprimer
                                                            </UncontrolledTooltip>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                        </div>
                                    </div>
                                ))}


                            </div>

                            {visiable < teamusers.length && (
                                <div className="row">
                                    <div className="col-md-4 ml-auto mr-auto text-center">
                                        <button type="button" onClick={this.loadmoresItem}
                                                className="btn btn-primary btn-block">
                                            <b>Voir plus </b>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </>


        )
    }

}

export default ProfileAccountTeamUser;
