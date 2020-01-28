import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";

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
        const permission = {
            name: this.state.name,
        };
        axios.post('/dashboard/permissions', permission)
            .then(response => {
                // then clear the value input
                this.setState({
                    name: ''
                });
                // add new data to list of datas
                this.setState({
                    permissions: [response.data, ...this.state.permissions]
                });
                //Masquer le modal après la création
                $('#addNew').modal('hide');

                //$.notify('<strong>The permission has ben Save successfully...</strong>', {
                //    allow_dismiss: false,
                //    type: 'success',
                //    placement: {
                //        from: 'bottom',
                //        align: 'right'
                //    },
                //    animate: {
                //        enter: 'animated fadeInRight',
                //        exit: 'animated fadeOutRight'
                //    },
                //});

                // redirect
                history.push('/dashboard/permissions')
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

                // remove from local state
                let isNotId = permission => permission.id !== id;
                let updatedItems = this.state.permissions.filter(isNotId);
                this.setState({permissions: updatedItems});

                //Envoyer la requet au server
                axios.delete(`/dashboard/permissions/${id}`).then(() => {

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
            $('#datatables').DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                order: [[ 0, 'asc' ], [ 3, 'desc' ]],
                responsive: true,
                destroy: true,
                retrieve:true,
                autoFill: true,
                colReorder: true,
                language: {
                    search: "<i class='material-icons'>search</i>",
                    searchPlaceholder: "Search Record",
                },
                "sPaginationType": "full_numbers",

            });
        });
    }

    loadItems() {
        let url = `/api/permissions`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    permissions: result
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

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-warning card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">weekend</i>
                                            </div>
                                            <p className="card-category">Bookings</p>
                                            <h3 className="card-title">184</h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons text-danger">warning</i>
                                                <a href="#pablo">Get More Space...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-rose card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">equalizer</i>
                                            </div>
                                            <p className="card-category">Website Visits</p>
                                            <h3 className="card-title">{permissions.length}</h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">local_offer</i> Tracked from Google
                                                Analytics
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className={`card-header card-header-${this.state.color_name}`}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 className="card-title">
                                                        <b>Datatables Permissions</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Administrators Permissions
                                                    </p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <span>
                                                        <i id="tooltipSize" className="material-icons">chat</i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="header text-right">
                                                <button onClick={() => this.reload()} className={'btn btn-success btn-raised  btn-sm'}
                                                        title="Refresh Page">
                                                    <i className="material-icons">replay</i>
                                                    <b className="title_hover">Refresh</b>
                                                </button>
                                            </div>
                                            <div className="toolbar">
                                                <div className="submit text-center">
                                                    <button  onClick={() => this.newModal()} id="button_hover" className="btn btn-success btn-raised">
                                                        <span className="btn-label">
                                                            <i className="material-icons">playlist_add_check</i>
                                                        </span>
                                                    <b className="title_hover">New Permission</b>
                                                </button>
                                            </div>

                                            </div>
                                            <div className="material-datatables">
                                                <table id="datatables"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Name</b></th>
                                                        <th><b>Guard name</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Guard name</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {permissions.map((item) => (
                                                        <tr key={item.id}>
                                                            <td><b>{item.name}</b></td>
                                                            <td><b>{item.guard_name}</b></td>
                                                            <td><b>{moment(item.created_at).fromNow()}</b>
                                                            </td>
                                                            <td className="text-right">

                                                                <Link className="btn btn-link  btn-success btn-round btn-just-icon"
                                                                    title="Edit" to={`/dashboard/permissions/${item.id}/edit/`} key={item.id}>
                                                                    <i className="material-icons">edit</i>
                                                                </Link>

                                                                <button type={'button'} onClick={() => this.deleteItem(item.id)}
                                                                    className="btn btn-link btn-danger btn-round btn-just-icon" title="Delete">
                                                                    <i className="material-icons">delete_forever</i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="modal fade" id="addNew" tabIndex={'-1'} role="dialog"
                                                 aria-labelledby="addNewLabel"
                                                 aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="updateNewLabel"><b>New Permission</b></h5>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form role="form" method="POST" onSubmit={this.createItem} action="" acceptCharset={'UTF-8'}>
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
                                                                <div className="modal-footer">
                                                                    <div className="text-center">
                                                                        <button type="button" className="btn btn-danger"
                                                                                data-dismiss="modal">
                                                                    <span className="btn-label">
                                                                        <i className="material-icons">clear</i>
                                                                        <b>Close</b>
                                                                    </span>
                                                                        </button>
                                                                        <button type="submit"
                                                                                className="btn btn-success btn-raised">
                                                                            <span className="btn-label">
                                                                                <i className="material-icons">check</i>
                                                                                <b>Yes, Save</b>
                                                                            </span>
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
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
export default PermissionIndex;
