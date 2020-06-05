<template>

    <div class="main-panel">
        <vue-progress-bar />

        <admin-horizontalenavusersite/>

        <div class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header card-header-primary">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="card-title">
                                            <b>{{this.form.title || "Licence site"}}</b>
                                        </h4>
                                        <p class="card-title">{{this.form.title || "Licence site"}}</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">description</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">

                                </div>

                                <form id="RegisterValidation" @submit.prevent="createItem()" role="form"
                                      method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="labels">
                                                Title 
                                                <span class="text-danger">*</span>
                                            </label>
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
                                            <router-link :to="{ name: 'licencesites.index' }" class="btn btn-danger">
                                                <b class="title_hover">Cancel</b>
                                            </router-link>
                                            <button  :disabled="form.busy" type="submit" class="btn btn-success btn-raised">
                                                <b class="title_hover">Save</b>
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

        <footer-admin/>

    </div>

</template>

<script>
    export default {
        data() {
            document.title = `New Licence site ${this.user.first_name || this.name_site} - ${this.name_site}`;
            return {
                user: {},
                form: new Form({
                    id: '',
                    title: '',
                    body: '',
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
                this.form.post(route('licencesites.store'))
                    .then(() => {

                        $.notify(
                            {
                                message: `Informations saved successfully`,
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

                        this.$router.push({ name: 'licencesites.index' });
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
