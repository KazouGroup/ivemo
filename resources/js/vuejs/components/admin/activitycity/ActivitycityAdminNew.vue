<template>
    <div class="main-panel" id="main-panel">

        <vue-progress-bar/>
        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">


                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">

                                <div class="toolbar">
                                    <div class="submit text-center">
                                        <router-link :to="{ name: 'activitycitiesnew_dashboard.dashboard' }" class="btn btn-primary btn-raised">
                                            <b class="title_hover">New activity</b>
                                        </router-link>
                                    </div>

                                </div>

                                <form id="RegisterValidation" @submit.prevent="storeactivitycitiesItem()" role="form"
                                      method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="labels">
                                                Title
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div class="form-group">
                                                <input v-model="form.title" type="text" minlength="5" maxlength="255" name="title" placeholder="Title policy" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }"/>
                                                <has-error :form="form" field="title"></has-error>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="labels">
                                                City
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div class="form-group">
                                                <select name="city_id" v-model="form.city_id" id="city_id" class="form-control"
                                                        :class="{ 'is-invalid': form.errors.has('city_id') }">
                                                    <option value="" disabled>Choose City</option>
                                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                                </select>
                                                <has-error :form="form" field="city_id"></has-error>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Description <span style="color:red;">*</span></label>
                                                <br>
                                                <quill-editor v-model="form.description"
                                                              :class="{ 'is-invalid': form.errors.has('description') }"
                                                              :options="editorOption">
                                                </quill-editor>
                                                <div class="form-check">
                                                    <label class="form-check-label pull-right">
                                                        You can use the
                                                        <a href="https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/" class="text-danger" target="_blank">
                                                            Markdown here
                                                        </a>
                                                        <span class="form-check-sign"></span>
                                                    </label>
                                                </div>
                                                <has-error :form="form" field="description"></has-error>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="submit">
                                        <div class="text-center">
                                            <router-link :to="{ name: 'activitycities.dashboard' }" class="btn btn-secondary btn-raised">
                                                <b class="title_hover">Annuler</b>
                                            </router-link>
                                            <button  :disabled="form.busy" type="submit" class="btn btn-success btn-raised">
                                                <b class="title_hover">Sauvegarder</b>
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                user: {},
                cities: {},
                editmode : true,
                form: new Form({
                    id: '',
                    title: '',
                    slug: '',
                    slugin: '',
                    description: '',
                    city_id: '',
                }),
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
                            [{ 'font': [] }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            ['bold', 'italic', 'underline'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{ 'align': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['clean']
                        ]
                    }
                }
            }
        },
        methods: {


            storeactivitycitiesItem() {
                this.$Progress.start();
                // Submit the form via a POST request
                this.form.post(route('activitycitiesstore_dashboard.dashboard')).then((response) => {

                    //Masquer le modal après la création
                    $('#addNew').modal('hide');

                    //Insertion de l'alert !
                    $.notify(
                        {
                            message: `Data created successfully`,
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'top',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInDown",
                                exit: "animated fadeOutUp"
                            },
                        });
                    //Fin insertion de l'alert !

                    window.location = response.data.redirect;
                    //End Progress bar
                    this.$Progress.finish();
                }).catch(() => {
                    //Failled message
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
            },


        },


        mounted() {
            dyaxios.get(route('api.all_cities')).then(({data}) => (this.cities = data));
        }
    }
</script>

<style scoped>

</style>
