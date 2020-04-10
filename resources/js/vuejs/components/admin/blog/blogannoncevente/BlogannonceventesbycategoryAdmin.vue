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
                                            <h3 class="info-title">{{blogannonceventes_countFormatter(blogannonceventes_count || "")}}</h3>
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
                                            <h3 class="info-title">{{blogannonceventesactive_countFormatter(blogannonceventesactive_count)}}</h3>
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
                                            <h3 class="info-title">{{blogannonceventesunactive_countFormatter(blogannonceventesunactive_count)}}</h3>
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
                                    <router-link  :to="{ name: 'blogannonceventes.dashboard'}" class="btn btn-round btn-secondary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons arrows-1_minimal-left"></i>
                                      </span>
                                        <b class="title_hover">Back</b>
                                    </router-link>
                                    <a href="/blogs/annonce_ventes/ab/new/" class="btn btn-round btn-primary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New article de blog vente</b>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="datatable" class="table table-striped table-bordered" >
                                        <thead>
                                        <tr>
                                            <th><b>Title annonce</b></th>
                                            <th><b>User</b></th>
                                            <th><b>Category</b></th>
                                            <th><b> Status user</b></th>
                                            <th><b>Status admin</b></th>
                                            <th><b>Date creation</b></th>
                                            <th class="disabled-sorting text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th><b>Title annonce</b></th>
                                            <th><b>User</b></th>
                                            <th><b>Category</b></th>
                                            <th><b> Status user</b></th>
                                            <th><b>Status admin</b></th>
                                            <th><b>Date creation</b></th>
                                            <th v-if="$auth.can('manage-categories')" class="disabled-sorting text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="item in categoryannoncevente.blogannonceventes" :key="item.id">
                                            <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                            <td>
                                                <b v-if="item.user_id">{{ (item.user.first_name.length > 15 ? item.user.first_name.substring(0,15)+ "..." : item.user.first_name) | upText }}</b>
                                                <b v-else>user deleted</b>
                                            </td>
                                            <td class="text-center">
                                                <b v-if="item.categoryannoncevente_id">{{ (item.categoryannoncevente.name.length > 15 ? item.categoryannoncevente.name.substring(0,15)+ "..." : item.categoryannoncevente.name) | upText }}</b>
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
                                            <td class="text-center"><b>{{ item.created_at | myDate }}</b></td>
                                            <td class="text-right">
                                                <template v-if="$auth.can('manage-blogs')">
                                                    <button  v-if="item.status_admin" @click="disableItem(item.id)" class="btn btn-success btn-icon btn-sm" title="Disable">
                                                        <i class="now-ui-icons ui-1_check"/>
                                                    </button>
                                                    <button  v-else-if="!item.status_admin" @click="activeItem(item.id)" class="btn btn-danger btn-icon btn-sm " title="Activate">
                                                        <i class="now-ui-icons ui-1_simple-delete"/>
                                                    </button>
                                                </template>
                                                <a :href="`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${getDate(item)}/${item.slug}/`" target="_blank" class="btn btn-info btn-icon btn-sm ">
                                                    <i class="fas fa-eye"></i>
                                                </a>
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
    import moment from 'moment'
    export default {
        data() {
            document.title = `Dashboard Articles de blogs ventes - Ivemo`;
            return {
                page: 1,
                categoryannoncevente: {},
                blogannonceventes_count: [],
                blogannonceventesactive_count: [],
                blogannonceventesunactive_count: [],
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
            getDate(item){
                return moment(item.created_at).format('YYYY-MM-DD')
            },

            blogannonceventes_countFormatter(blogannonceventes_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesactive_countFormatter(blogannonceventesactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesunactive_countFormatter(blogannonceventesunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            /** Ici c'est l'activation de la couleur  **/
            activeItem(id) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.get(route('activated_blogannonceventes.dashboard',id)).then(() => {
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
                dyaxios.get(route('unactivated_blogannonceventes.dashboard',id)).then(() => {
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

            loadItems(){
                dyaxios.get(route('api.blogannonceventes_dashboard_show',[this.$route.params.categoryannoncevente]))
                    .then(response => {
                        this.categoryannoncevente = response.data;
                        this.mydatatables();
                    });

                dyaxios.get(route('api.blogannonceventes_dashboard_count')).then(response => {
                    this.blogannonceventes_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_dashboardactive_count')).then(response => {
                    this.blogannonceventesactive_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_dashboardunactive_count')).then(response => {
                    this.blogannonceventesunactive_count = response.data;});
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
