import React, { Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import {Link} from "react-router-dom";
import FooterAdmin from "../../../inc/admin/FooterAdmin";



class RoleEdit extends Component {
    constructor (props) {
        super(props);
        this.state = {
            color_name:'',
            name:'',
            role: {},
            errors: []
        };
        // bind
        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
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

    updateItem(){

    }
    // get all the tasks from backend
    loadItems() {
        let roleId = this.props.match.params.id;
        axios.get(`/dashboard/roles/${roleId}`).then(response =>
            this.setState({
                //role: response.data,
                name: response.data.name,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }


    render() {
        console.log(this.props.match.params.id);
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
                                                            <input id='name'
                                                                   type='text'
                                                                   className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                                                   name='name'
                                                                   placeholder={'Name Role'}
                                                                   value={this.state.name}
                                                                   onChange={this.handleFieldChange}
                                                            />
                                                            {this.renderErrorFor('name')}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating">

                                                            </label>
                                                            <input id='name'
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
                                                        <Link to={'/dashboard/faqs'} className="btn btn-danger" id="button_hover">
                                                            <i className="material-icons">chevron_left</i>
                                                            <b className="title_hover">Back</b>
                                                        </Link>
                                                        <button id="button_hover" type="submit"
                                                                className="btn btn-success btn-raised">
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
export default RoleEdit;
