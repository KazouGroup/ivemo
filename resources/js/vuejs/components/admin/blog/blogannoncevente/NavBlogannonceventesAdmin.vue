<template>
    <div class="row">
        <div class="col-lg-4 col-sm-6">
            <div class="card card-stats">
                <div class="card-body ">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-primary icon-circle">
                                        <i class="now-ui-icons text_align-center"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right">
                                    <h3 class="info-title">{{blogannonceventes_countFormatter(blogannonceventes_count || "")}}</h3>
                                    <h6 class="stats-title">Articles</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons text_align-center"></i> Articles blogs
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-sm-6">
            <div class="card card-stats">
                <div class="card-body ">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-success icon-circle">
                                        <i class="now-ui-icons ui-1_check"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right">
                                    <h3 class="info-title">{{blogannonceventesactive_countFormatter(blogannonceventesactive_count)}}</h3>
                                    <h6 class="stats-title">Actives</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons ui-1_check"/> Articles actives visible site
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-sm-6">
            <div class="card card-stats">
                <div class="card-body ">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-danger icon-circle">
                                        <i class="now-ui-icons ui-1_simple-delete"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right">
                                    <h3 class="info-title">{{blogannonceventesunactive_countFormatter(blogannonceventesunactive_count)}}</h3>
                                    <h6 class="stats-title">Unactives</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons ui-1_simple-delete"/> Articles unactives
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                blogannonceventes_count: [],
                blogannonceventesactive_count: [],
                blogannonceventesunactive_count: [],
            }
        },

        methods:{
            blogannonceventes_countFormatter(blogannonceventes_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesactive_countFormatter(blogannonceventesactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            blogannonceventesunactive_countFormatter(blogannonceventesunactive_count, precision) {
                const abbrev = ['', 'k', 'M', 'B', 'T'];
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

        },

        created() {
            dyaxios.get(route('api.blogannonceventes_dashboard_count')).then(response => {
                this.blogannonceventes_count = response.data;});

            dyaxios.get(route('api.blogannonceventes_dashboardactive_count')).then(response => {
                this.blogannonceventesactive_count = response.data;});

            dyaxios.get(route('api.blogannonceventes_dashboardunactive_count')).then(response => {
                this.blogannonceventesunactive_count = response.data;});
        }
    }
</script>

<style scoped>

</style>
