import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-icon card-header-success">
                                            <div className="row">
                                                <div className="card-icon">
                                                    <i className="material-icons">chat</i>
                                                </div>
                                                <br/>
                                                <h4 className="card-title" ><b>{this.state.title}</b>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="card-body">

                                            <form onSubmit={this.updateItem}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating">

                                                            </label>
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
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating">
                                                                Description
                                                            </label>
                                                            <br/>
                                                            <ReactQuill theme="snow" modules={this.modules}
                                                                        formats={this.formats}  value={this.state.body || ''} onChange={this.handleChangeBody}/>
                                                            <div className="form-check">
                                                                <label className="form-check-label pull-right">
                                                                    You can use the
                                                                    <a href="https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/"
                                                                       className="text-danger" target="_blank">
                                                                        Markdown here
                                                                    </a>
                                                                    <span className="form-check-sign"></span>
                                                                </label>
                                                            </div>
                                                            {this.renderErrorFor('body')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="submit">
                                                    <div className="text-center">
                                                        <Link to={'/dashboard/testimonials/'} className="btn btn-danger btn-sm" id="button_hover">
                                                            <i className="material-icons">chevron_left</i>
                                                            <b className="title_hover">Back</b>
                                                        </Link>
                                                        <button id="button_hover" type="submit"
                                                                className="btn btn-success btn-raised btn-sm">
                                                            <i className="material-icons">save_alt</i>
                                                            <b className="title_hover">Save</b>
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
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
