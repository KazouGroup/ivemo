import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            body: '',
            user: [],
            errors: [],
        };

        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
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
        //this.updateItem = this.updateItem.bind(this);
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
    // get all the tasks from backend
    loadItems() {
        let userId = this.props.match.params.user;
        axios.get(`/api/users/${userId}`).then(response =>
            this.setState({
                username: response.data.username,
                color_name: response.data.color_name,
                name: response.data.name,
                email: response.data.email,
                body: response.data.body,
            }));
    }
    // lifecycle method
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
                                    <div className="card">
                                        <div className="card-header card-header-icon card-header-rose">
                                            <div className="card-icon">
                                                <i className="material-icons">perm_identity</i>
                                            </div>
                                            <h4 className="card-title">{this.state.name}
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
                                                        {this.renderErrorFor('username')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label className="bmd-label-floating">Fist Name</label>
                                                        <input type="text" className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label className="bmd-label-floating">Last Name</label>
                                                        <input type="text" className="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group bmd-form-group">
                                                        <label className="bmd-label-floating">Adress</label>
                                                        <input type="text" className="form-control"/>
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
                                                <Link to={'/dashboard/profile/edit/'} className={`btn  pull-center btn-${this.state.color_name}`}>
                                                    Update Profile
                                                </Link>
                                            </div>

                                            <div className="clearfix"></div>
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
                                            <h4 className="card-title" dangerouslySetInnerHTML={{__html: this.state.name}}/>
                                            <p className="card-description" dangerouslySetInnerHTML={{__html: this.state.body}}/>
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
export default UserEdit;
