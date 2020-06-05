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
                                    <i class="material-icons">settings</i>
                                </div>
                                <p class="card-category">
                                    <b>Permissions</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{roles.length}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">settings</i>
                                    <b>Permissions</b>
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
                                            <b>Roles</b>
                                        </h4>
                                        <p class="card-title">Roles</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">settings</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <button v-if="$auth.can('manage-role')" class="btn btn-primary btn-raised ">
                                            <span class="btn-label">
                                               <i class="material-icons">add</i>
                                           </span>
                                            <b class="title_hover">New Role</b>
                                        </button>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Role</b></th>
                                            <th><b>Permission</b></th>
                                            <th><b>Date</b></th>
                                            <th v-if="$auth.can('manage-role')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Role</th>
                                            <th>Permission</th>
                                            <th>Date</th>
                                            <th v-if="$auth.can('manage-role')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="item in roles" :key="item.id">
                                            <td>{{ item.name | upText }}</td>
                                            <td>
                                              <span v-for="permission in item.permissions" class="badge badge-success badge-pill">
                                                 {{permission}}
                                             </span>
                                            </td>
                                            <td><b>{{ item.created_at | dateAgo }}</b></td>
                                            <td v-if="$auth.can('manage-role')" class="text-right">
                                                <button
                                                        class="btn btn-info btn-sm btn-just-icon"
                                                        title="Editer"
                                                >
                                                    <i class="material-icons">edit</i>
                                                </button>
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

    import LoaderLdsDefault from "../../../dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard Roles ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                roles: {},
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

            deleteItem(id){
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
                        let url = route('roles.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                icon: "now-ui-icons ui-1_bell-53",
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
                dyaxios.get(route('api.roles')).then(response => {
                    this.loaded = true;
                    this.roles = response.data;
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
