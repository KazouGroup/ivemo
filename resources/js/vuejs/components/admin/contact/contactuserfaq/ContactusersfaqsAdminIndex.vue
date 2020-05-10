<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header panel-header-sm">

        </div>

        <div class="content">

            <NavContactusersfaqsAdmin/>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="toolbar">

                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead class="text-primary">
                                        <th>
                                            Full name
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Category user
                                        </th>
                                        <th>
                                            Category object
                                        </th>
                                        <th>
                                            Recu
                                        </th>
                                        <th class="text-right">
                                            Actions
                                        </th>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item,index)  in contactusersfaqs" :key="item.id">
                                            <td>{{ (item.full_name.length > 15 ? item.full_name.substring(0,15)+ "..." : item.full_name) | upText }}</td>
                                            <td>{{ (item.email.length > 25 ? item.email.substring(0,25)+ "..." : item.email) | upText }}</td>
                                            <td>
                                                <b v-if="item.categoryuser_id">{{ (item.categoryuser.name.length > 15 ? item.categoryuser.name.substring(0,15)+ "..." : item.categoryuser.name) | upText }}</b>
                                                <b v-else>categoryuser deleted</b>
                                            </td>
                                            <td>
                                                <b v-if="item.categoryobjet_id">{{ (item.categoryobjet.name.length > 15 ? item.categoryobjet.name.substring(0,15)+ "..." : item.categoryobjet.name) | upText }}</b>
                                                <b v-else>categoryobjet deleted</b>
                                            </td>
                                            <td>{{ item.updated_at | myDate }}</td>
                                            <td class="text-right">
                                                <a :href="`/`" target="_blank" class="btn btn-info btn-icon btn-round btn-sm ">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <button @click="deleteItem(item)"  class="btn btn-danger btn-icon btn-round btn-sm remove">
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="toolbar">
                                <div class="submit text-center" >
                                    <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                                        <span slot="no-more">No more data</span>
                                    </infinite-loading>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <footer-admin></footer-admin>
    </div>
</template>

<script>
    import moment from 'moment'
    import NavContactusersfaqsAdmin from "./NavContactusersfaqsAdmin";
    export default {
        components: {NavContactusersfaqsAdmin},
        data() {
            document.title = `Dashboard Contact from user faq - Ivemo`;
            return {
                page: 1,
                contactusersfaqs: [],
            }
        },

        methods:{
            getDate(item){
                return moment(item.created_at).format('YYYY-MM-DD')
            },

            /** Ici c'est l'activation  **/
            activeItem(id){
                Swal.fire({
                    title: 'Show or activated this article?',
                    text: "Are you sure to confirm this article?",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes, confirm',
                    cancelButtonText: 'No, cancel',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        this.$Progress.start();
                        //Envoyer la requet au server
                        let url = route('activated_blogannoncelocations.dashboard',id);
                        dyaxios.get(url).then(() => {

                            /** Alert notify bootstrapp **/
                            $.notify({
                                    message: "This article has been activated for users",
                                },
                                {
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
                            window.location.reload();
                            //End Progress bar
                            this.$Progress.finish();
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
                })

            },
            /** Ici c'est la désactivation **/
            disableItem(id){
                Swal.fire({
                    title: 'Mask or unactivated this article?',
                    text: "Are you sure to confirm this article?",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes, confirm',
                    cancelButtonText: 'No, cancel',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        this.$Progress.start();
                        //Envoyer la requet au server
                        let url = route('unactivated_blogannoncelocations.dashboard',id);
                        dyaxios.get(url).then(() => {

                            /** Alert notify bootstrapp **/
                            $.notify({
                                    message: "This article has been masked for users",
                                },
                                {
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
                            window.location.reload();
                            //End Progress bar
                            this.$Progress.finish();
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
                })

            },

            deleteItem(item){
                Swal.fire({
                    title: 'Delete Data',
                    text: "Are you sure you want to delete this data?",
                    animation: false,
                    customClass: 'animated pulse',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        //Start Progress bar
                        this.$Progress.start();
                        //Envoyer la requete au server
                        let url = route('contactusersfaqs.destroy',item.id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                    message: "Data deleted Successfully",
                                },
                                {
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
                            /* End alert ***/
                            //End Progress bar
                            this.$Progress.finish();
                            let index = this.contactusersfaqs.indexOf(item);
                            this.contactusersfaqs.splice(index, 1);
                        }).catch(() => {
                            this.$Progress.fail();
                            //Alert error
                            $.notify("Ooop! Something wrong. Try later", {
                                type: 'danger',
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                }
                            });
                        })
                    }
                })
            },

            infiniteHandler($state) {
                dyaxios.get(route('api.contactusersfaqs_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.contactusersfaqs.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>
