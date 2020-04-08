import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form,Input, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import AgencesimmobilieList from "./inc/AgencesimmobilieList";
import AgenceimmobilieListSkeleton from "../../inc/user/agencesimmobilie/AgenceimmobilieListSkeleton";
import Pagination from "react-js-pagination";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";


class AgencesimmobilieIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            phone: '',
            subject: '',
            message: '',
            status_confirm: true,
            errors: [],
            agencesimmobilies: [],
            Itemagenceimmobilie: {},
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 30,

        };

        this.contactUser = this.contactUser.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handlePageChange(pageNumber) {
        dyaxios.get(`/api/agences_immobilies?page=` + pageNumber)
            .then(response => {
                this.setState({
                    agencesimmobilies: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                });
            });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    handleCheckClick(){
        this.setState({ status_confirm: this.state.status_confirm });
    };
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

    contactUser(item) {
        $('#addNew').modal('show');
        this.setState({
            Itemagenceimmobilie: item
        });
    }

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            user_id: this.state.Itemagenceimmobilie.id,
            full_name: this.state.full_name,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message,
        };
        let url = route('public_profile_agences_send_message.site');
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                        message: `Votre message a été bien envoyé à cette utilisateur`
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
                    email: "",
                    full_name: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }



    loadItems(){
        let url = route('api.agencesimmobilie.site');
        dyaxios.get(url).then(response => {
                this.setState({
                    agencesimmobilies: response.data.data,
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

    render() {
        const {agencesimmobilies,Itemagenceimmobilie} = this.state;
        const mapAgenceimmobilies = agencesimmobilies.length >= 0 ? (
            agencesimmobilies.map(item => {
                return(
                    <AgencesimmobilieList key={item.id} {...item} contactUser={this.contactUser}/>
                )
            })
        ):(
            <AgenceimmobilieListSkeleton/>
        );
        return (
            <>
                <Helmet title={`Agences immobilières - Ivemo`}/>

                <div className="about-us sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Agences immobilières</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapAgenceimmobilies}

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


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"></i> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Location à Douala</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations studio à Douala</a></td>
                                                                                <td className="text-right"> 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations chambre à Douala</a></td>
                                                                                <td className="text-right"> 1 300 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations appartement 2 pièces à Douala</a></td>
                                                                                <td className="text-right"> 380 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations appartement 3 pièces à Douala</a></td>
                                                                                <td className="text-right"> 9 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations appartement 4 pièces à Douala</a></td>
                                                                                <td className="text-right"> 5 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Locations appartement 5 pièces à Douala</a></td>
                                                                                <td className="text-right"> 1 200 annonces</td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                                         aria-hidden="true">
                                        <div className="modal-dialog ">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title"><b>Contacter {Itemagenceimmobilie.first_name}</b></h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                <Form role="form"  onSubmit={this.sendmessageItem}  acceptCharset="UTF-8">

                                                    <div className="modal-body">

                                                        <div className="card-body">

                                                            <div className="row">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                                                    </div>
                                                                    <input id='full_name'
                                                                           type='text'
                                                                           className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                                           name='full_name'
                                                                           placeholder="Nom complet"
                                                                           aria-label="Nom complet"
                                                                           autoComplete="full_name"
                                                                           value={this.state.full_name}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('full_name')}
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                                                    </div>
                                                                    <input id='email'
                                                                           type='email'
                                                                           className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                           name='email'
                                                                           placeholder="Email"
                                                                           aria-label="Email"
                                                                           autoComplete="email"
                                                                           value={this.state.email}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('email')}
                                                                </div>
                                                            </div>

                                                            <div className="row">

                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
                                                                    </div>
                                                                    <input id='phone'
                                                                           type='text'
                                                                           className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                                           name='phone'
                                                                           placeholder="Téléphone"
                                                                           aria-label="Téléphone"
                                                                           value={this.state.phone}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('phone')}
                                                                </div>


                                                            </div>
                                                            <div className="row">

                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                                                    </div>
                                                                    <input id='subject'
                                                                           type='text'
                                                                           className={`form-control ${this.hasErrorFor('subject') ? 'is-invalid' : ''}`}
                                                                           name='subject'
                                                                           placeholder="Object..."
                                                                           aria-label="Object"
                                                                           autoComplete="subject"
                                                                           value={this.state.subject}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('subject')}
                                                                </div>
                                                            </div>
                                                            <div className="row">

                                                                <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.handleFieldChange}
                                                                 placeholder={'Posez ici toutes vos questions !'}
                                                                 className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 rows="10" />
                                                                    {this.renderErrorFor('message')}
                                                                </div>
                                                            </div>

                                                            <div className="form-check text-left">
                                                                <label className="form-check-label">
                                                                    <input type="checkbox" className="form-check-input" id="status_confirm" checked={this.state.status_confirm} value={this.state.status_confirm}  onChange={this.handleCheckClick} name="status_confirm" />
                                                                    <span className="form-check-sign"/>
                                                                    <span>Accepter <a href="/">politique de confidentialité</a></span>
                                                                </label>
                                                            </div>
                                                            <div className="submit text-center">
                                                                <button className="btn btn-primary btn-lg btn-block" type="submit">
                                                                     <b>Contacter</b>
                                                                </button>
                                                            </div>


                                                        </div>

                                                    </div>

                                                </Form>


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

export default AgencesimmobilieIndex;
