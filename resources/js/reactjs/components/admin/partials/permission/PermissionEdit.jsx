import React, {Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import {Link, NavLink} from "react-router-dom";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import {
    FormGroup,
    Input,
    Row,
    Col
} from "reactstrap";
import StatusAdmin from "../../../inc/admin/StatusAdmin";

class PermissionEdit extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            name:'',
            user: [],
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
        let url = route(`permissions.update`, itemId);
        dyaxios.put(url, permission).then(() => {

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
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let itemId = this.props.match.params.permission;
        dyaxios.get(route(`permissions.show`,itemId)).then(response =>
            this.setState({
                name: response.data.name,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {user} = this.state;
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
                                                        <h4 className="card-title"><b>Edit</b> -
                                                            <small className="category"> {this.state.name}</small>
                                                        </h4>
                                                    </div>
                                                    <br/>
                                                    <div className="card-body">
                                                        <form onSubmit={this.updateItem}>
                                                            <Row>
                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="example3cols3Input"
                                                                        >
                                                                            Name permission
                                                                        </label>
                                                                        <Input
                                                                            id='name' required={'required'}
                                                                            type='text'
                                                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                                                            name='name'
                                                                            value={this.state.name}
                                                                            onChange={this.handleFieldChange}
                                                                        />
                                                                        {this.renderErrorFor('name')}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <div className="submit">
                                                                <div className="text-center">
                                                                    <Link to={'/dashboard/permissions/'} className="btn btn-icon btn-secondary" type="submit">
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
        )
    }
}
export default PermissionEdit;
