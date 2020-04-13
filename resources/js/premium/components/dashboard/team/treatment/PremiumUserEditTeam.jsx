import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, Col, Form, Input, InputGroup, Row, UncontrolledTooltip} from "reactstrap";
import ReactQuill from "react-quill";
const abbrev = ['', 'k', 'M', 'B', 'T'];
const avatar_style = {
    width: "40px",
    height: "40px",
    top: "15px",
    left: "15px",
    borderRadius: "50%"
};


class PremiumUserEditTeam extends Component {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
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
            showDefaultImage: false,
            teams_count: [],
            teamsactive_count: [],
            teamsunactive_count: [],

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
    updateItem(e) {
        let itemuser = this.props.match.params.user;
        let Id = this.props.match.params.id;
        e.preventDefault();

        let item = {
            full_name: this.state.full_name,
            role: this.state.role,
            photo: this.state.photo,
            description: this.state.description,
        };
        dyaxios.put(route('profile_team_users_update.site', [itemuser,Id]), item)
            .then(() => {

                $.notify({
                        message: 'Informations mise à jour avec success...'
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
                this.props.history.goBack();
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        let Itemdata = this.props.match.params.id;
        dyaxios.get(route('api.teams_premium_count',[itemuser])).then(response =>
            this.setState({teams_count: response.data}));

        dyaxios.get(route('api.teams_premiumactive_count',[itemuser])).then(response => {
            this.setState({teamsactive_count: response.data})});

        dyaxios.get(route('api.teams_premiumunactive_count',[itemuser])).then(response =>
            this.setState({teamsunactive_count: response.data}));

        let url = route('api.profile_team_users_show.site', [itemuser,Itemdata]);
        dyaxios.get(url).then(response =>
            this.setState({
                full_name: response.data.full_name,
                role: response.data.role,
                photo: response.data.photo,
                description: response.data.description,
            }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(teams_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teams_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teams_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(teamsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(teamsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {teams_count,teamsactive_count,teamsunactive_count,photo} = this.state;
        return (
            <>
                <Helmet title={`${this.state.full_name || $name_site} - Ivemo`} />


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

                            <div className="row">
                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-primary icon-circle">
                                                                <i className="now-ui-icons text_align-center"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.data_countFormatter(teams_count)}</h3>
                                                            <h6 className="stats-title">Membres</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons text_align-center"></i> Membres créer
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-success icon-circle">
                                                                <i className="now-ui-icons ui-1_check"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.dataactive_countFormatter(teamsactive_count)}</h3>
                                                            <h6 className="stats-title">Actives</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_check"/> Membres actives
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-danger icon-circle">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.dataunactive_countFormatter(teamsunactive_count)}</h3>
                                                            <h6 className="stats-title">Desactivés</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_simple-delete"/> Membres désactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="toolbar">

                                            </div>


                                            <Form  onSubmit={this.updateItem} acceptCharset="UTF-8">
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

export default PremiumUserEditTeam;
