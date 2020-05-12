<template>
    <div class="main-panel">
        <vue-progress-bar />

        <navhorizontal-premium/>

        <div class="content">
            <div class="container-fluid">

                <div v-if="loaded" class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="card card-stats">
                            <div class="card-header card-header-warning card-header-icon">
                                <div class="card-icon">
                                    <i class="material-icons">view_headline</i>
                                </div>
                                <p class="card-category"><b v-if="blogannonceventes_count >= 1">Articles</b><b v-else>Article</b></p>
                                <h3 class="card-title"><b>{{data_countFormatter(blogannonceventes_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">view_headline</i> Articles sur les annonces ventes
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
                                <p class="card-category"><b v-if="blogannonceventesactive_count >= 1">Actives</b><b v-else>Active</b></p>
                                <h3 class="card-title"><b>{{dataactive_countFormatter(blogannonceventesactive_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">done</i> Articles actives
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
                                <p class="card-category"><b v-if="blogannonceventesunactive_count >= 1">Desactivés</b><b v-else>Desactivé</b></p>
                                <h3 class="card-title"><b>{{dataunactive_countFormatter(blogannonceventesunactive_count)}}</b></h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">remove</i> Articles désactivés
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
                                            <b>{{this.form.title}}</b>
                                        </h4>
                                        <p class="card-title">{{this.form.title}}</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                      <span>
                                        <i id="tooltipSize" class="material-icons">view_headline</i>
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="toolbar">
                                       <div class="text-right">
                                           <router-link :to="{ name: 'blogannonceventes_premium.dashboard',params: { user: user.slug }}" class="btn btn-secondary btn-just-icon btn-sm" id="button_hover">
                                               <i class="material-icons">chevron_left</i>
                                           </router-link>
                                       </div>
                                </div>

                                <div v-if="loaded" class="row">
                                    <div class="col-md-12">
                                        <div class="container">
                                            <div class="row">
                                                <div class="card-body">
                                                    <form id="RegisterValidation" @submit.prevent="updateItem()" role="form"
                                                          method="POST" action="" accept-charset="UTF-8" @keydown="form.onKeydown($event)">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label>Donner un titre à cet article</label>
                                                                    <input v-model="form.title" type="text" name="title" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }">
                                                                    <has-error :form="form" field="title"></has-error>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Estimer en temp <b>{{this.form.red_time}} min lecture</b></label>
                                                                    <input id="red_time" v-model="form.red_time"
                                                                           type="number" name="red_time"
                                                                           maxLength="20"
                                                                           minLength="1"
                                                                           class="form-control" :class="{ 'is-invalid': form.errors.has('red_time') }">
                                                                    <has-error :form="form" field="red_time"/>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating"></label>
                                                                    <select name="categoryannoncevente_id" v-model="form.categoryannoncevente_id" id="categoryannoncevente_id" class="form-control"
                                                                            :class="{ 'is-invalid': form.errors.has('categoryannoncevente_id') }">
                                                                        <option value="" disabled>Selectionez la categorie</option>
                                                                        <option v-for="categoryannoncevente in categoryannonceventes" :key="categoryannoncevente.id" :value="categoryannoncevente.id">{{categoryannoncevente.name}}</option>
                                                                    </select>
                                                                    <has-error :form="form" field="categoryannoncevente_id"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-8 ml-auto mr-auto">
                                                                <div class="profile text-center">
                                                                    <br>
                                                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                                                        <div class="fileinput-new thumbnail">
                                                                            <img :src="`${this.url_site}/assets/vendor/assets/img/image_placeholder.jpg`" :alt="form.slug">
                                                                        </div>
                                                                        <div class="fileinput-preview fileinput-exists thumbnail"></div>
                                                                        <div>
                                                                                                <span class="btn btn-raised btn-success btn-file">
                                                                                                  <span class="fileinput-new" style="cursor: pointer">
                                                                                                       <i class="material-icons">insert_photo</i>
                                                                                                           <b>Add Slide</b>
                                                                                                    </span>
                                                                                                   <span class="fileinput-exists" style="cursor: pointer">
                                                                                                       <i class="material-icons">photo_library</i>
                                                                                                       <b>Change</b>
                                                                                                    </span>
                                                                                                    <input id="photo" @change="updateImage" type="file" class="form-control" name="photo">
                                                                                                </span>
                                                                            <a href="#pablo" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">
                                                                                <i class="material-icons">cancel</i>
                                                                                <b>Remove</b>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <has-error :form="form" field="photo"></has-error>
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
                                                                    <has-error :form="form" field="description"></has-error>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="submit">
                                                            <div class="text-center">
                                                                <router-link :to="{ name: 'blogannonceventes_premium.dashboard',params: { user: user.slug }}" class="btn btn-secondary btn-raised" id="button_hover">
                                                                    <i class="material-icons">chevron_left</i>
                                                                    <b class="title_hover">Back</b>
                                                                </router-link>
                                                                <button id="button_hover" :disabled="form.busy" type="submit" class="btn btn-success btn-raised">
                                                                    <i class="material-icons">save_alt</i>
                                                                    <b class="title_hover">Sauvegarder l'article de blog</b>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end row -->
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
    import moment from 'moment'
    import LoaderLdsDefault from "../../../inc/annimation/LoaderLdsDefault";

    const abbrev = ['', 'k', 'M', 'B', 'T'];

    export default {
        components: {LoaderLdsDefault},
        data() {
            document.title = `Dashboard ${this.user.first_name || this.name_site} - ${this.name_site}` ;
            return {
                loaded: false,
                blogannonceventes: [],
                blogannonceventes_count: [],
                blogannonceventesactive_count: [],
                blogannonceventesunactive_count: [],
                categoryannonceventes: [],
                form: new Form({
                    id: '',
                    title: '',
                    photo: '',
                    description: '',
                    red_time: '',
                    categoryannoncevente_id: '',
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

        methods:{
            getColorCardUser() {
                return "card-header card-header-icon card-header-" + this.user.color_name;
            },
            getColorHeaderUser() {
                return "card-header card-header-" + this.user.color_name;
            },
            data_countFormatter(blogannonceventes_count, precision) {
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataactive_countFormatter(blogannonceventesactive_count, precision) {
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            dataunactive_countFormatter(blogannonceventesunactive_count, precision) {
                const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
                const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
                const suffix = abbrev[order];
                return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
            },

            updateImage(e){
                //console.log('uploadert')
                let file = e.target.files[0];
                console.log(file);
                let reader = new FileReader();
                if (file['size'] < 6000775){
                    reader.onloadend = (file) => {
                        //console.log('RESULT',reader.result)
                        this.form.photo = reader.result
                    };
                    reader.readAsDataURL(file);
                }else{
                    this.$Progress.fail();
                    Swal.fire({
                        type: 'error',
                        title: 'Your image is very big',
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                    });
                }
            },
            updateItem() {
                //Start Progress bar
                this.$Progress.start();
                this.form.busy = true;
                let Itemdata = this.$route.params.blogannoncevente;
                this.form.post(route('blogannoncecategoryventestore_site',[Itemdata]))
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
                        //End Progress bar
                        this.$router.push({ name: 'blogannonceventes_premium.dashboard',params: { user: this.user.slug } })
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

            loadItems(){
                let itemuser = this.$route.params.user;
                let Itemdata = this.$route.params.blogannoncevente;
                let url = route('api.blogannonceblogcategoryventeslugin_site', [Itemdata]);
                dyaxios.get(url).then(({data}) => {
                    this.loaded = true;
                    this.form.fill(data);
                });
                dyaxios.get(route('api.categoryannoncevente_site')).then(({data}) => (this.categoryannonceventes = data));

                dyaxios.get(route('api.blogannonceventes_premium_count',[itemuser])).then(response => {
                    this.loaded = true;
                    this.blogannonceventes_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_premiumactive_count',[itemuser])).then(response => {
                    this.loaded = true;
                    this.blogannonceventesactive_count = response.data;});

                dyaxios.get(route('api.blogannonceventes_premiumunactive_count',[itemuser])).then(response => {
                    this.loaded = true;
                    this.blogannonceventesunactive_count = response.data;});
            }
        },

        created() {
            this.loadItems();
            Fire.$on('ItemGetter', () => {
                this.loadItems();
            });
        }
    }
</script>

<style scoped>

</style>
