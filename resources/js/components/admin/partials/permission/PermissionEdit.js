import React, {Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import ReactQuill from "react-quill";
import {Link} from "react-router-dom";
import FooterAdmin from "../../../inc/admin/FooterAdmin";

class PermissionEdit extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            name:'',
            errors: []
        };
        // bind
        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
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
    // handle submit
    updateItem(e) {
        let itemId = this.props.match.params.permission;
        e.preventDefault();
        let permission = {
            name: this.state.name,
        };
        axios.put(`/dashboard/permissions/${itemId}`, permission).then(() => {

            /**
             * Init alert
             */
            $.notify('<strong>The Permission has ben Updated successfully...</strong>', {
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
            this.props.history.push('/dashboard/permissions/');

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
        let itemId = this.props.match.params.permission;
        axios.get(`/dashboard/permissions/${itemId}`).then(response =>
            this.setState({
                name: response.data.name,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        return(
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
                                                <h4 className="card-title" ><b>{this.state.name}</b>
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
                                                            <input id='name' required={'required'}
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                                                   name='name'
                                                                   value={this.state.name}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('name')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="submit">
                                                    <div className="text-center">
                                                        <Link to={'/dashboard/permissions/'} className="btn btn-danger btn-sm" id="button_hover">
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
        )
    }
}
export default PermissionEdit;
