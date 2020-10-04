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
                                    <i class="material-icons">emoji_transportation</i>
                                </div>
                                <p class="card-category">
                                    <b>Activity cities</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{activitycities.length}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">emoji_transportation</i>
                                    <b>Activity cities</b>
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
                                            <b>Activity cities</b>
                                        </h4>
                                        <p class="card-title">Activity cities</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">emoji_transportation</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <router-link :to="{ name: 'activitycitiesnew_dashboard.dashboard' }" class="btn btn-primary btn-raised">
                                            <b class="title_hover">New activity</b>
                                        </router-link>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Title</b></th>
                                            <th><b>City</b></th>
                                            <th><b>Image</b></th>
                                            <th><b>Contacts</b></th>
                                            <th><b>Comments</b></th>
                                            <th><b>Vus</b></th>
                                            <th><b>Likes</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>Date</b></th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Title</th>
                                            <th>City</th>
                                            <th>Images</th>
                                            <th>Contacts</th>
                                            <th>Comments</th>
                                            <th>Vus</th>
                                            <th>Likes</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="item in activitycities" :key="item.id">
                                            <td>
                                                {{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycitiesbycity_dashboard.dashboard', params: { city: item.city.slug  } }">
                                                    <b v-if="item.city_id">{{ (item.city.name.length > 15 ? item.city.name.substring(0,15)+ "..." : item.city.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countuploadimages }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countcontactservices }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countcomments }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.visits_count }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countlikes }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <div class="timeline-heading">
                                                        <span v-if="item.status" class="badge badge-success">
                                                          <b>Active</b>
                                                        </span>
                                                    <span v-else class="badge badge-rose">
                                                        <b>Disactive</b>
                                                        </span>
                                                </div>
                                            </td>
                                            <td><b>{{ item.created_at | dateAgo }}</b></td>
                                            <td v-if="$auth.can('manage-annonce-employements')" class="text-right">
                                                <template>
                                                    <button @click="disableItem(item)" v-if="item.status" type="button"
                                                            class="btn btn-success btn-just-icon btn-sm"
                                                            title="Desactiver">
                                                        <i class="material-icons">done</i>
                                                    </button>
                                                    <button @click="activeItem(item)" v-else type="button"
                                                            class="btn btn-rose btn-just-icon btn-sm"
                                                            title="Activer">
                                                        <i class="material-icons">remove</i>
                                                    </button>
                                                </template>

                                                <a  class="btn btn-warning btn-sm btn-just-icon"
                                                    target="_blank" title="Voir"
                                                    :href="`/city/${item.city.slug}/a/${item.slug}/`">
                                                    <i class="material-icons">visibility</i>
                                                </a>

                                                <button @click="deleteItem(item)"
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
                loaded: false,
                activitycities: [],
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

            /** Ici c'est l'activation  **/
            activeItem(item){
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
                        let url = route('activated_activitycities.dashboard',item.id);
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
                            Fire.$emit('ItemGetter');
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
            disableItem(item){
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
                        let url = route('unactivated_activitycities.dashboard',item.id);
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
                            Fire.$emit('ItemGetter');
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
                    title: 'Delete data',
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

                        let index = this.activitycities.indexOf(item);
                        this.activitycities.splice(index, 1);
                        //Envoyer la requete au server
                        let url = route('activitycitiesdelete_dashboard.dashboard',item.id);
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


            loadItems(){
                let Itemslug = this.$route.params.city;

                dyaxios.get(route('api.apiactivitycitiesbycity_dashboard',[Itemslug]))
                    .then(response => {
                        this.loaded = true;
                        this.activitycities = response.data;
                        this.mydatatables();
                    });
            }

        },

        created() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        }
    }
</script>

<style scoped>

</style>
