import React, { Component,Fragment } from "react";
import { Remarkable } from "remarkable";
import { Button, Form, InputGroup } from "reactstrap";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from 'react-read-more-less';
import moment from "moment";
import FieldInput from "../../../../inc/vendor/FieldInput";
import AvisuserList from "./inc/AvisuserList";

class ProfilePublicAccountAvisUser extends Component {
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
            avisusers: {to:[],from:[],responseavisusers:{user:[]}},
            visiableavis: 5,
            responsevisiableavis: 5,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
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
            id:item.id,
            description:item.description,
            itemData: item
        });
    }

    responseavisFromItem(item) {
        this.setState({
            responseavis: true,
            id:item.id,
            itemData: item
        });
    }

    editavisresponseFromItem(lk) {
        this.setState({
            editavisresponse: true,
            id:lk.id,
            description:lk.description,
            itemData: lk
        });
    }

    cancelresponseCourse(){
        this.setState({description: "",editavis: false,editavisresponse: false,responseavis: false});
    };

    loadmoresItem() {
        this.setState((old) => {
            return { visiableavis: old.visiableavis + 10 }
        })
    }

    loadmoresresponseItem() {
        this.setState((old) => {
            return { responsevisiableavis: old.responsevisiableavis + 5 }
        })
    }

    unactiveresponseItem(id) {
        Swal.fire({
            title: 'Confirmer masquer?',
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
                let url = route('profile_avis_users_responseunactivated.site', [id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //,
                            message: 'L\'avis à été desactivé avec succès'
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
                    $.notify("Ooop! Something wrong. Try later", {
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

    unactiveItem(id) {
        Swal.fire({
            title: 'Confirmer masquer?',
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.avisusers.filter(isNotId);
                this.setState({avisusers: updatedItems});

                //Envoyer la requet au server
                let url = route('profile_avis_users_unactivated.site', [id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //,
                            message: 'L\'avis à été desactivé avec succès'
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
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
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
                        message: `Votre avis a été bien sauvegardé`
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
        let url = route('avisuserresponse_public_save.site', [itemuser,Id]);
        dyaxios.post(url, avisuserItem)
            .then(() => {

                this.setState({description: "",responseavis: false,});

                $.notify({
                        message: `Votre avis a été bien sauvegardé`
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
        let url = route('avisuserresponse_public_update.site', [itemuser,Id]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({description: "",editavisresponse: false,});
                this.loadItems();

                $.notify({
                        message: `Mise à jour bien sauvegardé`
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

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Something wrong. Try later", {
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
        let url = route('avisuser_public_update.site', [itemuser,Id]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({description: "",editavis: false,});
                this.loadItems();

                $.notify({
                        message: `Mise à jour bien sauvegardé`
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

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    deleteresponseItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
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


                const url = route('profile_avis_users_responsedestroy.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Votre avis à été supprimée avec success '
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
                    $.notify("Ooop! Une erreur est survenue", {
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

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.avisusers.filter(isNotId);
                this.setState({avisusers: updatedItems});

                const url = route('profile_avis_users_destroy.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Votre avis à été supprimée avec success '
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
                    $.notify("Ooop! Une erreur est survenue", {
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
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.avisuserpublique', [itemuser]))
            .then(response => {
                this.setState({
                    avisusers: response.data
                });
            });
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }


    getDescription(item) {
        const md = new Remarkable();
        return { __html: md.render(item.description) };
    }
    render() {
        const { avisusers,visiableavis,responsevisiableavis,itemData } = this.state;
        return (
            <Fragment>
                <div className="card">
                    <div className="card-body">

                        <div className="card-header text-center">
                            <h4 className="card-title"><b>Avis</b></h4>
                        </div>

                        <div className="row">
                            <div className="col-md-12 ml-auto mr-auto">

                                    <div className="media-area">


                                    {!$guest && !this.state.editavis && !this.state.editavisresponse && (

                                        <>
                                            <h4 className="text-center">
                                                <small className="text-muted">- Laisser votre avis -</small>
                                            </h4>

                                            <Form role="form" onSubmit={this.sendavisItem} acceptCharset="UTF-8">

                                                <div className="media media-post">
                                                    <div className="avatar">
                                                        {$userIvemo.avatar ?
                                                            <img src={$userIvemo.avatar}
                                                                style={{ height: "40px", width: "80px" }}
                                                                alt={$userIvemo.first_name}
                                                                className="media-object img-raised rounded" />
                                                            : <Skeleton circle={false} height={40} width={80} />}
                                                    </div>

                                                    <div className="media-body">

                                                        <FieldInput name="description" type='textarea' minLength="3" maxLength="5000" placeholder=" Laiser votre avis... !" value={this.state.description}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    renderErrorFor={this.renderErrorFor} rows="10"/>

                                                        <div className="media-footer">

                                                            <Button type="submit" disabled={!this.state.description}
                                                                    className="btn btn-primary pull-right">
                                                                <i className="now-ui-icons ui-1_send" /> Poster
                                                            </Button>
                                                            {this.state.description.length >= 1 && (
                                                                <button onClick={this.cancelCourse}
                                                                    className="btn btn-secondary pull-right">
                                                                    <i className="now-ui-icons ui-1_simple-remove" /> Annuller
                                                                </button>
                                                            )}


                                                        </div>
                                                    </div>
                                                </div>

                                            </Form>

                                        </>

                                        )}

                                        {avisusers.length > 0 && (
                                        <>
                                           {avisusers.slice(0, visiableavis).map((item) => (

                                               <div key={item.id} className="media">
                                                   <div className="media-body">

                                                       <AvisuserList {...item} />

                                                       {!$guest && (
                                                           <>

                                                               <div className="media-footer">
                                                                   {$userIvemo.id === item.to.id && (
                                                                       <Button onClick={() => this.unactiveItem(item.id)}
                                                                               className="btn btn-success btn-neutral pull-right">
                                                                           <i className="now-ui-icons ui-1_check" /> Masquer
                                                                       </Button>
                                                                   )}

                                                                   <>
                                                                       {!this.state.editavis && (
                                                                           <button type="button" onClick={() => this.responseavisFromItem(item)}
                                                                                   className="btn btn-primary btn-neutral pull-right">
                                                                               <i className="now-ui-icons ui-1_simple-add"/> Repondre
                                                                           </button>
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
                                                                           <Button onClick={() => this.deleteItem(item.id)}
                                                                                   className="btn btn-danger btn-neutral pull-right">
                                                                               <i className="far fa-trash-alt"></i> Supprimer
                                                                           </Button>

                                                                           {!this.state.editavis && (
                                                                               <Button onClick={() => this.editavisFromItem(item)}
                                                                                       className="btn btn-info btn-neutral pull-right">
                                                                                   <i className="far fa-edit"/> Editer
                                                                               </Button>
                                                                           )}
                                                                       </>
                                                                   )}

                                                               </div>

                                                           </>
                                                       )}


                                                       {item.id === itemData.id && (

                                                           <>
                                                               {this.state.responseavis && (

                                                                   <Form role="form" onSubmit={this.sendresponseavisItem} acceptCharset="UTF-8">

                                                                       <div className="media media-post">
                                                                           <div className="avatar">
                                                                               {$userIvemo.avatar ?
                                                                                   <img src={$userIvemo.avatar}
                                                                                        style={{ height: "40px", width: "80px" }}
                                                                                        alt={$userIvemo.first_name}
                                                                                        className="media-object img-raised rounded" />
                                                                                   : <Skeleton circle={false} height={40} width={80} />}
                                                                           </div>

                                                                           <div className="media-body">

                                                                               <FieldInput name="description" type='textarea' minLength="3" maxLength="5000" placeholder=" Laiser votre avis... !" value={this.state.description}
                                                                                           handleFieldChange={this.handleFieldChange}
                                                                                           hasErrorFor={this.hasErrorFor}
                                                                                           renderErrorFor={this.renderErrorFor} rows="10"/>

                                                                               <div className="media-footer">

                                                                                   <Button type="submit"
                                                                                           className="btn btn-primary pull-right btn-sm">
                                                                                       <i className="now-ui-icons ui-1_simple-add"/> Repondre
                                                                                   </Button>

                                                                                   <Button onClick={this.cancelresponseCourse}
                                                                                           className="btn btn-secondary pull-right btn-sm">
                                                                                       <i className="now-ui-icons ui-1_simple-remove" /> Annuller
                                                                                   </Button>

                                                                               </div>
                                                                           </div>
                                                                       </div>

                                                                   </Form>

                                                               )}

                                                               {this.state.editavis && (

                                                                   <Form role="form" onSubmit={this.updatedavisItem} acceptCharset="UTF-8">

                                                                       <div className="media media-post">
                                                                           <div className="avatar">
                                                                               {$userIvemo.avatar ?
                                                                                   <img src={$userIvemo.avatar}
                                                                                        style={{ height: "40px", width: "80px" }}
                                                                                        alt={$userIvemo.first_name}
                                                                                        className="media-object img-raised rounded" />
                                                                                   : <Skeleton circle={false} height={40} width={80} />}
                                                                           </div>

                                                                           <div className="media-body">

                                                                               <FieldInput name="description" type='textarea' minLength="3" maxLength="5000" placeholder=" Laiser votre avis... !" value={this.state.description}
                                                                                           handleFieldChange={this.handleFieldChange}
                                                                                           hasErrorFor={this.hasErrorFor}
                                                                                           renderErrorFor={this.renderErrorFor} rows="10"/>

                                                                               <div className="media-footer">

                                                                                   <Button type="submit"
                                                                                           className="btn btn-info pull-right btn-sm">
                                                                                       <i className="now-ui-icons ui-1_check" /> Mettre à jour
                                                                                   </Button>

                                                                                   <Button onClick={this.cancelresponseCourse}
                                                                                           className="btn btn-secondary pull-right btn-sm">
                                                                                       <i className="now-ui-icons ui-1_simple-remove" /> Annuller
                                                                                   </Button>

                                                                               </div>
                                                                           </div>
                                                                       </div>

                                                                   </Form>

                                                               )}


                                                           </>

                                                       )}


                                                       {/* Ici c'est del debut de la recuperation des reponses*/}

                                                       {item.responseavisusers.slice(0, responsevisiableavis).map((lk) => (

                                                           <div key={lk.id} className="media">
                                                               <div className="avatar">
                                                                   {lk.user.avatar ?
                                                                       <img src={lk.user.avatar}
                                                                            style={{ height: "40px", width: "80px" }}
                                                                            alt={lk.user.first_name}
                                                                            className="media-object img-raised rounded" />
                                                                       : <Skeleton circle={false} height={40} width={80} />}
                                                               </div>
                                                               <div className="media-body">

                                                                   <h5 className="media-heading"><b> Reponse</b> {lk.user.first_name || <Skeleton width={80}/>}</h5>
                                                                   <ReadMoreAndLess
                                                                       className="read-more-content"
                                                                       charLimit={250}
                                                                       readMoreText="lire plus"
                                                                       readLessText=""
                                                                   >
                                                                       {lk.description || ""}
                                                                   </ReadMoreAndLess>

                                                                   {!$guest && (
                                                                       <>
                                                                           {$userIvemo.id === item.to.id && (
                                                                               <Button onClick={() => this.unactiveresponseItem(lk.id)}
                                                                                       className="btn btn-success btn-neutral pull-right">
                                                                                   <i className="now-ui-icons ui-1_check" /> Masquer
                                                                               </Button>
                                                                           )}


                                                                            {$userIvemo.id === lk.user.id && (
                                                                               <>
                                                                                   <div className="media-footer">
                                                                                       <Button onClick={() => this.deleteresponseItem(lk.id)}
                                                                                               className="btn btn-danger btn-neutral pull-right">
                                                                                           <i className="far fa-trash-alt"></i> Supprimer
                                                                                       </Button>

                                                                                       {!this.state.editavisresponse && (
                                                                                           <button onClick={() => this.editavisresponseFromItem(lk) }
                                                                                                   className="btn btn-info btn-neutral pull-right">
                                                                                               <i className="far fa-edit"/> Editer
                                                                                           </button>
                                                                                       )}
                                                                                   </div>
                                                                               </>
                                                                           )}

                                                                           <br/>
                                                                           {(lk.id === itemData.id && this.state.editavisresponse) && (
                                                                               <>
                                                                                   <Form role="form" onSubmit={this.updatedavisresponseItem} acceptCharset="UTF-8">

                                                                                       <div className="media media-post">
                                                                                           <div className="avatar">
                                                                                               {$userIvemo.avatar ?
                                                                                                   <img src={$userIvemo.avatar}
                                                                                                        style={{ height: "40px", width: "80px" }}
                                                                                                        alt={$userIvemo.first_name}
                                                                                                        className="media-object img-raised rounded" />
                                                                                                   : <Skeleton circle={false} height={40} width={80} />}
                                                                                           </div>

                                                                                           <div className="media-body">

                                                                                               <FieldInput name="description" type='textarea' minLength="3" maxLength="5000" placeholder=" Laiser votre avis... !" value={this.state.description}
                                                                                                           handleFieldChange={this.handleFieldChange}
                                                                                                           hasErrorFor={this.hasErrorFor}
                                                                                                           renderErrorFor={this.renderErrorFor} rows="10"/>

                                                                                               <div className="media-footer">

                                                                                                   <Button type="submit"
                                                                                                           className="btn btn-info pull-right btn-sm">
                                                                                                       <i className="now-ui-icons ui-1_check" /> Mettre à jour
                                                                                                   </Button>

                                                                                                   <Button onClick={this.cancelresponseCourse}
                                                                                                           className="btn btn-secondary pull-right btn-sm">
                                                                                                       <i className="now-ui-icons ui-1_simple-remove" /> Annuller
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

                                                       ))}

                                                       {responsevisiableavis < item.responseavisusers.length && (
                                                           <div className="row">
                                                               <div className="col-md-4 ml-auto mr-auto text-center">
                                                                   <a style={{cursor:"pointer"}} onClick={this.loadmoresresponseItem} className="text-info">
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
                                        <br />
                                        {visiableavis < avisusers.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <a style={{cursor:"pointer"}} onClick={this.loadmoresItem} className="text-info">
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

export default ProfilePublicAccountAvisUser;
