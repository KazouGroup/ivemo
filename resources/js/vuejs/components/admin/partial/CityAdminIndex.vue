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
                                    <i class="material-icons">scatter_plot</i>
                                </div>
                                <p class="card-category">
                                    <b>Cities {{ country }}</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{cities.length}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">scatter_plot</i>
                                    <b>Cities {{ country }}</b>
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
                                            <b>Cities {{country}}</b>
                                        </h4>
                                        <p class="card-title">Cities {{country}}</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">scatter_plot</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <button v-if="$auth.can('manage-categories')" class="btn btn-primary btn-raised " @click="newModal">
                                           <span class="btn-label">
                                               <i class="material-icons">add</i>
                                           </span>
                                            <b class="title_hover">New City {{country}}</b>
                                        </button>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Image</b></th>
                                            <th><b>Name</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>AL</b></th>
                                            <th><b>AR</b></th>
                                            <th><b>AR</b></th>
                                            <th><b>EFS</b></th>
                                            <th><b>ATC</b></th>
                                            <th v-if="$auth.can('manage-categories')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>AL</th>
                                            <th>AR</th>
                                            <th>AR</th>
                                            <th>EFS</th>
                                            <th>ATC</th>
                                            <th v-if="$auth.can('manage-categories')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="item in cities" :key="item.id">
                                            <td><img :src="item.photo" style="height: 50px; width: 80px;border-radius: 4px"></td>
                                            <td><b>{{ item.name }}</b></td>
                                            <td>
                                                <div class="timeline-heading">
                                                    <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                                    <span v-else-if="!item.status"  class="badge badge-rose"><b>Deactive</b></span>
                                                </div>
                                            </td>
                                            <td><b>{{item.annoncelocations_count}}</b></td>
                                            <td><b>{{item.annoncereservations_count}}</b></td>
                                            <td><b>{{item.annonceventes_count}}</b></td>
                                            <td><b>{{item.employments_count}}</b></td>
                                            <td>
                                                <router-link :to="{ name: 'activitycitiesbycity_dashboard.dashboard', params: { city: item.slug  } }">
                                                    <b>{{item.activitycities_count}}</b>
                                                </router-link>
                                            </td>
                                            <td v-if="$auth.can('manage-categories')" class="text-right">
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
                                                <button v-if="$auth.can('manage-categories')" @click="deleteItem(item)"
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
                                    <div class="modal-dialog modal-lg" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 v-show="!editmode" class="modal-title" id="addNewLabel"><b>{{this.form.name || "Add Cities"}}</b></h6>
                                                <h6 v-show="editmode" class="modal-title" id="updateNewLabel"><b>{{this.form.name}}</b></h6>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="editmode ? updateItem() : storeItem()" role="form" method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                                    <div class="form-group">
                                                        <label class="bmd-label-floating"></label>
                                                        <input v-model="form.name" type="text" name="name" minlength="2" maxlength="100" placeholder="Name..." class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" />
                                                        <has-error :form="form" field="name"/>
                                                    </div>

                                                    <div class="form-group">
                                                        <label class="bmd-label-floating"></label>
                                                        <input v-model="form.link_video" type="url" name="link_video" minlength="2" maxlength="255" placeholder="Lien youtube, vimeo, etc..." class="form-control" :class="{ 'is-invalid': form.errors.has('link_video') }" />
                                                        <has-error :form="form" field="link_video"/>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-8 ml-auto mr-auto">
                                                            <div class="profile text-center">
                                                                <br>
                                                                <div class="fileinput fileinput-new text-center"
                                                                     data-provides="fileinput">
                                                                    <div class="fileinput-new thumbnail">
                                                                        <img :src="getImagesave()" :alt="form.slug">
                                                                    </div>
                                                                    <div
                                                                        class="fileinput-preview fileinput-exists thumbnail"></div>
                                                                    <div>
                                                               <span
                                                                   class="btn btn-raised btn-success btn-file">
                                                                 <span
                                                                     class="fileinput-new"
                                                                     style="cursor: pointer">
                                                                          <b>Add Image</b>
                                                                   </span>
                                                                  <span
                                                                      class="fileinput-exists"
                                                                      style="cursor: pointer">
                                                                      <b>Change</b>
                                                                   </span>
                                                                   <input id="photo"
                                                                          @change="updateImage"
                                                                          type="file"
                                                                          class="form-control"
                                                                          name="photo" accept="image/*"/>
                                                               </span>
                                                                        <a href="#pablo"
                                                                           class="btn btn-danger fileinput-exists"
                                                                           data-dismiss="fileinput">
                                                                            <b>Remove</b>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <has-error :form="form" field="photo"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label class="bmd-label-floating">Description <span style="color:red;">*</span></label>
                                                                <br>
                                                                <quill-editor v-model="form.description"
                                                                              :class="{ 'is-invalid': form.errors.has('description') }"
                                                                              :options="editorOption">
                                                                </quill-editor>
                                                                <div class="form-check">
                                                                    <label class="form-check-label pull-right">
                                                                        You can use the
                                                                        <a href="https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/" class="text-danger" target="_blank">
                                                                            Markdown here
                                                                        </a>
                                                                        <span class="form-check-sign"></span>
                                                                    </label>
                                                                </div>
                                                                <has-error :form="form" field="description"></has-error>
                                                            </div>
                                                        </div>
                                                    </div>
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
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                cities: {},
                loaded: false,
                editmode: false,
                form: new Form({
                    id: '',
                    name: '',
                    description: '',
                    link_video: '',
                    photo: '',
                }),
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
                            [{ 'font': [] }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            ['bold', 'italic', 'underline'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{ 'align': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['clean']
                        ]
                    }
                }
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

            getImagesave() {
                return (this.form.photo.length > 200) ? this.form.photo : this.form.photo;
            },

            updateImage(e) {
                let reader = new FileReader();
                let file = e.target.files[0];
                if (file['size'] < 6000775) {
                    reader.onloadend = (file) => {
                        this.form.photo = reader.result
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.$Progress.fail();
                    Swal.fire({
                        type: 'error',
                        title: 'Your image is very big',
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                    });
                }
            },

            storeItem() {
                this.$Progress.start();
                // Submit the form via a POST request
                this.form.post(route('cities.store')).then(() => {

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
                this.form.put(route('cities.update',this.form.id))
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
                dyaxios.get(route('activated_cities',id)).then(() => {
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
                dyaxios.get(route('unactivated_cities',id)).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify(
                        {
                            message: `Data disactivated successfully`,
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
                    text: "Are you sure you want to delete this Data?",
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
                        let url = route('cities.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                icon: "now-ui-icons ui-1_bell-53",
                                message: "Data deleted Successfully"
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
                dyaxios.get(route('api.cities')).then(response => {
                    this.loaded = true;
                    this.cities = response.data;
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
