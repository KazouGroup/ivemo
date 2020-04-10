<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header panel-header-sm">

        </div>

        <div class="content">
            <div class="row">
                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-primary icon-circle">
                                                <i class="now-ui-icons text_align-center"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">{{blogannonceventes_countFormatter(blogannoncereservations_count)}}</h3>
                                            <h6 class="stats-title">Articles</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons text_align-center"></i> Articles blogs
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-success icon-circle">
                                                <i class="now-ui-icons ui-1_check"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">{{blogannonceventesactive_countFormatter(blogannoncereservationsactive_count)}}</h3>
                                            <h6 class="stats-title">Actives</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons ui-1_check"/> Articles actives visible site
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-danger icon-circle">
                                                <i class="now-ui-icons ui-1_simple-delete"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">{{blogannonceventesunactive_countFormatter(blogannoncereservationsunactive_count)}}</h3>
                                            <h6 class="stats-title">Unactives</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons ui-1_simple-delete"/> Articles unactives
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
                                                <b v-if="item.categoryannoncereservation_id">{{ (item.categoryannoncereservation.name.length > 15 ? item.categoryannoncereservation.name.substring(0,15)+ "..." : item.categoryannoncereservation.name) | upText }}</b>
                                                <b v-else>user don't exist</b>
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
                                                    <button  v-if="item.status_admin" @click="disableItem(item.id)" class="btn btn-success btn-icon btn-sm" title="Disable">
                                                        <i class="now-ui-icons ui-1_check"/>
                                                    </button>
                                                    <button  v-else-if="!item.status_admin" @click="activeItem(item.id)" class="btn btn-danger btn-icon btn-sm " title="Activate">
                                                        <i class="now-ui-icons ui-1_simple-delete"/>
                                                    </button>
                                                </template>
                                                <a :href="`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${getDate(item)}/${item.slug}/`" target="_blank" class="btn btn-info btn-icon btn-sm ">
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
    export default {
        data() {
            document.title = `Dashboard Articles de blogs locations - Ivemo`;
            return {
                page: 1,
                blogannoncereservations: [],
                blogannoncereservations_count: [],
                blogannoncereservationsactive_count: [],
                blogannoncereservationsunactive_count: [],
            }
        },

        methods:{
            getDate(item){
                return moment(item.created_at).format('YYYY-MM-DD')
            },

            blogannonceventes_countFormatter(blogannoncereservations_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservations_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncereservations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesactive_countFormatter(blogannoncereservationsactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservationsactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncereservationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesunactive_countFormatter(blogannoncereservationsunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservationsunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncereservationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            /** Ici c'est l'activation de la couleur  **/
            activeItem(id) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.get(route('activated_blogannoncereservations.dashboard',id)).then(() => {
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
                    window.location.reload();
                    //End Progress bar
                    this.$Progress.finish();
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
                dyaxios.get(route('unactivated_blogannoncereservations.dashboard',id)).then(() => {
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
                    window.location.reload();
                    //End Progres bar
                    this.$Progress.finish();

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


            loadItems(){
                dyaxios.get(route('api.blogannoncereservations_dashboard_count')).then(response => {
                    this.blogannoncereservations_count = response.data;});

                dyaxios.get(route('api.blogannoncereservations_dashboardactive_count')).then(response => {
                    this.blogannoncereservationsactive_count = response.data;});

                dyaxios.get(route('api.blogannoncereservations_dashboardunactive_count')).then(response => {
                    this.blogannoncereservationsunactive_count = response.data;});
            }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$Progress.start();
                vm.loadItems();
                vm.$Progress.finish();
            });
        }
    }
</script>

<style scoped>

</style>
