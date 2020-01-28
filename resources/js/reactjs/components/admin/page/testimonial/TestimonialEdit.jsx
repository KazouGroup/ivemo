import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import {Col, FormGroup, Input, Row} from "reactstrap";


class TestimonialEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: '',
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
        // bind
        this.updateItem = this.updateItem.bind(this);
        this.loadItems = this.loadItems.bind(this);
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
        let Id = this.props.match.params.id;
        e.preventDefault();
        let item = {
            role: this.state.role,
            body: this.state.body
        };
        axios.put(`/dashboard/testimonials/${Id}`, item).then(() => {
            /**
             * Init alert
             */
            $.notify('<strong>Testimonial has ben Updated successfully...</strong>', {
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
            this.props.history.push('/dashboard/testimonials/');

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
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let Id = this.props.match.params.id;
        axios.get(`/dashboard/testimonials/${Id}`).then(response =>
            this.setState({
                role: response.data.role,
                body: response.data.body,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {user} = this.state;
        return (
            <>
                <NavAdmin/>
                <div className={'main-panel'}>
                    <TopNavAdmin/>
                    <div className={'content'}>
                        <div className="container-fluid">
                            <b/>
                            <StatusAdmin key={user.id} {...user}/>
                            <b/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12 expo">
                                                <div className="card">
                                                    <div
                                                        className={`card-header card-header-icon card-header-${user.color_name}`}>
                                                        <div className="card-icon">
                                                            <i className="material-icons">forum</i>
                                                        </div>
                                                        <br/>
                                                        <h4 className="card-title"><b>Edit</b> -
                                                            <small className="category"> {this.state.role}</small>
                                                        </h4>
                                                    </div>
                                                    <br/>
                                                    <div className="card-body">
                                                        <div className="submit">
                                                            <div className="text-right">
                                                                <Link to={'/dashboard/testimonials/'} className="btn btn-primary btn-sm" id="button_hover">
                                                                    <i className="material-icons">chevron_left</i>
                                                                    <b className="title_hover">Back</b>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <form onSubmit={this.updateItem}>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Role</label>
                                                                        <input id='role'
                                                                               type='text'
                                                                               className={`form-control ${this.hasErrorFor('role') ? 'is-invalid' : ''}`}
                                                                               name='role'
                                                                               value={this.state.role}
                                                                               onChange={this.handleFieldChange}
                                                                        />
                                                                        {this.renderErrorFor('role')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={'row'}>
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="bmd-label-floating">
                                                                            Description
                                                                        </label>
                                                                        <br/>
                                                                        <ReactQuill theme="snow" modules={this.modules}
                                                                                    formats={this.formats}
                                                                                    value={this.state.body || ''}
                                                                                    onChange={this.handleChangeBody}/>
                                                                        {this.renderErrorFor('body')}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="submit">
                                                                <div className="text-center">
                                                                    <Link to={'/dashboard/testimonials/'} className="btn btn-icon btn-secondary" type="submit">
                                                                        <span className="btn-inner--text">Back</span>
                                                                    </Link>
                                                                    <button className="btn btn-icon btn-primary" type="submit">
                                                                        <span className="btn-inner--text">Save</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
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
export default TestimonialEdit;
