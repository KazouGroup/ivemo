import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class DashboardUserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            id: '',
            username: '',
            first_name: '',
            status_user: '',
            last_name: '',
            email: '',
            body: '',
            sex: '',
            roles: '',
            allroles: [],
            followers: [],

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
        this.updateItem = this.updateItem.bind(this);
        this.followItem = this.followItem.bind(this);
        this.unfollowItem = this.unfollowItem.bind(this);
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
    followItem(id){
        axios.post(`/profile/user/${id}/follow`)
            .then(res => {
                /** End alert ***/
                this.loadItems();
            })
    }
    unfollowItem(id){
        axios.post(`/profile/user/${id}/unfollow`)
            .then(res => {
                /** End alert ***/
                this.loadItems();
            })
    }
    // handle submit
    updateItem(e) {
        let userId = this.props.match.params.user;
        e.preventDefault();
        let user = {
            email: this.state.email,
            username: this.state.username,
            first_name: this.state.first_name,
            status_user: this.state.status_user,
            last_name: this.state.last_name,
            body: this.state.body,
            sex: this.state.sex,
            roles: this.state.roles,
        };
        axios.put(`/dashboard/users/${userId}`, user).then(() => {

            /**
             * Init alert
             */
            $.notify({
                    message: 'User has ben updated successfully'
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
            this.props.history.push(`/dashboard/users/${userId}/edit`);

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
    // get all the tasks from backend
    loadItems() {
        let userId = this.props.match.params.user;
        axios.get(`/api/users/${userId}`).then(response =>
            this.setState({
                id: response.data.id,
                email: response.data.email,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                body: response.data.body,
                avatar: response.data.avatar,
                sex: response.data.sex,
                color_name: response.data.color_name,
                status_user: response.data.status_user,
                roles: response.data.roles,
            }));
        axios.get(`/api/roles`).then(response =>
            this.setState({
                allroles: [...response.data],
            }));
        axios.get(`/api/followers`).then(response =>
            this.setState({
                followers: [...response.data],
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        console.log(this.props.match.params.user);
        let { allroles } = this.state;
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
                                            <div className="card-header card-header-icon card-header-rose">
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
                                                            <label>Last Name</label>
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
                                                    <div className="col-md-6">
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
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>
                                                                <select name={'status_user'} value={this.state.status_user}
                                                                        className={`form-control ${this.hasErrorFor('status_user') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Choose Status User</option>
                                                                    <option value="0">User</option>
                                                                    <option value="1">Administrator</option>
                                                                </select>
                                                            </label>
                                                            {this.renderErrorFor('status_user')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'row'}>
                                                    <div className={'col-md-12'}>
                                                        <div className="form-group bmd-form-group">
                                                            <label>
                                                                <select name="roles" value={this.state.roles}
                                                                        className={`form-control ${this.hasErrorFor('roles') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Choose Role User</option>
                                                                    {allroles.map((role,index) => (
                                                                        <option  key={index} value={role.name}>{role.name}</option>
                                                                    ))}
                                                                </select>
                                                            </label>
                                                            {this.renderErrorFor('status_user')}
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
                                                    {this.state.status_user === 1 ?
                                                        <Link to={'/dashboard/administrators/p/datatables/'} className={`btn  pull-center btn-secondary btn-sm`}>
                                                            Back
                                                        </Link>
                                                        :
                                                        <Link to={'/dashboard/users/p/datatables/'} className={`btn  pull-center btn-secondary btn-sm`}>
                                                            Back
                                                        </Link>
                                                    }
                                                    <button type="submit" className={`btn  pull-center btn-sm btn-${this.state.color_name}`}>
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
                                            {this.state.status_user === 1 ?
                                                <button type="button" className="btn btn-success btn-sm ">Administrator</button>
                                                :
                                                <button type="button" className="btn btn-success btn-sm ">User</button>
                                            }
                                            <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                            <h4 className="card-title" dangerouslySetInnerHTML={{__html: this.state.first_name}}/>
                                            <p className="card-description" dangerouslySetInnerHTML={{__html: this.state.body}}/>
                                            <button type="button"  onClick={() => this.unfollowItem(this.state.id)} className="btn pull-center btn-primary btn-sm ">Unfollow</button>
                                            <button type="button"  onClick={() => this.followItem(this.state.id)} className="btn pull-center btn-outline-primary btn-sm ">Follow</button>
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
export default DashboardUserEdit;
