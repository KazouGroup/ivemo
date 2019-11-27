import React, {Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import {Link} from "react-router-dom";
import FooterAdmin from "../../inc/admin/FooterAdmin";



class AdminChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
                                                <li className="breadcrumb-item active" aria-current="page">Boclair Temgoua</li>
                                            </ol>
                                            </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <Link to={'/dashboard/permissions/'} className="btn btn-sm btn-neutral">Back</Link>
                                        <Link to={'/dashboard/permissions/'} className="btn btn-sm btn-neutral">New</Link>
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
                                        <h3 className="mb-0">{this.state.name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.updateItem}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Old Password</label>
                                                        <input id='old_password' required={'required'}
                                                               type='old_password'
                                                               className={`form-control ${this.hasErrorFor('old_password') ? 'is-invalid' : ''}`}
                                                               name='old_password'
                                                               value={this.state.old_password}
                                                               onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('old_password')}
                                                    </div>
                                                </div>
                                                <div className={'col-md-12'}>
                                                    <div className={'form-group'}>
                                                        <label className={'form-controlle-label'}></label>
                                                      <input id={'password'} name={'password'} className={§`form-control $`}/>
                                                    </div>
                                                </div>
                                            </div>

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

                        <FooterAdmin/>
                    </div>
                </div>

            </div>
      )
    }
}
    export default AdminChangePassword;
