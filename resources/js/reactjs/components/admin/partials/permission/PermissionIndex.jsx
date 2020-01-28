import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import moment from "moment";
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import {Button, Card, Row} from "reactstrap";
import PermissionList from "./PermissionList";

class PermissionIndex extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name:'',
            user: [],
            permissions: [],
            errors: []
        };
        // bind
        this.loadItems = this.loadItems.bind(this);
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
        let url = route('permissions.store');
        dyaxios.post(url, permission)
            .then(response => {
                // clear form input
                this.setState({
                    name: ''
                });

                //Masquer le modal après la création
                $('#addNew').modal('hide');


                this.setState(prevState => ({
                    //permissions: prevState.permissions.concat(response.data)
                    permissions: [...prevState.permissions]
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

                const url = route('permissions.destroy', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

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
            $('#datatable').DataTable({
                "pagingType": "full_numbers",
                responsive: true,
                destroy: true,
                retrieve:true,
                autoFill: true,
                colReorder: true,
                "sPaginationType": "full_numbers",

            });
        });
    }

    loadItems() {
        dyaxios.get(`/account/user`).then(response => this.setState({user: response.data}));
        fetch(`/api/permissions`).then(res => res.json())
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

        let { permissions,user } = this.state;
        const composantTitle = 'Permissions';
        const requiredField = {
            color: "red",
            fontSize: "12px"
        };
        document.title = `Ivemo - ${composantTitle}`;
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
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className={`card-header card-header-icon card-header-${user.color_name}`}>
                                            <div className="card-icon">
                                                <i className="material-icons">forum</i>
                                            </div>
                                            <p className="card-category"><b>All Permissions</b></p>
                                            <h3 className="card-title"><b>{permissions.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">forum</i><b>All Permissions</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <Card>
                                        <div className={`card-header card-header-${user.color_name}`}>
                                            <Row>
                                                <div className="col-md-6">
                                                    <h4 className="card-title">
                                                        <b>Datatables Permissions</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Permissions Available
                                                    </p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <span>
                                                        <i id="tooltipSize" className="material-icons">forum</i>
                                                    </span>
                                                </div>
                                            </Row>
                                        </div>
                                        <div className="card-body">
                                            <div className="header text-right">

                                                <button onClick={() => this.reload()}
                                                        className="btn btn-success btn-raised button_note btn-sm"
                                                        title="Refresh Page">
                                                    <i className="material-icons">replay</i>
                                                    <b className="title_hover">Refresh</b>
                                                </button>
                                            </div>
                                            <br/>
                                            <div className="material-datatables">
                                                <div className="toolbar">

                                                    <div className="submit text-center">

                                                        <button onClick={() => this.newModal()}
                                                                className="btn btn-success btn-raised button_note btn-sm"
                                                                title="Refresh Page">
                                                            <i className="material-icons">forum</i>
                                                            <b className="title_hover">New permission</b>
                                                        </button>

                                                    </div>

                                                </div>
                                                <table id="datatable"
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
                                                        <th><b>Name</b></th>
                                                        <th><b>Guard name</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {permissions.map((item) => (
                                                        <PermissionList key={item.id} {...item} deleteItem={this.deleteItem}/>
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
                                                                    <label>Name permission
                                                                        <span style={requiredField}>*</span>
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
                                    </Card>
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
export default PermissionIndex;
