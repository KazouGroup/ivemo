import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    InputGroup,
    Row,
    CardBody,
    Col,
    CardTitle,
    FormGroup,
    UncontrolledTooltip
} from "reactstrap";
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import moment from "moment";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import NavUserSite from "../../../inc/user/NavUserSite";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import Navforumbyuser from "../inc/Navforumbyuser";
import FieldInput from "../../../inc/vendor/FieldInput";
import Navlinknewforum from "./Navlinknewforum";


class ForumCreate extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.state = {
            title: '',
            description: '',
            categoryforum_id: '',
            errors: [],
            categoryforums: [],
        };
        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                [{ 'color': [] }, { 'background': [] }],
            ]
        };
        this.formats = [
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'link',
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
        e.preventDefault();

        let item = {
            title: this.state.title,
            description: this.state.description,
            categoryforum_id: this.state.categoryforum_id,
        };
        dyaxios.post(route('forums_site.store'), item)
            .then(() => {
                $.notify({
                    //,
                    message: 'Votre post a bien été crée'
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
                this.props.history.push(`/forums/`);
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
                $.notify("Ooop! Quelque chose ne va pas. Essayez plus tard ...", {
                    allow_dismiss: false,
                    type: 'danger',
                    animate: {
                        enter: 'animate__animated animate__bounceInDown',
                        exit: 'animate__animated animate__bounceOutUp'
                    }
                });
            })
    }
   // Lifecycle Component Method
    componentDidMount() {
        fetch(route('api.categoryforum_site')).then(res => res.json()).then((result) => { this.setState({ categoryforums: result }) })
    }

    render() {
        const { categoryforums } = this.state;
        const composantTitle = `${this.state.title || 'Post'}`;
        document.title = `${composantTitle} - ${$name_site}`;
        return (
            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary">
                    <NavUserSite />
                </nav>
                <div className="wrapper">

                    <div className="main main-raised">
                        <div className="container">
                            <br />

                            <form role="form" onSubmit={this.saveItem} acceptCharset="UTF-8">

                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/forums/`} type="button" className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour  </b>
                                            </Link>
                                        </div>
                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail />
                                                )}
                                            </>
                                        )}
                                        <div className="card">
                                            <div className="card-body">

                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">

                                                        {$userIvemo.avatar === null ?
                                                            <img className="avatar" alt={$userIvemo.first_name}
                                                                 style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                 src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                            :
                                                            <img className="avatar"
                                                                 style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                 alt={$userIvemo.first_name}
                                                                 src={$userIvemo.avatar}/>
                                                        }
                                                        <div className="mx-3">
                                                            <NavLink to={`/pro/${$userIvemo.slug}/forums/`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                <small className="d-block text-muted"> <i className="now-ui-icons tech_watch-time"/> {moment($userIvemo.created_at).format('LL')}</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="card-title">
                                                    <b>{this.state.title}</b>
                                                </div>

                                                <CardBody>

                                                    <Row>
                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Donner un titre à ce post</label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="now-ui-icons users_circle-08" /></span>
                                                                </div>

                                                                <FieldInput name="title" type='text' minLength="4" maxLength="200" placeholder="Donner un titre à ce post" value={this.state.title || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            required="required"
                                                                            renderErrorFor={this.renderErrorFor}/>

                                                            </InputGroup>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Selectionez la categorie</label>
                                                            <FormGroup>
                                                                <select name={'categoryforum_id'} value={this.state.categoryforum_id || ""}

                                                                    className={`form-control ${this.hasErrorFor('categoryforum_id') ? 'is-invalid' : ''}`}
                                                                    id="categoryforum_id" onChange={this.handleFieldChange} required>
                                                                    <option value="" disabled>Selectioner une category</option>
                                                                    {categoryforums.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryforum_id')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                    <Row>
                                                        <div className="col-md-12">
                                                            <FormGroup>
                                                                <label className="labels">
                                                                    Décrivez votre post
                                                                        <span className="text-danger">*</span>
                                                                </label>
                                                                <br />
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                    formats={this.formats}
                                                                    placeholder="Laisser votre description..."
                                                                    className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                    value={this.state.description || ''}
                                                                    onChange={this.handleChangeBody} />
                                                                {this.renderErrorFor('description')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                </CardBody>

                                                <div className="submit text-center">
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Sauvegarder votre post</b>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewforum/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <Navforumbyuser />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>

                    <FooterBigUserSite />
                </div>
            </div>
        )
    }
}

export default ForumCreate;
