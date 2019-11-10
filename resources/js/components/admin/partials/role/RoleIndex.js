import React, { Component} from "react";
import NavAdmin from "../../../inc/admin/NavAdmin";
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import {Link} from "react-router-dom";
import RoleLists from "./RoleLists";



class RoleIndex extends Component {
    constructor () {
        super();
        this.state = {
            color_name:'',
            roles: [],
        };
        // bind
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
        const { roles } = this.state;
        return(
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
                                            <h3 className="card-title">{roles.length}</h3>
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
                                                        <b>Datatables Roles</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Administrators Roles
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
                                            <div className="toolbar">


                                            </div>
                                            <div className="material-datatables">
                                                <table id="datatables"
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
                                                        <th>Name</th>
                                                        <th>Guard name</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        )
    }
}
export default RoleIndex
