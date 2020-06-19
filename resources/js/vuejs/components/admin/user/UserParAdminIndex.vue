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
                                    <i class="material-icons">how_to_reg</i>
                                </div>
                                <p class="card-category">
                                    <b v-if="users_parcount >= 2">Users Particuliers</b><b v-else>User Particulier</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{dataunactive_countFormatter(users_parcount)}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">how_to_reg</i>
                                    <b v-if="users_parcount >= 2">Users Particuliers</b><b v-else>User Particulier</b>
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
                                            <b v-if="users_parcount >= 2">Users Particuliers</b><b v-else>User Particulier</b>
                                        </h4>
                                        <p class="card-title"> <b v-if="users_parcount >= 2">Users Particuliers</b><b v-else>User Particulier</b></p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">how_to_reg</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">


                                </div>


                                <div class="row">
                                    <div v-for="(item,index) in users" :key="index" class="col-sm-4 mx-auto">
                                        <div class="card card-profile">

                                            <div class="stats text-center">
                                                <button
                                                    @click="viewItem(item)"
                                                    class="btn btn-warning btn-just-icon btn-fill btn-sm"
                                                >
                                                    <i class="material-icons">visibility</i>
                                                </button>
                                                <router-link
                                                    v-if="$auth.can('manage-user')"
                                                    :to="{ name: 'users.edit', params: { id: item.id  } }"
                                                    class="btn btn-success btn-just-icon btn-fill btn-sm btn-wd"
                                                    title="Edit"
                                                >
                                                    <i class="material-icons">mode_edit</i>
                                                    <div class="ripple-container"></div>
                                                </router-link>
                                            </div>
                                            <div class="card-body">
                                                <div class="text-center">
                                                    <h6>
                                                        <span v-if="item.statusOnline" class="badge badge-success" title="User online">Online</span>
                                                        <span v-else class="badge badge-danger" title="User online">Offline</span>
                                                    </h6>

                                                    <h6>
                                                        <router-link v-if="item.status_profile" :to="{ name: 'users.userspro'}">
                                                            <span class="badge badge-success" title="User online">Professionnel</span>
                                                        </router-link>
                                                        <router-link v-else :to="{ name: 'users.userspar'}">
                                                            <span class="badge badge-rose" title="User online">Particulier</span>
                                                        </router-link>
                                                    </h6>

                                                </div>
                                                <h4 class="card-title">
                                                    <b>{{ item.first_name }} {{ item.last_name }}</b>
                                                </h4>
                                                <h4 class="card-title">
                                                    <b>{{ item.phone }}</b>
                                                </h4>
                                                <h4 class="card-title">
                                                    <b>Sex:</b>
                                                    {{ item.sex }}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                                            <span slot="no-more">:(</span>
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
    import NavUserAdminStatistique from "./inc/NavUserAdminStatistique";
    export default {
        components: {NavUserAdminStatistique},
        data() {
            document.title = `Dashboard users ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                users: [],
                users_parcount: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },

            dataunactive_countFormatter(users_parcount, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_parcount)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_parcount / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            infiniteHandler($state) {
                dyaxios.get(route('api.users_par'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.users.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },

            loadItems(){

                dyaxios.get(route('api.users_parcount')).then(response => {
                    this.users_parcount = response.data;});
            },

        },

        created() {
            this.loadItems();
        }


    }
</script>

<style scoped>

</style>
