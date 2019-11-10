import React, {Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import {Link} from "react-router-dom";
import FooterAdmin from "../../inc/admin/FooterAdmin";


class AdministratorDatatables extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            user: [],
            error: null
        };
    }


    mydatatables() {
        $(function () {
            $('#datatables').DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                order: [[0, 'asc'], [3, 'desc']],
                responsive: true,
                destroy: true,
                retrieve: true,
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
    sendItem(item){
        $('#addNew').modal('show');

        this.user = item;
    }
    loadItems() {
        let url = `/api/administrators`;
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

    reload() {
        this.loadItems()
    }

    componentDidMount() {
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
        let {users} = this.state;
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
                                            <h3 className="card-title">{users.length}</h3>
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
                                                        <b>Datatables Administrators</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Administrators Available
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
                                                <button onClick={() => this.reload()}
                                                        className={'btn btn-success btn-raised  btn-sm'}
                                                        title="Refresh Page">
                                                    <i className="material-icons">replay</i>
                                                    <b className="title_hover">Refresh</b>
                                                </button>
                                            </div>
                                            <br/>
                                            <div className="toolbar">
                                                <div className="submit text-center">
                                                    <Link to={'/dashboard/administrators/'}
                                                          className={'btn btn-primary btn-raised'}>
                                                        <i className="material-icons">chat</i>
                                                        <b className="title_hover">Administrators Site</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <div className="material-datatables">
                                                <table id="datatables"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Avatar</b></th>
                                                        <th><b>First Name</b></th>
                                                        <th><b>Role</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>First Name</th>
                                                        <th>Role</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {users.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <Link to={'/dashboard/users/'}>
                                                                    <img src={item.avatar} alt={item.first_name}
                                                                         style={avatar_style}/>
                                                                </Link>
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
                                                                    {(item.first_name.length > 15 ? item.first_name.substring(0, 15) + "..." : item.first_name)}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {item.roles.map((role,index) => (
                                                                    <span key={index}  className="badge badge-success">
                                                                    <b>{role}</b>
                                                                    </span>
                                                                ))}
                                                            </td>
                                                            <td><b>{moment(item.created_at).format('DD/MM/YYYY')}</b></td>
                                                            <td className="text-right">

                                                                <button type="button" onClick={() => this.sendItem(item.id)}
                                                                   className="btn btn-link btn-info btn-round btn-just-icon"
                                                                   title="Send invitation">
                                                                    <i className="material-icons">mail</i>
                                                                </button>

                                                                <Link to={`/dashboard/faqs/v/${item.slug}/`}
                                                                      className="btn btn-link  btn-warning btn-round btn-just-icon"
                                                                      title="View user">
                                                                    <i className="material-icons">visibility</i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-link  btn-success btn-round btn-just-icon"
                                                                    title="Edit"
                                                                    to={`/dashboard/users/${item.id}/edit/`}
                                                                    key={item.id}>
                                                                    <i className="material-icons">edit</i>
                                                                </Link>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="modal fade" id="addNew" tabIndex={'-1'} role="dialog"
                                                 aria-labelledby="addNewLabel"
                                                 aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="updateNewLabel"><b>Invite
                                                                Administrator</b></h5>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form id="RegisterValidation" role="form" method="POST"
                                                                  action="" acceptCharset={'UTF-8'}>
                                                                <div className="form-group">
                                                                    <label className="bmd-label-floating">

                                                                    </label>
                                                                    <input type="text" name="name"
                                                                           placeholder="Name administrator"
                                                                           className="form-control"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="bmd-label-floating">

                                                                    </label>
                                                                    <input type="email" name={'email'} value={this.state.email}
                                                                           placeholder="Email administrator"
                                                                           className="form-control"/>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <div className="text-center">
                                                                        <button type="button" className="btn btn-danger"
                                                                                data-dismiss="modal">
                                                                    <span className="btn-label">
                                                                        <i className="material-icons">clear</i>
                                                                        <b>Close</b>
                                                                    </span>
                                                                        </button>
                                                                        <button type="submit"
                                                                                className="btn btn-success btn-raised">
                                                                    <span className="btn-label">
                                                                        <i className="material-icons">mail</i>
                                                                        <b>Yes, Send</b>
                                                                    </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
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

export default AdministratorDatatables;
