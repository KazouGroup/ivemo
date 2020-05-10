<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header panel-header-sm">

        </div>

        <div class="content">
           <NavBlogannoncereservationsAdmin/>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="toolbar">
                                <div class="submit text-center">
                                    <a href="/blogs/annonce_reservations/ab/new/" class="btn btn-round btn-primary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New article de blog reservation</b>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead class="text-primary">
                                        <th>
                                            Title annonce
                                        </th>
                                        <th>
                                            User
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th class="text-center">
                                            Status user
                                        </th>
                                        <th class="text-center">
                                            Status admin
                                        </th>
                                        <th class="text-center">
                                            Date creation
                                        </th>
                                        <th class="text-right">
                                            Actions
                                        </th>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in blogannoncereservations" :key="item.id">
                                            <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                            <td>
                                                <b v-if="item.user_id">{{ (item.user.first_name.length > 15 ? item.user.first_name.substring(0,15)+ "..." : item.user.first_name) | upText }}</b>
                                                <b v-else>user deleted</b>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'blogannoncereservations_show.dashboard', params: { categoryannoncereservation: item.categoryannoncereservation.slug  } }">
                                                    <b v-if="item.categoryannoncereservation_id">{{ (item.categoryannoncereservation.name.length > 15 ? item.categoryannoncereservation.name.substring(0,15)+ "..." : item.categoryannoncereservation.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </router-link>
                                            </td>
                                            <td class="text-center">
                                                <div class="timeline-heading">
                                                    <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                                    <span v-else-if="!item.status"  class="badge badge-danger"><b>Deactive</b></span>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <div class="timeline-heading">
                                                    <span v-if="item.status_admin" class="badge badge-success"><b>Active</b></span>
                                                    <span v-else-if="!item.status_admin"  class="badge badge-danger"><b>Deactive</b></span>
                                                </div>
                                            </td>
                                            <td><b>{{ item.updated_at | myDate }}</b></td>
                                            <td class="text-right">
                                                <template v-if="$auth.can('manage-blogs')">
                                                    <button  v-if="item.status_admin" @click="disableItem(item.id)" class="btn btn-success btn-round btn-icon btn-sm" title="Disable">
                                                        <i class="now-ui-icons ui-1_check"/>
                                                    </button>
                                                    <button  v-else-if="!item.status_admin" @click="activeItem(item.id)" class="btn btn-danger btn-round btn-icon btn-sm " title="Activate">
                                                        <i class="now-ui-icons ui-1_simple-delete"/>
                                                    </button>
                                                </template>
                                                <a :href="`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${getDate(item)}/${item.slug}/`" target="_blank" class="btn btn-info btn-round btn-icon btn-sm ">
                                                    <i class="fas fa-eye"></i>
                                                </a>
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
    import NavBlogannoncereservationsAdmin from "./NavBlogannoncereservationsAdmin";
    export default {
        components: {NavBlogannoncereservationsAdmin},
        data() {
            document.title = `Dashboard Articles de blogs locations - Ivemo`;
            return {
                page: 1,
                blogannoncereservations: [],
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
                        let url = route('activated_blogannoncereservations.dashboard',id);
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
                        let url = route('unactivated_blogannoncereservations.dashboard',id);
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
                dyaxios.get(route('api.blogannoncereservations_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.blogannoncereservations.push(...response.data);
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
