<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">Roles</h2>
                <p class="text-white">All roles are
                    <a href="#"><b>{{ roles.length }}</b></a></p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="toolbar">
                                <div class="submit text-center">
                                    <button v-if="$auth.can('manage-role')" class="btn btn-primary btn-round btn-raised ">
                                           <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New Role</b>
                                    </button>
                                </div>
                            </div>
                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th><b>Name</b></th>
                                    <th><b>Permissions</b></th>
                                    <th v-if="$auth.can('manage-role')" class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Permissions</th>
                                    <th v-if="$auth.can('manage-role')" class="disabled-sorting text-right">Actions</th>
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

                                    <td v-if="$auth.can('manage-role')" class="text-right">
                                        <button @click="editItem(item)"
                                                class="btn btn-info btn-icon btn-sm btn-round" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="deleteItem(item.id)"  class="btn btn-danger btn-icon btn-sm btn-round remove">
                                            <i class="fas fa-trash-alt"></i>
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


        <footer-admin></footer-admin>
    </div>
</template>

<script>

    export default {
        data() {
            document.title = `Dashboard Roles - Ivemo`;
            return {
                roles: {},
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
