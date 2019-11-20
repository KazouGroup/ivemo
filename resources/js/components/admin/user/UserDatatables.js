import React, {Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import {Link} from "react-router-dom";
import moment from 'moment'
require("moment/min/locales.min");
moment.locale('fr');
import FooterAdmin from "../../inc/admin/FooterAdmin";



class UserDatatables  extends Component {
    constructor () {
        super();
        this.state = {
            users: [],
            error: null
        };
    }


    mydatatables(){
        $( function () {
            $('#datatable-buttons').DataTable({
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
        let url = `/api/users`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    users: result
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
        const avatar_style = {
            width: "40px",
            height: "40px",
            top: "15px",
            left: "15px",
            borderRadius: "50%"
        };
        let { users } = this.state;
        return(
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
                                                <li className="breadcrumb-item"><a href="#"><i
                                                    className="fas fa-home"></i></a></li>
                                                <li className="breadcrumb-item"><a href="#">Dashboards</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Default</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <a href="#" className="btn btn-sm btn-neutral">New</a>
                                        <a href="#" className="btn btn-sm btn-neutral">Filters</a>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Total
                                                            traffic</h5>
                                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                            <i className="ni ni-active-40"></i>
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
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">New
                                                            users</h5>
                                                        <span className="h2 font-weight-bold mb-0">2,356</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                            <i className="ni ni-chart-pie-35"></i>
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
                                    <div className="col-xl-3 col-md-6">
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
                                    <div className="col-xl-3 col-md-6">
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
                                        <h3 className="mb-0">Datatable</h3>
                                        <p className="text-sm mb-0">
                                           Users informations
                                        </p>
                                    </div>
                                    <div className="table-responsive py-4">
                                        <table  className="table table-flush" id="datatable-buttons">
                                            <thead className="thead-light">
                                            <tr>
                                                <th><b>Avatar</b></th>
                                                <th><b>First Name</b></th>
                                                <th><b>Last Updated</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th><b>Avatar</b></th>
                                                <th><b>First Name</b></th>
                                                <th><b>Last Updated</b></th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {users.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <Link to={'/dashboard/users/'}>
                                                        <img src={item.avatar} alt={item.first_name} style={avatar_style}/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={'/dashboard'}>
                                                        { (item.first_name.length > 15 ? item.first_name.substring(0,15)+ "..." : item.first_name)  }
                                                    </Link>
                                                </td>
                                                <td><b>{moment(item.created_at).format('DD/MM/YYYY')}</b></td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a className="btn btn-sm btn-icon-only text-light" href="#"
                                                           role="button" data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                            <Link className="dropdown-item" to={`/dashboard/faqs/v/${item.slug}/`}>
                                                                 Show
                                                            </Link>
                                                            <Link className="dropdown-item" to={`/dashboard/users/${item.id}/edit/`}>
                                                                 Edit
                                                            </Link>
                                                        </div>
                                                    </div>
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
        )
    }
}
export default UserDatatables;
