import React, { Component } from "react";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";


class FaqByCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            faqs: [],
            categories_faqs: [],
            error: null
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.disableItem = this.disableItem.bind(this);
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
                            message: 'The data FAQ has ben deleted successfully'
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
    /** Ici c'est l'activation de la couleur  **/
    activeItem(id) {

        axios.get(`/dashboard/active_faqs/${id}`).then(() => {
            /** Alert notify bootstrapp **/
            $.notify('<strong>Faq activated Successfully.</strong>', {
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
        }).catch(() => {

            //Alert
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })
    }
    /** Ici c'est la desactivation de la couleur **/
    disableItem(id) {

        axios.get(`/dashboard/disable_faqs/${id}`).then(() => {
            /** Alert notify bootstrapp **/
            $.notify('<strong>Faq desactivated Successfully.</strong>', {
                allow_dismiss: false,
                type: 'primary',
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
        }).catch(() => {
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })
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
        let Slugcategoryfaq = this.props.match.params.categoryfaq;
        fetch(`/api/faqs/c/${Slugcategoryfaq}`).then(res => res.json())
            .then((result) => {
                this.setState({
                    faqs: result
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            });
        axios.get('/api/categories_faqs').then(response =>
            this.setState({
                categories_faqs: [...response.data],
            }));
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
                                            <h3 className="card-title">{faqs.length}</h3>
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
                                        <div className="card-header card-header-success">
                                            <div className="row">
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
                                                        <i id="tooltipSize" className="material-icons">chat</i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="header text-right">
                                                <Link to={'/dashboard/faqs/'} className={'btn btn-info btn-raised  btn-sm'}>
                                                    <i className="material-icons">chevron_left</i>
                                                    <b className="title_hover">Back</b>
                                                </Link>
                                                <button onClick={() => this.reload()} className={'btn btn-success btn-raised  btn-sm'}
                                                        title="Refresh Page">
                                                    <i className="material-icons">replay</i>
                                                    <b className="title_hover">Refresh</b>
                                                </button>
                                            </div>
                                            <br/>
                                            <div className="toolbar">
                                                <div className="submit text-center">
                                                    <Link to={'/dashboard/faqs/create/'}  className={'btn btn-success btn-sm btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">New FAQS</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <div className="material-datatables">
                                                <table id="datatables"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%" >
                                                    <thead>
                                                    <tr>
                                                        <th><b>Title</b></th>
                                                        <th><b>Category FAQS</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Edited by</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category FAQS</th>
                                                        <th>Status</th>
                                                        <th>Edited by</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {faqs.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title)  }</td>
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
                                                            <td>
                                                                <Link to={'/dashboard'}>
                                                                    {item.statusOnline ?
                                                                        <button type="button"
                                                                                className="btn btn-success btn-round btn-just-icon btn-sm"
                                                                                title="Administrator Online">
                                                                        </button>
                                                                        :
                                                                        <button type="button"
                                                                                className="btn btn-danger btn-round btn-just-icon btn-sm"
                                                                                title="Administrator Offline">
                                                                        </button>
                                                                    }
                                                                    { (item.user.first_name.length > 15 ? item.user.first_name.name.substring(0,15)+ "..." : item.user.first_name.name)  }
                                                                </Link>
                                                            </td>
                                                            <td><b>{moment(item.updated_at).format('DD/MM/YYYY')}</b></td>
                                                            <td className="text-right">
                                                                {item.status ?
                                                                    <button onClick={() => this.disableItem(item.id)}
                                                                            className="btn btn-link btn-info btn-round btn-just-icon "
                                                                            title="Disable">
                                                                        <i className="material-icons">check_circle</i>
                                                                    </button>
                                                                    :
                                                                    <button onClick={() => this.activeItem(item.id)}
                                                                            className="btn btn-link btn-danger btn-round btn-just-icon "
                                                                            title="Activate">
                                                                        <i className="material-icons">power_settings_new</i>
                                                                    </button>
                                                                }

                                                                <Link to={`/dashboard/faqs/v/${item.slug}/`}  className="btn btn-link  btn-warning btn-round btn-just-icon" title="View">
                                                                    <i className="material-icons">visibility</i>
                                                                </Link>

                                                                <Link className="btn btn-link  btn-success btn-round btn-just-icon" title="Edit"
                                                                      to={`/dashboard/faqs/${item.id}/edit/`}
                                                                      key={item.id}>
                                                                    <i className="material-icons">edit</i>
                                                                </Link>

                                                                <button type="button"  onClick={() => this.deleteItem(item.id)} className="btn btn-link  btn-danger btn-round btn-just-icon" title="Edit">
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
export default FaqByCategory;
