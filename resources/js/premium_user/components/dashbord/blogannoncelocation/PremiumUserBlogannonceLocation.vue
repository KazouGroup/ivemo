<template>
    <div class="main-panel">
        <vue-progress-bar />

        <navhorizontal-premium/>

        <div class="content">
            <div class="content">
                <div class="container-fluid">


                    <div v-if="loaded" class="row">
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
                                        <i class="material-icons">view_headline</i> Articles sur les annonces locations
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
                                    <p class="card-category"><b v-if="blogannoncelocationsunactive_count >= 1">Desactivés</b><b v-else>Desactivé</b></p>
                                    <h3 class="card-title"><b>{{dataunactive_countFormatter(blogannoncelocationsunactive_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">remove</i> Articles désactivés
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div v-if="loaded" class="row">
                        <div class="col-md-12 expo">
                            <div class="card card-stats">
                                <div :class="getColorCardUser()">
                                    <div class="card-icon">
                                        <i class="material-icons">view_headline</i>
                                    </div>
                                    <p class="card-category">
                                        <b>Articles sur les annonces locations</b>
                                    </p>
                                    <h3 class="card-title" style="color:red;">
                                        <b>{{blogannoncelocations_count}}</b>
                                    </h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">view_headline</i>
                                        <b>Articles sur les annonces locations</b>
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
                                            <router-link :to="{ name: 'blogannoncelocations_premium_create.dashboard',params: { user: user.slug }}" class="btn btn-primary btn-raised" id="button_hover">
                                                <i class="material-icons">add</i>
                                                <b class="title_hover">Poster un votre article sur la location</b>
                                            </router-link>
                                        </div>

                                    </div>
                                    <div class="material-datatables">
                                        <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                            <thead>
                                            <tr>
                                                <th><b>Image</b></th>
                                                <th><b>Titre</b></th>
                                                <th><b>Categorie</b></th>
                                                <th><b>Status</b></th>
                                                <th><b>Date</b></th>
                                                <th class="disabled-sorting text-right"><b>Actions</b></th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Image</th>
                                                <th>Titre</th>
                                                <th>Categorie</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th class="text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            <tr v-for="item in blogannoncelocations" :key="item.id">
                                                <td><img :src="item.photo" style="height: 50px; width: 80px;border-radius: 4px"></td>
                                                <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                                <td>
                                                    <router-link :to="{ name: 'blogannoncereservlocations_premium.dashboard',params: { user: item.slug }}">
                                                        <b>{{item.categoryannoncelocation.name}}</b>
                                                    </router-link>
                                                </td>
                                                <td>
                                                    <div class="timeline-heading">
                                                <span v-if="item.status" class="badge badge-success">
                                                  <b>Activé</b>
                                                </span>
                                                        <span v-else class="badge badge-rose">
                                                  <b>Deactivé</b>
                                                </span>
                                                    </div>
                                                </td>
                                                <td><b>{{item.created_at | dateAgo}}</b></td>
                                                <td class="text-right">
                                                    <button @click="unactiveItem(item.id)" v-if="item.status" type="button"
                                                            class="btn btn-success btn-just-icon btn-sm"
                                                            title="Desactiver">
                                                        <i class="material-icons">remove</i>
                                                    </button>
                                                    <button @click="activeItem(item.id)" v-else type="button"
                                                            class="btn btn-rose btn-just-icon btn-sm"
                                                            title="Activer">
                                                        <i class="material-icons">done</i>
                                                    </button>
                                                    <a :href="`/blogs/annonce_locations/${item.categoryannoncelocation.slug }/${format_date(item.created_at)}/${item.slug}/`" target="_blank"
                                                       class="btn btn-warning btn-sm btn-just-icon"
                                                       title="View"
                                                    >
                                                        <i class="material-icons">visibility</i>
                                                    </a>

                                                    <router-link :to="{ name: 'blogannoncelocations_premium_edit.dashboard',params: { blogannoncelocation: item.slugin }}"
                                                                 class="btn btn-info btn-sm btn-just-icon"
                                                                 title="Edit"
                                                    >
                                                        <i class="material-icons">edit</i>
                                                    </router-link>
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
        </div>

        <footer-admin/>

    </div>
</template>

<script>
    import moment from "moment";
    import LoaderLdsDefault from "../../inc/annimation/LoaderLdsDefault";

    const abbrev = ['', 'k', 'M', 'B', 'T'];
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}` ;
            return {
                loaded: false,
                blogannoncelocations: {user:[],categoryannoncelocation:[]},
                blogannoncelocations_count: [],
                blogannoncelocationsactive_count: [],
                blogannoncelocationsunactive_count: [],
            }
        },

        methods:{

            format_date(created_at){
                if (created_at) {
                    return moment(String(created_at)).format('YYYY-MM-DD')
                }
            },
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
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(blogannoncelocationsactive_count, precision) {
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            activeItem(id){
                Swal.fire({
                    title: 'Afficher cette article?',
                    text: "êtes vous sure de vouloir confirmer cette action?",
                    //type: 'warning',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Oui, confirmer',
                    cancelButtonText: 'Non, annuller',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        //Envoyer la requet au server
                        let url = route('blogannoncecategorylocationactive_site.site',id);
                        dyaxios.get(url).then(() => {

                            /** Alert notify bootstrapp **/
                            $.notify({
                                    message: "Cette articles est visible aux utilisateurs",
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

            unactiveItem(id){
                Swal.fire({
                    title: 'Masquer cette article?',
                    text: "êtes vous sure de vouloir confirmer cette action?",
                    //type: 'warning',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Oui, confirmer',
                    cancelButtonText: 'Non, annuller',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        //Envoyer la requet au server
                        let url = route('blogannoncecategorylocationunactive_site.site',id);
                        dyaxios.get(url).then(() => {

                            /** Alert notify bootstrapp **/
                            $.notify({
                                    message: "Cette article a été masquée aux utilisateurs",
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

            deleteItem(item) {
                Swal.fire({
                    title: 'Confirmer la supression?',
                    text: "êtes-vous sûr de vouloir executer cette action",
                    //type: 'warning',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Oui, confirmer',
                    cancelButtonText: 'Non, annuller',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {
                        //Start Progress bar
                        this.$Progress.start();

                        let index = this.blogannoncelocations.indexOf(item);
                        this.blogannoncelocations.splice(index, 1);

                        const url = route('blogannoncecategorylocationdelete_site',[item.id]);
                        //Envoyer la requet au server
                        dyaxios.delete(url).then(() => {

                            /** Alert notify bootstrapp **/
                            $.notify({
                                    // title: 'Update',
                                    message: 'Articles suprimée avec success'
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
                            /** End alert ***/
                            this.$Progress.finish();

                            Fire.$emit('ItemGetter');

                        }).catch(() => {
                            //Failled message
                            $.notify("Ooop! Une erreur est survenue", {
                                allow_dismiss: false,
                                type: 'danger',
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                }
                            });
                        })
                    }
                });
            },

            loadItems(){

                this.$Progress.start();
                let itemuser = this.$route.params.user;
                let url = route('api.blogannoncelocations_premium',[itemuser]);
                dyaxios.get(url).then(response => {
                    this.loaded = true;
                    this.blogannoncelocations = response.data;
                    this.mydatatables();
                    this.$Progress.finish();
                });

                dyaxios.get(route('api.blogannoncelocations_premium_count',[itemuser])).then(response => {
                    this.blogannoncelocations_count = response.data;});

                dyaxios.get(route('api.blogannoncelocations_premiumactive_count',[itemuser])).then(response => {
                    this.blogannoncelocationsactive_count = response.data;});

                dyaxios.get(route('api.blogannoncelocations_premiumunactive_count',[itemuser])).then(response => {
                    this.blogannoncelocationsunactive_count = response.data;});
            }

        },

        mounted() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        }
    }
</script>

<style scoped>

</style>
