<template>
    <div class="sidebar" data-color="rose" data-background-color="black" data-image="/assets/img/sidebar-1.jpg">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

          Tip 2: you can also add an image using data-image tag
      -->
        <div class="logo">
            <a href="/" class="simple-text logo-mini">
                IV
            </a>
            <a href="/" class="simple-text logo-normal">
                {{name_site}}
            </a>
        </div>
        <div class="sidebar-wrapper">
            <div class="user">
                <div class="photo">
                    <img :src="userData.avatar" />
                </div>
                <div class="user-info">
                    <a data-toggle="collapse" href="#collapseExample" class="username">
              <span>
                {{userData.first_name}}
                <b class="caret"></b>
              </span>
                    </a>
                    <div class="collapse" id="collapseExample">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <span class="sidebar-mini"> MP </span>
                                    <span class="sidebar-normal"> My Profile </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <span class="sidebar-mini"> EP </span>
                                    <span class="sidebar-normal"> Edit Profile </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <span class="sidebar-mini"> S </span>
                                    <span class="sidebar-normal"> Settings </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav">
                <li class="nav-item ">
                    <router-link class="nav-link" :to="{ name: 'premium_user_index.site', params: { user: userData.slug }}">
                        <i class="material-icons">dashboard</i>
                        <p> Dashboard </p>
                    </router-link>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#pagesExamples">
                        <i class="material-icons">image</i>
                        <p> Pages
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="pagesExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link :to="{ name: 'categories_faqs.index'}" class="nav-link" >
                                    <span class="sidebar-mini"> P </span>
                                    <span class="sidebar-normal"> Pricing </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/rtl.html">
                                    <span class="sidebar-mini"> RS </span>
                                    <span class="sidebar-normal"> RTL Support </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/timeline.html">
                                    <span class="sidebar-mini"> T </span>
                                    <span class="sidebar-normal"> Timeline </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/login.html">
                                    <span class="sidebar-mini"> LP </span>
                                    <span class="sidebar-normal"> Login Page </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/register.html">
                                    <span class="sidebar-mini"> RP </span>
                                    <span class="sidebar-normal"> Register Page </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/lock.html">
                                    <span class="sidebar-mini"> LSP </span>
                                    <span class="sidebar-normal"> Lock Screen Page </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/user.html">
                                    <span class="sidebar-mini"> UP </span>
                                    <span class="sidebar-normal"> User Profile </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/pages/error.html">
                                    <span class="sidebar-mini"> E </span>
                                    <span class="sidebar-normal"> Error Page </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#componentsExamples">
                        <i class="material-icons">apps</i>
                        <p> Components
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="componentsExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <a class="nav-link" data-toggle="collapse" href="#componentsCollapse">
                                    <span class="sidebar-mini"> MLT </span>
                                    <span class="sidebar-normal"> Multi Level Collapse
                                      <b class="caret"></b>
                                    </span>
                                </a>
                                <div class="collapse" id="componentsCollapse">
                                    <ul class="nav">
                                        <li class="nav-item ">
                                            <a class="nav-link" href="#0">
                                                <span class="sidebar-mini"> E </span>
                                                <span class="sidebar-normal"> Example </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/buttons.html">
                                    <span class="sidebar-mini"> B </span>
                                    <span class="sidebar-normal"> Buttons </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/grid.html">
                                    <span class="sidebar-mini"> GS </span>
                                    <span class="sidebar-normal"> Grid System </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/panels.html">
                                    <span class="sidebar-mini"> P </span>
                                    <span class="sidebar-normal"> Panels </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/sweet-alert.html">
                                    <span class="sidebar-mini"> SA </span>
                                    <span class="sidebar-normal"> Sweet Alert </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/notifications.html">
                                    <span class="sidebar-mini"> N </span>
                                    <span class="sidebar-normal"> Notifications </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/icons.html">
                                    <span class="sidebar-mini"> I </span>
                                    <span class="sidebar-normal"> Icons </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/components/typography.html">
                                    <span class="sidebar-mini"> T </span>
                                    <span class="sidebar-normal"> Typography </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#mapsExamples">
                        <i class="material-icons">view_headline</i>
                        <p> Blogs & Articles
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="mapsExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'blogannoncelocations_premium.dashboard',params: { user: userData.slug }}">
                                    <span class="sidebar-mini"> ALS </span>
                                    <span class="sidebar-normal"> Articles blogs locations </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'blogannoncereservations_premium.dashboard',params: { user: userData.slug }}">
                                    <span class="sidebar-mini"> ABR </span>
                                    <span class="sidebar-normal"> Articles blogs reservations </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'blogannonceventes_premium.dashboard',params: { user: userData.slug }}">
                                    <span class="sidebar-mini"> ABV </span>
                                    <span class="sidebar-normal"> Articles blogs ventes </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="../examples/widgets.html">
                        <i class="material-icons">widgets</i>
                        <p> Widgets </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PremiumVerticalNavUserSite",
        data() {
            return {
                userData: [],
            }
        },

        methods:{

            loadItems(){
                dyaxios.get(route('api.premium_user_index.site',[this.$route.params.user])).then(response => {
                    this.userData = response.data;});
            }
        },

        created() {
            this.loadItems();
        }
    }
</script>

<style scoped>

</style>
