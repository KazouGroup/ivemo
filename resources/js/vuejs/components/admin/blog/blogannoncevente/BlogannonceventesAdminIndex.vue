<template>
    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="content">
                <div class="container-fluid">


                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="card card-stats">
                                <div class="card-header card-header-warning card-header-icon">
                                    <div class="card-icon">
                                        <i class="material-icons">view_headline</i>
                                    </div>
                                    <p class="card-category"><b v-if="blogannonceventes_count >= 1">Articles</b><b v-else>Article</b></p>
                                    <h3 class="card-title"><b>{{data_countFormatter(blogannonceventes_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">view_headline</i> Articles sur les annonces ventes
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="card card-stats">
                                <div class="card-header card-header-success card-header-icon">
                                    <div class="card-icon">
                                        <i class="material-icons">done</i>
                                    </div>
                                    <p class="card-category"><b v-if="blogannonceventesactive_count >= 1">Actives</b><b v-else>Active</b></p>
                                    <h3 class="card-title"><b>{{dataactive_countFormatter(blogannonceventesactive_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">done</i> Articles actives
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="card card-stats">
                                <div class="card-header card-header-danger card-header-icon">
                                    <div class="card-icon">
                                        <i class="material-icons">remove</i>
                                    </div>
                                    <p class="card-category"><b v-if="blogannonceventesunactive_count >= 1">Desactivés</b><b v-else>Desactivé</b></p>
                                    <h3 class="card-title"><b>{{dataunactive_countFormatter(blogannonceventesunactive_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">remove</i> Articles désactivés
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-12 expo">
                            <div class="card card-stats">
                                <div :class="getColorCardUser()">
                                    <div class="card-icon">
                                        <i class="material-icons">view_headline</i>
                                    </div>
                                    <p class="card-category">
                                        <b>Articles sur les annonces reservations</b>
                                    </p>
                                    <h3 class="card-title" style="color:red;">
                                        <b>{{data_countFormatter(blogannonceventes_count)}}</b>
                                    </h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">view_headline</i>
                                        <b>Articles sur les annonces ventes</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div :class="getColorHeaderUser()">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title">
                                                <b>Articles sur les annonces ventes</b>
                                            </h4>
                                            <p class="card-title">Articles sur les annonces ventes</p>
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
                                            <a href="/blogs/annonce_ventes/ab/new/" class="btn btn-primary btn-raised">
                                                   <span class="btn-label">
                                                       <i class="material-icons">add</i>
                                                  </span>
                                                <b class="title_hover">New article de blog vente</b>
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
                                            <tr v-for="item in blogannonceventes" :key="item.id">
                                                <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                                <td>
                                                    <b v-if="item.user_id">{{ (item.user.first_name.length > 15 ? item.user.first_name.substring(0,15)+ "..." : item.user.first_name) | upText }}</b>
                                                    <b v-else>user deleted</b>
                                                </td>
                                                <td>
                                                    <router-link :to="{ name: 'blogannonceventes_show.dashboard', params: { categoryannoncevente: item.categoryannoncevente.slug  } }">
                                                        <b v-if="item.categoryannoncevente_id">{{ (item.categoryannoncevente.name.length > 15 ? item.categoryannoncevente.name.substring(0,15)+ "..." : item.categoryannoncevente.name) | upText }}</b>
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
                                                    <a :href="`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${getDate(item)}/${item.slug}/`" target="_blank"
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
    export default {
        data() {
            document.title = `Dashboard Articles de blogs ventes ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                blogannonceventes: [],
                blogannonceventes_count: [],
                blogannonceventesactive_count: [],
                blogannonceventesunactive_count: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter(blogannonceventes_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(blogannonceventesactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(blogannonceventesunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
                        let url = route('activated_blogannonceventes.dashboard',id);
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
                        let url = route('unactivated_blogannonceventes.dashboard',id);
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
                dyaxios.get(route('api.blogannonceventes_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.blogannonceventes.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },
            loadItems(){
                dyaxios.get(route('api.blogannonceventes_dashboard_count')).then(response => {
                    this.blogannonceventes_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_dashboardactive_count')).then(response => {
                    this.blogannonceventesactive_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_dashboardunactive_count')).then(response => {
                    this.blogannonceventesunactive_count = response.data;});
            },

            intervalFetchData: function () {
                setInterval(() => {
                    this.loadItems();
                }, 10000);
            },
        },

        created() {
            this.intervalFetchData();
        }

    }
</script>

<style scoped>

</style>
