import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ReactQuill from "react-quill";

export default class ProfileUserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            body: '',
            sex: '',

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
    loadItems() {
        axios.get(`/account/user`).then(response =>
            this.setState({
                email: response.data.email,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                body: response.data.body,
                avatar: response.data.avatar,
                sex: response.data.sex,
                color_name: response.data.color_name,
            }));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-md-8">
                                    <form onSubmit={this.updateItem}>
                                        <div className="card">
                                            <div className={`card-header card-header-icon card-header-${this.state.color_name}`}>
                                                <div className="card-icon">
                                                    <i className="material-icons">perm_identity</i>
                                                </div>
                                                <h4 className="card-title">{this.state.first_name} {this.state.last_name}
                                                </h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Username</label>
                                                            <input required={'required'}
                                                                   id='username'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                                   name='username'
                                                                   value={this.state.username}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('username')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Email address</label>
                                                            <input required={'required'}
                                                                   id='email'
                                                                   type='email'
                                                                   className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                   name='email'
                                                                   value={this.state.email}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('email')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Fist Name</label>
                                                            <input required={'required'}
                                                                   id='first_name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                                   name='first_name'
                                                                   value={this.state.first_name}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('first_name')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Last Name</label>
                                                            <input id='last_name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                   name='last_name'
                                                                   value={this.state.last_name}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('last_name')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group bmd-form-group">
                                                            <label>
                                                                <select name={'sex'} value={this.state.sex}
                                                                        className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Choose Your Sex</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </label>
                                                            {this.renderErrorFor('sex')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>About Me</label>
                                                            <ReactQuill theme="snow" modules={this.modules}
                                                                        formats={this.formats}  value={this.state.body || ''} onChange={this.handleChangeBody}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={'/dashboard/users/p/datatables/'} className={`btn  pull-center btn-secondary`}>
                                                        Cancel
                                                    </Link>
                                                    <button type="submit" className={`btn  pull-center btn-${this.state.color_name}`}>
                                                        Update Profile
                                                    </button>
                                                </div>

                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </form>
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
                                            <h6 className={'card-title'} dangerouslySetInnerHTML={{__html: this.state.sex}}/>
                                            <h6 className="card-title"
                                                dangerouslySetInnerHTML={{__html: this.state.first_name}}/>
                                            <p className="card-description"
                                               dangerouslySetInnerHTML={{__html: this.state.body}}/>
                                            <a href="#pablo" className="btn btn-primary btn-sm ">Follow</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
