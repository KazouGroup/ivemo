<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">FAQS</h2>
                <p class="category">Toutes les données de la page faqs
                    <a target="_blank" href="https://fullcalendar.io/">FullCalendar.io</a>. Please checkout their
                    <a href="https://fullcalendar.io/docs/" target="_blank">full documentation</a>.</p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">DataTables.net</h4>
                        </div>
                        <div class="card-body">
                            <div class="toolbar">
                                <div class="header text-right">
                                    <button @click="reload" class="btn btn-success btn-raised button_note btn-sm"
                                            title="Refresh Page">
                                        <b class="title_hover">Refresh</b>
                                    </button>
                                </div>
                            </div>
                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category FAQS</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Title</th>
                                    <th>Category FAQS</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th class="disabled-sorting text-right">Actions</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                <tr v-for="item in faqs" :key="item.id">
                                    <td>{{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}</td>
                                    <td v-text="item.categoryfaq.name"></td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td class="text-right">
                                        <a href="#" class="btn btn-round btn-info btn-icon btn-sm like">
                                            <i class="fas fa-heart"></i>
                                        </a>
                                        <a href="#" class="btn btn-round btn-warning btn-icon btn-sm edit">
                                            <i class="far fa-calendar-alt"></i></a>
                                        <button @click="deleteItem(item.id)"  class="btn btn-round btn-danger btn-icon btn-sm remove">
                                            <i class="fas fa-times"></i>
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
            document.title = `Dashboard FAQS - Ivemo`;
            return {
                faqs: {},
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
                    title: 'Delete FAQS',
                    text: "Are you sure you want to delete this FAQ?",
                    type: 'warning',
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
                        let url = route('faqs.destroy',id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                icon: "now-ui-icons ui-1_bell-53",
                                message: "FAQ deleted Successfully"
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
                dyaxios.get(route('faqs.api')).then(response => {
                    this.loaded = true;
                    this.faqs = response.data;
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
