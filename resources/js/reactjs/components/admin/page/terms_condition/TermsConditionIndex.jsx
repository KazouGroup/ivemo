import React,{Component} from "react";



class TermsConditionIndex extends Component {
    constructor () {
        super();
        this.state = {
            user: [],
            termsconditions: []
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
    loadItems() {
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
    }
    componentDidMount () {
        this.loadItems();
    }

    render() {
        const {user,termsconditions} = this.state;
        return(
            <>

            </>
        )
    }

}

export default TermsConditionIndex;
