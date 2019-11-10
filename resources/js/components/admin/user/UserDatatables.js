import React, {Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import {Link} from "react-router-dom";
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
                                                        <b>Datatables Users</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Users Available
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
                                                    <Link to={'/dashboard/users/create/'}  className={'btn btn-success btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">New User</b>
                                                    </Link>
                                                    <Link to={'/dashboard/users/'}  className={'btn btn-primary btn-raised'}>
                                                        <i className="material-icons">chat</i>
                                                        <b className="title_hover">Users Site</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <div className="material-datatables">
                                                <table id="datatables"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%" >
                                                    <thead>
                                                    <tr>
                                                        <th><b>Avatar</b></th>
                                                        <th><b>First Name</b></th>
                                                        <th><b>Last Updated</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>First Name</th>
                                                        <th>Last Updated</th>
                                                        <th className="text-right">Actions</th>
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
                                                                    { (item.first_name.length > 15 ? item.first_name.substring(0,15)+ "..." : item.first_name)  }
                                                                </Link>
                                                            </td>
                                                            <td><b>{moment(item.created_at).format('DD/MM/YYYY')}</b></td>
                                                            <td className="text-right">

                                                                <Link to={`/dashboard/faqs/v/${item.slug}/`}  className="btn btn-link  btn-warning btn-round btn-just-icon" title="View">
                                                                    <i className="material-icons">visibility</i>
                                                                </Link>

                                                                <Link className="btn btn-link  btn-success btn-round btn-just-icon" title="Edit"
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
export default UserDatatables;