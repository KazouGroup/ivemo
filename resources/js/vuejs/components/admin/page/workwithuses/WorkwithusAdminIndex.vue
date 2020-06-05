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
                                    <i class="material-icons">filter_hdr</i>
                                </div>
                                <p class="card-category">
                                    <b>Work with us</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{workwithuses.length}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">filter_hdr</i>
                                    <b>Work with us</b>
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
                                            <b>Work with us</b>
                                        </h4>
                                        <p class="card-title">Work with us</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">filter_hdr</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div v-if="$auth.can('manage-rh')" class="submit text-center">
                                        <router-link :to="{ name: 'workwithuses.create' }" class="btn btn-primary btn-raised">
                                      <span class="btn-label">
                                               <i class="material-icons">add</i>
                                           </span>
                                            <b class="title_hover">New offer</b>
                                        </router-link>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Title</b></th>
                                            <th><b>Category of Work</b></th>
                                            <th><b>City</b></th>
                                            <th><b>Status</b></th>
                                            <th><b>Postulant</b></th>
                                            <th><b>Date</b></th>
                                            <th v-if="$auth.can('manage-rh')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category of Work</th>
                                            <th>City</th>
                                            <th>Status</th>
                                            <th>Postulant</th>
                                            <th>Date</th>
                                            <th v-if="$auth.can('manage-rh')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(item,index) in workwithuses" :key="item.id">
                                            <td>
                                                <router-link :to="{ path: `/dashboard/workwithuses/c/${item.categoryworkwithus.slug}/${item.slug}/`  }">
                                                    {{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'work_with_uscategoryworkwithus.dashboard', params: { categoryworkwithus: item.categoryworkwithus.slug  } }">
                                                    <b v-if="item.categoryworkwithus_id">{{ (item.categoryworkwithus.name.length > 15 ? item.categoryworkwithus.name.substring(0,15)+ "..." : item.categoryworkwithus.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </router-link>
                                            </td>
                                            <td v-text="item.city.name"></td>
                                            <td>
                                                <div class="timeline-heading">
                                                    <span v-if="item.status" class="badge badge-success"><b>Active</b></span>
                                                    <span v-else-if="!item.status"  class="badge badge-rose"><b>Deactive</b></span>
                                                </div>
                                            </td>
                                            <td><b>{{item.contactworkwithuses_count}}</b></td>
                                            <td><b>{{ item.created_at | dateAgo }}</b></td>
                                            <td v-if="$auth.can('manage-rh')" class="text-right">
                                                <template>
                                                    <button @click="disableItem(item.id)" v-if="item.status" type="button"
                                                            class="btn btn-success btn-just-icon btn-sm"
                                                            title="Desactiver">
                                                        <i class="material-icons">done</i>
                                                    </button>
                                                    <button @click="activeItem(item.id)" v-else type="button"
                                                            class="btn btn-rose btn-just-icon btn-sm"
                                                            title="Activer">
                                                        <i class="material-icons">remove</i>
                                                    </button>
                                                </template>
                                                <router-link :to="{ name: 'workwithuses.edit', params: { id: item.id  } }" title="Editer" class="btn btn-info btn-sm btn-just-icon">
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

        <footer-admin/>

    </div>
</template>

<script>
    import LoaderLdsDefault from "../../../../dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard Work with ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                workwithuses: {},
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

            /** Ici c'est l'activation de la data  **/
            activeItem(id) {
                //Progress bar star
                this.$Progress.start();
                dyaxios.get(route('activated_workwithuses',id)).then(() => {
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
            /** Ici c'est la désactivation de la data **/
            disableItem(id) {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('unactivated_workwithuses',id)).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify(
                        {
                            message: `Data disactivated successfully`,
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

                    //End Progres bar
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

            deleteItem(item){
                Swal.fire({
                    title: 'Delete Data',
                    text: "Are you sure you want to delete this Data?",
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
                        let url = route('workwithuses.destroy',item.id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                message: "Data deleted Successfully"
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

                            let index = this.workwithuses.indexOf(item);
                            this.workwithuses.splice(index, 1);
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

            loadItems() {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('api.workwithuses')).then(response => {
                    this.loaded = true;
                    this.workwithuses = response.data;
                    this.mydatatables();
                });
                //End Progress bar
                this.$Progress.finish();
            },
            reload(){
                this.loadItems()
            },
        },

        created() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        },
    }
</script>

<style scoped>

</style>
