<template>

    <div>
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-4">
                <div class="card card-stats">
                    <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">view_headline</i>
                        </div>
                        <p class="card-category"><b v-if="blogannoncelocations_count >= 1">Articles</b><b v-else>Article</b></p>
                        <h3 class="card-title"><b>{{data_countFormatter(blogannoncelocations_count)}}</b></h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">view_headline</i> Articles sur les annonces locations
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
                        <p class="card-category"><b v-if="blogannoncelocationsactive_count >= 1">Actives</b><b v-else>Active</b></p>
                        <h3 class="card-title"><b>{{dataactive_countFormatter(blogannoncelocationsactive_count)}}</b></h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">done</i> Articles actives
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
                        <p class="card-category"><b v-if="blogannoncelocationsunactive_count >= 1">Desactivés</b><b v-else>Desactivé</b></p>
                        <h3 class="card-title"><b>{{dataunactive_countFormatter(blogannoncelocationsunactive_count)}}</b></h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">remove</i> Articles désactivés
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
                            <i class="material-icons">view_headline</i>
                        </div>
                        <p class="card-category">
                            <b>Articles sur les annonces locations</b>
                        </p>
                        <h3 class="card-title" style="color:red;">
                            <b>{{data_countFormatter(blogannoncelocations_count)}}</b>
                        </h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">view_headline</i>
                            <b>Articles sur les annonces locations</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "NavBlogannoncelocationsAdmin",
        data() {
            return {
                blogannoncelocations_count: [],
                blogannoncelocationsactive_count: [],
                blogannoncelocationsunactive_count: [],
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter(blogannoncelocations_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(blogannoncelocationsactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },


            loadItems(){
                dyaxios.get(route('api.blogannoncelocations_dashboard_count')).then(response => {
                    this.blogannoncelocations_count = response.data;});

                dyaxios.get(route('api.blogannoncelocations_dashboardactive_count')).then(response => {
                    this.blogannoncelocationsactive_count = response.data;});

                dyaxios.get(route('api.blogannoncelocations_dashboardunactive_count')).then(response => {
                    this.blogannoncelocationsunactive_count = response.data;});
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
