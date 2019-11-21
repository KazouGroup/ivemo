import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import moment from "moment";

class PermissionIndex extends Component {
    constructor (props) {
        super(props);
        this.state = {
            color_name:'',
            name:'',
            permissions: [],
            errors: []
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
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
    newModal() {
        //Masquer le modal après la création
        $('#addNew').modal('show');
    }
    createItem(e){
        e.preventDefault();
        const { history } = this.props;
        let permission = {
            name: this.state.name,
        };
        axios.post('/dashboard/permissions', permission)
            .then(response => {
                // clear form input
                this.setState({
                    name: ''
                });
                //Masquer le modal après la création
                $('#addNew').modal('hide');

                console.log(response.data);
                // add new permission to list of tasks
                this.setState(prevState => ({
                    tasks: prevState.permissions.concat(response.data)
                }));
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }
    // handle delete
    deleteItem(id) {
        Swal.fire({
            title: 'Delete Permission?',
            text: "Are you sure you want to delete this permission?",
            type: 'warning',
            animation: false,
            customClass: 'animated shake',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {

                //Envoyer la requet au server
                axios.delete(`/dashboard/permissions/${id}`).then(() => {

                    // remove from local state
                    let isNotId = permission => permission.id !== id;
                    let updatedItems = this.state.permissions.filter(isNotId);
                    this.setState({permissions: updatedItems});

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'Permission has ben deleted successfully'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }
    mydatatables(){
        $( function () {
            $('#datatable-buttons').DataTable({
                responsive: true,
                destroy: true,
                retrieve:true,
                autoFill: true,
                colReorder: true,
                language: {
                    paginate: {
                        previous: "<i class='fas fa-angle-left'>",
                        next: "<i class='fas fa-angle-right'>"
                    }
                },

            });
        });
    }

    loadItems() {
        let url = `/api/permissions`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    permissions: [...result]
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            });
        axios.get(`/account/user`).then(response =>
            this.setState({
                color_name: response.data.color_name,
            }));
    }
    reload(){
        this.loadItems()
    }
    componentDidMount () {
        setTimeout(() =>{
            this.loadItems();
        },1500);
    }

    render() {

        let { permissions } = this.state;

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
                                                <li className="breadcrumb-item active" aria-current="page">Permissions</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <button type={'button'} onClick={() => this.newModal()} className="btn btn-sm btn-neutral">New</button>
                                        <button type={'button'} onClick={() => this.reload()} className="btn btn-sm btn-neutral">Refresh</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12 col-md-12">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Permissions</h5>
                                                        <span className="h2 font-weight-bold mb-0">{permissions.length}</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                            <i className="ni ni-money-coins"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i
                                                        className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid mt--6">

                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="mb-0">Permissions</h3>
                                        <p className="text-sm mb-0">
                                            Permissions informations
                                        </p>
                                    </div>
                                    <div className="table-responsive py-4">
                                        <table  className="table table-flush" id="datatable-buttons">
                                            <thead className="thead-light">
                                            <tr>
                                                <th><b>Name</b></th>
                                                <th><b>Guard name</b></th>
                                                <th><b>Last Updated</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th><b>Name</b></th>
                                                <th><b>Guard name</b></th>
                                                <th><b>Last Updated</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {permissions.map((item) => (
                                                <tr key={item.id}>
                                                    <td><b>{item.name}</b></td>
                                                    <td><b>{item.guard_name}</b></td>
                                                    <td><b>{moment(item.created_at).fromNow()}</b></td>
                                                    <td className="text-right">

                                                        <Link to={`/dashboard/permissions/${item.id}/edit/`} key={item.id} className="table-action table-active" data-toggle="tooltip"
                                                              data-original-title="Edit product">
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <a href="#!"   onClick={() => this.deleteItem(item.id)}  className="table-action table-action-delete"
                                                           data-toggle="tooltip" data-original-title="Delete product">
                                                            <i className="fas fa-trash"></i>
                                                        </a>

                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>


                                    <div className="modal fade" id="addNew" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">New permission</h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <form role="form" method="POST" onSubmit={this.createItem} action="" acceptCharset={'UTF-8'}>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">

                                                        </label>
                                                        <input required={'required'}
                                                               placeholder={'Name permission'}
                                                               id='name'
                                                               type='text'
                                                               className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                                               name='name'
                                                               value={this.state.name}
                                                               onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('name')}
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary"
                                                            data-dismiss="modal">Close
                                                    </button>
                                                    <button type="submit" className="btn btn-primary">Save</button>
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

            </div>
        );
    }
}
export default PermissionIndex;
