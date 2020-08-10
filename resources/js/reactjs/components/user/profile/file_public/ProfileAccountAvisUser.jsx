import React, { Fragment, PureComponent } from "react";
import { FaRegEdit, FaRegEyeSlash, FaReply, FaTrashAlt } from "react-icons/fa";
import { Remarkable } from "remarkable";
import { Button, Form, UncontrolledTooltip } from "reactstrap";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from 'react-read-more-less';
import FieldInput from "../../../inc/vendor/FieldInput";
import AvisuserList from "./inc/AvisuserList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteavisItem, loadAvisusersforpublic, unactiveavisItem } from "../../../../redux/actions/profileActions";
import { data } from "jquery";

class ProfileAccountAvisUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            editavis: false,
            editavisresponse: false,
            responseavis: false,
            itemData: [],
            errors: [],
            visiableavis: 5,
            responsevisiableavis: 5,
        };

        this.unactiveresponseItem = this.unactiveresponseItem.bind(this);
        this.deleteresponseItem = this.deleteresponseItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.loadmoresresponseItem = this.loadmoresresponseItem.bind(this);

        this.sendavisItem = this.sendavisItem.bind(this);
        this.updatedavisItem = this.updatedavisItem.bind(this);
        this.updatedavisresponseItem = this.updatedavisresponseItem.bind(this);
        this.cancelresponseCourse = this.cancelresponseCourse.bind(this);
        this.responseavisFromItem = this.responseavisFromItem.bind(this);
        this.sendresponseavisItem = this.sendresponseavisItem.bind(this);
        this.editavisFromItem = this.editavisFromItem.bind(this);
        this.editavisresponseFromItem = this.editavisresponseFromItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

    }

    handleFieldChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
        this.state.errors[event.target.name] = '';
    }

    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    editavisFromItem(item) {
        this.setState({
            editavis: true,
            id: item.id,
            description: item.description,
            itemData: item
        });
    }

    responseavisFromItem(item) {
        this.setState({
            responseavis: true,
            id: item.id,
            itemData: item
        });
    }

    editavisresponseFromItem(lk) {
        this.setState({
            editavisresponse: true,
            id: lk.id,
            description: lk.description,
            itemData: lk
        });
    }

    cancelresponseCourse() {
        this.setState({description: "", editavis: false, editavisresponse: false, responseavis: false});
    };

    loadmoresItem() {
        this.setState((old) => {
            return {visiableavis: old.visiableavis + 10}
        })
    }

    loadmoresresponseItem() {
        this.setState((old) => {
            return {responsevisiableavis: old.responsevisiableavis + 5}
        })
    }

    unactiveresponseItem(id) {
        Swal.fire({
            title: 'Confirmation',
            text: "Etes-vous sure de vouloir confirmer cette action?",
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
                let url = route('profile_avis_users_responseunactivated.site', [id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //,
                            message: 'Votre avis a été désactivé avec succès.'
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'top',
                                align: 'right'
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

    sendavisItem(e) {

        e.preventDefault();

        let avisuserItem = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let url = route('avisuser_public_save.site', [itemuser]);
        dyaxios.post(url, avisuserItem)
            .then(() => {

                $.notify({
                        message: `Votre avis a été sauvegardé avec succés.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });
                this.setState({
                    description: "",
                });
                this.loadItems();
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    sendresponseavisItem(e) {

        e.preventDefault();

        let avisuserItem = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let Id = this.state.itemData.id;
        let url = route('avisuserresponse_public_save.site', [itemuser, Id]);
        dyaxios.post(url, avisuserItem)
            .then(() => {

                this.setState({description: "", responseavis: false,});

                $.notify({
                        message: `Votre avis a été sauvegardé avec succés.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });
                this.setState({
                    description: "",
                });
                this.loadItems();
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    updatedavisresponseItem(e) {

        e.preventDefault();

        let item = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let Id = this.state.itemData.id;
        let url = route('avisuserresponse_public_update.site', [itemuser, Id]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({description: "", editavisresponse: false,});
                this.loadItems();

                $.notify({
                        message: `Votre avis a été mis à jour avec succés.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    updatedavisItem(e) {

        e.preventDefault();

        let item = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let Id = this.state.itemData.id;
        let url = route('avisuser_public_update.site', [itemuser, Id]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({description: "", editavis: false,});
                this.loadItems();

                $.notify({
                        message: `Votre avis a été mis à jour avec succés.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    deleteresponseItem(id) {
        Swal.fire({
            title: 'Confirmation',
            text: "Etes-vous sûr de vouloir executer cette action?",
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
                const url = route('profile_avis_users_responsedestroy.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Votre avis a été supprimé avec succès.'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'top',
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

    loadItems() {
        this.props.loadAvisusersforpublic(this.props);
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }


    getDescription(item) {
        const md = new Remarkable();
        return {__html: md.render(item.description)};
    }

    render() {
        const {avisusers} = this.props;
        const {visiableavis, responsevisiableavis, itemData} = this.state;
        return (
            <Fragment>
                <div className="card">
                    <div className="card-body">
                        <div className="card-header text-center">
                            <h4 className="card-title"><b>Mes Avis</b></h4>
                        </div>
                        <div className="row">
                            <div className="col-md-12 ml-auto mr-auto">
                                <div className="media-area">

                                    {!$guest && !this.state.editavis && !this.state.editavisresponse && (

                                        <>
                                            {($userIvemo.id !== this.props.id) && (
                                                <>
                                                    <h4 className="text-center">
                                                        <small className="text-muted">- Laissez votre avis -</small>
                                                    </h4>
                                                    <Form role="form" onSubmit={this.sendavisItem}
                                                          acceptCharset="UTF-8">
                                                        <div className="media media-post mt-4">
                                                            <div className="avatar">
                                                                {$userIvemo.avatar ?
                                                                    <img src={$userIvemo.avatar}
                                                                         style={{height: "40px", width: "80px"}}
                                                                         alt={$userIvemo.first_name}
                                                                         className="media-object rounded"/>
                                                                    :
                                                                    <Skeleton circle={false} height={40} width={60}/>}
                                                            </div>
                                                            <div className="media-body">
                                                                <FieldInput name="description" type='textarea'
                                                                            minLength="3" maxLength="5000"
                                                                            placeholder=" Laiser votre avis... !"
                                                                            value={this.state.description}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}
                                                                            rows="10"/>
                                                                <div className="media-footer">
                                                                    <Button type="submit"
                                                                            disabled={!this.state.description}
                                                                            className="btn btn-primary pull-right">
                                                                        <i className="now-ui-icons ui-1_send"/> Poster
                                                                    </Button>
                                                                    {this.state.description.length >= 1 && (
                                                                        <button onClick={this.cancelCourse}
                                                                                className="btn btn-secondary pull-right">
                                                                            <i className="now-ui-icons ui-1_simple-remove"/> Annuller
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {avisusers.length > 0 && (
                                        <>
                                            {avisusers.slice(0, visiableavis).map((item) => (
                                                <div key={item.id} className="media mt-4">
                                                    <div className="avatar">
                                                        {item.from.avatar ?
                                                            <img src={item.from.avatar}
                                                                 style={{height: "40px", width: "80px"}}
                                                                 alt={item.from.first_name}
                                                                 className="media-object rounded"/>
                                                            :
                                                            <Skeleton circle={false} height={40} width={60}/>}
                                                    </div>

                                                    <div className="media-body">
                                                        <div className="ivemoAvisUserContainer">
                                                            <AvisuserList {...item} />

                                                            {!$guest && (
                                                                <>
                                                                    <div className="media-footer ivemoAvisUserActions">
                                                                        {$userIvemo.id === item.to.id && (
                                                                            <>
                                                                                <UncontrolledTooltip
                                                                                    placement="bottom"
                                                                                    target="userAvisHide">
                                                                                    Masquer
                                                                                </UncontrolledTooltip>
                                                                                <Button id={"userAvisHide"}
                                                                                        onClick={() => this.props.unactiveavisItem(item.id)}
                                                                                        className="btn btn-success btn-neutral pull-right">
                                                                                    <FaRegEyeSlash/>
                                                                                </Button>
                                                                            </>
                                                                        )}
                                                                        <>
                                                                            {!this.state.editavis && (
                                                                                <>
                                                                                    <UncontrolledTooltip
                                                                                        placement="bottom"
                                                                                        target="userAvisReply">
                                                                                        Répondre
                                                                                    </UncontrolledTooltip>
                                                                                    <button type="button"
                                                                                            id={'userAvisReply'}
                                                                                            onClick={() => this.responseavisFromItem(item)}
                                                                                            className="btn btn-primary btn-neutral pull-right">
                                                                                        <FaReply/>
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </>

                                                                        {/*
                                                                   {$userIvemo.id === item.to.id && (
                                                                       <>
                                                                           {!this.state.editavis && (
                                                                               <button type="button" onClick={() => this.responseavisFromItem(item)}
                                                                                       className="btn btn-primary btn-neutral pull-right">
                                                                                   <i className="now-ui-icons ui-1_simple-add"/> Repondre
                                                                               </button>
                                                                           )}
                                                                       </>
                                                                   )}
                                                                   */}

                                                                        {$userIvemo.id === item.from.id && (
                                                                            <>
                                                                                <>
                                                                                    <UncontrolledTooltip
                                                                                        placement="bottom"
                                                                                        target="userAvisDelete">
                                                                                        Supprimer
                                                                                    </UncontrolledTooltip>
                                                                                    <Button id={"userAvisDelete"}
                                                                                            onClick={() => this.props.deleteavisItem(item.id)}
                                                                                            className="btn btn-danger btn-neutral pull-right">
                                                                                        <FaTrashAlt/>
                                                                                    </Button>
                                                                                </>

                                                                                {!this.state.editavis && (
                                                                                    <>
                                                                                        <UncontrolledTooltip
                                                                                            placement="bottom"
                                                                                            target="userAvisEdit">
                                                                                            Editer
                                                                                        </UncontrolledTooltip>
                                                                                        <Button id={"userAvisEdit"}
                                                                                                onClick={() => this.editavisFromItem(item)}
                                                                                                className="btn btn-info btn-neutral pull-right">
                                                                                            <FaRegEdit/>
                                                                                        </Button>
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        {item.id === itemData.id && (
                                                            <>
                                                                {this.state.responseavis && (
                                                                    <Form role="form"
                                                                          onSubmit={this.sendresponseavisItem}
                                                                          acceptCharset="UTF-8">
                                                                        <div className="media media-post mt-4">
                                                                            <div className="avatar">
                                                                                {$userIvemo.avatar ?
                                                                                    <img src={$userIvemo.avatar}
                                                                                         style={{
                                                                                             height: "40px",
                                                                                             width: "80px"
                                                                                         }}
                                                                                         alt={$userIvemo.first_name}
                                                                                         className="media-object rounded"/>
                                                                                    :
                                                                                    <Skeleton circle={false} height={40}
                                                                                              width={60}/>}
                                                                            </div>
                                                                            <div className="media-body">
                                                                                <FieldInput name="description"
                                                                                            type='textarea'
                                                                                            minLength="3"
                                                                                            maxLength="5000"
                                                                                            placeholder=" Laiser votre avis... !"
                                                                                            value={this.state.description}
                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                            renderErrorFor={this.renderErrorFor}
                                                                                            rows="10"/>
                                                                                <div className="media-footer">
                                                                                    <Button type="submit"
                                                                                            className="btn btn-primary pull-right btn-sm">
                                                                                        <i className="now-ui-icons ui-1_simple-add"/> Répondre
                                                                                    </Button>
                                                                                    <Button
                                                                                        onClick={this.cancelresponseCourse}
                                                                                        className="btn btn-secondary pull-right btn-sm">
                                                                                        <i className="now-ui-icons ui-1_simple-remove"/> Annuller
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Form>
                                                                )}

                                                                {this.state.editavis && (
                                                                    <Form role="form" onSubmit={this.updatedavisItem}
                                                                          acceptCharset="UTF-8">
                                                                        <div className="media media-post mt-4">
                                                                            <div className="avatar">
                                                                                {$userIvemo.avatar ?
                                                                                    <img src={$userIvemo.avatar}
                                                                                         style={{
                                                                                             height: "40px",
                                                                                             width: "80px"
                                                                                         }}
                                                                                         alt={$userIvemo.first_name}
                                                                                         className="media-object rounded"/>
                                                                                    :
                                                                                    <Skeleton circle={false} height={40}
                                                                                              width={60}/>}
                                                                            </div>

                                                                            <div className="media-body">
                                                                                <FieldInput name="description"
                                                                                            type='textarea'
                                                                                            minLength="3"
                                                                                            maxLength="5000"
                                                                                            placeholder=" Laiser votre avis... !"
                                                                                            value={this.state.description}
                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                            renderErrorFor={this.renderErrorFor}
                                                                                            rows="10"/>

                                                                                <div className="media-footer">
                                                                                    <Button type="submit"
                                                                                            className="btn btn-info pull-right btn-sm">
                                                                                        <i className="now-ui-icons ui-1_check"/> Mettre
                                                                                        à jour
                                                                                    </Button>
                                                                                    <Button
                                                                                        onClick={this.cancelresponseCourse}
                                                                                        className="btn btn-secondary pull-right btn-sm">
                                                                                        <i className="now-ui-icons ui-1_simple-remove"/> Annuller
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Form>
                                                                )}
                                                            </>
                                                        )}

                                                        {/* Ici c'est del début de la récuperation des reponses */}

                                                        {item.responseavisusers.slice(0, responsevisiableavis).map((lk) => (
                                                            <div key={lk.id} className="media mt-4">
                                                                <div className="avatar">
                                                                    {lk.user.avatar ?
                                                                        <img src={lk.user.avatar}
                                                                             style={{height: "40px", width: "80px"}}
                                                                             alt={lk.user.first_name}
                                                                             className="media-object rounded"/>
                                                                        :
                                                                        <Skeleton circle={false} height={40}
                                                                                  width={60}/>}
                                                                </div>
                                                                <div className="media-body">
                                                                    <div className="ivemoAvisUserContainer">
                                                                        <div className="ivemoAvisUserComment">
                                                                            <h5 className="media-heading">
                                                                                {lk.user.first_name ||
                                                                                <Skeleton width={80}/>}</h5>
                                                                            <ReadMoreAndLess
                                                                                className="read-more-content"
                                                                                charLimit={250}
                                                                                readMoreText="lire plus"
                                                                                readLessText=""
                                                                            >
                                                                                {lk.description || ""}
                                                                            </ReadMoreAndLess>
                                                                        </div>
                                                                        <small
                                                                            className="text-muted mt-1">&middot; {moment(lk.user.created_at).format('ll')}</small>
                                                                        {!$guest && (
                                                                            <>
                                                                                {$userIvemo.id === lk.user.id && (
                                                                                    <>
                                                                                        <div className="media-footer ivemoAvisUserActions">
                                                                                            {$userIvemo.id === item.to.id && (
                                                                                                <>
                                                                                                    <UncontrolledTooltip
                                                                                                        placement="bottom"
                                                                                                        target="userReplyAvisHide">
                                                                                                        Masquer
                                                                                                    </UncontrolledTooltip>
                                                                                                    <Button
                                                                                                        id={"userReplyAvisHide"}
                                                                                                        onClick={() => this.unactiveresponseItem(lk.id)}
                                                                                                        className="btn btn-success btn-neutral pull-right">
                                                                                                        <FaRegEyeSlash/>
                                                                                                    </Button>
                                                                                                </>
                                                                                            )}
                                                                                            <>
                                                                                                <UncontrolledTooltip
                                                                                                    placement="bottom"
                                                                                                    target="userReplyAvisDelete">
                                                                                                    Supprimer
                                                                                                </UncontrolledTooltip>
                                                                                                <Button
                                                                                                    id={"userReplyAvisDelete"}
                                                                                                    onClick={() => this.deleteresponseItem(lk.id)}
                                                                                                    className="btn btn-danger btn-neutral pull-right">
                                                                                                    <FaTrashAlt/>
                                                                                                </Button>
                                                                                            </>

                                                                                            {!this.state.editavisresponse && (
                                                                                                <>
                                                                                                    <UncontrolledTooltip
                                                                                                        placement="bottom"
                                                                                                        target="userReplyAvisEdit">
                                                                                                        Editer
                                                                                                    </UncontrolledTooltip>
                                                                                                    <button
                                                                                                        id={'userReplyAvisEdit'}
                                                                                                        onClick={() => this.editavisresponseFromItem(lk)}
                                                                                                        className="btn btn-info btn-neutral pull-right">
                                                                                                        <FaRegEdit/>
                                                                                                    </button>
                                                                                                </>
                                                                                            )}
                                                                                        </div>
                                                                                    </>
                                                                                )}

                                                                                {(lk.id === itemData.id && this.state.editavisresponse) && (
                                                                                    <>
                                                                                        <Form role="form"
                                                                                              onSubmit={this.updatedavisresponseItem}
                                                                                              acceptCharset="UTF-8">
                                                                                            <div
                                                                                                className="media media-post mt-4">
                                                                                                <div className="avatar">
                                                                                                    {$userIvemo.avatar ?
                                                                                                        <img
                                                                                                            src={$userIvemo.avatar}
                                                                                                            style={{
                                                                                                                height: "40px",
                                                                                                                width: "80px"
                                                                                                            }}
                                                                                                            alt={$userIvemo.first_name}
                                                                                                            className="media-object rounded"/>
                                                                                                        : <Skeleton
                                                                                                            circle={false}
                                                                                                            height={40}
                                                                                                            width={60}/>}
                                                                                                </div>

                                                                                                <div
                                                                                                    className="media-body">
                                                                                                    <FieldInput
                                                                                                        name="description"
                                                                                                        type='textarea'
                                                                                                        minLength="3"
                                                                                                        maxLength="5000"
                                                                                                        placeholder=" Laiser votre avis... !"
                                                                                                        value={this.state.description}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        rows="10"/>
                                                                                                    <div
                                                                                                        className="media-footer">
                                                                                                        <Button
                                                                                                            type="submit"
                                                                                                            className="btn btn-info pull-right btn-sm">
                                                                                                            <i className="now-ui-icons ui-1_check"/> Mettre
                                                                                                            à jour
                                                                                                        </Button>
                                                                                                        <Button
                                                                                                            onClick={this.cancelresponseCourse}
                                                                                                            className="btn btn-secondary pull-right btn-sm">
                                                                                                            <i className="now-ui-icons ui-1_simple-remove"/> Annuller
                                                                                                        </Button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Form>
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {responsevisiableavis < item.responseavisusers.length && (
                                                            <div className="row">
                                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                                    <a style={{cursor: "pointer"}}
                                                                       onClick={this.loadmoresresponseItem}
                                                                       className="text-info">
                                                                        <b>Voir plus de reponses</b>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {/* Fin */}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <br/>
                                    {visiableavis < avisusers.length && (
                                        <div className="row">
                                            <div className="col-md-4 ml-auto mr-auto text-center">
                                                <a style={{cursor: "pointer"}} onClick={this.loadmoresItem}
                                                   className="text-info">
                                                    <b>Voir plus</b>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

ProfileAccountAvisUser.propTypes = {
    loadAvisusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    avisusers: store.profile.avisusers
});

export default connect(mapStoreToProps, {
    loadAvisusersforpublic, deleteavisItem, unactiveavisItem
})(ProfileAccountAvisUser);
