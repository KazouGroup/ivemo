<template>
    <div class="main-panel" id="main-panel">

        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">Edition Condition utilisation</h2>
                <p class="title">{{this.form.title}}</p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-body">
                            <div class="toolbar">
                                <div class="submit text-center">
                                    <router-link :to="{ name: 'conditionutilisations.create' }" class="btn btn-round btn-primary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New Condition utilisation</b>
                                    </router-link>
                                </div>
                            </div>

                            <form id="RegisterValidation" @submit.prevent="updateItem()" role="form"
                                  method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating"></label>
                                            <input v-model="form.title" type="text" minlength="5" maxlength="255" name="title" placeholder="Title policy" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }"/>
                                            <has-error :form="form" field="title"></has-error>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Description <span style="color:red;">*</span></label>
                                            <br>
                                            <quill-editor v-model="form.body"
                                                          :class="{ 'is-invalid': form.errors.has('body') }"
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
                                            <has-error :form="form" field="body"></has-error>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="submit">
                                    <div class="text-center">
                                        <router-link :to="{ name: 'conditionutilisations.index' }" class="btn btn-round btn-danger">
                                            <b class="title_hover">Annuler</b>
                                        </router-link>
                                        <button  :disabled="form.busy" type="submit" class="btn btn-success btn-round btn-raised">
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


        <footer-admin></footer-admin>
    </div>
</template>

<script>
    export default {
        data() {
            document.title = `Condition utilisation - Ivemo`;
            return {
                user: {},
                form: new Form({
                    id: '',
                    title: '',
                    body: ''
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


            updateItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.busy = true;

                this.form.put(route('conditionutilisations.update',[this.form.id]))
                    .then(() => {

                        $.notify(
                            {
                                message: `Toutes les informations ont été mise à jour`,
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

                        this.$router.push({ name: 'conditionutilisations.index' });
                        //End Progress bar
                        this.$Progress.finish();
                    }).catch(() => {
                    //Failled message
                    this.$Progress.fail();
                    //Alert
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

            this.$Progress.start();
            let ID = this.$route.params.id;
            dyaxios.get(route('conditionutilisations.show',[ID])).then(({data}) => {
                this.loaded = true;
                this.form.fill(data);
            });
            this.$Progress.finish();

        }
    }
</script>

<style scoped>

</style>
