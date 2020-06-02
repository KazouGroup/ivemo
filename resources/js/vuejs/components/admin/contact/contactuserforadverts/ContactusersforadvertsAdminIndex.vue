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
                                        <i class="material-icons">forum</i>
                                    </div>
                                    <p class="card-category"><b>Messages</b></p>
                                    <h3 class="card-title"><b>{{data_countFormatter(contactforadverts_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">forum</i> Contacts from users for adverts
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
                                    <p class="card-category"><b>Red</b></p>
                                    <h3 class="card-title"><b>{{dataactive_countFormatter(contactforadvertsred_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">done</i> Red messages
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
                                    <p class="card-category"><b>Unred</b></p>
                                    <h3 class="card-title"><b>{{dataunactive_countFormatter(contactforadvertsunred_count)}}</b></h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">remove</i> Unred messages
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
                                        <i class="material-icons">forum</i>
                                    </div>
                                    <p class="card-category">
                                        <b>Contacts from users for adverts</b>
                                    </p>
                                    <h3 class="card-title" style="color:red;">
                                        <b>{{data_countFormatter(contactforadverts_count)}}</b>
                                    </h3>
                                </div>
                                <div class="card-footer">
                                    <div class="stats">
                                        <i class="material-icons">forum</i>
                                        <b>Contacts from users for adverts</b>
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
                                                <b>Contacts from users for adverts</b>
                                            </h4>
                                            <p class="card-title">Contacts from users for adverts</p>
                                        </div>
                                        <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">forum</i>
                                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="material-datatables">
                                        <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                            <thead>
                                            <tr>
                                                <th><b>Full name</b></th>
                                                <th><b>Email</b></th>
                                                <th><b>Phone</b></th>
                                                <th><b>Time</b></th>
                                                <th><b>Message</b></th>
                                                <th class="disabled-sorting text-right"><b>Actions</b></th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th><b>Full name</b></th>
                                                <th><b>Email</b></th>
                                                <th><b>Phone</b></th>
                                                <th><b>Time</b></th>
                                                <th><b>Message</b></th>
                                                <th class="disabled-sorting text-right"><b>Actions</b></th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            <tr v-for="item in contactusersadverts" :key="item.id">
                                                <td>
                                                    <template v-if="$auth.can('manage-blogs')">
                                                        <button @click="disableItem(item.id)" v-if="item.status_admin" type="button"
                                                                className="btn btn-link btn-secondary btn-just-icon btn-sm" title="Message lu">
                                                             <i className="material-icons">fiber_manual_record</i>
                                                        </button>
                                                        <button @click="activeItem(item.id)" v-else type="button"
                                                                className="btn btn-link btn-info btn-just-icon btn-sm" title="Nouveau message">
                                                             <i className="material-icons">fiber_manual_record</i>
                                                        </button>
                                                    </template>
                                                </td>
                                                <td>
                                                    {{ (item.email.length > 15 ? item.title.substring(0,15)+ "..." : item.email) | upText }}
                                                </td>
                                                <td> <b>{{item.phone}} </b> </td>
                                                <td> <b>{{item.time }} </b></td>
                                                <td><b>{{item.message}}</b></td>
                                                <td class="text-right">
                                                    <router-link :href="`/dashboard/contactuserforadverts/${item.slug}/view/`" target="_blank"
                                                       class="btn btn-warning btn-sm btn-just-icon"
                                                       title="View">
                                                        <i class="material-icons">visibility</i>
                                                    </router-link>
                                                    <button @click="deleteItem(item)"
                                                        class="btn btn-danger btn-sm btn-just-icon"
                                                        title="Delete">
                                                    <i class="material-icons">delete_forever</i>
                                                </button>
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
            document.title = `Dashboard Contacts from users for adverts ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                contactusersadverts: [],
                contactforadverts_count: [],
                contactforadvertsred_count: [],
                contactforadvertsunred_count: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter( contactforadverts_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs( contactforadverts_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return ( contactforadverts_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(contactforadvertsred_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(contactforadvertsred_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (contactforadvertsred_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter( contactforadvertsunred_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs( contactforadvertsunred_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return ( contactforadvertsunred_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

                    /** Ici c'est l'activation  **/
            activeItem(id){

                let url = route('personal_contactusersemployment_mails_active.site',id);
                dyaxios.get(url).then(() => {
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            },

            unactiveItem(id){

                //Envoyer la requet au server
                let url = route('personal_contactusersemployment_mails_unactive.site',id);
                dyaxios.get(url).then(() => {
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            },

            infiniteHandler($state) {
                dyaxios.get(route('api.blogannoncelocations_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.contactusersadverts.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },

            loadItems(){
                dyaxios.get(route('api.contactforadverts_dashboard_count')).then(response => {
                    this.contactforadverts_count = response.data;});

                dyaxios.get(route('api.contactforadverts_dashboardred_count')).then(response => {
                    this.contactforadvertsred_count = response.data;});

                dyaxios.get(route('api.contactforadverts_dashboardunred_count')).then(response => {
                    this.contactforadvertsunred_count = response.data;});
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
