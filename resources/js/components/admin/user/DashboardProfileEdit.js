import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ReactQuill from "react-quill";

class DashboardProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

        this.state = {
            facebook_link: '',
            twitter_link: '',
            youtube_link: '',
            full_name: '',
            user: '',
            errors: [],
        };

    }

    handleFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handle submit
    updateItem(e) {
        let profileId = this.props.match.params.profile;
        e.preventDefault();

        const profile = {
            facebook_link: this.state.facebook_link,
            twitter_link: this.state.twitter_link,
            full_name: this.state.full_name,
        };

        axios.post(`/profile/add_info/${profileId}`, profile).then(() => {

            $.notify({

                    message: 'Your profile has ben created successfully'
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
            this.props.history.push(`/dashboard/profile/add_info/${profileId}/edit/`);

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
    // get all the tasks from backend
    loadItems() {
        let userId = this.props.match.params.profile;
        axios.get(`/dashboard/profile/add_info/${userId}`).then(response =>
            this.setState({
                facebook_link: response.data.facebook_link,
                twitter_link: response.data.twitter_link,
                full_name: response.data.full_name,
                user: response.data.user,
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
                                    <img src="/assets/dashboard/assets/img/theme/img-1-1000x600.jpg" alt={this.state.user.first_name }
                                         className="card-img-top"/>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                <a href="#">
                                                    <img src={this.state.user.avatar } alt={this.state.user.first_name }
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
                                                {this.state.user.last_name } {this.state.user.first_name }<span className="font-weight-light">, 27</span>
                                            </h5>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2"></i>Bucharest, Romania
                                            </div>
                                            <div className="h5 mt-4" dangerouslySetInnerHTML={{__html: this.state.user.body}}>

                                            </div>
                                        </div>
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
                                                {this.state.user.status_user === 1 ?
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
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-username">Full Name</label>
                                                            <input required={'required'}
                                                                   id='full_name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                                   name='full_name'
                                                                   value={this.state.full_name || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('full_name')}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label className="form-control-label"
                                                                   htmlFor="input-first_name">Facebook link</label>
                                                            <input id='facebook_link'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('facebook_link') ? 'is-invalid' : ''}`}
                                                                   name='facebook_link'
                                                                   value={this.state.facebook_link || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('facebook_link')}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label className="form-control-label"
                                                                   htmlFor="input-last_name">Twitter link</label>
                                                            <input id='twitter_link'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('twitter_link') ? 'is-invalid' : ''}`}
                                                                   name='twitter_link'
                                                                   value={this.state.twitter_link || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('twitter_link')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Link to={'/dashboard/profile/edit/'} className={`btn  pull-center btn-secondary btn-sm`}>
                                                    Info personal
                                                </Link>
                                                <button type="submit" className={`btn  pull-center btn-sm btn-${this.state.user.color_name}`}>
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
export default DashboardProfileEdit;
