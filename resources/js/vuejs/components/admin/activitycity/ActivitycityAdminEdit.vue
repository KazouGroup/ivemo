<template>
    <div class="main-panel" id="main-panel">

        <vue-progress-bar/>
        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-3 mx-auto">
                        <div class="card card-stats">
                            <div class="card-header card-header-warning card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">attach_email</i>
                                </div>
                                <p class="card-category"><b v-if="this.form.countcontactservices >= 1">Messages</b><b v-else>Message</b></p>
                                <h3 class="card-title"><b>{{this.form.countcontactservices}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">attach_email</i> Activity cities
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mx-auto">
                        <div class="card card-stats">
                            <div class="card-header card-header-info card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">photo_library</i>
                                </div>
                                <p class="card-category"><b v-if="this.form.countuploadimages >= 1">Images</b><b v-else>Image</b></p>
                                <h3 class="card-title"><b>{{this.form.countuploadimages}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">photo_library</i> Activity cities
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 mx-auto">
                        <div class="card card-stats">
                            <div class="card-header card-header-danger card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">favorite</i>
                                </div>
                                <p class="card-category"><b v-if="this.form.countlikes >= 1">Likes</b><b v-else>Like</b></p>
                                <h3 class="card-title"><b>{{this.form.countlikes}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">favorite</i> Activity cities
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 mx-auto">
                        <div class="card card-stats">
                            <div class="card-header card-header-primary card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">sms</i>
                                </div>
                                <p class="card-category"><b v-if="this.form.countcomments >= 1">Comments</b><b v-else>Comment</b></p>
                                <h3 class="card-title"><b>{{this.form.countcomments}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">sms</i> Activity cities
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">

                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <router-link :to="{ name: 'activitycitiesnew_dashboard.dashboard' }" class="btn btn-primary btn-raised">
                                            <b class="title_hover">New activity</b>
                                        </router-link>
                                    </div>

                                </div>

                                <form id="RegisterValidation" @submit.prevent="updateactivitycitiesItem()" role="form"
                                      method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="labels">
                                                Title
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div class="form-group">
                                                <input v-model="form.title" type="text" minlength="5" maxlength="255" name="title" placeholder="Title policy" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }"/>
                                                <has-error :form="form" field="title"></has-error>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="labels">
                                                City
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div class="form-group">
                                                <select name="city_id" v-model="form.city_id" id="city_id" class="form-control"
                                                        :class="{ 'is-invalid': form.errors.has('city_id') }">
                                                    <option value="" disabled>Choose City</option>
                                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                                </select>
                                                <has-error :form="form" field="city_id"></has-error>
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
                                    <hr>
                                    <div class="submit">
                                        <div class="text-center">
                                            <router-link :to="{ name: 'activitycities.dashboard' }" class="btn btn-secondary btn-raised">
                                                <b class="title_hover">Annuler</b>
                                            </router-link>
                                            <button  :disabled="form.busy" type="submit" class="btn btn-success btn-raised">
                                                <b class="title_hover">Sauvegarder</b>
                                            </button>

                                            <a  target="_blank" title="Voir"
                                                     :href="`/city/${form.city.slug}/a/${form.slug}/`" class="btn btn-warning btn-raised">
                                                <b class="title_hover">Voir le post</b>
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <button class="btn btn-primary btn-raised " @click="newuploadimagesModal" >
                                           <span class="btn-label">
                                               <i class="material-icons">photo_library</i>
                                           </span>
                                            <b class="title_hover">New image</b>
                                        </button>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Image</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>Date</b></th>
                                            <th class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(lk,index) in form.uploadimages" :key="lk.id">

                                            <td><img :src="lk.photo" style="height: 50px; width: 80px;border-radius: 4px"></td>

                                            <td>
                                                <div class="timeline-heading">
                                                        <span v-if="lk.status" class="badge badge-success">
                                                          <b>Active</b>
                                                        </span>
                                                    <span v-else class="badge badge-rose">
                                                        <b>Disactive</b>
                                                        </span>
                                                </div>
                                            </td>
                                            <td><b>{{ lk.created_at | dateAgo }}</b></td>
                                            <td class="text-right">

                                                <template>
                                                    <button @click="statusuploadimagesItem(lk)" v-if="lk.status" type="button"
                                                            class="btn btn-success btn-just-icon btn-sm"
                                                            title="Desactiver">
                                                        <i class="material-icons">done</i>
                                                    </button>
                                                    <button @click="statusuploadimagesItem(lk)" v-else type="button"
                                                            class="btn btn-rose btn-just-icon btn-sm"
                                                            title="Activer">
                                                        <i class="material-icons">remove</i>
                                                    </button>
                                                </template>


                                                <!--
                                                <button @click="edituploadimagesItem(lk)"
                                                        class="btn btn-info btn-sm btn-just-icon"
                                                        title="Delete"
                                                >
                                                    <i class="material-icons">edit</i>
                                                </button>
                                                -->

                                                <button @click="deleteuploadimagesItem(lk)"
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
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="UploadImage" tabindex="-1" role="dialog" aria-labelledby="UploadImageLabel"
                     aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 v-show="!editmode" class="modal-title" id="UploadImageLabel"><b>Add Image</b></h6>
                                <h6 v-show="editmode" class="modal-title" id="updateNewLabel"><b>Change Image</b></h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editmode ? updateuploadimagesItem() : storeuploadimagesItem()" role="form" method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">

                                    <div class="row">
                                        <div class="col-md-8 ml-auto mr-auto">
                                            <div class="profile text-center">
                                                <br>
                                                <div class="fileinput fileinput-new text-center"
                                                     data-provides="fileinput">
                                                    <div class="fileinput-new thumbnail">
                                                        <img :src="this.form.photo">
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

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="material-datatables">
                                    <table id="datatables1" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Image</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>Date</b></th>
                                            <th class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(ck,index) in form.contactservices" :key="ck.id">
                                            <td>
                                                <template>

                                                    <Button v-if="ck.status_red" class="btn btn-link btn-secondary btn-just-icon btn-sm" title="Message lu">
                                                        <i class="material-icons">fiber_manual_record</i>
                                                    </Button>

                                                    <Button v-else class="btn btn-link btn-info btn-just-icon btn-sm" title="Nouveau message">
                                                        <i class="material-icons">fiber_manual_record</i>
                                                    </Button>

                                                </template>
                                                <span v-if="ck.status_red" class="text-dark">
                                                {{ (ck.full_name.length > 30 ? ck.full_name.substring(0,30)+ "..." : ck.full_name) | upText }}
                                                </span>
                                                <span v-else class="text-danger">
                                                {{ (ck.full_name.length > 30 ? ck.full_name.substring(0,30)+ "..." : ck.full_name) | upText }}
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="ck.status_red" class="text-dark">
                                                    {{ (ck.message.length > 110 ? ck.message.substring(0,110)+ "..." : ck.message)  }}
                                                </span>
                                                <span v-else class="text-danger">
                                                    {{ (ck.message.length > 110 ? ck.message.substring(0,110)+ "..." : ck.message)  }}
                                                </span>
                                            </td>
                                            <td><b>{{ ck.created_at | dateAgo }}</b></td>
                                            <td class="text-right">

                                                <button @click="deletecontactservicesItem(ck)"
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
    export default {
        data() {
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                user: {},
                cities: {},
                editmode : true,
                form: new Form({
                    id: '',
                    title: '',
                    slug: '',
                    description: '',
                    city_id: '',
                    photo: '',

                    uploadimages:{},
                    city:{},
                    contactservices:{},
                    countcontactservices: '',
                    countuploadimages: '',
                    countcomments: '',
                    countlikes: '',
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
        methods: {

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
                    $("#datatables1").DataTable({
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


            /* init traitement du telechargement des image */

            newuploadimagesModal() {
                this.editmode = false;
                //this.form.reset();
                //Masquer le modal après la création
                $('#UploadImage').modal('show');
            },

            //edituploadimagesItem(lk) {
            //    console.log(lk)
            //    this.editmode = true;
            //    //this.form.reset();
            //    //Masquer le modal après la création
            //    $('#UploadImage').modal('show');
            //    //On passe les information
            //    this.form.fill(lk)
            //},

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


            storeuploadimagesItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.post(route('activitycitysenduploadimage_site',[this.$route.params.activitycity]))
                    .then(() => {
                        //Masquer le modal après la création
                        $('#UploadImage').modal('hide');
                        //Event
                        Fire.$emit('ItemGetter');

                        /** Debut de l'alert **/
                        $.notify(
                            {
                                message: `Data save successfully`,
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

            updateuploadimagesItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.put(route('activitycityupdateuploadimage_site',[this.$route.params.activitycity,this.form.id]))
                    .then(() => {
                        //Masquer le modal après la création
                        $('#UploadImage').modal('hide');
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

            statusuploadimagesItem(lk) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.post(route('statusuploadimage_site',lk.id)).then(() => {
                    /** Alert notify bootstrapp **/
                    if(lk.status){
                        $.notify(
                            {
                                message: `Image disactivated successfully`,
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
                    }else {
                        $.notify(
                            {
                                message: `Image activated successfully`,
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
                    }
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

            deleteuploadimagesItem(lk){
                Swal.fire({
                    title: 'Delete image',
                    text: "Are you sure you want to delete this image?",
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
                        let url = route('destroyuploadimage_site',lk.id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                message: "Image deleted Successfully"
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

            /* End */

            deletecontactservicesItem(ck){
                Swal.fire({
                    title: 'Delete message',
                    text: "Are you sure you want to delete this message?",
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
                        let url = route('contactservicedelete',ck.id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
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

            updateactivitycitiesItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.put(route('activitycitiesupdate_dashboard.dashboard',[this.$route.params.activitycity]))
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

            loadItems() {
                this.$Progress.start();
                let Itemslugin = this.$route.params.activitycity;
                dyaxios.get(route('api.activitycity_edit_dashboard',[Itemslugin])).then(({data}) => {
                    this.loaded = true;
                    this.form.fill(data);
                    this.mydatatables();
                });
                this.$Progress.finish();
            },
        },


        mounted() {
            dyaxios.get(route('api.all_cities')).then(({data}) => (this.cities = data));
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        }
    }
</script>

<style scoped>

</style>
