<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">Categories FAQS</h2>
                <p class="text-white">Toutes les Categories pour la FAQS créé est de
                    <a href="#"><b>{{ categories_faqs.length }}</b></a></p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="toolbar">
                                <div class="submit text-center">
                                    <button v-if="$auth.can('manage-categories')" class="btn btn-round btn-primary btn-raised " @click="newModal">
                                           <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New Category FAQS</b>
                                    </button>
                                </div>
                            </div>
                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th><b>Name</b></th>
                                    <th><b>Status</b></th>
                                    <th>Created_at</th>
                                    <th v-if="$auth.can('manage-categories')" class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th v-if="$auth.can('manage-categories')" class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                <tr v-for="item in categories_faqs" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td>
                                        <div class="timeline-heading">
                                            <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                            <span v-else-if="!item.status"  class="badge badge-danger"><b>Deactive</b></span>
                                        </div>
                                    </td>
                                    <td><b>{{ item.created_at | dateCalendar }}</b></td>
                                    <td v-if="$auth.can('manage-categories')" class="text-right">
                                        <template>
                                            <button  v-if="item.status" @click="disableItem(item.id)" class="btn btn-success btn-icon btn-sm" title="Disable">
                                                <i class="now-ui-icons ui-1_check"/>
                                            </button>
                                            <button  v-else-if="!item.status" @click="activeItem(item.id)" class="btn btn-danger btn-icon btn-sm " title="Activate">
                                                <i class="now-ui-icons ui-1_simple-delete"/>
                                            </button>
                                        </template>
                                        <button @click="editItem(item)"
                                                class="btn btn-info btn-icon btn-sm" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="deleteItem(item.id)"  class="btn btn-danger btn-icon btn-sm remove">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal création/édition color -->
                        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel"
                             aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h6 v-show="!editmode" class="modal-title" id="addNewLabel"><b>Add Category FAQS</b></h6>
                                        <h6 v-show="editmode" class="modal-title" id="updateNewLabel"><b>{{this.form.name}}</b></h6>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="RegisterValidation" @submit.prevent="editmode ? updateItem() : storeItem()" role="form" method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                            <div class="form-group">
                                                <label class="bmd-label-floating"></label>
                                                <input v-model="form.name" type="text" name="name" minlength="2" maxlength="100" placeholder="Name..." class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" >
                                                <has-error :form="form" field="name"></has-error>
                                            </div>
                                            <div class="modal-footer">
                                                <div class="text-center">
                                                    <button type="button" class="btn btn-round btn-danger" data-dismiss="modal">
                                                        <span class="btn-label">
                                                            <b>Close</b>
                                                        </span>
                                                    </button>
                                                    <button :disabled="form.busy" v-show="!editmode" type="submit" class="btn btn-round btn-success btn-raised">
                                                        <span class="btn-label">
                                                            <b>Yes, Save</b>
                                                        </span>
                                                    </button>
                                                    <button :disabled="form.busy" v-show="editmode" type="submit" class="btn btn-round btn-success btn-raised">
                                                        <span class="btn-label">
                                                            <b>Yes, Update</b>
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


        <footer-admin></footer-admin>
    </div>
</template>

<script>
    import {routes} from "../../../routes/RouterPath";

    export default {
        data() {
            document.title = `Dashboard Categories FAQS - Ivemo`;
            return {
                categories_faqs: {},
                editmode: false,
                form: new Form({
                    id: '',
                    name: '',
                })
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

            storeItem() {
                this.$Progress.start();
                // Submit the form via a POST request
                this.form.post(route('categories_faqs.store')).then(() => {

                    //Masquer le modal après la création
                    $('#addNew').modal('hide');

                    //Insertion de l'alert !
                    $.notify(
                        {
                            message: `Data created successfully`,
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
                    //Fin insertion de l'alert !

                    //End Progress bar
                    this.$Progress.finish();

                    Fire.$emit('ItemGetter');
                }).catch(() => {
                    //Failled message
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
            },

            editItem(item) {
                this.editmode = true;
                this.form.reset();
                //Masquer le modal après la création
                $('#addNew').modal('show');
                //On passe les information
                this.form.fill(item);
            },
            newModal() {
                this.editmode = false;
                this.form.reset();
                //Masquer le modal après la création
                $('#addNew').modal('show');
            },

            updateItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.put(route('categories_faqs.update',this.form.id))
                    .then(() => {
                        //Masquer le modal après la création
                        $('#addNew').modal('hide');
                        //Event
                        Fire.$emit('ItemGetter');

                        /** Debut de l'alert **/
                        $.notify(
                            {
                                message: `Data updated successfully`,
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
                        /** Fin alert **/

                        //End Progress bar
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        //Failled message
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
            },

            /** Ici c'est l'activation de la couleur  **/
            activeItem(id) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.get(route('activated_categories_faqs',id)).then(() => {
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
            /** Ici c'est la désactivation de la couleur **/
            disableItem(id) {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('unactivated_categories_faqs',id)).then(() => {
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
                    title: 'Delete Data',
                    text: "Are you sure you want to delete this Category?",
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
                        let url = route('categories_faqs.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                icon: "now-ui-icons ui-1_bell-53",
                                message: "Category deleted Successfully"
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
                dyaxios.get(route('api.categories_faqs')).then(response => {
                    this.loaded = true;
                    this.categories_faqs = response.data;
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
