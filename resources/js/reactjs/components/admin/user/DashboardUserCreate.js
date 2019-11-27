import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class DashboardUserCreate extends Component {
    constructor(props) {
        super(props);

        this.createItem = this.createItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

        this.state = {
            password_confirmation: '',
            password: '',
            username: '',
            first_name: '',
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

    }

    handleChangeBody(value) {
        this.setState({body: value})
    }

    handleFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handle submit
    createItem(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            username: this.state.username,
            first_name: this.state.first_name,
            password_confirmation: this.state.password_confirmation,
            password: this.state.password,
            status_user: this.state.status_user,
            body: this.state.body,
        };

        axios.post(`/dashboard/users`, user).then(() => {

            $.notify({

                    message: 'User has ben created successfully'
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
            this.props.history.push('/dashboard/users/');

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

    //has get error
    hasErrorFor(field) {
        return !!this.state.errors[field]
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

    render() {
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this.createItem}>
                                        <div className="card">
                                            <div className="card-header card-header-icon card-header-rose">
                                                <div className="card-icon">
                                                    <i className="material-icons">perm_identity</i>
                                                </div>
                                                <h4 className="card-title">
                                                    {this.state.first_name}
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
                                                    <div className="col-md-6">
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
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>
                                                                <select value={this.state.sex}
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
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Password</label>
                                                            <input required={'required'}
                                                                id='password'
                                                                type='password'
                                                                className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                                name='password'
                                                                value={this.state.password}
                                                                onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('password')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Confirm password</label>
                                                            <input required={'required'}
                                                                   id='password_confirmation'
                                                                type='password'
                                                                className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                                                                name='password_confirmation'
                                                                value={this.state.password_confirmation}
                                                                onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('password_confirmation')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>About Me</label>
                                                            <ReactQuill theme="snow" modules={this.modules}
                                                                        formats={this.formats}
                                                                        value={this.state.body || ''}
                                                                        onChange={this.handleChangeBody}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={'/dashboard/users/'}
                                                          className={`btn  pull-center btn-secondary`}>
                                                        Cancel
                                                    </Link>
                                                    <button type="submit" className={`btn  pull-center btn-success`}>
                                                        Save User
                                                    </button>
                                                </div>

                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </form>
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
export default DashboardUserCreate;
