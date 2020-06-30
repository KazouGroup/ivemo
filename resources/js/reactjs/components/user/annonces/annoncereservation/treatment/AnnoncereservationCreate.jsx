import React, {Component, Fragment, useState} from 'react'
import HelmetSite from "../../../../inc/user/HelmetSite";
import NavUserSite from "../../../../inc/user/NavUserSite";
import {Form, Input} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";
import ReactQuill from "react-quill";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import UploadMultipleFile from "../../../../inc/vendor/UploadMultipleFile";

function AnnoncereservationCreate() {

    const [TitleValue,errors,setTitleValue] = useState("");
    const [Images, setImages] = useState([])

    const  handleFieldChange = (event) => {
        setTitleValue(event.currentTarget.value)
    //setState({
    //        [event.target.name]: event.target.value,
    //    });
    //    errors[event.target.name] = '';
    };

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const  hasErrorFor = (field) => {
        return !!errors[field];
    };

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{errors[field][0]}</strong>
                </span>
            )
        }
    };


    return (
        <>
            <HelmetSite title={`Nouvelle reservation - ${$name_site}`}/>


            <div className="landing-page sidebar-collapse">


                <nav className="navbar navbar-expand-lg bg-primary">
                    <NavUserSite />
                </nav>


                <div className="wrapper">

                    <div className="main main-raised">

                        <div className="container">
                            <br/>

                            <Form role="form" id="contact-form" acceptCharset="UTF-8">

                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" >
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces </b>
                                            </button>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/annonce/show/`}>
                                                            <img src={$userIvemo.avatar}
                                                                 style={{height: "40px", width: "80px"}} alt={$userIvemo.first_name}
                                                                 className="avatar"/>
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/annonce/show/`}
                                                                     className="text-dark font-weight-600 text-sm">
                                                                <b>{$userIvemo.first_name}</b>
                                                                <small className="d-block text-muted">
                                                                    <b>{moment($userIvemo.created_at).format('LL')}</b>
                                                                </small>
                                                            </NavLink>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr/>
                                                <div id="accordion" role="tablist" aria-multiselectable="true"
                                                     className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingTypebien">
                                                            <a data-toggle="collapse" data-parent="#accordion"
                                                               href="#collapseTypebien" aria-expanded="true"
                                                               aria-controls="collapseTypebien">
                                                                <b>Type de bien </b>
                                                            </a>
                                                        </div>
                                                        <div id="collapseTypebien" className="collapse show"
                                                             role="tabpanel" aria-labelledby="headingTypebien">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist"
                                                                             aria-multiselectable="true"
                                                                             className="card-collapse">
                                                                            <label className="labels">
                                                                                Donner un titre a ce bien
                                                                                <span className="text-danger">*</span>
                                                                            </label>
                                                                            <div className="input-group">
                                                                                <div className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons users_circle-08"></i></span>
                                                                                </div>
                                                                                <Input //id='title'
                                                                                       //type='text'
                                                                                       className={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                                       //name='title'
                                                                                       placeholder="Titre du bien"
                                                                                       aria-label="Title du bien"
                                                                                       autoComplete="title"
                                                                                       value={TitleValue}
                                                                                       onChange={handleFieldChange}
                                                                                />
                                                                                {renderErrorFor('title')}
                                                                            </div>



                                                                            <UploadMultipleFile refreshFunction={updateImages}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="submit text-center">
                                                    <button className="btn btn-secondary" type="button" title="Ne pas mettre à jour l'annonce">
                                                        <b>Annuler</b>
                                                    </button>
                                                    <button className="btn btn-primary" type="submit" title="Mettre à jour l'annonce">
                                                        <b>Poster votre annonce</b>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>



                                </div>

                            </Form>

                        </div>


                    </div>

                    <FooterBigUserSite />
                </div>
            </div>

        </>
    )
}

export default AnnoncereservationCreate
