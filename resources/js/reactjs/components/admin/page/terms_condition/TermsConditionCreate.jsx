import React, {Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import FooterAdmin from "../../../inc/admin/FooterAdmin";


class TermsConditionCreate extends Component {
    constructor () {
        super();
        this.state = {
            title:'',
            body:'',
            user: [],
            errors: [],
            photo: '',
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
        this.createItem = this.createItem.bind(this);
        this.updateImage = this.updateImage.bind(this);
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

    updateImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({ file: file, photo: reader.result });
            console.log(reader.result)
        };
        reader.readAsDataURL(file)
    }
    // handle submit
    createItem(e) {
        e.preventDefault();
        let item = {
            title: this.state.title,
            body: this.state.body,
            photo: this.state.photo,
        };
        axios.post(`/dashboard/terms_conditions`, item).then(() => {

            /**
             * Init alert
             */
            $.notify('<strong>The data Term & Condition has ben Save successfully...</strong>', {
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
            this.props.history.push('/dashboard/terms_conditions/');

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
    // lifecycle method
    componentDidMount() {
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
    }

    render() {
        const {user,photo} = this.state;
        const composantTitle = `Terms & Condition`;
        const requiredField = {color: "red", fontSize: "12px"};
        const FileUpluaod = {cursor: "pointer"};
        document.title = `Ivemo - ${composantTitle}`;
        return(
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
                                                        <h4 className="card-title"><b>Create</b> -
                                                            <small className="category">New Term & Condition</small>
                                                        </h4>
                                                    </div>
                                                    <br/>
                                                    <div className="card-body">
                                                        <div className="submit">
                                                            <div className="text-right">
                                                                <Link to={'/dashboard/terms_conditions/'} className="btn btn-primary btn-sm" id="button_hover">
                                                                    <i className="material-icons">chevron_left</i>
                                                                    <b className="title_hover">Back</b>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <form onSubmit={this.createItem} encType="multipart/form-data">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>Title
                                                                            <span style={requiredField}>*</span>
                                                                        </label>
                                                                        <input required={'required'}
                                                                               id='title'
                                                                               type='text'
                                                                               placeholder={'Title Terms & conditions'}
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

                                                                <div className="col-md-8 ml-auto mr-auto">
                                                                    <div className="profile text-center">
                                                                        <br/>
                                                                        <img src={photo} alt={'name'}/>
                                                                        <input id="photo" type="file" onChange={this.updateImage}  className="form-control" name="photo"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={'row'}>
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>Description
                                                                            <span style={requiredField}>*</span>
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
                                                                    <Link to={'/dashboard/terms_conditions/'}
                                                                          className="btn btn-icon btn-secondary"
                                                                          type="submit">
                                                                            <span
                                                                                className="btn-inner--text">Back</span>
                                                                    </Link>
                                                                    <button className="btn btn-icon btn-primary"
                                                                            type="submit">
                                                                            <span
                                                                                className="btn-inner--text">Save</span>
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
        )
    }

}

export default TermsConditionCreate;
