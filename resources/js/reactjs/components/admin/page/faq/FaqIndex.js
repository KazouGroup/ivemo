import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import moment from "moment";

class FaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            faqs: [],
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
                axios.delete(`${location.pathname}${id}`).then(() => {

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
        let { faqs } = this.state;
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
                                                <li className="breadcrumb-item active" aria-current="page">FAQS</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <Link to={'/dashboard/faqs/create/'} className="btn btn-sm btn-neutral">New</Link>
                                        <button type={'button'} onClick={() => this.reload()} className="btn btn-sm btn-neutral">Refresh</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>
                                                        <span className="h2 font-weight-bold mb-0">924</span>
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
                                    <div className="col-xl-6 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Performance</h5>
                                                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                            <i className="ni ni-chart-bar-32"></i>
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
                                        <h3 className="mb-0">FAQS</h3>
                                        <p className="text-sm mb-0">
                                            FAQS informations
                                        </p>
                                    </div>
                                    <div className="table-responsive py-4">
                                        <table  className="table table-flush" id="datatable-buttons">
                                            <thead className="thead-light">
                                            <tr>
                                                <th><b>Title</b></th>
                                                <th><b>Category FAQS</b></th>
                                                <th><b>Status</b></th>
                                                <th><b>Date update</b></th>
                                                <th><b>Status</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th><b>Title</b></th>
                                                <th><b>Category FAQS</b></th>
                                                <th><b>Status</b></th>
                                                <th><b>Date update</b></th>
                                                <th><b>Status</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {faqs.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{ (item.title.length > 10 ? item.title.substring(0,10)+ "..." : item.title)  }</td>
                                                    <td>
                                                        <Link to={`/dashboard/faqs/c/${item.categoryfaq.slug}/`}>
                                                            <b>{item.categoryfaq.name}</b>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className="timeline-heading">
                                                            { item.status ?
                                                                <span className="badge badge-info"><b>Active</b></span>
                                                                :
                                                                <span className="badge badge-primary"><b>Deactive</b></span>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td><b>{moment(item.updated_at).format('DD/MM/YYYY')}</b></td>
                                                    <td>  <label className="custom-toggle custom-toggle-info">
                                                        <input type="checkbox" name="status" id={`status`} value={item.status}
                                                               onClick={() => this.changeStatus(item.id)} defaultChecked={item.status}/>
                                                        <span className="custom-toggle-slider rounded-circle"
                                                              data-label-off="No" data-label-on="Yes"></span>
                                                    </label></td>
                                                    <td className="text-right">

                                                        <Link to={`/dashboard/faqs/${item.id}/edit/`} className="table-action table-active" data-toggle="tooltip"
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
export default FaqIndex;
