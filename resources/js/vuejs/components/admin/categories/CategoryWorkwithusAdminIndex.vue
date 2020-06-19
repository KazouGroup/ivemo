<template>
    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">


                <div v-if="loaded" class="row">
                    <div class="col-md-12 expo">
                        <div class="card card-stats">
                            <div :class="getColorCardUser()">
                                <div class="card-icon">
                                    <i class="material-icons">filter_hdr</i>
                                </div>
                                <p class="card-category">
                                    <b>Categories work with us</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{categoryworkwithuses.length}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">filter_hdr</i>
                                    <b>Categories work with us</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!loaded" class="submit">
                    <LoaderLdsDefault />
                </div>

                <div v-if="loaded" class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div :class="getColorHeaderUser()">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="card-title">
                                            <b>Categories work with us</b>
                                        </h4>
                                        <p class="card-title">Categories work with us</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">filter_hdr</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <button v-if="$auth.can('manage-rh')" class="btn btn-primary btn-raised " @click="newModal">
                                           <span class="btn-label">
                                               <i class="material-icons">add</i>
                                           </span>
                                            <b class="title_hover">New Categories work with us</b>
                                        </button>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Name</b></th>
                                            <th><b>Label</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>Work</b></th>
                                            <th v-if="$auth.can('manage-rh')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Label</th>
                                            <th>Status</th>
                                            <th>Work</th>
                                            <th v-if="$auth.can('manage-rh')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="item in categoryworkwithuses" :key="item.id">
                                            <td><b>{{ item.name }}</b></td>
                                            <td><b>{{ item.label }}</b></td>
                                            <td>
                                                <div class="timeline-heading">
                                                    <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                                    <span v-else-if="!item.status"  class="badge badge-rose"><b>Deactive</b></span>
                                                </div>
                                            </td>
                                            <td><b>{{ item.workwithuses_count }}</b></td>
                                            <td v-if="$auth.can('manage-rh')" class="text-right">
                                                <template>
                                                    <button @click="disableItem(item.id)" v-if="item.status" type="button"
                                                            class="btn btn-success btn-just-icon btn-sm"
                                                            title="Desactiver">
                                                        <i class="material-icons">done</i>
                                                    </button>
                                                    <button @click="activeItem(item.id)" v-else type="button"
                                                            class="btn btn-rose btn-just-icon btn-sm"
                                                            title="Activer">
                                                        <i class="material-icons">remove</i>
                                                    </button>
                                                </template>
                                                <button @click="editItem(item)"
                                                        class="btn btn-info btn-sm btn-just-icon"
                                                        title="Editer"
                                                >
                                                    <i class="material-icons">edit</i>
                                                </button>
                                                <button @click="deleteItem(item.id)"
                                                        class="btn btn-danger btn-sm btn-just-icon"
                                                        title="Delete"
                                                >
                                                    <i class="material-icons">delete_forever</i>
                                                </button>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 v-show="!editmode" class="modal-title" id="addNewLabel"><b>{{this.form.name || "Add Category work with us"}}</b></h6>
                                                <h6 v-show="editmode" class="modal-title" id="updateNewLabel"><b>{{this.form.name}}</b></h6>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form id="RegisterValidation" @submit.prevent="editmode ? updateItem() : storeItem()" role="form" method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="bmd-label-floating"></label>
                                                                <input v-model="form.name" type="text" name="name" minlength="2" maxlength="100" placeholder="Name..." class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" />
                                                                <has-error :form="form" field="name"/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="bmd-label-floating"></label>
                                                                <input v-model="form.label" type="text" name="label" minlength="2" maxlength="100" placeholder="Label..." class="form-control" :class="{ 'is-invalid': form.errors.has('label') }" />
                                                                <has-error :form="form" field="label"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="text-center">
                                                            <button type="button" class="btn btn-secondary btn-raised" data-dismiss="modal">
                                                        <span class="btn-label">
                                                            <b>Close</b>
                                                        </span>
                                                            </button>
                                                            <button :disabled="form.busy" v-show="!editmode" type="submit" class="btn btn-success btn-raised">
                                                        <span class="btn-label">
                                                            <b>Yes, Save</b>
                                                        </span>
                                                            </button>
                                                            <button :disabled="form.busy" v-show="editmode" type="submit" class="btn btn-success btn-raised">
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
            </div>
        </div>

        <footer-admin/>

    </div>

</template>

<script>
    import LoaderLdsDefault from "../user/dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard Categories work with us  ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                editmode: false,
                categoryworkwithuses: {},
                form: new Form({
                    id: '',
                    name: '',
                    label: '',
                })
            }
        },

        methods:{
            mydatatables() {
                $(function() {
                    $("#datatables").DataTable({
                        pagingType: "full_numbers",
                        lengthMenu: [
                            [10, 25, 50, -1],
                            [10, 25, 50, "All"]
                        ],
                        responsive: true,
                        retrieve:true,
                        destroy: true,
                        colReorder: true,
                        language: {
                            search: "<i class='material-icons'>search</i>",
                            searchPlaceholder: "Search Record"
                        },
                        sPaginationType: "full_numbers"
                    });
                });
            },
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },

            storeItem() {
                this.$Progress.start();
                // Submit the form via a POST request
                this.form.post(route('categoryworkwithuses.store')).then(() => {

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
                this.form.put(route('categoryworkwithuses.update',this.form.id))
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
                            allow_dismiss: false,
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
                dyaxios.get(route('activated_categoryworkwithuses',id)).then(() => {
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
                dyaxios.get(route('unactivated_categoryworkwithuses',id)).then(() => {
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
                        let url = route('categoryworkwithuses.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                    // title: 'Update',
                                    message: 'Data deleted Successfully'
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
                dyaxios.get(route('api.categoryworkwithuses')).then(response => {
                    this.loaded = true;
                    this.categoryworkwithuses = response.data;
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
