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
            site_internet: '',
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
            site_internet: this.state.site_internet,
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
                site_internet: response.data.site_internet,
                full_name: response.data.full_name,
                user: response.data.user,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {user} = this.state;
        document.title = `Profile ${user.username}`;
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
                                        <div className={`card-header card-header-icon card-header-${user.color_name}`}>
                                            <div className="card-icon">
                                                <i className="material-icons">perm_identity</i>
                                            </div>
                                            <h4 className="card-title">Profile -
                                                <small className="category">  {user.last_name } {user.first_name }</small>
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.updateItem} encType="multipart/form-data" >
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Facebook link</label>
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
                                                        <div className="form-group">
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
                                                <div className={'row'}>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Twitter link</label>
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
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Site internet</label>
                                                            <input id='site_internet'
                                                                   placeholder="http://yoursite.com"
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('site_internet') ? 'is-invalid' : ''}`}
                                                                   name='site_internet'
                                                                   value={this.state.site_internet || ""}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('site_internet')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={'/dashboard/profile/edit/'} className={`btn  pull-center btn-secondary`}>
                                                        Info personal
                                                    </Link>
                                                    <button type="submit" className={`btn  pull-center btn-${user.color_name}`}>
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
                                                <img className="img" src={user.avatar}/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            {user.status_user === 1 ?
                                                <button type="button" className="btn btn-success btn-sm ">Administrator</button>
                                                :
                                                <button type="button" className="btn btn-success btn-sm ">User</button>
                                            }
                                            <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                            <h4 className="card-title">{user.last_name } {user.first_name }</h4>
                                            <p className="card-description" dangerouslySetInnerHTML={{__html: user.body}}/>
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
export default DashboardProfileEdit;
