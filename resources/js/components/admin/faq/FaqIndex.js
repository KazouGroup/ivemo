import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class FaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            faqs: [],
            error: null
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.disableItem = this.disableItem.bind(this);
    }

    activeItem(id){

    }
    disableItem(id){

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

        axios.get('/dashboard/active_faqs/' + id).then(() => {
            /** Alert notify bootstrapp **/
            $.notify('<strong>FaqLists activated Successfully.</strong>', {
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

        axios.get('/dashboard/disable_faqs/' + id).then(() => {
            /** Alert notify bootstrapp **/
            $.notify('<strong>FaqLists desactivated Successfully.</strong>', {
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

    loadItems() {
        let url = `/api/faqs`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    faqs: result
                });
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
                                                <button onClick={() => this.reload()} className={'btn btn-success btn-raised  btn-sm'}
                                                     title="Refresh Page">
                                                    <i className="material-icons">replay</i>
                                                    <b className="title_hover">Refresh</b>
                                                </button>
                                            </div>
                                            <br/>
                                            <div className="toolbar">
                                                <div className="submit text-center">
                                                    <Link to={'/dashboard/faqs/create/'}  className={'btn btn-success btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">New FAQS</b>
                                                    </Link>
                                                    <Link to={'/dashboard/faqs/v1/all/'}  className={'btn btn-primary btn-raised'}>
                                                        <i className="material-icons">chat</i>
                                                        <b className="title_hover">FAQS Site</b>
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
                                                        <th><b>Status</b></th>
                                                        <th><b>Edited by</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Status</th>
                                                        <th>Edited by</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {faqs.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                <div className="timeline-heading">
                                                                { item.status ?
                                                                    <span className="badge badge-info"><b>Active</b></span>
                                                                    :
                                                                    <span className="badge badge-danger"><b>Deactive</b></span>
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
                                                                    { (item.user.name.length > 15 ? item.user.name.substring(0,15)+ "..." : item.user.name)  }
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
export default FaqIndex;
