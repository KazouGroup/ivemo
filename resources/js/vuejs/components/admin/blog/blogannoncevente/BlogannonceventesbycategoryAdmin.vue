<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header panel-header-sm">

        </div>

        <div class="content">

           <NavBlogannonceventesAdmin/>

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
                                            <th class="disabled-sorting text-right">Actions</th>
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
    import NavBlogannonceventesAdmin from "./NavBlogannonceventesAdmin";
    export default {
        components: {NavBlogannonceventesAdmin},
        data() {
            document.title = `Dashboard Articles de blogs ventes - Ivemo`;
            return {
                loaded: false,
                page: 1,
                categoryannoncevente: {},
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
            /** Ici c'est l'activation de la couleur  **/
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
            /** Ici c'est la désactivation de la couleur **/
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
                dyaxios.get(route('api.blogannonceventes_dashboard_show',[this.$route.params.categoryannoncevente]))
                    .then(response => {
                        this.loaded = true;
                        this.categoryannoncevente = response.data;
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
