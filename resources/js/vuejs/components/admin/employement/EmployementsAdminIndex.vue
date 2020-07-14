<template>


    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="card card-stats">
                            <div class="card-header card-header-warning card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">work</i>
                                </div>
                                <p class="card-category"><b v-if="employments_count >= 1">Posts</b><b v-else>Post</b></p>
                                <h3 class="card-title"><b>{{data_countFormatter(employments_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">work</i> Employments & Trainings
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
                                <p class="card-category"><b v-if="employmentsactive_count >= 1">Posts</b><b v-else>Post</b></p>
                                <h3 class="card-title"><b>{{dataactive_countFormatter(employmentsactive_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">done</i> Activated posts
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
                                <p class="card-category"><b v-if="employmentsunactive_count >= 1">Disactives</b><b v-else>Disactive</b></p>
                                <h3 class="card-title"><b>{{dataunactive_countFormatter(employmentsunactive_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">remove</i> Disactivated posts
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
                                    <i class="material-icons">work</i>
                                </div>
                                <p class="card-category">
                                    <b>Employments & Trainings</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{data_countFormatter(employments_count)}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">work</i>
                                    <b>Employments & Trainings</b>
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
                                            <b>Employments & Trainings</b>
                                        </h4>
                                        <p class="card-title">Employments & Trainings</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">work</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Title</b></th>
                                            <th><b>Category Work</b></th>
                                            <th><b>City</b></th>
                                            <th>Status user</th>
                                            <th>Status admin</th>
                                            <th><b>Date</b></th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category Work</th>
                                            <th>City</th>
                                            <th>Status user</th>
                                            <th>Status admin</th>
                                            <th>Date</th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(item,index) in employments" :key="item.id">
                                            <td>
                                                {{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'employments_show.dashboard', params: { categoryemployment: item.categoryemployment.slug  } }">
                                                    <b v-if="item.categoryemployment_id">{{ (item.categoryemployment.name.length > 15 ? item.categoryemployment.name.substring(0,15)+ "..." : item.categoryemployment.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <span>
                                                    <b v-if="item.city_id">{{ (item.city.name.length > 15 ? item.city.name.substring(0,15)+ "..." : item.city.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </span>
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
                                            <td><b>{{ item.created_at | dateAgo }}</b></td>
                                            <td v-if="$auth.can('manage-annonce-employements')" class="text-right">
                                                <template>
                                                    <button @click="disableItem(item.id)" v-if="item.status_admin" type="button"
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
                                                <a :href="`/employments/${item.categoryemployment.slug}/${item.city.slug}/${item.slug}/`" target="_blank"
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

        <footer-admin/>

    </div>
</template>

<script>
    export default {
        data() {
            document.title = `Dashboard Work with ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                employments: [],
                employments_count: [],
                employmentsactive_count: [],
                employmentsunactive_count: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter(employments_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(employmentsactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (employmentsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(employmentsunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (employmentsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
                        let url = route('activated_employments.dashboard',id);
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
                        let url = route('unactivated_employments.dashboard',id);
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
                dyaxios.get(route('api.employments_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.employments.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },

            loadItems(){
                dyaxios.get(route('api.employments_dashboard_count')).then(response => {
                    this.employments_count = response.data;});

                dyaxios.get(route('api.employments_dashboardactive_count')).then(response => {
                    this.employmentsactive_count = response.data;});

                dyaxios.get(route('api.employments_dashboardunactive_count')).then(response => {
                    this.employmentsunactive_count = response.data;});
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
