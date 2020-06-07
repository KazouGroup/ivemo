<template>
    <div v-if="$auth.can('manage-signal')" class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">Annonces locations signaler</h2>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">



                            <div class="toolbar">
                                <div class="submit text-center" >

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <footer-admin></footer-admin>
    </div>
</template>

<script>

    export default {
        data() {
            document.title = `Dashboard annonces locations signalées  - Ivemo`;
            return {
                page: 1,
                signalannoncelocation: [],
            }
        },

        methods:{

            //infiniteHandler($state) {
            //    dyaxios.get(route('api.signalannoncelocations'), {
            //        params: {
            //            page: this.page,
            //        },
            //    }).then(response => {
            //        if (response.data.length) {
            //            this.page += 1;
            //            this.signalannoncelocations.push(...response.data);
            //            $state.loaded();
            //        } else {
            //            $state.complete();
            //        }
            //    });
            //},
        },


        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$Progress.start();
                dyaxios.get(route('api.signalannoncelocations_annoncelocation',[vm.$route.params.annoncelocation])).then(response => {
                    vm.signalannoncelocation = response.data.data
                });
                vm.$Progress.finish();
            });
        }
    }
</script>

<style scoped>

</style>
