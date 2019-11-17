import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ReactQuill from "react-quill";

export default class AdminProfileUserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            color_name: '',
            birthday: '',
            email: '',
            body: '',
            sex: '',
            avatar: '',

            colors: [],
            errors: [],
        };

        this.modules = {
            toolbar: [
                [{'font': []}],
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                [{'color': []}, {'background': []}],
                //['clean']
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
        let file = e.target.files[0];
        console.log(e);
        let reader = new FileReader();
        let limit = 1024 * 1024 * 2;
        if(file['size'] > limit){
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'You are uploading a large file',
            });
            return false;
        }
        reader.onloadend = (file) => {
            this.form.avatar = reader.result;
        };
        reader.readAsDataURL(file);
    }
    // handle submit
    updateItem(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            color_name: this.state.color_name,
            birthday: this.state.birthday,
            body: this.state.body,
            sex: this.state.sex,
        };
        axios.put(`/profile/users`, user).then(() => {

            /**
             * Init alert
             */
            $.notify({
                    message: 'Your profile has been updated successfully'
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
            this.props.history.push(`/dashboard/profile/edit/`);

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
    mydatepicker(){
        $( function () {
            $('.datepicker').datetimepicker({
                format: 'DD/MM/YYYY',
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove'
                }
            });
        });
    }
    loadItems() {
        axios.get(`/account/user`).then(response =>
            this.setState({
               // user: response.data,
                id: response.data.id,
                email: response.data.email,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                body: response.data.body,
                avatar: response.data.avatar,
                sex: response.data.sex,
                color_name: response.data.color_name,
                birthday: response.data.birthday,
            }));
            this.mydatepicker();
        axios.get(`/api/colors`).then(response => this.setState({colors: [...response.data],}));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        let { colors } = this.state;
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">
                            <form onSubmit={this.updateItem} encType="multipart/form-data" >
                                <div className="row">
                                    <div className="col-md-8">
                                            <div className="card">
                                                <div className={`card-header card-header-icon card-header-${this.state.color_name}`}>
                                                    <div className="card-icon">
                                                        <i className="material-icons">perm_identity</i>
                                                    </div>
                                                    <h4 className="card-title">{this.state.first_name} {this.state.last_name}
                                                    </h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group bmd-form-group">
                                                                <label>Username</label>
                                                                <input required={'required'}
                                                                       id='username'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                                       name='username'
                                                                       value={this.state.username || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('username')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group bmd-form-group">
                                                                <label>Email address</label>
                                                                <input required={'required'}
                                                                       id='email'
                                                                       type='email'
                                                                       className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                       name='email'
                                                                       value={this.state.email || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('email')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group bmd-form-group">
                                                                <label>Fist Name</label>
                                                                <input required={'required'}
                                                                       id='first_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                                       name='first_name'
                                                                       value={this.state.first_name || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('first_name')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group bmd-form-group">
                                                                <label>Last Name</label>
                                                                <input id='last_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                       name='last_name'
                                                                       value={this.state.last_name || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('last_name')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group bmd-form-group">
                                                                <label>Data birthday</label>
                                                                <input id='birthday'
                                                                       type='text'
                                                                       className={`form-control datepicker ${this.hasErrorFor('birthday') ? 'is-invalid' : ''}`}
                                                                       name='birthday'
                                                                       value={this.state.birthday || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('birthday')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className="col-md-6">
                                                            <div className="form-group bmd-form-group">
                                                                <label>
                                                                    <select name={'sex'} value={this.state.sex}
                                                                            className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                            onChange={this.handleFieldChange}>
                                                                        <option value="" disabled>Choose Your Sex</option>
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                    </select>
                                                                </label>
                                                                {this.renderErrorFor('sex')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group bmd-form-group">
                                                                <label>
                                                                    <select name={'color_name'} value={this.state.color_name}
                                                                            className={`form-control ${this.hasErrorFor('color_name') ? 'is-invalid' : ''}`}
                                                                            onChange={this.handleFieldChange}>
                                                                        <option value="" disabled>Choose Your Color</option>
                                                                        {colors.map((color) => (
                                                                            <option  key={color.id} value={color.slug}>{color.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </label>
                                                                {this.renderErrorFor('color_name')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>About Me</label>
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                            formats={this.formats}  value={this.state.body || ''} onChange={this.handleChangeBody}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <Link to={'/dashboard/profile/'} className={`btn  btn-sm pull-center btn-info`}>
                                                            Profile
                                                        </Link>
                                                        <Link to={`/dashboard/profile/add_info/${this.state.id}/edit`} className={`btn  pull-center btn-warning btn-sm`}>
                                                            Add Info Profile
                                                        </Link>
                                                        <button type="submit" className={`btn  btn-sm pull-center btn-${this.state.color_name}`}>
                                                            Update Profile
                                                        </button>
                                                    </div>

                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-profile">
                                            <div className="row">
                                                <div className="col-md-6 ml-auto mr-auto">
                                                    <div className="profile text-center ">
                                                        <div className="avatar">
                                                            <div className="fileinput fileinput-new text-center"
                                                                 data-provides="fileinput">
                                                                <div className="fileinput-new thumbnail img-circle img-raised">
                                                                    <img className="img" src={this.state.avatar}/>
                                                                </div>
                                                                <div className="fileinput-preview fileinput-exists thumbnail img-circle img-raised">

                                                                </div>
                                                                <div>
                                                                     <span className="btn btn-raised btn-sm btn-info btn-file">
                                                                                    <span className="fileinput-new">
                                                                                        <b> Add Profile</b>
                                                                             </span>
                                                                             <span className="fileinput-exists">
                                                                            <i className="material-icons">edit</i>
                                                                            <b> Change</b>
                                                                          </span>
                                                                         <input onChange={this.updateImage} id="avatar" type="file" className="form-control" name="avatar"/>
                                                                        </span>
                                                                    <br/>
                                                                    <a href="#pablo"
                                                                       className="btn btn-danger fileinput-exists btn-sm"
                                                                       data-dismiss="fileinput">
                                                                        <i className="fa fa-times">

                                                                        </i>
                                                                        <b>Remove</b>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                                <h6 className={'card-title'} dangerouslySetInnerHTML={{__html: this.state.sex}}/>
                                                <h6 className="card-title"
                                                    dangerouslySetInnerHTML={{__html: this.state.first_name}}/>
                                                <p className="card-description"
                                                   dangerouslySetInnerHTML={{__html: this.state.body}}/>
                                                <a href="#pablo" className="btn btn-primary btn-sm">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
