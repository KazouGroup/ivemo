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
                                    <i class="material-icons">emoji_transportation</i>
                                </div>
                                <p class="card-category"><b v-if="activitycity_count >= 1">Posts</b><b v-else>Post</b></p>
                                <h3 class="card-title"><b>{{data_countFormatter(activitycity_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">emoji_transportation</i> Activity cities
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
                                <p class="card-category"><b v-if="activitycityactive_count >= 1">Posts</b><b v-else>Post</b></p>
                                <h3 class="card-title"><b>{{dataactive_countFormatter(activitycityactive_count)}}</b></h3>
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
                                <p class="card-category"><b v-if="activitycityunactive_count >= 1">Disactives</b><b v-else>Disactive</b></p>
                                <h3 class="card-title"><b>{{dataunactive_countFormatter(activitycityunactive_count)}}</b></h3>
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
                                    <i class="material-icons">emoji_transportation</i>
                                </div>
                                <p class="card-category">
                                    <b>Activity cities</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{data_countFormatter(activitycity_count)}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">emoji_transportation</i>
                                    <b>Activity cities</b>
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
                                            <b>Activity cities</b>
                                        </h4>
                                        <p class="card-title">Activity cities</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">emoji_transportation</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <router-link :to="{ name: 'activitycitiesnew_dashboard.dashboard' }" class="btn btn-primary btn-raised">
                                            <b class="title_hover">New activity</b>
                                        </router-link>
                                    </div>

                                </div>
                                <div class="material-datatables">
                                    <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th><b>Title</b></th>
                                            <th><b>City</b></th>
                                            <th><b>Image</b></th>
                                            <th><b>Contacts</b></th>
                                            <th><b>Comments</b></th>
                                            <th><b>Vus</b></th>
                                            <th><b>Likes</b></th>
                                            <th><b>Status user</b></th>
                                            <th><b>Date</b></th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="disabled-sorting text-right"><b>Actions</b></th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Title</th>
                                            <th>City</th>
                                            <th>Images</th>
                                            <th>Contacts</th>
                                            <th>Comments</th>
                                            <th>Vus</th>
                                            <th>Likes</th>
                                            <th>Status user</th>
                                            <th>Date</th>
                                            <th v-if="$auth.can('manage-annonce-employements')" class="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        <tr v-for="(item,index) in activitycities" :key="item.id">
                                            <td>
                                                {{ (item.title.length > 15 ? item.title.substring(0,15)+ "..." : item.title) | upText }}
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycitiesbycity_dashboard.dashboard', params: { city: item.city.slug  } }">
                                                    <b v-if="item.city_id">{{ (item.city.name.length > 15 ? item.city.name.substring(0,15)+ "..." : item.city.name) | upText }}</b>
                                                    <b v-else>user don't exist</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countuploadimages }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countcontactservices }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countcomments }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.visits_count }}</b>
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'activitycityshow.dashboard', params: { activitycity: item.slugin  } }">
                                                    <b>{{ item.countlikes }}</b>
                                                </router-link>
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
                                            <td><b>{{ item.created_at | dateAgo }}</b></td>
                                            <td v-if="$auth.can('manage-annonce-employements')" class="text-right">
                                                <a  class="btn btn-warning btn-sm btn-just-icon"
                                                    target="_blank" title="Voir"
                                                    :href="`/city/${item.city.slug}/a/${item.slug}/`">
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
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                page: 1,
                activitycities: [],
                activitycity_count: [],
                activitycityactive_count: [],
                activitycityunactive_count: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter(activitycity_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(activitycity_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (activitycity_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(activitycityactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(activitycityactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (activitycityactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(activitycityunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(activitycityunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (activitycityunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },


            infiniteHandler($state) {
                dyaxios.get(route('api.apiactivitycities_dashboard'), {
                    params: {
                        page: this.page,
                    },
                }).then(response => {
                    if (response.data.length) {
                        this.page += 1;
                        this.activitycities.push(...response.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },

        },

        created() {
            dyaxios.get(route('api.activitycities_dashboard_count')).then(response => {
                this.activitycity_count = response.data;});

            dyaxios.get(route('api.activitycities_dashboardactive_count')).then(response => {
                this.activitycityactive_count = response.data;});

            dyaxios.get(route('api.activitycities_dashboardunactive_count')).then(response => {
                this.activitycityunactive_count = response.data;});
        }
    }
</script>

<style scoped>

</style>
