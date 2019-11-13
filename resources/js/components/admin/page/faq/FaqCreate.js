import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";

export default class FaqCreate extends Component {
    constructor(props) {
        super(props);

        this.createItem = this.createItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.state = {
            title: '',
            body: '',
            errors: []
        };
        this.modules = {
            toolbar: [
                [{'font': []}],
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                [{'color': []}, {'background': []}],
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

    handleChangeBody(value) {
        this.setState({body: value})
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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

    createItem(e) {
        e.preventDefault();

        let faq = {
            title: this.state.title,
            body: this.state.body
        };
        axios.post('/dashboard/faqs', faq)
            .then(() => {

                $.notify('<strong>The data FAQ has ben Save successfully...</strong>', {
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
                this.props.history.push('/dashboard/faqs');
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Something wrong. Try later...", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })
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
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-icon card-header-success">
                                            <div className="row">
                                                <div className="card-icon">
                                                    <i className="material-icons">chat</i>
                                                </div>
                                                <br/>
                                                <h4 className="card-title"><b>Create</b> -
                                                    <small className="category"> New Faqs</small>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="card-body">

                                            <form onSubmit={this.createItem}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating">
                                                                Title
                                                            </label>
                                                            <input required={'required'}
                                                                   id='title'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                   name='title'
                                                                   value={this.state.title}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('title')}
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
                                                                        formats={this.formats}
                                                                        value={this.state.body || ''}
                                                                        onChange={this.handleChangeBody}/>
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
                                                        <Link to={'/dashboard/faqs'} className="btn btn-danger btn-sm"
                                                              id="button_hover">
                                                            <i className="material-icons">chevron_left</i>
                                                            <b className="title_hover">Back</b>
                                                        </Link>
                                                        <button id="button_hover" type="submit"
                                                                className="btn btn-success btn-sm btn-raised">
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
