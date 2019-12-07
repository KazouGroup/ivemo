import React,{Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import StatusAdmin from "../../inc/admin/StatusAdmin";
import {Card, Row} from "reactstrap";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import ContactList from "./ContactList";


class ContactIndex extends Component{
    constructor () {
        super();
        this.state = {
            user: [],
            contacts: []
        };

        this.deleteItem = this.deleteItem.bind(this);
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
        // remove from local state
        let isNotId = item => item.id !== id;
        let updatedItems = this.state.contacts.filter(isNotId);
        this.setState({contacts: updatedItems});

        //Envoyer la requet au server
        let url = route('contacts.destroy',id);
        axios.delete(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    // title: 'Update FAQ',
                    message: 'Message has been deleted successfully'
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
    loadItems(){
        dyaxios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let url = route('contacts.api');
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    contacts: [...result]
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            });
    }
    reload(){
        this.loadItems()
    }
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {user,contacts} = this.state;
        const composantTitle = 'Contacts';
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
                                                <i className="material-icons">import_contacts</i>
                                            </div>
                                            <p className="card-category"><b>All Contacts Messages</b></p>
                                            <h3 className="card-title"><b>{contacts.length}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">import_contacts</i><b>All Contacts Messages</b>
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
                                                        <b>Datatables Contacts Messages</b>
                                                    </h4>
                                                    <p className="card-title">
                                                        Contacts Messages Available
                                                    </p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <span>
                                                        <i id="tooltipSize" className="material-icons">import_contacts</i>
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
                                                <table id="datatable"
                                                       className="table table-striped table-no-bordered table-hover"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Full name</b></th>
                                                        <th><b>Subject</b></th>
                                                        <th><b>Email</b></th>
                                                        <th><b>Date</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th><b>Full name</b></th>
                                                        <th><b>Subject</b></th>
                                                        <th><b>Email</b></th>
                                                        <th><b>Date</b></th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {contacts.map((item) => (
                                                        <ContactList key={item.id} {...item} deleteItem={this.deleteItem}/>
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
export default ContactIndex;
