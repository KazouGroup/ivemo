import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import moment from 'moment'
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import {Button, Card, Row} from "reactstrap";
import PermissionList from "../../partials/permission/PermissionList";
require("moment/min/locales.min");
moment.locale('fr');

class TestimonialIdex extends Component {
    constructor () {
        super();
        this.state = {
            status: '',
            user: [],
            testimonials: []
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }


    // Change status
    changeStatus(id){

        axios.get(`/dashboard/change_status_testimonials/${id}`)
            .then(response => {

            $.notify('<strong>Your Testimonial has ben update Successfully.</strong>', {
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
            title: 'Delete Testimonial?',
            text: "Are you sure you want to delete this testimonial?",
            type: 'warning',
            animation: false,
            customClass: 'animated shake',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            showCancelButton: true,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {

                // remove from local state
                let isNotId = item => item.id !== id;
                let updatedItems = this.state.testimonials.filter(isNotId);
                this.setState({testimonials: updatedItems});

                //Envoyer la requet au server
                axios.delete(`/dashboard/testimonials/${id}`).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'The Testimonial has ben deleted successfully'
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
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        fetch(`/api/testimonials`).then(res => res.json())
            .then((result) => {
                this.setState({
                    testimonials: [...result]
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
        let { testimonials,user } = this.state;
        const composantTitle = `Testimonials`;
        const avatar_style = {
            width: "40px",
            height: "40px",
            top: "15px",
            left: "15px",
            borderRadius: "50%"
        };
        document.title = `Ivemo | ${composantTitle}`;
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
                                            <p className="card-category"><b>All Testimonials</b></p>
                                            <h3 className="card-title"><b>{testimonials.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">forum</i><b>All Testimonials</b>
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
                                                        <b>Datatables Testimonials</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Testimonials Available
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
                                                        <Link to={'/dashboard/testimonials/create/'}
                                                              className="btn btn-success btn-raised button_note btn-sm"
                                                              title="Refresh Page">
                                                            <i className="material-icons">forum</i>
                                                            <b className="title_hover">New Testimonial</b>
                                                        </Link>

                                                    </div>

                                                </div>
                                                <table id="datatable"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Profile</b></th>
                                                        <th><b>Name</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th><b>Profile</b></th>
                                                        <th><b>Name</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {testimonials.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <Link to={'/dashboard/users/'}>
                                                                    <img src={item.user.avatar} alt={item.user.first_name} style={avatar_style}/>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                              <span className="status">
                                                                  <b>{(item.user.first_name.length > 15 ? item.user.first_name.substring(0, 15) + "..." : item.user.first_name)}</b>
                                                              </span>
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
                                                            <td><b>{moment(item.updated_at).fromNow()}</b></td>
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
                                                                <Link to={`/dashboard/testimonials/${item.id}/edit/`} key={item.id}
                                                                      className="btn btn-link btn-success btn-round btn-just-icon" data-toggle="tooltip"
                                                                      data-original-title="Edit permissions">
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
export default TestimonialIdex;
