import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ReactQuill from "react-quill";

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
        axios.get(`/api/colors`).then(response => this.setState({colors: [...response.data],}));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        let { colors } = this.state;
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
                                                <li className="breadcrumb-item active" aria-current="page">profile edit</li>
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
                                                <h3 className="mb-0">Edit profile </h3>
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
                                                                   value={this.state.username || ""}
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
                                                            <label className="form-control-label">Color</label>
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
                                                <Link to={'/dashboard/profile/'} className={`btn  btn-sm pull-center btn-info`}>
                                                    Profile
                                                </Link>
                                                <Link to={`/dashboard/profile/add_info/${this.state.id}/edit`} className={`btn  pull-center btn-warning btn-sm`}>
                                                    Add Info Profile
                                                </Link>
                                                <button type="submit" className={`btn  btn-sm pull-center btn-${this.state.color_name}`}>
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
