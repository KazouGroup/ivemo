import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadActivitycitiesshow,
    likeshowItem,unlikeshowItem,
    favoriteshowItem,unfavoriteshowItem,
} from "../../../../redux/actions/activitycity/ActivitycityActions";
import HelmetSite from "../../../inc/user/HelmetSite";
import Swal from "sweetalert2";
import ActivitycityInteresse from "./ActivitycityInteresse";
import ActivitycitycommentIndex from "../../comments/ActivitycitycommentIndex";
import ActivitycityuploadimageIndex from "../../uploadimages/ActivitycityuploadimageIndex";
import FormcontactuseronactivitycityShow from "../inc/FormcontactuseronactivitycityShow";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class ActivitycityShowUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhonenumber: false
        };

        this.showPhonenumberItem = this.showPhonenumberItem.bind(this);

    }

    showPhonenumberItem() {
        this.setState({showPhonenumber: true});
    }

    signalerUser(item) {
        $('#addNew').modal('show');
        //this.setState({
        //  annonceItem: item
        //});
    }

    copyToClipboard(){
        navigator.clipboard.writeText(window.location.toString());
        $.notify({
            message: "Lien copié correctement avec succès",
        },{
            allow_dismiss: false,
            type: 'success',
            placement: {
                from: 'top',
                align: 'center'
            },
            animate: {
                enter: "animate__animated animate__fadeInDown",
                exit: "animate__animated animate__fadeOutUp"
            },
        });
    }


    loadItems(){
        this.props.loadActivitycitiesshow(this.props);
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    getDescription(activitycity) {
        return { __html: (activitycity.description) };
    }
    render() {
        const {activitycity} = this.props;
        return (
            <>
                <HelmetSite title={`${activitycity.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />
                                <div className="row">
                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="card-body">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour </b>
                                                </button>
                                            </div>

                                            <ActivitycityuploadimageIndex {...this.props} />

                                            <br />
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    {activitycity.city.name ?
                                                        <h6 className="text-dark ml-auto mr-auto">
                                                            {activitycity.city.name}
                                                        </h6>
                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150} />
                                                        </h6>
                                                    }
                                                </div>

                                                <div className="text-right ml-auto">
                                                    {activitycity.title ?
                                                        <>
                                                            <Button className="btn btn-dark btn-sm">
                                                                <i className="now-ui-icons media-1_album"></i>
                                                                <b>{activitycity.countuploadimages || "0"}</b>
                                                            </Button>
                                                            {$guest ?
                                                                <>
                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                                        <i className="far fa-heart"></i> <b>J'aime</b>
                                                                    </Button>
                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-facebook btn-sm btn-neutral btn-round" title="Ajouter à vos favoris">
                                                                        <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    {activitycity.likeked ?
                                                                        <>
                                                                            <Button onClick={() => this.props.unlikeshowItem(activitycity)}
                                                                                    className="btn btn-info btn-sm" title="Je n'aime plus">
                                                                                <i className="fas fa-heart"></i> <b>J'aime</b>
                                                                            </Button>
                                                                        </>

                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.props.likeshowItem(activitycity)}
                                                                                    className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                                                <i className="far fa-heart"></i> <b>J'aime</b>
                                                                            </Button>
                                                                        </>
                                                                    }

                                                                    {activitycity.favoriteted ?

                                                                        <>
                                                                            <Button onClick={() => this.props.unfavoriteshowItem(activitycity)}
                                                                                    className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                                <i className="fas fa-bookmark"></i> <b>Sauvegarder</b>
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.props.favoriteshowItem(activitycity)}
                                                                                    className="btn btn-facebook btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                                <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                            </Button>
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
                                                    }


                                                </div>

                                            </div>

                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                     <b>{activitycity.title}</b>
                                                </h5>

                                                {activitycity.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(activitycity)} /> : <Skeleton count={3}/>}

                                            </div>
                                        </div>



                                        <div className="card">
                                            <div className="card-body">

                                                <>

                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            {activitycity.city.photo ?
                                                                <NavLink to={`/city/${activitycity.city.slug}/`}>
                                                                    <img src={activitycity.city.photo}
                                                                         style={{ height: "40px", width: "80px" }}
                                                                         alt={activitycity.city.name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                       src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                            {activitycity.title && (
                                                                <>
                                                                    <div className="mx-3">
                                                                         <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/city/${activitycity.city.slug}/`} ><b>{activitycity.city.name}</b></Link>
                                                                         </span>
                                                                    </div>



                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            {$guest ?
                                                                <>

                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-facebook btn-icon btn-sm btn-neutral" title="J'aime">
                                                                        <i className="far fa-heart"></i>
                                                                    </Button>
                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                        <i className="far fa-bookmark"></i>
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    {activitycity.likeked ?
                                                                        <Button onClick={() => this.props.unlikeshowItem(activitycity)}
                                                                                className="btn btn-info btn-icon btn-sm" title="Je n'aime plus">
                                                                            <i className="fas fa-heart"></i>
                                                                        </Button>

                                                                        :
                                                                        <Button onClick={() => this.props.likeshowItem(activitycity)}
                                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="J'aime">
                                                                            <i className="far fa-heart"></i>
                                                                        </Button>
                                                                    }

                                                                    {activitycity.favoriteted ?
                                                                        <Button onClick={() => this.props.unfavoriteshowItem(activitycity)}
                                                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                            <i className="fas fa-bookmark"></i>
                                                                        </Button>

                                                                        :
                                                                        <Button onClick={() => this.props.favoriteshowItem(activitycity)}
                                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    }

                                                                    {$auth.can('dashboard') && (
                                                                        <a  href={`/dashboard/activitycities/data/${activitycity.slugin}/edit`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                                        </a>
                                                                    )}
                                                                </>
                                                            }
                                                            <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien" onClick={() => this.copyToClipboard()}>
                                                                <i className="fas fa-copy"></i>
                                                            </Button>


                                                        </div>
                                                    </div>
                                                </>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ou une question ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <FormcontactuseronactivitycityShow {...this.props}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                                {activitycity.status_comments ?

                                                    <ActivitycitycommentIndex {...this.props} {...activitycity.city} />
                                                    :
                                                    <>
                                                        {!$guest && (
                                                            <>
                                                                {($auth.can('dashboard'))  && (

                                                                    <ActivitycitycommentIndex {...this.props} {...activitycity.city} />

                                                                )}
                                                            </>
                                                        )}
                                                    </>

                                                }

                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    {activitycity.city.photo ?
                                                                        <NavLink to={`/city/${activitycity.city.slug}/`}>
                                                                            <img src={activitycity.city.photo}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={activitycity.city.name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                               src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                                    {activitycity.title && (
                                                                        <>
                                                                            <div className="mx-3">
                                                                         <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/city/${activitycity.city.slug}/`} ><b>{activitycity.city.name}</b></Link>
                                                                         </span>
                                                                            </div>



                                                                        </>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">

                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <b>Envie de visiter ou une question</b>
                                                                </div>
                                                            </div>

                                                            <FormcontactuseronactivitycityShow {...this.props}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <ActivitycityInteresse {...this.props} {...activitycity.city} />

                            </div>

                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}

ActivitycityShowUserSite.propTypes = {
    loadActivitycitiesshow: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    activitycity: store.pages.activitycity,
});

export default connect(mapStoreToProps, {
    loadActivitycitiesshow,
    likeshowItem,unlikeshowItem,
    favoriteshowItem,unfavoriteshowItem,
})(ActivitycityShowUserSite);
