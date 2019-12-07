import React,{Component} from "react";
import {Button, Card, Row} from "reactstrap";
import {Link} from "react-router-dom";
import moment from "moment";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";


class TermsConditionIndex extends Component {
    constructor () {
        super();
        this.state = {
            status:'',
            user: [],
            termsconditions: [],
            error: null

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
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
                let updatedItems = this.state.termsconditions.filter(isNotId);
                this.setState({termsconditions: updatedItems});

                //Envoyer la requet au server
                axios.delete(`/dashboard/terms_conditions/${id}`).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'The Term & Condition has ben deleted successfully'
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
        axios.get(`/dashboard/change_status_terms_conditions/${id}`)
            .then(res => {
                $.notify('<strong>Data has been updated Successfully.</strong>', {
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
    loadItems(){
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        fetch(`/api/terms_conditions`).then(res => res.json())
            .then((result) => {
                this.setState({
                    termsconditions: [...result]
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            })
    };
    componentDidMount () {
        this.loadItems();
    }
    render() {
        const {user,termsconditions} = this.state;
        const composantTitle = 'Terms & Condition';
        document.title = `Ivemo - ${composantTitle}`;
        return(
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
                                            <p className="card-category"><b>All Terms & Condition</b></p>
                                            <h3 className="card-title"><b>{termsconditions.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">forum</i><b>All Terms & conditions</b>
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
                                                        <b>Datatables Terms & conditions</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Terms & conditions Available
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
                                            <div className="material-datatables">
                                                <div className="toolbar">

                                                    <div className="submit text-center">
                                                        <Link to={'/dashboard/terms_conditions/create/'} id="button_hover"
                                                              className="btn btn-success btn-raised btn-sm">
                                                            <i className="material-icons">forum</i>
                                                            <b className="title_hover">New Terms & conditions</b>
                                                        </Link>

                                                    </div>

                                                </div>
                                                <table id="datatable"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Title</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th><b>Title</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date update</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {termsconditions.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{(item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title)}</td>
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
                                                                <Link  to={'/dashboard/terms_conditions/' + item.id + '/edit/'}
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
        )
    }

}

export default TermsConditionIndex;
