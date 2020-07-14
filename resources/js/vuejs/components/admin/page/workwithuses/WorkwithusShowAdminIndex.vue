<template>


    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">
                <div v-if="loaded" class="row">
                    <div class="col-md-12 expo">
                        <div class="card card-stats">
                            <div :class="getColorCardUser()">
                                <div class="card-icon">
                                    <i class="material-icons">filter_hdr</i>
                                </div>
                                <p class="card-category">
                                    <b>{{workwithusesbyc.title}}</b>
                                </p>
                                <h3 class="card-title" style="color:red;">
                                    <b>{{workwithusesbyc.contactworkwithuses_count}}</b>
                                </h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">filter_hdr</i>
                                    <b>{{workwithusesbyc.title}}</b>
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
                                            <b>{{workwithusesbyc.title}}</b>
                                        </h4>
                                        <p class="card-title">{{workwithusesbyc.title}}</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">filter_hdr</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <router-link  :to="{ name: 'workwithuses.index'}" class="btn btn-secondary btn-raised">
                                               <span class="btn-label">
                                                <i class="material-icons">keyboard_backspace</i>
                                              </span>
                                            <b class="title_hover">Back</b>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 v-if="workwithusesbyc.contactworkwithuses_count >= 1" class="text-center">Message postulant</h3>
                        <h3 v-else class="text-center">Pas de postulant</h3>

                        <div class="row">

                            <div v-for="(item,index) in workwithusesbyc.contactworkwithuses" :key="item.id" class="col-md-4 mx-auto">
                                <div class="card card-product">
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            <b> {{item.full_name}}</b>
                                        </h4>
                                        <h6 class="card-title">
                                            <b> {{item.workwithus.city.name}}</b>
                                        </h6>
                                        <div class="submit text-center">
                                            <router-link  :to="{ name: 'workwithuses.index'}" class="btn btn-secondary btn-raised">
                                               <span class="btn-label">
                                                <i class="material-icons">keyboard_backspace</i>
                                              </span>
                                                <b class="title_hover">Back</b>
                                            </router-link>
                                            <template v-if="$auth.can('manage-rh')">
                                                <button @click="disableItem(item.id)" v-if="item.status_red" type="button" class="btn btn-success btn-raised">
                                      <span class="btn-label">
                                               <i class="material-icons">done</i>
                                           </span>

                                                    <b class="title_hover">Contacter</b>
                                                </button>
                                                <button v-else type="button" @click="activeItem(item.id)" class="btn btn-danger btn-raised">
                                      <span class="btn-label">
                                               <i class="material-icons">remove</i>
                                           </span>
                                                    <b class="title_hover">Non contacter</b>
                                                </button>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="price">
                                            <h4><b>{{item.phone}}</b></h4>
                                        </div>
                                        <div class="stats">
                                            <p class="card-category"><i class="material-icons">mail</i>  {{item.email}}</p>
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
    import LoaderLdsDefault from "../../user/dashboard_user/components/inc/annimation/LoaderLdsDefault";
    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard Work with ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                loaded: false,
                workwithusesbyc: {contactworkwithuses:[]},
            }
        },

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },

            /** Ici c'est l'activation  **/
            activeItem(id){
                Swal.fire({
                    title: 'Vous confirmer avoir contacter cette utilisateur?',
                    text: "Ete vous sure d'avoir contacter cette utilisateure?",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes, confirm',
                    cancelButtonText: 'No, cancel',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        this.$Progress.start();
                        //Envoyer la requet au server
                        let url = route('activated_contactworkwithus',id);
                        dyaxios.get(url).then(() => {
                            this.$Progress.finish();
                            Fire.$emit('ItemGetter');
                        }).catch(() => {
                            //Failled message
                            $.notify("Ooop! Something wrong. Try later", {
                                type: 'danger',
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                }
                            });
                        })
                    }
                })

            },
            /** Ici c'est la désactivation **/
            disableItem(id){
                Swal.fire({
                    title: 'Vous confirmer annuler la procedure?',
                    text: "Ete vous sure de ne pas avoir contacter cette utilisateure?",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes, confirm',
                    cancelButtonText: 'No, cancel',
                    showCancelButton: true,
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                        this.$Progress.start();
                        //Envoyer la requet au server
                        let url = route('unactivated_contactworkwithus',id);
                        dyaxios.get(url).then(() => {
                            //End Progress bar
                            this.$Progress.finish();
                            Fire.$emit('ItemGetter');
                        }).catch(() => {
                            //Failled message
                            $.notify("Ooop! Something wrong. Try later", {
                                type: 'danger',
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                }
                            });
                        })
                    }
                })

            },

            deleteItem(item){
                Swal.fire({
                    title: 'Delete Data',
                    text: "Are you sure you want to delete this Data?",
                    animation: false,
                    customClass: 'animated pulse',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        //Start Progress bar
                        this.$Progress.start();

                        //Envoyer la requete au server
                        let url = route('workwithuses.destroy',item.id);
                        dyaxios.delete(url).then(() => {
                            /** Alert notify bootstrapp **/
                            $.notify({
                                message: "Data deleted Successfully"
                            }, {
                                allow_dismiss: false,
                                type: 'success',
                                placement: {
                                    from: 'top',
                                    align: 'right'
                                }
                            });
                            /* End alert ***/
                            //End Progress bar
                            this.$Progress.finish();
                            Fire.$emit('ItemGetter');
                        }).catch(() => {
                            this.$Progress.fail();
                            //Alert error
                            $.notify("Ooop! Something wrong. Try later", {
                                type: 'danger',
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                }
                            });
                        })
                    }
                })
            },

            loadItems() {
                //Start Progress bar
                let Itemcategoryworkwithus = this.$route.params.categoryworkwithus;
                let Itemworkwithus = this.$route.params.workwithus;
                this.$Progress.start();
                dyaxios.get(route('api.work_with_usworkwithus.show',[Itemcategoryworkwithus,Itemworkwithus])).then(response => {
                    this.loaded = true;
                    this.workwithusesbyc = response.data;
                });
                //End Progress bar
                this.$Progress.finish();
            },

            reload(){
                this.loadItems()
            },
        },

        created() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        },
    }
</script>

<style scoped>

</style>
