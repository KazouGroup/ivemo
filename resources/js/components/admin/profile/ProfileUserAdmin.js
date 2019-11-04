import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

export default class ProfileUserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };

        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
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
    // get all the tasks from backend
    loadItems() {
        let url = `/account/user`;
        axios.get(url).then(response =>
            this.setState({
                user: response.data
            })

        );
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
                                            <h4 className="card-title">{user.name}
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label>Username</label>
                                                        <input type='text'  className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label className="bmd-label-floating">Email address</label>
                                                        <input type="email" className="form-control"/>
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
                                                                    formats={this.formats}  value={user.body || ''}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Link to={'/dashboard/profile/edit/'} className={`btn  pull-center btn-${user.color_name}`}>
                                                    Edit Profile
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
                                                <img className="img" src={user.avatar}/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                            <h4 className="card-title" dangerouslySetInnerHTML={{__html: user.name}}/>
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
            </div>
        );
    }
}
