import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import HeadermailmessageUser from "../inc/HeadermailmessageUser";
import Swal from "sweetalert2";
import NavlinkmailmessageUser from "../inc/NavlinkmailmessageUser";
import moment from "moment";
import {Button, UncontrolledTooltip} from "reactstrap";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";


class PersonalmessagesprivateannoncesventesUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactusersventes: {contactusersventes:[]},
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.readItem = this.readItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 20 }
        })
    }

    readItem(item) {

        const url = route('personal_contactusersvente_mails_active.site', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/annonces_ventes/${item.slug}/`);
        })

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

                const url = route('personal_annonces_ventes_mails_delete.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Message suprimée avec success'
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
        dyaxios.get(route('api.personal_mails_annonces_ventes.site', [itemuser])).then(response => this.setState({ contactusersventes: response.data, }));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }


    render() {
        const { contactusersventes, visiable } = this.state;
        const mapContactusers = contactusersventes.contactusersventes.length ? (
            contactusersventes.contactusersventes.slice(0, visiable).map(item => {
                return (

                    <HeadermailmessageUser key={item.id} {...item} readItem={this.readItem} deleteItem={this.deleteItem} />
                )
            })
        ) : (
                <></>
            );
        return (

            <>
                <Helmet>
                    <title>Messages contact annonces ventes {`${$userIvemo.first_name}`} - {$name_site}</title>
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

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessageUser {...this.props} {...contactusersventes}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="card-image">
                                                                <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                                    <ol className="carousel-indicators">
                                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                                    </ol>
                                                                    <div className="carousel-inner" role="listbox">
                                                                        <div className="carousel-item">
                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                        </div>
                                                                        <div className="carousel-item">
                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                        </div>
                                                                        <div className="carousel-item active">
                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="text-left pull-left">
                                                                    <NavLink to={`/annonces_ventes/ventes/`} >
                                                                        <h6 className={`text-info ml-auto mr-auto`}>
                                                                            Maison
                                                                        </h6>
                                                                    </NavLink>
                                                                </div>
                                                                <div className="text-right ml-auto">
                                                                    <h5 className="text-success"><b>34 <small>FCFA/mois</small></b></h5>
                                                                </div>
                                                            </div>
                                                            <div className="row">

                                                                <div className="col-md-7 col-6">
                                                                    <NavLink to={`/annonces_ventes/ventes/`}>
                                                                                    <span className="ml-auto mr-auto">
                                                                                        <strong>ede </strong>
                                                                                    </span>
                                                                    </NavLink>
                                                                    - deo
                                                                </div>

                                                            </div>
                                                            <h6 className="card-title">
                                                                <Link to={`/annonces_ventes/ventes/`} target="_blank">
                                                                    aoaod
                                                                </Link>
                                                            </h6>
                                                            <div className="card-header d-flex align-items-center">

                                                                <div className="text-right mx-auto">

                                                                    <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                                                                        3426712192
                                                                    </UncontrolledTooltip>
                                                                    <Button className="btn btn-icon btn-sm btn-warning" id="TooltipPhone">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                    </Button>
                                                                    <NavLink to={`/annonces_ventes/ventes/`} className="btn btn-icon btn-sm btn-primary">
                                                                        <i className="now-ui-icons location_pin"/>
                                                                    </NavLink>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingOne">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseOne" aria-expanded="true"
                                                                   aria-controls="collapseOne">
                                                                    Collapsible Group Item #1
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne" className="collapse show"
                                                                 role="tabpanel" aria-labelledby="headingOne">
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTwo">
                                                                <a className="collapsed" data-toggle="collapse"
                                                                   data-parent="#accordion" href="#collapseTwo"
                                                                   aria-expanded="false" aria-controls="collapseTwo">
                                                                    Collapsible Group Item #2
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTwo" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingTwo" >
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTwo">
                                                                <a className="collapsed" data-toggle="collapse"
                                                                   data-parent="#accordion" href="#collapseTwo"
                                                                   aria-expanded="false" aria-controls="collapseTwo">
                                                                    Collapsible Group Item #2
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTwo" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingTwo" >
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTwo">
                                                                <a className="collapsed" data-toggle="collapse"
                                                                   data-parent="#accordion" href="#collapseTwo"
                                                                   aria-expanded="false" aria-controls="collapseTwo">
                                                                    Collapsible Group Item #2
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTwo" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingTwo" >
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTwo">
                                                                <a className="collapsed" data-toggle="collapse"
                                                                   data-parent="#accordion" href="#collapseTwo"
                                                                   aria-expanded="false" aria-controls="collapseTwo">
                                                                    Collapsible Group Item #2
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTwo" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingTwo" >
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingThree">
                                                                <a className="collapsed" data-toggle="collapse"
                                                                   data-parent="#accordion" href="#collapseThree"
                                                                   aria-expanded="false" aria-controls="collapseThree">
                                                                    Collapsible Group Item #3
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseThree" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingThree">
                                                                <div className="card-body">
                                                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                                                    high life accusamus terry richardson ad squid. 3
                                                                    wolf moon officia aute, non cupidatat skateboard
                                                                    dolor brunch. Food truck quinoa nesciunt laborum
                                                                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                                                                    a bird on it squid single-origin coffee nulla
                                                                    assumenda shoreditch et. Nihil anim keffiyeh
                                                                    helvetica, craft beer labore wes anderson cred
                                                                    nesciunt sapiente ea proident. Ad vegan excepteur
                                                                    butcher vice lomo. Leggings occaecat craft beer
                                                                    farm-to-table, raw denim aesthetic synth nesciunt
                                                                    you probably haven't heard of them accusamus labore
                                                                    sustainable VHS.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

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
export default PersonalmessagesprivateannoncesventesUser;
