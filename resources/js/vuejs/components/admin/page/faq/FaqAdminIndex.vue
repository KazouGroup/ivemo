<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">FAQS</h2>
                <p class="category">Toutes les FAQS créé est de
                    <a href="#">{{ faqs.length }}</a></p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="toolbar">
                                <div class="submit text-center">
                                    <router-link v-if="$auth.can('manage-faq')" :to="{ name: 'faqs.create' }" class="btn btn-round btn-primary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New FAQS</b>
                                    </router-link>
                                </div>
                            </div>
                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category FAQS</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Title</th>
                                    <th>Category FAQS</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                <tr v-for="item in faqs" :key="item.id">
                                    <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                    <td v-text="item.categoryfaq.name"></td>
                                    <td>
                                        <div class="timeline-heading">
                                            <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                            <span v-else-if="!item.status"  class="badge badge-danger"><b>Deactive</b></span>
                                        </div>
                                    </td>
                                    <td><b>{{ item.created_at | myDate }}</b></td>
                                    <td class="text-right">
                                        <template>
                                            <button  v-if="item.status" @click="disableItem(item.id)" class="btn btn-success btn-icon btn-sm btn-round" title="Disable">
                                                <i class="now-ui-icons ui-1_check"/>
                                            </button>
                                            <button  v-else-if="!item.status" @click="activeItem(item.id)" class="btn btn-danger btn-icon btn-round btn-sm " title="Activate">
                                                <i class="now-ui-icons ui-1_simple-delete"/>
                                            </button>
                                        </template>
                                        <router-link :to="{ name: 'faqs.edit', params: { id: item.id  } }" class="btn btn-info btn-icon btn-sm btn-round edit">
                                            <i class="fas fa-edit"></i>
                                        </router-link>
                                        <button @click="deleteItem(item.id)"  class="btn btn-danger btn-icon btn-sm btn-round remove">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>

        </div>


        <footer-admin></footer-admin>
    </div>
</template>

<script>
    export default {
        data() {
            document.title = `Dashboard FAQS - Ivemo`;
            return {
                faqs: {},
            }
        },

        methods:{
            mydatatables(){
                $( function () {
                    $('#datatable').DataTable({
                        "pagingType": "full_numbers",
                        "lengthMenu": [
                            [10, 25, 50, -1],
                            [10, 25, 50, "All"]
                        ],
                        responsive: true,
                        destroy: true,
                        retrieve:true,
                        autoFill: true,
                        colReorder: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search Record",
                        },

                    });
                });
            },

            /** Ici c'est l'activation de la data  **/
            activeItem(id) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.get(route('activated_faqs',id)).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify(
                        {
                            message: `Data activated successfully`,
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'top',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInDown",
                                exit: "animated fadeOutUp"
                            },
                        });
                    /** End alert ***/

                    //End Progress bar
                    this.$Progress.finish();
                    Fire.$emit('ItemGetter');
                }).catch(() => {
                    //Alert error
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            },
            /** Ici c'est la désactivation de la data **/
            disableItem(id) {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('unactivated_faqs',id)).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify(
                        {
                            message: `Data desactivated successfully`,
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'top',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInDown",
                                exit: "animated fadeOutUp"
                            },
                        });
                    /** End alert **/

                    //End Progres bar
                    this.$Progress.finish();

                    Fire.$emit('ItemGetter');
                }).catch(() => {
                    //Alert error
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            },

            deleteItem(id){
                Swal.fire({
                    title: 'Delete FAQS',
                    text: "Are you sure you want to delete this FAQ?",
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
                        let url = route('faqs.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                icon: "now-ui-icons ui-1_bell-53",
                                message: "FAQ deleted Successfully"
                            }, {
                                allow_dismiss: false,
                                type: 'success',
                                placement: {
                                    from: 'top',
                                    align: 'right'
                                }
                            });
                            /* End alert ***/
                            //End Progress bar
                            this.$Progress.finish();

                            Fire.$emit('ItemGetter');
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

            loadItems() {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('faqs.api')).then(response => {
                    this.loaded = true;
                    this.faqs = response.data;
                    this.mydatatables();
                });
                //End Progress bar
                this.$Progress.finish();
            },
            reload(){
                this.loadItems()
            },
        },

        created() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        },
    }
</script>

<style scoped>

</style>
