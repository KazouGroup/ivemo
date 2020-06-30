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
                                        <p class="card-category"><b v-if="blogannoncelocations_count >= 1">Articles</b><b v-else>Article</b></p>
                                        <h3 class="card-title"><b>{{data_countFormatter(blogannoncelocations_count)}}</b></h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">view_headline</i> {{categoryannoncelocation.name || "Articles sur les annonces locations"}}
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
                                        <p class="card-category"><b v-if="blogannoncelocationsactive_count >= 1">Actives</b><b v-else>Active</b></p>
                                        <h3 class="card-title"><b>{{dataactive_countFormatter(blogannoncelocationsactive_count)}}</b></h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">done</i> Articles activated
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
                                        <p class="card-category"><b v-if="blogannoncelocationsunactive_count >= 1">Disactives</b><b v-else>Disactive</b></p>
                                        <h3 class="card-title"><b>{{dataunactive_countFormatter(blogannoncelocationsunactive_count)}}</b></h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">remove</i> Articles disactivated
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
                                            <b>{{categoryannoncelocation.name || "Articles sur les annonces locations"}}</b>
                                        </p>
                                        <h3 class="card-title" style="color:red;">
                                            <b>{{data_countFormatter(blogannoncelocations_count)}}</b>
                                        </h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">view_headline</i>
                                            <b>{{categoryannoncelocation.name || "Articles sur les annonces locations"}}</b>
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
                                                <b>{{categoryannoncelocation.name || "Articles sur les annonces locations"}}</b>
                                            </h4>
                                            <p class="card-title">{{categoryannoncelocation.name || "Articles sur les annonces locations"}}</p>
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
                                            <router-link  :to="{ name: 'blogannoncelocations.dashboard'}" class="btn btn-secondary btn-raised">
                                               <span class="btn-label">
                                                <i class="material-icons">keyboard_backspace</i>
                                              </span>
                                                <b class="title_hover">Back</b>
                                            </router-link>
                                            <a href="/blogs/annonce_locations/ab/new/" class="btn btn-primary btn-raised">
                                                   <span class="btn-label">
                                                       <i class="material-icons">add</i>
                                                  </span>
                                                <b class="title_hover">New category on renting</b>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="material-datatables">
                                        <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                            <thead>
                                            <tr>
                                                <th><b>Title</b></th>
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
                                                <th>Title</th>
                                                <th>User</th>
                                                <th>Category</th>
                                                <th>Status user</th>
                                                <th>Status admin</th>
                                                <th>Date</th>
                                                <th class="text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            <tr v-for="item in categoryannoncelocation.blogannoncelocations" :key="item.id">
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
                                                        <span v-if="item.status" class="badge badge-success">
                                                          <b>Active</b>
                                                        </span>
                                                        <span v-else class="badge badge-rose">
                                                        <b>Disactive</b>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="timeline-heading">
                                                        <span v-if="item.status_admin" class="badge badge-success">
                                                          <b>Active</b>
                                                        </span>
                                                        <span v-else class="badge badge-rose">
                                                        <b>Disactive</b>
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
    import LoaderLdsDefault from "../../user/dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard Articles de blogs locations ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                categoryannoncelocation: [],
                blogannoncelocations_count: [],
                blogannoncelocationsactive_count: [],
                blogannoncelocationsunactive_count: [],
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
            data_countFormatter(blogannoncelocations_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(blogannoncelocationsactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },
            getDate(item){
                return moment(item.created_at).format('YYYY-MM-DD')
            },

            /** Ici c'est l'activation  **/
            activeItem(id){
                Swal.fire({
                    title: 'Show or activate this article?',
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
            disableItem(id){
                Swal.fire({
                    title: 'Mask or unactivate this article?',
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

            loadItems(){
                let Itemslug = this.$route.params.categoryannoncelocation;
                dyaxios.get(route('api.blogannoncelocationsbycategory_dashboard_count',[Itemslug])).then(response => {
                    this.blogannoncelocations_count = response.data;});

                dyaxios.get(route('api.blogannoncelocationsbycategory_dashboardactive_count',[Itemslug])).then(response => {
                    this.blogannoncelocationsactive_count = response.data;});

                dyaxios.get(route('api.blogannoncelocationsbycategory_dashboardunactive_count',[Itemslug])).then(response => {
                    this.blogannoncelocationsunactive_count = response.data;});

                dyaxios.get(route('api.blogannoncelocations_dashboard_show',[Itemslug]))
                    .then(response => {
                        this.loaded = true;
                        this.categoryannoncelocation = response.data;
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
