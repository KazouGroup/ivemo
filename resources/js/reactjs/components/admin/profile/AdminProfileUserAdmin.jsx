import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

export default class AdminProfileUserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
        this.modules = {
            toolbar: [
                //[{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                //['clean']
            ],
        };
        this.formats = [
            //'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];

        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // get all the tasks from backend
    loadItems() {
        let url = `/account/user`;
        axios.get(url).then(response =>
            this.setState({
                user: response.data
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {user} = this.state;
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
                                                <li className="breadcrumb-item active" aria-current="page">{user.first_name}</li>
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
                                    <img src="/assets/dashboard/assets/img/theme/img-1-1000x600.jpg" alt={user.first_name }
                                         className="card-img-top"/>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                <a href="#">
                                                    <img src={user.avatar } alt={user.first_name }
                                                         className="rounded-circle"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                        <div className="d-flex justify-content-between">

                                            <a href="#" className="btn btn-sm btn-success mr-4">Connect</a>
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
                                                {user.last_name } {user.first_name }<span className="font-weight-light">, 27</span>
                                            </h5>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2"></i>Bucharest, Romania
                                            </div>
                                            <div className="h5 mt-4" dangerouslySetInnerHTML={{__html: user.body}}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="h3 mb-0">Progress track</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush list my--3">
                                            <li className="list-group-item px-0">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <a href="#" className="avatar rounded-circle">
                                                            <img alt="Image placeholder"
                                                                 src={user.avatar}/>
                                                        </a>
                                                    </div>
                                                    <div className="col">
                                                        <h5>Argon Design System</h5>
                                                        <div className="progress progress-xs mb-0">
                                                            <div className="progress-bar bg-orange" role="progressbar"
                                                                 aria-valuenow="60" aria-valuemin="0"
                                                                 aria-valuemax="100" style={{width: "60%"}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item px-0">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <a href="#" className="avatar rounded-circle">
                                                            <img alt="Image placeholder"
                                                                 src={user.avatar}/>
                                                        </a>
                                                    </div>
                                                    <div className="col">
                                                        <h5>Angular Now UI Kit PRO</h5>
                                                        <div className="progress progress-xs mb-0">
                                                            <div className="progress-bar bg-green" role="progressbar"
                                                                 aria-valuenow="100" aria-valuemin="0"
                                                                 aria-valuemax="100" style={{width: "30%"}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                                                <h3 className="mb-0">Profile </h3>
                                            </div>
                                            <div className="col-4 text-right">
                                                <Link to={'/dashboard/profile/edit/'} className="btn btn-outline-info btn-sm ">Edit profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="heading-small text-muted mb-4">User information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-username">Username</label>
                                                        <input required={'required'} className={`form-control`} id='username' type='text' name='username' onChange={this.handleFieldChange} value={user.username || ""}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                                                        <input required={'required'} className={`form-control`} id='email' type='email' name='email' onChange={this.handleFieldChange} value={user.email || ""}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label"
                                                               htmlFor="input-first_name">First name</label>
                                                        <input required={'required'} id='first_name' type='text' className={`form-control`} name='first_name' onChange={this.handleFieldChange} value={user.first_name || ""}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label"
                                                               htmlFor="input-last_name">Last name</label>
                                                        <input id='last_name' type='text' className={`form-control`} name='last_name' onChange={this.handleFieldChange} value={user.last_name || ""}/>
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
                                                            formats={this.formats}  value={user.body || ''}/>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Link to={`/dashboard/profile/add_info/${user.id}/edit`} className={`btn  pull-center btn-warning`}>
                                                Add Info Profile
                                            </Link>
                                        </div>
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
