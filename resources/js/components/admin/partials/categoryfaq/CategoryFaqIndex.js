import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";

class CategoryFaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            color_name:'',
            categories_faqs: [],
            errors: []
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(id){

        axios.get(`/dashboard/change_status_categories_faqs/${id}`)
            .then(res => {

                $.notify('<strong>Category FAQS has ben update Successfully.</strong>', {
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
    // handle delete
    deleteItem(id) {
        Swal.fire({
            title: 'Delete Category FAQS?',
            text: "Are you sure you want to delete this category faq?",
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
                let isNotId = categoryfaq => categoryfaq.id !== id;
                let updatedItems = this.state.categories_faqs.filter(isNotId);
                this.setState({categories_faqs: updatedItems});

                //Envoyer la requet au server
                axios.delete(`/dashboard/categories_faqs/${id}`).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'Category FAQS has ben deleted successfully'
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
        let url = `/api/categories_faqs`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    categories_faqs: result
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

        let { categories_faqs } = this.state;

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
                                            <h3 className="card-title">{categories_faqs.length}</h3>
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
                                                        <b className="title_hover">New Category FAQS</b>
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
                                                        <th><b>Status</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {categories_faqs.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <Link to={`/dashboard/faqs/c/${item.slug}/`}>
                                                                    <b>{item.name}</b>
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
                                                            <td><b>{moment(item.created_at).fromNow()}</b>
                                                            </td>
                                                            <td className="text-right">

                                                                <button type="button" className="togglebutton btn btn-link bmd-btn-fab-sm btn-sm btn-group-toggle">
                                                                    <label>
                                                                        <input type="checkbox" name="status" id={`status`} value={item.status}
                                                                               onClick={() => this.changeStatus(item.id)} defaultChecked={item.status}/>
                                                                        <span className="toggle"></span>
                                                                    </label>
                                                                </button>

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
export default CategoryFaqIndex;