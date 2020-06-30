<template>
   <div>
       <div class="row">
           <div class="col-lg-6 col-md-6 col-sm-6">
               <div class="card card-stats">
                   <div class="card-header card-header-warning card-header-icon">
                       <div class="card-icon">
                           <i class="material-icons">person_add</i>
                       </div>
                       <router-link :to="{ name: 'users.index'}">
                           <p class="card-category"><b v-if="users_count >= 2">Users</b><b v-else>User</b></p>
                       </router-link>
                       <h3 class="card-title"><b>{{data_countFormatter(users_count)}}</b></h3>
                   </div>
                   <div class="card-footer">
                       <div class="stats">
                           <i class="material-icons">person_add</i> <router-link :to="{ name: 'users.index'}"> Users</router-link>
                       </div>
                   </div>
               </div>
           </div>

           <div class="col-lg-6 col-md-6 col-sm-6">
               <div class="card card-stats">
                   <div class="card-header card-header-primary card-header-icon">
                       <div class="card-icon">
                           <i class="material-icons">how_to_reg</i>
                       </div>
                       <router-link :to="{ name: 'users.usersmod'}">
                           <p class="card-category"><b v-if="users_modcount >= 2">Users Moderators</b><b v-else>User Moderators</b></p>
                       </router-link>
                       <h3 class="card-title"><b>{{datamod_countFormatter(users_modcount)}}</b></h3>
                   </div>
                   <div class="card-footer">
                       <div class="stats">
                           <i class="material-icons">how_to_reg</i> <router-link :to="{ name: 'users.usersmod'}"> Users Moderators</router-link>
                       </div>
                   </div>
               </div>
           </div>

       </div>

       <div class="row">

           <div class="col-lg-6 col-md-6 col-sm-6">
               <div class="card card-stats">
                   <div class="card-header card-header-success card-header-icon">
                       <div class="card-icon">
                           <i class="material-icons">people_outline</i>
                       </div>
                       <router-link :to="{ name: 'users.userspro'}">
                           <p class="card-category"><b v-if="users_procount >= 2">Users Professionnels</b><b v-else>User Professionnels</b></p>
                       </router-link>
                       <h3 class="card-title"><b>{{dataactive_countFormatter(users_procount)}}</b></h3>
                   </div>
                   <div class="card-footer">
                       <div class="stats">
                           <i class="material-icons">people_outline</i><router-link :to="{ name: 'users.userspro'}"> Users Professionnels</router-link>
                       </div>
                   </div>
               </div>
           </div>

           <div class="col-lg-6 col-md-6 col-sm-6">
               <div class="card card-stats">
                   <div class="card-header card-header-danger card-header-icon">
                       <div class="card-icon">
                           <i class="material-icons">people</i>
                       </div>
                       <router-link :to="{ name: 'users.userspar'}">
                           <p class="card-category"><b v-if="users_parcount >= 2">Users Particuliers</b><b v-else>User Particulier</b></p>
                       </router-link>
                       <h3 class="card-title"><b>{{dataunactive_countFormatter(users_parcount)}}</b></h3>
                   </div>
                   <div class="card-footer">
                       <div class="stats">
                           <i class="material-icons">people</i> <router-link :to="{ name: 'users.userspar'}"> Users Particuliers</router-link>
                       </div>
                   </div>
               </div>
           </div>


       </div>

   </div>
</template>

<script>
    export default {
        name: "NavUserAdminStatistique",
        data() {
            return {
                users_count: [],
                users_procount: [],
                users_parcount: [],
                users_modcount: [],
            }
        },

        methods:{

            data_countFormatter(users_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(users_procount, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_procount)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_procount / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(users_parcount, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_parcount)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_parcount / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            datamod_countFormatter(users_modcount, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(users_modcount)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (users_modcount / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            loadItems(){
                dyaxios.get(route('api.users_count')).then(response => {
                    this.users_count = response.data;});

                dyaxios.get(route('api.users_procount')).then(response => {
                    this.users_procount = response.data;});

                dyaxios.get(route('api.users_parcount')).then(response => {
                    this.users_parcount = response.data;});

                dyaxios.get(route('api.users_modcount')).then(response => {
                    this.users_modcount = response.data;});
            },

        },

        created() {
            this.loadItems();
        }
    }
</script>

<style scoped>

</style>
