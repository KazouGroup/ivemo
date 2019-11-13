import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

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

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-md-8">
                                    <form onSubmit={this.updateItem}>
                                        <div className="card">
                                            <div className={`card-header card-header-icon card-header-${this.state.user.color_name}`}>
                                                <div className="card-icon">
                                                    <i className="material-icons">perm_identity</i>
                                                </div>
                                                <h4 className="card-title">{this.state.full_name}
                                                </h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Full Name</label>
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
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Facebook Link</label>
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
                                                    <div className="col-md-6">
                                                        <div className="form-group bmd-form-group">
                                                            <label>Twitter Link</label>
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
                                                <div className="text-center">
                                                    <Link to={'/dashboard/profile/edit/'} className={`btn  pull-center btn-secondary btn-sm`}>
                                                         Info personal
                                                    </Link>
                                                    <button type="submit" className={`btn  pull-center btn-sm btn-${this.state.user.color_name}`}>
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
                                                <img className="img" src={this.state.user.avatar}/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                            <div className="card-footer justify-content-center">
                                                {this.state.twitter_link !== null ?
                                                    <a href="#pablo" className="btn btn-just-icon btn-sm btn-twitter btn-round">
                                                        <i className="fa fa-twitter"></i>
                                                    </a>
                                                    :null
                                                }
                                                {this.state.facebook_link !== null ?
                                                <a href={`https://www.facebook.com/${this.state.facebook_link }`} className="btn btn-just-icon btn-sm btn-facebook btn-round">
                                                    <i className="fa fa-facebook-square"></i>
                                                </a>
                                                    :null
                                                }
                                            </div>
                                            <h4 className="card-title" dangerouslySetInnerHTML={{__html: this.state.user.first_name}}/>
                                            <p className="card-description" dangerouslySetInnerHTML={{__html: this.state.user.body}}/>
                                            {this.state.user.status_user === 1 ?
                                                <button type="button" className="btn btn-success btn-sm ">Administrator</button>
                                                :
                                                <button type="button" className="btn btn-success btn-sm ">User</button>
                                            }
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
export default DashboardProfileEdit;
