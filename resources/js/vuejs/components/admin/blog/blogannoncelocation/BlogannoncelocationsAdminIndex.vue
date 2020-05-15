<template>
    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="content">
                <div class="container-fluid">


                   <NavBlogannoncelocationsAdmin/>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div :class="getColorHeaderUser()">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title">
                                                <b>Articles sur les annonces locations</b>
                                            </h4>
                                            <p class="card-title">Articles sur les annonces locations</p>
                                        </div>
                                        <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">view_headline</i>
                                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="toolbar">
                                        <div class="text-center">
                                            <a href="/blogs/annonce_locations/ab/new/" class="btn btn-primary btn-raised">
                                                   <span class="btn-label">
                                                       <i class="material-icons">add</i>
                                                  </span>
                                                <b class="title_hover">New article de blog location</b>
                                            </a>
                                        </div>

                                    </div>
                                    <div class="material-datatables">
                                        <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                            <thead>
                                            <tr>
                                                <th><b>Title annonce</b></th>
                                                <th><b>User</b></th>
                                                <th><b>Category</b></th>
                                                <th><b>Status user</b></th>
                                                <th><b>Status admin</b></th>
                                                <th><b>Date</b></th>
                                                <th class="disabled-sorting text-right"><b>Actions</b></th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Title annonce</th>
                                                <th>User</th>
                                                <th>Category</th>
                                                <th>Status user</th>
                                                <th>Status admin</th>
                                                <th>Date</th>
                                                <th class="text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            <tr v-for="item in blogannoncelocations" :key="item.id">
                                                <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                                <td>
                                                    <b v-if="item.user_id">{{ (item.user.first_name.length > 15 ? item.user.first_name.substring(0,15)+ "..." : item.user.first_name) | upText }}</b>
                                                    <b v-else>user deleted</b>
                                                </td>
                                                <td>
                                                    <router-link :to="{ name: 'blogannoncelocations_show.dashboard', params: { categoryannoncelocation: item.categoryannoncelocation.slug  } }">
                                                        <b v-if="item.categoryannoncelocation_id">{{ (item.categoryannoncelocation.name.length > 15 ? item.categoryannoncelocation.name.substring(0,15)+ "..." : item.categoryannoncelocation.name) | upText }}</b>
                                                        <b v-else>user don't exist</b>
                                                    </router-link>
                                                </td>
                                                <td>
                                                    <div class="timeline-heading">
                                                        <span v-if="item.status_user" class="badge badge-success">
                                                          <b>Activé</b>
                                                        </span>
                                                            <span v-else class="badge badge-rose">
                                                        <b>Deactivé</b>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="timeline-heading">
                                                        <span v-if="item.status_admin" class="badge badge-success">
                                                          <b>Activé</b>
                                                        </span>
                                                            <span v-else class="badge badge-rose">
                                                        <b>Deactivé</b>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td><b>{{item.created_at | dateAgo}}</b></td>
                                                <td class="text-right">
                                                    <template v-if="$auth.can('manage-blogs')">
                                                        <button @click="disableItem(item.id)" v-if="item.status_admin" type="button"
                                                                class="btn btn-success btn-just-icon btn-sm"
                                                                title="Desactiver">
                                                            <i class="material-icons">remove</i>
                                                        </button>
                                                        <button @click="activeItem(item.id)" v-else type="button"
                                                                class="btn btn-rose btn-just-icon btn-sm"
                                                                title="Activer">
                                                            <i class="material-icons">done</i>
                                                        </button>
                                                    </template>
                                                    <a :href="`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${getDate(item)}/${item.slug}/`" target="_blank"
                                                       class="btn btn-warning btn-sm btn-just-icon"
                                                       title="Delete">
                                                        <i class="material-icons">visibility</i>
                                                    </a>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
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
            </div>
        </div>

        <footer-admin/>

    </div>
</template>

<script>
    import moment from 'moment'
    import NavBlogannoncelocationsAdmin from "./NavBlogannoncelocationsAdmin";
    export default {
        components: {NavBlogannoncelocationsAdmin},
        data() {
            document.title = `Dashboard Articles de blogs locations ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                blogannoncelocations: [],
            }
        },

        methods:{
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
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

            infiniteHandler($state) {
                dyaxios.get(route('api.blogannoncelocations_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.blogannoncelocations.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },
        },

        created() {
            dyaxios.get(route('api.blogannoncelocations_dashboard_count')).then(response => {
                this.blogannoncelocations_count = response.data;});
        }
    }
</script>

<style scoped>

</style>
