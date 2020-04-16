<template>
    <div v-if="$auth.can('manage-faq')" class="main-panel" id="main-panel">

        <vue-progress-bar/>
        <navsmall-admin></navsmall-admin>

        <div class="panel-header">
            <div class="header text-center">
                <h2 class="title">Edition FAQS</h2>
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
                                    <router-link :to="{ name: 'faqs.create' }" class="btn btn-round btn-primary btn-raised">
                                       <span class="btn-label">
                                        <i class="now-ui-icons ui-1_simple-add"></i>
                                      </span>
                                        <b class="title_hover">New FAQS</b>
                                    </router-link>
                                </div>
                            </div>

                            <form id="RegisterValidation" @submit.prevent="updateItem()" role="form"
                                  method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating"></label>
                                            <input v-model="form.title" type="text" name="title" placeholder="Title Faq" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }"/>
                                            <has-error :form="form" field="title"></has-error>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating"></label>
                                            <select name="categoryfaq_id" v-model="form.categoryfaq_id" id="categoryfaq_id" class="form-control"
                                                    :class="{ 'is-invalid': form.errors.has('categoryfaq_id') }">
                                                <option value="" disabled>Choose Category</option>
                                                <option v-for="categories_faq in categories_faqs" :key="categories_faq.id" :value="categories_faq.id">{{categories_faq.name}}</option>
                                            </select>
                                            <has-error :form="form" field="categoryfaq_id"></has-error>
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
                                        <router-link :to="{ name: 'faqs.index' }" class="btn btn-round btn-danger">
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
            document.title = `Editer - Ivemo`;
            return {
                categories_faqs: {},
                user: {},
                form: new Form({
                    id: '',
                    title: '',
                    ip: '',
                    body: '',
                    categoryfaq: '',
                    categoryfaq_id:'',
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


            updateItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.busy = true;

                this.form.put(route('faqs.update',[this.form.id]))
                    .then(() => {

                        $.notify(
                            {
                                message: `Informations mise à jour avec succès`,
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

                        this.$router.push({ name: 'faqs.index' });
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
            axios.get(route('faqs.show',[ID])).then(({data}) => {
                this.loaded = true;
                this.form.fill(data);
            });
            dyaxios.get(route('api.categories_faqs')).then(({data}) => (this.categories_faqs = data));
            //End Progress bar
            this.$Progress.finish()

        }
    }
</script>

<style scoped>

</style>
