import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, Col, Form, Input, InputGroup, Row, UncontrolledTooltip} from "reactstrap";
import ReactQuill from "react-quill";
import NavPremiumUserTeams from "../NavPremiumUserTeams";
const abbrev = ['', 'k', 'M', 'B', 'T'];
const avatar_style = {
    width: "40px",
    height: "40px",
    top: "15px",
    left: "15px",
    borderRadius: "50%"
};


class PremiumUserNewTeam extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.state = {
            full_name: '',
            role: '',
            photo: '',
            description: '',
            userProfile: {profile:[]},
            errors: [],
            showDefaultImage: true,

        };
        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
            ]
        };
        this.formats = [
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];

    }


    // Handle Change
    handleChangeBody(value) {
        this.setState({ description: value });
        document.querySelector('.editor-control').classList.remove('is-invalid');
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

    updateImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({ file: file, photo: reader.result, showDefaultImage: false });
        };
        reader.readAsDataURL(file)
    }
    removeImage(e){
        e.preventDefault();
        this.setState({ file: '', photo: '', showDefaultImage: true });
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
    saveItem(e) {
        let itemuser = this.props.match.params.user;
        e.preventDefault();

        let item = {
            full_name: this.state.full_name,
            role: this.state.role,
            photo: this.state.photo,
            description: this.state.description,
        };
        dyaxios.post(route('profile_team_users_store.site', [itemuser]), item)
            .then(() => {

                $.notify({
                        message: 'Informations sauvegardé avec success...'
                    },
                    {
                        allow_dismiss: false,
                        type: 'success',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animated fadeInUp",
                            exit: "animated fadeOutDown"
                        },
                    });
                this.props.history.push(`/dashboard/premium/${$userIvemo.slug}/teams/`);
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Something wrong. Try later...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        //
    }


    render() {
        const {photo} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />


                <div className="wrapper ">

                    <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h3 className="title">Teams vos membre</h3>
                                <p className="text-white">{this.state.full_name}</p>
                            </div>
                        </div>

                        <div className="content">

                            <NavPremiumUserTeams {...this.props}/>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="toolbar">

                                            </div>


                                            <Form  onSubmit={this.saveItem} acceptCharset="UTF-8">
                                                <CardBody>

                                                    <Row>
                                                        <Col md={6}>
                                                            <label className="labels">
                                                                Non complet
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                                                </div>
                                                                <Input id='full_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                                       name='full_name'
                                                                       placeholder="Nom complet"
                                                                       aria-label="Nom complet"
                                                                       autoComplete="full_name"
                                                                       value={this.state.full_name || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('full_name')}
                                                            </InputGroup>
                                                        </Col>


                                                        <Col md={6}>
                                                            <label className="labels">
                                                                Role ou occupation
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons text_caps-small"/></span>
                                                                </div>
                                                                <Input id='role'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('role') ? 'is-invalid' : ''}`}
                                                                       name='role'
                                                                       placeholder="Role ou occupation"
                                                                       aria-label="role"
                                                                       autoComplete="role"
                                                                       value={this.state.role || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('role')}
                                                            </InputGroup>
                                                        </Col>


                                                    </Row>

                                                    <Row>
                                                        <div className="col-md-4 mx-auto">
                                                            <div className="profile text-center">
                                                                <img src={this.state.showDefaultImage ? "https://www.kazoucoin.com/assets/img/photo.jpg" : photo} alt={'name'} />
                                                                <input id="photo" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" />
                                                                {this.renderErrorFor('photo')}
                                                                <div className="text-center">
                                                                    <label htmlFor="photo" className="btn btn-primary">
                                                                        <span className="btn-inner--text">Ajouter l'image</span>
                                                                    </label>
                                                                    <label hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                        <span className="btn-inner--text">Remove</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>

                                                    <Row>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="labels">
                                                                    Description de votre annonce
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <br />
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                            formats={this.formats}
                                                                            className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                            value={this.state.description || ''}
                                                                            onChange={this.handleChangeBody}/>
                                                                {this.renderErrorFor('description')}
                                                            </div>
                                                        </div>
                                                    </Row>

                                                    <div className="submit text-center">
                                                        <Link to={`/dashboard/premium/${$userIvemo.slug}/teams/`} className="btn btn-secondary">
                                                            <i className="now-ui-icons ui-1_simple-delete"/> Annuler
                                                        </Link>
                                                        <Button className="btn btn-primary" type="submit">
                                                            <i className="now-ui-icons ui-1_check"/> Sauvegarder
                                                        </Button>
                                                    </div>
                                                </CardBody>


                                            </Form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterPremiumUser/>

                    </div>
                </div>
            </>

        )
    }
}

export default PremiumUserNewTeam;
