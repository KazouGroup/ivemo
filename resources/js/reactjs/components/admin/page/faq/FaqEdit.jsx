import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import ReactQuill from 'react-quill';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import StatusAdmin from "../../../inc/admin/StatusAdmin";

export default class FaqEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            categoryfaq_id: '',
            faq: {},
            user: [],
            categories_faqs: [],
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
        let faqId = this.props.match.params.faq;
        e.preventDefault();
        let faq = {
            title: this.state.title,
            body: this.state.body,
            categoryfaq_id: this.state.categoryfaq_id,
        };
        axios.put(`/dashboard/faqs/${faqId}`, faq).then(() => {

            /**
             * Init alert
             */
            $.notify('<strong>The data FAQ has ben Updated successfully...</strong>', {
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
            this.props.history.push('/dashboard/faqs/');

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
        let faqId = this.props.match.params.faq;
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        axios.get(`/dashboard/faqs/${faqId}`).then(response =>
            this.setState({
                //faq: response.data,
                title: response.data.title,
                body: response.data.body,
                categoryfaq_id: response.data.categoryfaq_id,
            }));
        axios.get('/api/categories_faqs').then(response =>
            this.setState({
                categories_faqs: [...response.data],
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {user} = this.state;
        document.title = `Edit ${this.state.title}`;
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
                                                            <small className="category"> {this.state.title}</small>
                                                        </h4>
                                                    </div>
                                                    <br/>
                                                    <div className="card-body">
                                                        <div className="submit">
                                                            <div className="text-right">
                                                                <Link to={'/dashboard/faqs/'} className="btn btn-primary btn-sm" id="button_hover">
                                                                    <i className="material-icons">chevron_left</i>
                                                                    <b className="title_hover">Back</b>
                                                                </Link>
                                                                <Link to={'/dashboard/faqs/create/'} className="btn btn-info btn-sm" id="button_hover">
                                                                    <i className="material-icons">forum</i>
                                                                    <b className="title_hover">New FAQS</b>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <form onSubmit={this.updateItem}>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <input required={'required'}
                                                                               id='title'
                                                                               type='text'
                                                                               placeholder={'Title FAQS'}
                                                                               className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                               name='title'
                                                                               value={this.state.title}
                                                                               onChange={this.handleFieldChange}
                                                                        />
                                                                        {this.renderErrorFor('title')}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <select name={'categoryfaq_id'}
                                                                                value={this.state.categoryfaq_id}
                                                                                className={`form-control ${this.hasErrorFor('categoryfaq_id') ? 'is-invalid' : ''}`}
                                                                                onChange={this.handleFieldChange}>
                                                                            <option value="" disabled>Choose Your
                                                                                Category FAQS
                                                                            </option>
                                                                            {this.state.categories_faqs.map((categoryfaq) => (
                                                                                <option key={categoryfaq.id}
                                                                                        value={categoryfaq.id}>{categoryfaq.name}</option>
                                                                            ))}
                                                                        </select>
                                                                        {this.renderErrorFor('categoryfaq_id')}
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
                                                                        <ReactQuill theme="snow"
                                                                                    modules={this.modules}
                                                                                    formats={this.formats}
                                                                                    value={this.state.body || ''}
                                                                                    onChange={this.handleChangeBody}/>
                                                                        {this.renderErrorFor('body')}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="submit">
                                                                <div className="text-center">
                                                                    <Link to={'/dashboard/faqs/'}
                                                                          className="btn btn-icon btn-secondary"
                                                                          type="submit">
                                                                            <span
                                                                                className="btn-inner--text">Back</span>
                                                                    </Link>
                                                                    <button className="btn btn-icon btn-primary"
                                                                            type="submit">
                                                                            <span
                                                                                className="btn-inner--text">Update</span>
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
