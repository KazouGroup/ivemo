<template>
    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">

                <NavUserAdminStatistique/>

                <div class="row">
                    <div class="col-md-12 expo">
                        <div class="card card-stats">
                            <div :class="getColorCardUser()">
                                <div class="card-icon">
                                    <i class="material-icons">people</i>
                                </div>
                                <p class="card-category">
                                    <b v-if="users_modcount >= 2">Users Moderators</b><b v-else>User Moderators</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{datamod_countFormatter(users_modcount)}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">people</i>
                                    <b v-if="users_modcount >= 2">Users Moderators</b><b v-else>User Moderators</b>
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
                                            <b v-if="users_modcount >= 2">Users Moderators</b><b v-else>User Moderators</b>
                                        </h4>
                                        <p class="card-title"><b v-if="users_modcount >= 2">Users Moderators</b><b v-else>User Moderators</b></p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">people</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">


                                </div>

                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover"
                                           cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Profile</b></th>
                                            <th><b>Name</b></th>
                                            <th><b>Email</b></th>
                                            <th><b>Phone</b></th>
                                            <th><b>Role</b></th>
                                            <th class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th><b>Profile</b></th>
                                            <th><b>Name</b></th>
                                            <th><b>Email</b></th>
                                            <th><b>Phone</b></th>
                                            <th><b>Role</b></th>
                                            <th class="text-right"><b>Actions</b></th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(item,index) in users" :key="item.id">
                                            <td><img :src="item.avatar" :alt="item.username" style="width: 40px; height: 40px;  top: 15px; left: 15px; border-radius: 50%"></td>
                                            <td>
                                                <router-link  :to="{ path: `/dashboard/profile/${item.username}` }" title="Administrator Online">

                                                    <button v-if="item.statusOnline" type="button" class="btn btn-success btn-round btn-just-icon btn-sm"></button>
                                                    <button v-else="item.statusOnline" type="button" class="btn btn-danger btn-round btn-just-icon btn-sm"></button>

                                                    {{ (item.first_name.length > 15 ? item.first_name.substring(0,15)+ "..." : item.first_name) | upText }}
                                                </router-link>
                                            </td>
                                            <td><b>{{item.email}}</b></td>
                                            <td><b>{{item.phone}}</b></td>
                                            <td>
                                                <h6>
                                                            <span v-for="role in item.roles" :class="getRoleName(role)">
                                                                <b>{{role}}</b>
                                                            </span>
                                                </h6>
                                            </td>
                                            <td class="td-actions text-right">
                                                <!--<a href="javascript:void(0)" @click="getUser(item)" class="btn btn-link btn-warning btn-round btn-just-icon" title="View">
                                                    <i class="material-icons">visibility</i>
                                                </a>-->
                                                <button
                                                        class="btn btn-warning btn-sm btn-just-icon"
                                                        title="View">
                                                    <i class="material-icons">visibility</i>
                                                </button>
                                                <a href="#" class="btn btn-success btn-sm btn-just-icon" title="Edit">
                                                    <i class="material-icons">edit</i>
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

        <footer-admin/>

    </div>
</template>

<script>
    import NavUserAdminStatistique from "./inc/NavUserAdminStatistique";
    import LoaderLdsDefault from "./dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault, NavUserAdminStatistique},
        data() {
            document.title = `Dashboard moderators users ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                users: [],
                users_modcount: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            getRoleName(role) {
                if (role === 'super-admin') {
                    return 'badge badge-info';
                }
                if (role === 'admin') {
                    return 'badge badge-success';
                }
                if (role === 'visitor') {
                    return 'badge badge-secondary';
                }
                if (role === 'user') {
                    return 'badge badge-secondary';
                }
                if (role === 'editor') {
                    return 'badge badge-warning';
                }
                if (role === 'advertiser') {
                    return 'badge badge-danger';
                }
                if (role === 'moderator') {
                    return 'badge badge-primary';
                }
            },

            datamod_countFormatter(users_modcount, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_modcount)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_modcount / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            mydatatables(){
                $( function () {
                    $('#datatables').DataTable({
                        "pagingType": "full_numbers",
                        "lengthMenu": [
                            [10, 25, 50, -1],
                            [10, 25, 50, "All"]
                        ],
                        order: [[ 0, 'asc' ], [ 3, 'desc' ]],
                        responsive: true,
                        retrieve:true,
                        destroy: true,
                        colReorder: true,
                        language: {
                            search: "<i class='material-icons'>search</i>",
                            searchPlaceholder: "Search Record",
                        },
                        "sPaginationType": "full_numbers",

                    });
                });
            },

            loadItems() {
                //Start Progress bar
                this.$Progress.start();
                dyaxios.get(route('api.users_mod')).then(response => {
                    this.loaded = true;
                    this.users = response.data;
                    this.mydatatables();
                });

                dyaxios.get(route('api.users_modcount')).then(response => {
                    this.users_modcount = response.data;});

                //End Progress bar
                this.$Progress.finish();
            },
            reload(){
                this.loadItems()
            },

        },

        created() {
            this.loadItems();
        }


    }
</script>

<style scoped>

</style>
