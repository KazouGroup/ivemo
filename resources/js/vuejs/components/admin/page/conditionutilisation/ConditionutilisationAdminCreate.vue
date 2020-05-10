<template>
    <div class="main-panel" id="main-panel">
        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">New Condition utilisation</h2>
                <p class="title">{{this.form.title}}</p>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-body">

                            <form id="RegisterValidation" @submit.prevent="createItem()" role="form"
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
                                        <button v-if="$auth.can('manage-faq')" :disabled="form.busy" type="submit" class="btn btn-round btn-success btn-raised">
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
            document.title = `New Condition utilisation - Ivemo`;
            return {
                user: {},
                form: new Form({
                    id: '',
                    title: '',
                    ip: '',
                    body: '',
                    user_id: '',
                    status: '',
                    slug: ''
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
            createItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.busy = true;
                // Submit the form via a POST request
                this.form.post(route('conditionutilisations.store'))
                    .then(() => {

                        $.notify(
                            {
                                message: `Toutes les informations bien enregisté`,
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
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        },
        mounted() {
            //
        }
    }
</script>

<style scoped>

</style>
