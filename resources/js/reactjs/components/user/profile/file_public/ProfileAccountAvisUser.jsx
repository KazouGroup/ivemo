import React, { Component,Fragment } from "react";
import { Remarkable } from "remarkable";
import { Button, Form, InputGroup, UncontrolledTooltip } from "reactstrap";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from 'react-read-more-less';
import moment from "moment";

class ProfileAccountAvisUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            response_description: '',
            avisusers: {to:[],from:[]},
            item: {},
            errors: [],
            editing: false,
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 10,
        };

        this.sendavisItem = this.sendavisItem.bind(this);
        this.cancelCourse = this.cancelCourse.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateavisItem = this.updateavisItem.bind(this);
        this.editFromItem = this.editFromItem.bind(this);
        this.responseFromItem = this.responseFromItem.bind(this);
        this.responseavisItem = this.responseavisItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
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


    editFromItem(item) {
        //this.setEditing(true);

        $('#updateResponse').modal('show');
        this.setState({
          id:item.id,
          description:item.description,
          response_description:item.response_description,
          item: item
        });
        //console.log(item);
      }

    responseFromItem(item) {
        //this.setEditing(true);

        $('#addNew').modal('show');
        this.setState({
          response_description:item.response_description,
          item: item
        });
      }

    cancelCourse(){
        this.setState({
            description: "",
            response_description: "",
        });
    };

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

                const url = route('profile_avis_users_destroy.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.avisusers.filter(isNotId);
                    this.setState({avisusers: updatedItems});
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

                //Envoyer la requet au server
                let url = route('profile_avis_users_unactivated.site', [id]);
                dyaxios.get(url).then(() => {

                    this.loadItems();
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
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
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

    sendavisItem(e) {

        e.preventDefault();

        let avisuserItem = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let url = route('avisuser_public_save.site', [itemuser]);
        dyaxios.post(url, avisuserItem)
            .then(response => {

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
                            enter: "animated fadeInUp",
                            exit: "animated fadeOutDown"
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

    updateavisItem(e) {

        e.preventDefault();

        let item = {
            description: this.state.description,
        };
        let itemuser = this.props.match.params.user;
        let Id = this.state.item.id;
        let url = route('avisuser_public_update.site', [itemuser,Id]);
        dyaxios.put(url, item)
            .then(response => {

                //Masquer le modal après la création
                $('#updateResponse').modal('hide');

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
                            enter: "animated fadeInUp",
                            exit: "animated fadeOutDown"
                        },
                    });

                this.loadItems();

            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }
    responseavisItem(e) {

        e.preventDefault();

        let item = {
            response_description: this.state.response_description,
        };
        let itemuser = this.props.match.params.user;
        let Id = this.state.item.id;
        let url = route('avisuser_public_response.site', [itemuser,Id]);
        dyaxios.put(url, item)
            .then(response => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                    message: `Reponse bien sauvegardé`
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

                this.setState({
                    response_description: "",
                });

                this.loadItems();

            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.avisuserpublique', [itemuser]))
            .then(response => {
                this.setState({
                    avisusers: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                });
            });
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    handlePageChange(pageNumber) {
        let itemuser = this.props.match.params.user;
        dyaxios.get(`/api/@${itemuser}/avis_users?page=` + pageNumber)
            .then(response => {
                this.setState({
                    avisusers: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                });
            });
    }

    getDescription(item) {
        const md = new Remarkable();
        return { __html: md.render(item.description) };
    }
    render() {
        const { avisusers } = this.state;
        return (
            <Fragment>
                <div className="card">
                    <div className="card-body">

                        <div className="card-header text-center">
                            <h4 className="card-title"><b>Avis</b></h4>
                        </div>

                        <div className="row">
                            <div className="col-md-12 ml-auto mr-auto">

                                {avisusers.length > 0 && (

                                    <div className="media-area">

                                        {avisusers.map((item) => (

                                            <div key={item.id} className="media">
                                                <div className="media-body">
                                                    <h5 className="media-heading">{item.from.first_name || <Skeleton width={80}/>}
                                                        <small
                                                            className="text-muted">&middot; {moment(item.created_at).format('ll')}</small>
                                                    </h5>

                                                    <div className="text-justify">
                                                        <ReadMoreAndLess
                                                            className="read-more-content"
                                                            charLimit={250}
                                                            readMoreText="(Plus)"
                                                            readLessText=""
                                                        >
                                                            {item.description || <Skeleton count={5}/>}
                                                        </ReadMoreAndLess>
                                                    </div>

                                                    {!$guest && (
                                                        <Fragment>

                                                            <div className="media-footer">
                                                                {$userIvemo.status_user && (
                                                                    <Button onClick={() => this.unactiveItem(item.id)}
                                                                            className="btn btn-success btn-neutral pull-right">
                                                                        <i className="now-ui-icons ui-1_check" /> Masquer
                                                                    </Button>
                                                                )}

                                                                {$userIvemo.id === item.to.id && (
                                                                    <Fragment>
                                                                        {item.response_description === null &&(
                                                                            <button type="button" onClick={() => this.responseFromItem(item) }
                                                                                    className="btn btn-primary btn-neutral pull-right">
                                                                                <i className="now-ui-icons ui-1_send" /> Repondre
                                                                            </button>
                                                                        )}
                                                                    </Fragment>
                                                                )}

                                                                {$userIvemo.id === item.from.id && (
                                                                    <Fragment>
                                                                        <Button onClick={() => this.deleteItem(item.id)}
                                                                                className="btn btn-danger btn-neutral pull-right">
                                                                            <i className="far fa-trash-alt"></i> Supprimer
                                                                        </Button>

                                                                        <button onClick={() => this.editFromItem(item) }
                                                                                className="btn btn-info btn-neutral pull-right">
                                                                            <i className="far fa-edit"/> Editer
                                                                        </button>
                                                                    </Fragment>
                                                                )}

                                                            </div>

                                                        </Fragment>
                                                    )}

                                                    {item.response_description !== null && (

                                                        <div className="media">
                                                            <div className="avatar">
                                                                <img className="media-object img-raised rounded"
                                                                     alt={item.to.first_name}
                                                                     src={item.to.avatar} />
                                                            </div>
                                                            <div className="media-body">

                                                                <h5 className="media-heading"><b>Reponse</b> {item.to.first_name || <Skeleton width={80}/>}</h5>
                                                                <ReadMoreAndLess
                                                                    className="read-more-content"
                                                                    charLimit={250}
                                                                    readMoreText="(Plus)"
                                                                    readLessText="(Moins)"
                                                                >
                                                                    {item.response_description || ""}
                                                                </ReadMoreAndLess>


                                                                {!$guest && (
                                                                    <>
                                                                        {$userIvemo.id === item.to.id && (
                                                                            <>
                                                                                <div className="media-footer">
                                                                                    <button onClick={() => this.responseFromItem(item) }
                                                                                            className="btn btn-info btn-neutral pull-right">
                                                                                        <i className="far fa-edit"/> Editer
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )}

                                                                    </>
                                                                )}


                                                            </div>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>

                                        ))}
                                        <br />

                                        <Pagination

                                            firstPageText={<i className="fa fa-angle-double-left" />}
                                            lastPageText={<i className="fa fa-angle-double-right" />}

                                            innerClass="pagination pagination-primary justify-content-center"
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                            totalItemsCount={this.state.totalItemsCount}
                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                            onChange={this.handlePageChange.bind(this)}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />

                                    </div>
                                )}




                                {!$guest && (
                                    <>
                                        <h4 className="text-center">
                                            <small className="text-muted">- Laisser votre avis -</small>
                                        </h4>

                                        <Form role="form" onSubmit={this.sendavisItem} acceptCharset="UTF-8">

                                            <div className="media media-post">
                                                <div className="avatar">
                                                    <img className="media-object img-raised"
                                                         alt={$userIvemo.first_name} src={$userIvemo.avatar} />
                                                </div>
                                                <div className="media-body">
                                                        <textarea name="description" value={this.state.description || ""}
                                                                  onChange={this.handleFieldChange}
                                                                  maxLength="10000"
                                                                  placeholder={'Laiser votre avis... !'}
                                                                  className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                  id="description"
                                                                  rows="15" />

                                                    {this.renderErrorFor('description')}
                                                    <div className="media-footer">

                                                        <Button type="submit"
                                                            className="btn btn-primary pull-right">
                                                        <i className="now-ui-icons ui-1_send" /> Poster
                                                        </Button>

                                                        <Button onClick={this.cancelCourse}
                                                                className="btn btn-secondary pull-right">
                                                            <i className="now-ui-icons ui-1_simple-remove" /> Annuller
                                                        </Button>

                                                    </div>
                                                </div>
                                            </div>

                                        </Form>

                                    </>

                                )}

                            </div>
                        </div>




                        <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                             aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Repondre à cette avis</h5>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <Form role="form" onSubmit={this.responseavisItem} acceptCharset="UTF-8">

                                        <div className="modal-body">
                                            <div className="text-justify">
                                                <ReadMoreAndLess
                                                    className="read-more-content"
                                                    charLimit={250}
                                                    readMoreText="(Plus)"
                                                    readLessText=""
                                                >
                                                    {this.state.item.description || ""}
                                                </ReadMoreAndLess>
                                            </div>
                                            <h5 className="title"><b>Reponse</b></h5>
                                            <textarea name="response_description" value={this.state.response_description || ""}
                                                      onChange={this.handleFieldChange}
                                                      maxLength="10000"
                                                      minLength="5"
                                                      placeholder={'Reponse ... !'}
                                                      className={`form-control ${this.hasErrorFor('response_description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                      id="response_description"
                                                      rows="20" cols="70"/>

                                            {this.renderErrorFor('response_description')}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Annuller
                                            </button>
                                            <button type="submit" className="btn btn-primary">Poster</button>

                                        </div>


                                    </Form>


                                </div>
                            </div>
                        </div>


                        <div className="modal fade" id="updateResponse" tabIndex="-1" role="dialog" aria-labelledby="updateResponseLabel"
                             aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Repondre à cette avis</h5>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <Form role="form" onSubmit={this.updateavisItem} acceptCharset="UTF-8">

                                        <div className="modal-body">
                                               <textarea name="description" value={this.state.description || ""}
                                                         onChange={this.handleFieldChange}
                                                         maxLength="10000"
                                                         minLength="5"
                                                         placeholder={'Mise à jour ... !'}
                                                         className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                         id="response_description"
                                                         rows="20" cols="70"/>

                                            {this.renderErrorFor('description')}
                                            <h5 className="title"><b>Reponse</b></h5>

                                            <div className="text-justify">
                                                <ReadMoreAndLess
                                                    className="read-more-content"
                                                    charLimit={250}
                                                    readMoreText="(Plus)"
                                                    readLessText=""
                                                >
                                                    {this.state.item.response_description || ""}
                                                </ReadMoreAndLess>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Annuller
                                            </button>
                                            <button type="submit" className="btn btn-primary">Poster</button>

                                        </div>


                                    </Form>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </Fragment>



        )
    }

}

export default ProfileAccountAvisUser;
