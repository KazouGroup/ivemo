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
                                        <i class="now-ui-icons ui-1_email-85"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right">
                                    <h3 class="info-title">{{data_countFormatter(contactusersfaqs_count)}}</h3>
                                    <h6 class="stats-title">Messages</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons ui-1_email-85"></i> Messages
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
                                    <h3 class="info-title">{{dataactive_countFormatter(contactusersfaqsactive_count)}}</h3>
                                    <h6 class="stats-title">red</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons ui-1_check"/> Messages red
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
                                    <h3 class="info-title">{{dataunactive_countFormatter(contactusersfaqsunactive_count)}}</h3>
                                    <h6 class="stats-title">Unred</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card-footer ">
                    <div class="stats">
                        <i class="now-ui-icons ui-1_simple-delete"/> Messages unred
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavContactusersfaqsAdmin",
        data() {
            return {
                contactusersfaqs_count: [],
                contactusersfaqsactive_count: [],
                contactusersfaqsunactive_count: [],
            }
        },

        methods:{
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
                dyaxios.get(route('apicontactusersfaqs_dashboard_count')).then(response => {
                    this.contactusersfaqs_count = response.data;});

                dyaxios.get(route('apicontactusersfaqs_dashboardactive_count')).then(response => {
                    this.contactusersfaqsactive_count = response.data;});

                dyaxios.get(route('apicontactusersfaqs_dashboardunactive_count')).then(response => {
                    this.contactusersfaqsunactive_count = response.data;});
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
