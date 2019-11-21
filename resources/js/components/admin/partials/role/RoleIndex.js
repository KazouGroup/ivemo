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

                <div className="main-content" id="panel">

                    <TopNavAdmin/>

                    <div className={`header pb-6 bg-primary`}>
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">Ivemo</h6>
                                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                                <li className="breadcrumb-item"><Link to={'/dashboard/'}><i className="fas fa-home"></i></Link></li>
                                                <li className="breadcrumb-item"><Link to={'/dashboard/'}>Dashboards</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Roles</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <button type={'button'}  className="btn btn-sm btn-neutral">New</button>
                                        <button type={'button'} onClick={() => this.reload()} className="btn btn-sm btn-neutral">Refresh</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12 col-md-12">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Roles</h5>
                                                        <span className="h2 font-weight-bold mb-0">{roles.length}</span>
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid mt--6">

                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="mb-0">Roles</h3>
                                        <p className="text-sm mb-0">
                                            Roles informations
                                        </p>
                                    </div>
                                    <div className="table-responsive py-4">
                                        <table  className="table table-flush" id="datatable-buttons">
                                            <thead className="thead-light">
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
                            </div>
                        </div>

                        <FooterAdmin/>
                    </div>
                </div>

            </div>
        )
    }
}
export default RoleIndex
