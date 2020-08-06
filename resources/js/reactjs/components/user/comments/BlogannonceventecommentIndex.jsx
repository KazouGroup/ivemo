import React, {Component, Fragment, Suspense} from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form} from "reactstrap";
import FieldInput from "../../inc/vendor/FieldInput";
import ReadMoreAndLess from "react-read-more-less";
import Swal from "sweetalert2";
import moment from "moment";
import FormComment from "../../inc/vendor/comment/FormComment";
import ProfileUserComment from "../../inc/vendor/comment/ProfileUserComment";
import CommentViewList from "./inc/CommentViewList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadCommentsBlogannonceventes,likeItem,unlikeItem,unactiveItem,deleteItem} from "../../../redux/actions/commentsActions";


class BlogannonceventecommentIndex extends Component {
    constructor(props) {
        super(props);
        //itemData correspont a une variable aleatoire donner pour faire le traitement
        this.state = {
            body: '',
            editcomment: false,
            responsecomment: false,
            editresponsecomment: false,
            visiablecomment: 6,
            visiableresponsecomment: 1,
            itemData:[],
            errors: [],
        };

        this.sendcommentItem = this.sendcommentItem.bind(this);
        this.sendresponsecommentItem = this.sendresponsecommentItem.bind(this);
        this.updatecommentItem = this.updatecommentItem.bind(this);
        this.updateresponsecommentItem = this.updateresponsecommentItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.loadmoresresponseItem = this.loadmoresresponseItem.bind(this);
        this.cancelresponseCourse = this.cancelresponseCourse.bind(this);

        this.deleteresponseItem = this.deleteresponseItem.bind(this);
        this.unactiveresponseItem = this.unactiveresponseItem.bind(this);
        this.editcommentFromItem = this.editcommentFromItem.bind(this);
        this.responsecommentFromItem = this.responsecommentFromItem.bind(this);
        this.editresponsecommentFromItem = this.editresponsecommentFromItem.bind(this);
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

    loadmoresItem() {
        this.setState((old) => {
            return { visiablecomment: old.visiablecomment + 6 }
        })
    }

    loadmoresresponseItem() {
        this.setState((old) => {
            return { visiableresponsecomment: old.visiableresponsecomment + 4 }
        })
    }

    cancelresponseCourse(){
        this.setState({body: "",editcomment: false,responsecomment: false,editresponsecomment:false});
    };

    responsecommentFromItem(item) {
        this.setState({
            responsecomment: true,
            id:item.id,
            itemData: item
        });
    }

    editresponsecommentFromItem(lk) {
        this.setState({
            editresponsecomment: true,
            id:lk.id,
            body:lk.body,
            itemData: lk
        });
    }

    editcommentFromItem(item) {
        this.setState({
            editcomment: true,
            id:item.id,
            body:item.body,
            itemData: item
        });
    }

    sendresponsecommentItem(e) {
        e.preventDefault();

        let item = {
            body: this.state.body,
        };

        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemdate = this.props.match.params.date;
        let itemblogannonvente = this.props.match.params.blogannoncevente;
        let Id = this.state.itemData.id;
        let url = route('blogannoncesventessendresponsecomment_site',[itemCategoryannoncevente,itemdate,itemblogannonvente,Id]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Réponse sauvegarder`
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

                this.setState({body: "",responsecomment: false,});

                this.loadItems();

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    sendcommentItem(e) {
        e.preventDefault();

        let item = {
            body: this.state.body,
        };

        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemdate = this.props.match.params.date;
        let itemblogannonvente = this.props.match.params.blogannoncevente;

        let url = route('blogannoncesventesendcomment_site',[itemCategoryannoncevente,itemdate,itemblogannonvente]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Commentaire sauvegarder`
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

                this.setState({body: "",});

                this.loadItems();

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    updatecommentItem(e) {

        e.preventDefault();

        let item = {
            body: this.state.body,
        };
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemdate = this.props.match.params.date;
        let itemblogannonvente = this.props.match.params.blogannoncevente;
        let Id = this.state.itemData.id;
        let url = route('blogannoncesventeupdatecomment_site', [itemCategoryannoncevente,itemdate,itemblogannonvente,Id]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({body: "",editcomment: false,});
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

    updateresponsecommentItem(e) {

        e.preventDefault();

        let item = {
            body: this.state.body,
        };
        let Idcommentresponse = this.state.itemData.id;
        let url = route('comments.responsecomment_update', [Idcommentresponse]);
        dyaxios.put(url, item)
            .then(response => {

                this.setState({body: "",editresponsecomment: false,});
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

    unactiveresponseItem(id) {
        Swal.fire({
            title: 'Confirmer masquer?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                const url = route('comments.responsecomment_unactive', [id]);
                //Envoyer la requet au server
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //,
                            message: 'Le commenaire à été desactivé avec succès'
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


    deleteresponseItem(id) {
        Swal.fire({
            title: 'Confirmer la suppression?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                const url = route('comments_responses.destroy', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Commentaire supprimée avec succès'
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

    loadItems(){
        this.props.loadCommentsBlogannonceventes(this.props);
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {comments} = this.props;
        const {visiablecomment,visiableresponsecomment,itemData,editcomment,editresponsecomment,responsecomment} = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-md-10 mx-auto">


                        <h5 className="title text-center">
                            <b>{comments.length > 1 ? `${comments.length || ""} Commentaires` : `${comments.length || ""} Commentaire`}</b>
                        </h5>


                        <div className="media-area">

                            {comments.length >= 0 ?
                                <>
                                    {comments.slice(0, visiablecomment).map((item) => (

                                       <Fragment key={item.id}>

                                           {item.id === itemData.id && (
                                               <>
                                                   {editcomment && (

                                                       <Form onSubmit={this.updatecommentItem} acceptCharset="UTF-8">

                                                           <FormComment value={this.state.body} disabled={!this.state.body} cancelresponseCourse={this.cancelresponseCourse}
                                                                        renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                                        handleFieldChange={this.handleFieldChange} namesubmit={`METTRE À JOUR`}/>

                                                       </Form>

                                                   )}

                                               </>
                                           )}

                                           <div className="media">

                                               <ProfileUserComment {...this.props} {...item} />

                                               <div className="media-body">

                                                   <CommentViewList {...item} responsecommentFromItem={this.responsecommentFromItem}
                                                                    unlikeItem={this.props.unlikeItem} likeItem={this.props.likeItem} deleteItem={this.props.deleteItem}
                                                                    editcommentFromItem={this.editcommentFromItem} unactiveItem={this.props.unactiveItem}/>


                                                   {(item.id === itemData.id) && (
                                                       <>
                                                           {responsecomment && (

                                                               <Form onSubmit={this.sendresponsecommentItem} acceptCharset="UTF-8">

                                                                   <FormComment value={this.state.body} disabled={!this.state.body} cancelresponseCourse={this.cancelresponseCourse}
                                                                                renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                                                handleFieldChange={this.handleFieldChange} namesubmit={`POSTER UNE RÉPONSE`}/>

                                                               </Form>

                                                           )}

                                                       </>
                                                   )}

                                                   <Suspense fallback={<p>loading...</p>}>

                                                   {item.responsecomments.slice(0, visiableresponsecomment).map((lk) =>

                                                       <Fragment key={lk.id} >

                                                           <div className="media">

                                                               <ProfileUserComment {...this.props} {...lk} />

                                                               <div className="media-body">
                                                                   <h6 className="media-heading">{lk.user.first_name}
                                                                       <small className="text-muted">· {moment(lk.updated_at).fromNow()} {lk.created_at !== lk.updated_at && ("(Modifié)")}</small>
                                                                   </h6>
                                                                   <ReadMoreAndLess
                                                                       className="read-more-content"
                                                                       charLimit={250}
                                                                       readMoreText="lire plus"
                                                                       readLessText=""
                                                                   >
                                                                       {lk.body || ""}
                                                                   </ReadMoreAndLess>
                                                                   <div className="media-footer">
                                                                       {$guest ?
                                                                           <Button data-toggle="modal" data-target="#loginModal"
                                                                                   className="btn btn-default btn-neutral pull-right">
                                                                               <i className="now-ui-icons travel_info"></i>
                                                                           </Button>
                                                                           :
                                                                           <>

                                                                               {lk.user.id !== $userIvemo.id &&(
                                                                                   <button type="button" onClick={() => this.responsecommentFromItem(item)}
                                                                                           className="btn btn-default btn-neutral pull-right" title="Repondre a ce commentaire">
                                                                                       <i className="now-ui-icons files_single-copy-04"></i> Repondre
                                                                                   </button>
                                                                               )}

                                                                               {$userIvemo.id === lk.user.id && (
                                                                                   <>
                                                                                       <button onClick={() => this.deleteresponseItem(lk.id) }
                                                                                               className="btn btn-danger btn-neutral pull-right">
                                                                                           <i className="now-ui-icons ui-1_simple-remove"></i> Supprimer
                                                                                       </button>

                                                                                       <Button onClick={() => this.editresponsecommentFromItem(lk)}
                                                                                               className="btn btn-info btn-neutral pull-right">
                                                                                           <i className="now-ui-icons ui-2_settings-90"></i> Editer
                                                                                       </Button>

                                                                                   </>
                                                                               )}

                                                                               {/* Ce button donne l'autorisation a l'utilisateur de l'annonce de la masquer */}
                                                                               {$userIvemo.id === item.commentable.user_id && (
                                                                                   <button onClick={() => this.unactiveresponseItem(lk.id) }
                                                                                           className="btn btn-success btn-neutral pull-right" title="Masquer ce commentaire">
                                                                                       <i className="now-ui-icons ui-1_check"></i> Masquer
                                                                                   </button>
                                                                               )}
                                                                           </>
                                                                       }

                                                                   </div>

                                                               </div>

                                                           </div>

                                                           {(lk.id === itemData.id && editresponsecomment) && (

                                                               <Form onSubmit={this.updateresponsecommentItem} acceptCharset="UTF-8">

                                                                   <FormComment value={this.state.body} disabled={!this.state.body} cancelresponseCourse={this.cancelresponseCourse}
                                                                                renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                                                handleFieldChange={this.handleFieldChange} namesubmit={`METTRE À JOUR`}/>

                                                               </Form>

                                                           )}

                                                       </Fragment>

                                                   )}

                                                   {visiableresponsecomment < item.responsecomments.length && (
                                                       <div className="col-md-8 ml-auto mr-auto text-center">
                                                           <a style={{cursor:"pointer"}} onClick={this.loadmoresresponseItem} className="text-info">
                                                               <b>{item.responsecomments.length} Afficher plus de reponses</b>
                                                           </a>
                                                       </div>
                                                   )}

                                                   </Suspense>


                                               </div>
                                           </div>

                                       </Fragment>

                                    ))}
                                </>
                                :null}


                            {visiablecomment < comments.length && (
                                <div className="col-md-8 ml-auto mr-auto text-center">
                                    <a style={{cursor:"pointer"}} onClick={this.loadmoresItem} className="text-info">
                                        <b>Afficher plus de commentaires</b>
                                    </a>
                                </div>
                            )}

                            <br/>

                            <>
                                {!editcomment && !responsecomment && !editresponsecomment && (
                                    <Form onSubmit={this.sendcommentItem} acceptCharset="UTF-8">

                                        <FormComment value={this.state.body} disabled={!this.state.body} cancelresponseCourse={this.cancelresponseCourse}
                                                     renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                     handleFieldChange={this.handleFieldChange} namesubmit={`POSTER MON COMMENTAIRE`}/>

                                    </Form>
                                )}
                            </>

                        </div>

                    </div>
                </div>
            </>

        )
    }
}
BlogannonceventecommentIndex.propTypes = {
    loadCommentsBlogannonceventes: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    comments: store.commentsites.comments

});
export default connect(mapStoreToProps, {
    loadCommentsBlogannonceventes,likeItem,unlikeItem,unactiveItem,deleteItem
})(BlogannonceventecommentIndex);
