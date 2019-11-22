import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";


export default class TestimonialEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: '',
            body: '',
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
        console.log(this.props.match.params.id);
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
                                                <li className="breadcrumb-item"><Link to={'/dashboard/'}><i className="fas fa-home"></i></Link></li>
                                                <li className="breadcrumb-item"><Link to={'/dashboard/'}>Dashboards</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">{ (this.state.role.length > 35 ? this.state.role.substring(0,35)+ "..." : this.state.role)  }</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <Link to={'/dashboard/testimonials/'} className="btn btn-sm btn-neutral">Back</Link>
                                        <NavLink to={'/dashboard/testimonials/create/'} className="btn btn-sm btn-neutral">New</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid mt--6">

                        <div className="row justify-content-center">
                            <div className="col-lg-8 card-wrapper ct-example">

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="mb-0">{this.state.role}</h3>
                                    </div>
                                    <div className="card-body">
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

                        <FooterAdmin/>
                    </div>
                </div>

            </div>
        );
    }
}
