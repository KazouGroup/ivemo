<template>

    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                    <div class="card-icon">
                        <i class="material-icons">forum</i>
                    </div>
                    <p class="card-category"><b v-if="contactusersfaqs_count >= 1">Messages</b><b v-else>Message</b></p>
                    <h3 class="card-title"><b>{{data_countFormatter(contactusersfaqs_count)}}</b></h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">forum</i> Messages Contact FAQS
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
                    <p class="card-category"><b v-if="contactusersfaqsactive_count >= 1">Red</b><b v-else>Red</b></p>
                    <h3 class="card-title"><b>{{dataactive_countFormatter(contactusersfaqsactive_count)}}</b></h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">done</i> Red
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="card card-stats">
                <div class="card-header card-header-rose card-header-icon">
                    <div class="card-icon">
                        <i class="material-icons">remove</i>
                    </div>
                    <p class="card-category"><b v-if="contactusersfaqsunactive_count >= 1">Unred</b><b v-else>Unred</b></p>
                    <h3 class="card-title"><b>{{dataunactive_countFormatter(contactusersfaqsunactive_count)}}</b></h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">remove</i> Unred
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
