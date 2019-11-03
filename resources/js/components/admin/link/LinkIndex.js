import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class FaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            faqs: []
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }


    // Change status
    changeStatus(id){

        axios.get(`/dashboard/change_status_faqs/${id}`).then(res => {

            $.notify('<strong>Faqs update Successfully.</strong>', {
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

            // remove from local state
            let isNotId = faq => faq.id !== id;
            let updatedItems = this.state.faqs.props(isNotId);
            this.setState({ faqs: updatedItems });
        })
    }
    // handle delete
    deleteItem(id) {
        Swal.fire({
            title: 'Delete Faq?',
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
                this.setState({ faqs: updatedItems });

                //Envoyer la requet au server
                axios.delete(`/dashboard/faqs/${id}`).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'The data FAQ has ben deleted successfully'},
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
                            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert-notify" role="alert">' +
                                '<span class="alert-icon" data-notify="icon"></span> ' +
                                '<div class="alert-text"</div> ' +
                                '<span class="alert-title" data-notify="title">{1}</span> ' +
                                '<span data-notify="message">{2}</span>' +
                                '</div>' +
                                '<button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '</div>'
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

    loadItems() {
        axios.get(`/api/faqs`).then(response =>
            this.setState({
                faqs: [...response.data],
            }),
        );
    }

    componentDidMount () {
        this.loadItems();
    }

    render() {

        let { faqs } = this.state;

        return (
            <div>

                <NavAdmin/>

                <div className="main-content" id="panel">

                    <TopNavAdmin/>
                    <div className="header bg-primary pb-6">
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">FAQS</h6>
                                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                                <li className="breadcrumb-item">
                                                    <a href="#">
                                                        <i className="fas fa-book"></i>
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="#">FAQS</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    New FAQ
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <Link to={`/dashboard/faqs/create/`} className="btn btn-sm btn-neutral">
                                            New
                                        </Link>
                                        <a href="#" className="btn btn-sm btn-neutral">Filters</a>
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
                                    </div>
                                    <div className="table-responsive py-4">
                                        <table className="table table-flush" id="datatable-buttons">
                                            <thead className="thead-light">
                                            <tr>
                                                <th>Title</th>
                                                <th>Slug</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Status</th>
                                                <th className="table-actions">Action</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Title</th>
                                                <th>Slug</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Status</th>
                                                <th className="table-actions">Action</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>

                                            {faqs.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.slug}</td>
                                                    <td>New York</td>
                                                    <td>27</td>
                                                    <td>
                                                        <label className="custom-toggle">
                                                            <input type="checkbox"  id={`status`} value={item.status} onClick={() => this.changeStatus(item.id)}
                                                                   defaultChecked={item.status}/>
                                                            <span className="custom-toggle-slider rounded-circle"
                                                                  data-label-off="No" data-label-on="Yes">
                                                        </span>
                                                        </label>
                                                    </td>
                                                    <td className="table-actions">
                                                        <a href="#" className="btn btn-warning btn-icon-only rounded-circle" data-toggle="tooltip"
                                                           data-original-title="View faq">
                                                            <i className="fas fa-eye"></i>
                                                        </a>
                                                        <label className="ml-auto">
                                                            <div
                                                                className="togglebutton switch-sidebar-mini">
                                                                <label>
                                                                    <input type="checkbox"  id={`status`} value={item.status} onClick={() => this.changeStatus(item)}
                                                                           defaultChecked={item.status}/>
                                                                    <span className="toggle"></span>
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <Link className="btn btn-success btn-icon-only rounded-circle" data-toggle="tooltip"
                                                              data-original-title="Edit faq"
                                                              to={`/dashboard/faqs/${item.id}/edit/`}
                                                              key={item.id}>
                                                            <i className="fas fa-user-edit"></i>
                                                        </Link>
                                                        <button type="button" onClick={() => this.deleteItem(item.id)}
                                                                className="btn btn-danger btn-icon-only rounded-circle">
                                                    <span className="btn-inner--icon">
                                                           <i className="fas fa-trash"></i>
                                                    </span>
                                                        </button>
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
