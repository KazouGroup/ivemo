<template>
    <div class="sidebar" data-color="rose" data-background-color="black" data-image="/assets/img/sidebar-1.jpg">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

          Tip 2: you can also add an image using data-image tag
      -->
        <div class="logo">
            <a href="/" class="simple-text logo-mini" target="_blank">
                IV
            </a>
            <a href="/" class="simple-text logo-normal" target="_blank">
                {{name_site}}
            </a>
        </div>
        <div class="sidebar-wrapper">
            <div class="user">
                <div class="photo">
                    <img :src="user.avatar" />
                </div>
                <div class="user-info">
                    <a data-toggle="collapse" href="#collapseExample" class="username">
              <span>
                {{ (user.first_name.length > 13 ? user.first_name.substring(0,13)+ "..." : user.first_name) }}
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
                    <router-link class="nav-link" :to="{ name: 'dashboard.index'}">
                        <i class="material-icons">dashboard</i>
                        <p> Dashboard </p>
                    </router-link>
                </li>
                <!--
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
                -->

                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#pagesModules">
                        <i class="material-icons">scatter_plot</i>
                        <p> Modules
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="pagesModules">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'faqs.index'}">
                                    <span class="sidebar-mini"> F </span>
                                    <span class="sidebar-normal"> FAQS </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'cities.index'}">
                                    <span class="sidebar-mini">CT</span>
                                    <span class="sidebar-normal"> Cities </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#pagesCategories">
                        <i class="material-icons">closed_caption</i>
                        <p> Categories
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="pagesCategories">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categories_faqs.index'}">
                                    <span class="sidebar-mini"> CF </span>
                                    <span class="sidebar-normal"> Category FAQS </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categoryannoncelocations.index'}">
                                    <span class="sidebar-mini"> AOR </span>
                                    <span class="sidebar-normal"> Announces on rentings </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categoryannoncereservations.index'}">
                                    <span class="sidebar-mini">AR</span>
                                    <span class="sidebar-normal"> Announces on reservations </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{name: 'categoryannonceventes.index'}">
                                    <span class="sidebar-mini">AS</span>
                                    <span class="sidebar-normal"> Announces on sales </span>
                                </router-link>
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
                                <router-link class="nav-link" :to="{ name: 'blogannoncelocations.dashboard'}">
                                    <span class="sidebar-mini"> RBA </span>
                                    <span class="sidebar-normal"> Rentings blog articles</span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'blogannoncereservations.dashboard'}">
                                    <span class="sidebar-mini">RBA</span>
                                    <span class="sidebar-normal"> Reservations blog articles </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'blogannonceventes.dashboard'}">
                                    <span class="sidebar-mini"> SBA </span>
                                    <span class="sidebar-normal"> Sales blog articles </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#forumExamples">
                        <i class="material-icons">insert_comment</i>
                        <p> Forums
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="forumExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categoryforums.index'}">
                                    <span class="sidebar-mini"> CF </span>
                                    <span class="sidebar-normal"> Categories forums </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'forums.dashboard'}">
                                    <span class="sidebar-mini"> FO </span>
                                    <span class="sidebar-normal"> Forums </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#employementExamples">
                        <i class="material-icons">work</i>
                        <p> Employments & Trainings
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="employementExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categoryemployements.index'}">
                                    <span class="sidebar-mini"> JOC </span>
                                    <span class="sidebar-normal"> Job offering categories </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'employments.dashboard'}">
                                    <span class="sidebar-mini"> EFS </span>
                                    <span class="sidebar-normal"> Employments & trainings </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#adminExamples">
                        <i class="material-icons">settings</i>
                        <p> Config Dashboard
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="adminExamples">
                        <ul class="nav">
                            <li v-if="$auth.can('manage-user')" class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'users.index'}">
                                    <span class="sidebar-mini"> USR </span>
                                    <span class="sidebar-normal"> Users </span>
                                </router-link>
                            </li>
                            <li v-if="$auth.can('manage-permission')" class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'permissions.index'}">
                                    <span class="sidebar-mini"> PS </span>
                                    <span class="sidebar-normal"> Permissions </span>
                                </router-link>
                            </li>
                            <li v-if="$auth.can('manage-role')" class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'roles.index'}">
                                    <span class="sidebar-mini"> Rl </span>
                                    <span class="sidebar-normal"> Role </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-if="$auth.can('manage-signal')" class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#signalExamples">
                        <i class="material-icons">announcement</i>
                        <p> Signaled blogs, announces...
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="signalExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'signalannoncelocations.index'}">
                                    <span class="sidebar-mini"> SRP </span>
                                    <span class="sidebar-normal"> Signaled renting posts </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'signalannoncereservations.index'}">
                                    <span class="sidebar-mini"> SRP </span>
                                    <span class="sidebar-normal"> Signaled reservations posts </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'signalannonceventes.index'}">
                                    <span class="sidebar-mini"> SSP </span>
                                    <span class="sidebar-normal"> Signaled sales posts </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#contactsExamples">
                        <i class="material-icons">forum</i>
                        <p> Contacts
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="contactsExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'contactusersfaqs.index'}">
                                    <span class="sidebar-mini"> CF </span>
                                    <span class="sidebar-normal"> Contacts Faqs </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'contactusersforadverts.index'}">
                                    <span class="sidebar-mini"> CFA </span>
                                    <span class="sidebar-normal"> Contacts For Adverts</span>
                                </router-link>
                            </li>
                             <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'contacts.dashboard'}">
                                    <span class="sidebar-mini"> CU</span>
                                    <span class="sidebar-normal"> Contacts Users</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#termpolicyconditionExamples">
                        <i class="material-icons">description</i>
                        <p> Termes,policy...
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="termpolicyconditionExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'policyprivacies.index'}">
                                    <span class="sidebar-mini"> PP </span>
                                    <span class="sidebar-normal"> Policy privacy </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'conditionutilisations.index'}">
                                    <span class="sidebar-mini"> CU </span>
                                    <span class="sidebar-normal"> Condition utilisations </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'licencesites.index'}">
                                    <span class="sidebar-mini"> LS </span>
                                    <span class="sidebar-normal"> Licence site </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#workwithusExamples">
                        <i class="material-icons">filter_hdr</i>
                        <p> Manage work
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="workwithusExamples">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'categoryworkwithuses.index'}">
                                    <span class="sidebar-mini"> CMW </span>
                                    <span class="sidebar-normal"> Category Manage work </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{ name: 'workwithuses.index'}">
                                    <span class="sidebar-mini"> MW </span>
                                    <span class="sidebar-normal"> Manage work </span>
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
        name: "AdminVerticalNavUserSite",
        data() {
            return {
                userData: [],
            }
        },

        methods:{

            loadItems(){

            }
        },

        created() {
            this.loadItems();
        }
    }
</script>

<style scoped>

</style>
