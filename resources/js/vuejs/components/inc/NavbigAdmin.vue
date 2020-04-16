<template>
    <div class="sidebar" data-color="orange">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
      -->
        <div class="logo">
            <a href="/" class="simple-text logo-mini">
                IV
            </a>
            <a href="/" class="simple-text logo-normal">
                Ivemo
            </a>
            <div class="navbar-minimize">
                <button id="minimizeSidebar" class="btn btn-simple btn-icon btn-neutral btn-round">
                    <i class="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
                    <i class="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
                </button>
            </div>
        </div>
        <div class="sidebar-wrapper" id="sidebar-wrapper">
            <div class="user">
                <div class="photo">
                    <img :src="user.avatar" :alt="user.first_name"/>
                </div>
                <div class="info">
                    <a data-toggle="collapse" href="#collapseExample" class="collapsed">
              <span>
               {{ (user.first_name.length > 13 ? user.first_name.substring(0,13)+ "..." : user.first_name) }}
                <b class="caret"></b>
              </span>
                    </a>
                    <div class="clearfix"></div>
                    <div class="collapse" id="collapseExample">
                        <ul class="nav">
                            <li>
                                <a href="#">
                                    <span class="sidebar-mini-icon">MP</span>
                                    <span class="sidebar-normal">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="sidebar-mini-icon">EP</span>
                                    <span class="sidebar-normal">Edit Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="sidebar-mini-icon">S</span>
                                    <span class="sidebar-normal">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav">
                <li>
                    <router-link :to="{ name: 'dashboard.index'}">
                        <i class="now-ui-icons design_app"></i>
                        <p>Dashboard</p>
                    </router-link >
                </li>
                <li>
                    <a data-toggle="collapse" href="#partialsExamples">
                        <i class="now-ui-icons design_palette"></i>
                        <p>
                            Partials
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="partialsExamples">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'cities.index'}">
                                    <span class="sidebar-mini-icon">CT</span>
                                    <span class="sidebar-normal"> Cities </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a data-toggle="collapse" href="#pagesExamples">
                        <i class="now-ui-icons design_image"></i>
                        <p>
                            Pages
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="pagesExamples">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'faqs.index'}">
                                    <span class="sidebar-mini-icon">F</span>
                                    <span class="sidebar-normal"> Faqs </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a data-toggle="collapse" href="#pagesCategories">
                        <i class="now-ui-icons text_bold"></i>
                        <p>
                            Categories
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="pagesCategories">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'categories_faqs.index'}">
                                    <span class="sidebar-mini-icon">CF</span>
                                    <span class="sidebar-normal"> Category FAQS </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'categoryannoncelocations.index'}">
                                    <span class="sidebar-mini-icon">CAL</span>
                                    <span class="sidebar-normal"> category annonce locations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'categoryannoncereservations.index'}">
                                    <span class="sidebar-mini-icon">CAR</span>
                                    <span class="sidebar-normal"> category annonce reservations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'categoryannonceventes.index'}">
                                    <span class="sidebar-mini-icon">CAV</span>
                                    <span class="sidebar-normal"> category annonce ventes </span>
                                </router-link>
                            </li>

                        </ul>
                    </div>
                </li>

                <li>
                    <a data-toggle="collapse" href="#blogsExamples">
                        <i class="now-ui-icons text_align-center"></i>
                        <p>
                            Blogs & articles
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="blogsExamples">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'blogannoncelocations.dashboard'}">
                                    <span class="sidebar-mini-icon">ALS</span>
                                    <span class="sidebar-normal"> Articles blogs locations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'blogannoncereservations.dashboard'}">
                                    <span class="sidebar-mini-icon">ARS</span>
                                    <span class="sidebar-normal"> Articles blogs reservations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'blogannonceventes.dashboard'}">
                                    <span class="sidebar-mini-icon">AVS</span>
                                    <span class="sidebar-normal"> Articles blogs ventes </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a data-toggle="collapse" href="#adminExamples">
                        <i class="now-ui-icons loader_gear"></i>
                        <p>
                            Config Dashboard
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="adminExamples">
                        <ul class="nav">
                            <li v-if="$auth.can('manage-permission')">
                                <router-link :to="{ name: 'permissions.index'}">
                                    <span class="sidebar-mini-icon">PS</span>
                                    <span class="sidebar-normal"> Permissions </span>
                                </router-link>
                            </li>
                            <li v-if="$auth.can('manage-role')">
                                <router-link :to="{ name: 'roles.index'}">
                                    <span class="sidebar-mini-icon">Rl</span>
                                    <span class="sidebar-normal"> Role </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li v-if="$auth.can('manage-signal')">
                    <a data-toggle="collapse" href="#signalExamples">
                        <i class="now-ui-icons travel_info"></i>
                        <p>
                            Signal blogs,annonces...
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="signalExamples">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'signalannoncelocations.index'}">
                                    <span class="sidebar-mini-icon">ALS</span>
                                    <span class="sidebar-normal"> Annonces locations signalées </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'signalannoncereservations.index'}">
                                    <span class="sidebar-mini-icon">ARS</span>
                                    <span class="sidebar-normal"> Annonces reservations signalées </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'signalannonceventes.index'}">
                                    <span class="sidebar-mini-icon">AVS</span>
                                    <span class="sidebar-normal"> Annonces ventes signalées </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <a data-toggle="collapse" href="#termpolicyconditionExamples">
                        <i class="now-ui-icons text_caps-small"></i>
                        <p>
                            Termes,policy...
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse " id="termpolicyconditionExamples">
                        <ul class="nav">
                            <li>
                                <router-link :to="{ name: 'policyprivacies.index'}">
                                    <span class="sidebar-mini-icon">PP</span>
                                    <span class="sidebar-normal"> Policy privacy </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavbigAdmin"
    }
</script>

<style scoped>

</style>
