import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ReactQuill from "react-quill";
import StatusAdmin from "../../inc/admin/StatusAdmin";
import {Card, Row} from "reactstrap";
import ContactList from "../contact/ContactList";

export default class AdminProfileUserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            color_name: '',
            birthday: '',
            status_user: '',
            email: '',
            body: '',
            sex: '',
            avatar: '',

            colors: [],
            errors: [],
        };

        this.modules = {
            toolbar: [
                [{'font': []}],
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                [{'color': []}, {'background': []}],
                //['clean']
            ]
        };
        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        // bind

        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

    }

    // handle change
    handleChangeBody(value) {
        this.setState({ body: value })
    }
    handleFieldChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //has get error
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }
    // handle submit
    updateItem(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            color_name: this.state.color_name,
            birthday: this.state.birthday,
            body: this.state.body,
            sex: this.state.sex,
        };
        axios.put(`/profile/users`, user).then(() => {

            /**
             * Init alert
             */
            $.notify({
                    message: 'Your profile has been updated successfully'
                },
                {
                    allow_dismiss: false,
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    },
                    animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    },
                });

            //Redirect after create
            this.props.history.push(`/dashboard/profile/edit/`);

        }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            //Alert
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        });
    }

    mydatepicker(){
        $( function () {

            var $datepicker = $('.datepicker');
            // Methods
            function init($this) {
                var options = {
                    disableTouchKeyboard: true,
                    autoclose: false
                };
                $this.datepicker(options);
            }
            // Events
            if ($datepicker.length) {
                $datepicker.each(function() {
                    init($(this));
                });
            }
        });
    }

    loadItems() {
        axios.get(`/account/user`).then(response =>
            this.setState({
               // user: response.data,
                id: response.data.id,
                email: response.data.email,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                body: response.data.body,
                avatar: response.data.avatar,
                sex: response.data.sex,
                color_name: response.data.color_name,
                birthday: response.data.birthday,
                status_user: response.data.status_user,
            }));
        this.mydatepicker();
        axios.get(`/api/colors`).then(response => this.setState({colors: [...response.data],}));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        document.title = `Profile ${this.state.username}`;
        let { colors } = this.state;
        return (
            <>
                <NavAdmin/>
                <div className={'main-panel'}>
                    <TopNavAdmin/>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className={`card-header card-header-icon card-header-${this.state.color_name}`}>
                                            <div className="card-icon">
                                                <i className="material-icons">perm_identity</i>
                                            </div>
                                            <h4 className="card-title">Profile -
                                                <small className="category">  {this.state.last_name } {this.state.first_name }</small>
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.updateItem} encType="multipart/form-data" >
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating">Company
                                                                (disabled)</label>
                                                            <input type="text" className="form-control"
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Username</label>
                                                            <input required={'required'}
                                                                   id='username'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                                   name='username'
                                                                   value={this.state.username || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('username')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Email
                                                                address</label>
                                                            <input required={'required'}
                                                                   id='email'
                                                                   type='email'
                                                                   placeholder="Email address"
                                                                   className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                   name='email'
                                                                   value={this.state.email || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('email')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Fist
                                                                Name</label>
                                                            <input required={'required'}
                                                                   id='first_name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                                   name='first_name'
                                                                   value={this.state.first_name || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('first_name')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Last
                                                                Name</label>
                                                            <input id='last_name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                   name='last_name'
                                                                   value={this.state.last_name || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('last_name')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label></label>
                                                            <select name={'sex'} value={this.state.sex}
                                                                    className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                    onChange={this.handleFieldChange}>
                                                                <option value="" disabled>Choose Your Sex</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                            {this.renderErrorFor('sex')}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label></label>
                                                            <select name={'color_name'} value={this.state.color_name}
                                                                    className={`form-control ${this.hasErrorFor('color_name') ? 'is-invalid' : ''}`}
                                                                    onChange={this.handleFieldChange}>
                                                                <option value="" disabled>Choose Your Color</option>
                                                                {colors.map((color) => (
                                                                    <option  key={color.id} value={color.slug}>{color.name}</option>
                                                                ))}
                                                            </select>
                                                            {this.renderErrorFor('color_name')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>About Me</label>
                                                            <div className="form-group">
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                            formats={this.formats}  value={this.state.body || ''} onChange={this.handleChangeBody}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={'/dashboard/profile/'} className={`btn pull-center btn-info`}>
                                                        Profile
                                                    </Link>
                                                    <Link to={`/dashboard/profile/add_info/${this.state.id}/edit`} className={`btn  pull-center btn-warning`}>
                                                        Add Info Profile
                                                    </Link>
                                                    <button type="submit" className={`btn pull-center btn-${this.state.color_name}`}>
                                                        Update Profile
                                                    </button>
                                                </div>
                                                <div className="clearfix"/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-profile">
                                        <div className="card-avatar">
                                            <a href="#pablo">
                                                <img className="img" src={this.state.avatar}/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                            <h4 className="card-title">{this.state.last_name } {this.state.first_name }</h4>
                                            <p className="card-description" dangerouslySetInnerHTML={{__html: this.state.body}}/>
                                            <a href="#pablo" className="btn btn-rose btn-round">Follow</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </>
        );
    }
}
