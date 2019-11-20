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
            statusOnline: '',
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
                statusOnline: response.data.statusOnline,
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
       // console.log(this.props.match.params.user);
        let { allroles } = this.state;
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-content" id="panel">

                    <TopNavAdmin/>

                    <div className="header bg-primary pb-6">
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">Default</h6>
                                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                                <li className="breadcrumb-item">
                                                    <Link to={'/dashboard/'}>
                                                        <i className="fas fa-home"></i>
                                                    </Link>
                                                </li>
                                                <li className="breadcrumb-item"><Link to={'/dashboard/'}>Dashboards</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">{this.state.first_name} {this.state.last_name} </li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <a href="#" className="btn btn-sm btn-neutral">New</a>
                                        <a href="#" className="btn btn-sm btn-neutral">Filters</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="container-fluid mt--6">

                        <div className="row">

                            <div className="col-xl-4 order-xl-2">

                                <div className="card card-profile">
                                    <img src="/assets/dashboard/assets/img/theme/img-1-1000x600.jpg" alt={this.state.first_name }
                                         className="card-img-top"/>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                <a href="#">
                                                    <img src={this.state.avatar } alt={this.state.first_name }
                                                         className="rounded-circle"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                        <div className="d-flex justify-content-between">
                                            {this.state.statusOnline ?
                                                <button type={'button'} className="btn btn-sm btn-success mr-4">Connect</button>
                                                :
                                                <button type={'button'} className="btn btn-sm btn-danger mr-4">Offline</button>
                                            }
                                            <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-profile-stats d-flex justify-content-center">
                                                    <div>
                                                        <span className="heading">22</span>
                                                        <span className="description">Friends</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">10</span>
                                                        <span className="description">Photos</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">89</span>
                                                        <span className="description">Comments</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h5 className="h3">
                                                {this.state.last_name } {this.state.first_name }<span className="font-weight-light">, 27</span>
                                            </h5>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2"></i>Bucharest, Romania
                                            </div>
                                            <div className="h5 mt-4" dangerouslySetInnerHTML={{__html: this.state.body}}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="h3 mb-0">Progress track</h5>
                                    </div>

                                </div>
                            </div>

                            <div className="col-xl-8 order-xl-1">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card bg-gradient-info border-0">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0 text-white">Total
                                                            traffic</h5>
                                                        <span
                                                            className="h2 font-weight-bold mb-0 text-white">350,897</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                                            <i className="ni ni-active-40"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-white mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap text-light">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card bg-gradient-danger border-0">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0 text-white">Performance</h5>
                                                        <span
                                                            className="h2 font-weight-bold mb-0 text-white">49,65%</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                                            <i className="ni ni-spaceship"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-white mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap text-light">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col-8">
                                                <h3 className="mb-0">Edit profile: {this.state.first_name} {this.state.last_name} </h3>
                                            </div>
                                            <div className="col-4 text-right">
                                                {this.state.status_user === 1 ?
                                                    <button type="button" className="btn btn-success btn-sm ">Administrator</button>
                                                    :
                                                    <button type="button" className="btn btn-success btn-sm ">User</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.updateItem} encType="multipart/form-data" >
                                            <h6 className="heading-small text-muted mb-4">User information</h6>
                                            <div className="pl-lg-4">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-username">Username</label>
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
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-email">Email address</label>
                                                            <input required={'required'}
                                                                   id='email'
                                                                   type='email'
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
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label"
                                                                   htmlFor="input-first_name">First name</label>
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
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label"
                                                                   htmlFor="input-last_name">Last name</label>
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
                                            </div>
                                            <hr className="my-4"/>
                                            <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                            <div className="pl-lg-4">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">sex</label>
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
                                                            <label className="form-control-label">Status User</label>
                                                            <select name={'status_user'} value={this.state.status_user}
                                                                    className={`form-control ${this.hasErrorFor('status_user') ? 'is-invalid' : ''}`}
                                                                    onChange={this.handleFieldChange}>
                                                                <option value="" disabled>Choose Status User</option>
                                                                <option value="0">User</option>
                                                                <option value="1">Administrator</option>
                                                            </select>
                                                            {this.renderErrorFor('status_user')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'row'}>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Role</label>
                                                            <select name="roles" value={this.state.roles}
                                                                    className={`form-control ${this.hasErrorFor('roles') ? 'is-invalid' : ''}`}
                                                                    onChange={this.handleFieldChange}>
                                                                <option value="" disabled>Choose Role User</option>
                                                                {allroles.map((role,index) => (
                                                                    <option  key={index} value={role.name}>{role.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4"/>

                                            <h6 className="heading-small text-muted mb-4">About me</h6>
                                            <div className="pl-lg-4">
                                                <div className="form-group">
                                                    <label className="form-control-label">About Me</label>
                                                    <ReactQuill theme="snow" modules={this.modules}
                                                                formats={this.formats}  value={this.state.body || ''} onChange={this.handleChangeBody}/>
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
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterAdmin/>
                    </div>
                </div>

            </div>

        );
    }
}
export default DashboardUserEdit;
