import React, { Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import RoleLists from "./RoleLists";
import StatusAdmin from "../../../inc/admin/StatusAdmin";
import {Button, Card, Row} from "reactstrap";




class RoleIndex extends Component {
    constructor () {
        super();
        this.state = {
            color_name:'',
            user: [],
            roles: [],
        };
        // bind
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
        fetch(`/api/roles`).then(res => res.json())
            .then((result) => {
                this.setState({
                    roles: result
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            });
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
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
        const { roles,user } = this.state;
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
                                            <p className="card-category"><b>Roles</b></p>
                                            <h3 className="card-title"><b>{roles.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">forum</i><b>Roles</b>
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
                                                    {roles.map((item) => (
                                                        <RoleLists key={item.id} {...item}/>
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
export default RoleIndex
