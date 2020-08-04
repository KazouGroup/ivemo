import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Button, UncontrolledTooltip } from "reactstrap";
import Swal from "sweetalert2";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import { Remarkable } from "remarkable";
import LazyLoad from 'react-lazyload';
import moment from "moment";
import AnnoncelocationInteresseforBlog from "./AnnoncelocationInteresseforBlog"
import BlogannoncelocationInteresse from "./BlogannoncelocationInteresse";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import ButonFavoris from "../../../inc/vendor/ButonFavoris";
import ButonLiked from "../../../inc/vendor/ButonLiked";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    loadBlogannoncelocationshow,
    unfavoriteItem,
    likeItem,unlikeItem
} from "../../../../redux/actions/blogannoncelocation/blogannoncelocationshowActions";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class BlogannoncelocationShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //
        };

        this.deleteItem = this.deleteItem.bind(this);
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

                const url = route('blogannoncecategorylocationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs supprimée avec success'
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
                    this.props.history.push(`/blogs/annonce_locations/`);
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
      this.props.loadBlogannoncelocationshow(this.props);
    }


   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(blogannoncelocation) {
        return { __html: blogannoncelocation.description};
    }
    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const { blogannoncelocation } = this.props;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        return (
            <Fragment>

                <Helmet title={`${blogannoncelocation.title || $name_site} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="card">
                                    <div className="card-body">

                                        <div className="card card-plain ">

                                            <div className="container">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-12 ml-auto mr-auto">
                                                        {!$guest &&(
                                                            <>
                                                                {!$userIvemo.email_verified_at &&(
                                                                    <LinkValicationEmail/>
                                                                )}
                                                            </>
                                                        )}


                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                {blogannoncelocation.user.avatar ?
                                                                    <NavLink to={`/pro/${blogannoncelocation.user.slug}/blogs/annonce_locations/`}>
                                                                        <img src={blogannoncelocation.user.avatar}
                                                                             style={{ height: "40px", width: "80px", borderRadius: "5px" }}
                                                                             alt={blogannoncelocation.user.first_name}
                                                                             className="avatar" />
                                                                    </NavLink>
                                                                    : <Skeleton circle={false} height={40} width={80} />}

                                                                <div className="mx-3">
                                                                    <NavLink to={`/pro/${blogannoncelocation.user.slug}/blogs/annonce_locations/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncelocation.user.first_name || <Skeleton width={35} />}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncelocation.created_at).fromNow()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>

                                                            <div className="text-right ml-auto">

                                                                {$guest ?
                                                                    <>
                                                                        <Button  data-toggle="modal" data-target="#loginModal"
                                                                                 className="btn btn-facebook btn-sm btn-neutral" title="J'aime cette article">
                                                                            <i className="far fa-heart"></i> <b>{this.data_countlikeFormatter(blogannoncelocation.countlikes || "0")}</b>
                                                                        </Button>
                                                                        <Button  data-toggle="modal" data-target="#loginModal"
                                                                                 className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <ButonLiked likeItem={this.props.likeItem} unlikeItem={this.props.unlikeItem} {...blogannoncelocation} />

                                                                        <ButonFavoris favoriteItem={this.props.favoriteItem} unfavoriteItem={this.props.unfavoriteItem} {...blogannoncelocation} />

                                                                        {$userIvemo.id === blogannoncelocation.user_id && (
                                                                            <Fragment>
                                                                                <a href={`#${blogannoncelocation.visits_count}`}
                                                                                   className="btn btn-sm btn-secondary" title={`${blogannoncelocation.visits_count} ${blogannoncelocation.visits_count > 1 ? "vues" : "vue"}`}>
                                                                                    <i className="far fa-eye"></i> <b>{this.data_countFormatter(blogannoncelocation.visits_count)}</b>
                                                                                </a>
                                                                                <NavLink
                                                                                    to={`/blogs/annonce_locations/${blogannoncelocation.slugin}/edit/`}
                                                                                    className="btn btn-sm btn-icon btn-info"
                                                                                    title="Editer cet article">
                                                                                    <i className="now-ui-icons ui-2_settings-90"/>
                                                                                </NavLink>
                                                                                <Button
                                                                                    className="btn btn-sm btn-icon btn-danger"
                                                                                    onClick={() => this.deleteItem(blogannoncelocation.id)}
                                                                                    color="secondary" title="Supprimer cette annonce">
                                                                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                                                                </Button>{" "}
                                                                            </Fragment>
                                                                        )}
                                                                    </>
                                                                }

                                                            </div>

                                                        </div>

                                                        <div className="carousel-inner" >
                                                            <div className="carousel-item active">
                                                                <Zoom>
                                                                    <div>
                                                                        {blogannoncelocation.photo ?
                                                                            <img className="d-block"
                                                                                 src={blogannoncelocation.photo}
                                                                                 style={{ width: "1400px", height: "600px", borderRadius: "2px" }}
                                                                                 alt={blogannoncelocation.title}/>
                                                                            :<Skeleton circle={false} height={600} width={1400} />}

                                                                    </div>

                                                                </Zoom>

                                                            </div>

                                                        </div>



                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-11 ml-auto mr-auto">

                                                        <h2 className="title text-center">{blogannoncelocation.title || <Skeleton width={300} />}</h2>

                                                        {blogannoncelocation.description ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncelocation)} />: <Skeleton count={5}/>}



                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>

                                <AnnoncelocationInteresseforBlog {...this.props} />


                                <BlogannoncelocationInteresse {...this.props} />

                                <div className="text-center">
                                    <a href={`/blogs/annonce_locations/${itemCategoryannoncelocation}/`}
                                        className="btn btn-outline-info">Voir plus d'articles ici
                                    </a>
                                </div>





                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>
            </Fragment>



        )
    }
}

BlogannoncelocationShow.propTypes = {
    loadBlogannoncelocationshow: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    blogannoncelocation: store.blogannoncelocations.blogannoncelocation

});
export default connect(mapStoreToProps, {
    loadBlogannoncelocationshow,
    unfavoriteItem, favoriteItem,
    likeItem,unlikeItem
})(BlogannoncelocationShow);
