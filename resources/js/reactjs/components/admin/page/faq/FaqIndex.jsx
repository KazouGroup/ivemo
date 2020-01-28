import React, { Component } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Switch from "react-bootstrap-switch";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import moment from 'moment'
import PanelHeader from "../../../inc/vendor/PanelHeader";

require("moment/min/locales.min");
moment.locale('fr');
// reactstrap components
import {
    Button,
    Card,
    Row
} from "reactstrap";
import StatusAdmin from "../../../inc/admin/StatusAdmin";

class FaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            faqs: [],
            user: [],
            error: null
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    // handle delete
    deleteItem(id) {
        Swal.fire({
            title: 'Delete FaqLists?',
            text: "Are you sure you want to delete this faq?",
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
                let isNotId = faq => faq.id !== id;
                let updatedItems = this.state.faqs.filter(isNotId);
                this.setState({faqs: updatedItems});

                //Envoyer la requet au server
                axios.delete(`/dashboard/faqs/${id}`).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'The data FAQ has been deleted successfully'
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
    // Change status
    changeStatus(id){
        axios.get(`/dashboard/change_status_faqs/${id}`)
            .then(res => {
                $.notify('<strong>Faq has been updated Successfully.</strong>', {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animated fadeInUp",
                        exit: "animated fadeOutDown"
                    },
                });
                /** End alert ***/
                this.loadItems();
            })
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
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let url = `/api/faqs`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    faqs: result
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            })
    }
    reload(){
        this.loadItems()
    }
    componentDidMount () {
        this.loadItems();

    }
    render() {
        let {faqs, user} = this.state;
        document.title = `FAQS Dashboard`;
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
                                            <p className="card-category"><b>All FAQs</b></p>
                                            <h3 className="card-title"><b>{faqs.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">forum</i><b>All FAQs</b>
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
                                                        <b>Datatables Faqs</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Faqs Available
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
                                                        <Link to={'/dashboard/faqs/create/'} id="button_hover"
                                                              className="btn btn-success btn-raised">
                                                            <i className="material-icons">forum</i>
                                                            <b className="title_hover">New FAQS</b>
                                                        </Link>
                                                        <Link to={'/dashboard/'} id="button_hover"
                                                              className="btn btn-info btn-raised">
                                                            <i className="material-icons">contact_support</i>
                                                            <b className="title_hover">FAQS Site</b>
                                                        </Link>

                                                    </div>

                                                </div>
                                                <table id="datatable"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Title</b></th>
                                                        <th><b>Category FAQS</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th><b>Title</b></th>
                                                        <th><b>Category FAQS</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {faqs.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{(item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title)}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/dashboard/faqs/c/${item.categoryfaq.slug}/`}>
                                                                    <b>{item.categoryfaq.name}</b>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <div className="timeline-heading">
                                                                    {item.status ?
                                                                        <span
                                                                            className="badge badge-success"><b>Active</b></span>
                                                                        :
                                                                        <span
                                                                            className="badge badge-danger"><b>Deactive</b></span>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td><b>{moment(item.updated_at).format('DD/MM/YYYY')}</b>
                                                            </td>
                                                            <td className="text-right">

                                                                <Button
                                                                    className="togglebutton btn btn-link bmd-btn-fab-sm btn-group-toggle"
                                                                    color="danger" size="sm">
                                                                    <label>
                                                                        <input type="checkbox" name="status"
                                                                               id={`status`} value={item.status}
                                                                               onClick={() => this.changeStatus(item.id)}
                                                                               defaultChecked={item.status}/>
                                                                        <span className="toggle"/>
                                                                    </label>
                                                                </Button>{" "}
                                                                <Link to={`/dashboard/faqs/v/${item.slug}`}
                                                                      className="btn btn-link btn-warning btn-round btn-just-icon"
                                                                      title="Show">
                                                                    <i className="material-icons">visibility</i>
                                                                </Link>
                                                                <Link  to={'/dashboard/faqs/' + item.id + '/edit/'}
                                                                      className="btn btn-link btn-success btn-round btn-just-icon"
                                                                      title="Edit">
                                                                    <i className="material-icons">edit</i>
                                                                </Link>
                                                                <Button onClick={() => this.deleteItem(item.id)}
                                                                        className="btn btn-link btn-danger btn-round btn-just-icon"
                                                                        color="danger" size="sm">
                                                                    <i className="material-icons">delete_forever</i>
                                                                </Button>{" "}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
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
export default FaqIndex;
