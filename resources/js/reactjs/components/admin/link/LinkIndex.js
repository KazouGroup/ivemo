import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";

class FaqIndex extends Component {
    constructor () {
        super();
        this.state = {
            faqs: []
        };
        // bind
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }


    // Change status
    changeStatus(id){

        axios.get(`/dashboard/change_status_faqs/${id}`).then(res => {

            $.notify('<strong>Faqs update Successfully.</strong>', {
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

            // remove from local state
            let isNotId = faq => faq.id !== id;
            let updatedItems = this.state.faqs.props(isNotId);
            this.setState({faqs: updatedItems});
        })
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
                            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert-notify" role="alert">' +
                                '<span class="alert-icon" data-notify="icon"></span> ' +
                                '<div class="alert-text"</div> ' +
                                '<span class="alert-title" data-notify="title">{1}</span> ' +
                                '<span data-notify="message">{2}</span>' +
                                '</div>' +
                                '<button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '</div>'
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

    loadItems() {
        axios.get(`/api/faqs`).then(response =>
            this.setState({
                faqs: [...response.data],
            }));
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
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h2>Link</h2>


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
