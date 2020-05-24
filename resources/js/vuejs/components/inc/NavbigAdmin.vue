<template>
    <div class="sidebar" data-color="blue">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
      -->
        <div class="logo">
            <a href="http://www.creative-tim.com" class="simple-text logo-mini">
                IV
            </a>
            <a href="http://www.creative-tim.com" class="simple-text logo-normal">
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
                    <img src="/assets/admin/assets/img/james.jpg" />
                </div>
                <div class="info">
                    <a data-toggle="collapse" href="#collapseExample" class="collapsed">
              <span>
                James Amos
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
                            <li>
                                <a href="../examples/pages/rtl.html">
                                    <span class="sidebar-mini-icon">RS</span>
                                    <span class="sidebar-normal"> RTL Support </span>
                                </a>
                            </li>
                            <li>
                                <a href="../examples/pages/timeline.html">
                                    <span class="sidebar-mini-icon">T</span>
                                    <span class="sidebar-normal"> Timeline </span>
                                </a>
                            </li>
                            <li>
                                <a href="../examples/pages/login.html">
                                    <span class="sidebar-mini-icon">L</span>
                                    <span class="sidebar-normal"> Login </span>
                                </a>
                            </li>
                            <li>
                                <a href="../examples/pages/register.html">
                                    <span class="sidebar-mini-icon">R</span>
                                    <span class="sidebar-normal"> Register </span>
                                </a>
                            </li>
                            <li>
                                <a href="../examples/pages/lock.html">
                                    <span class="sidebar-mini-icon">LS</span>
                                    <span class="sidebar-normal"> Lock Screen </span>
                                </a>
                            </li>
                            <li>
                                <a href="../examples/pages/user.html">
                                    <span class="sidebar-mini-icon">UP</span>
                                    <span class="sidebar-normal"> User Profile </span>
                                </a>
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
                    <a href="../examples/widgets.html">
                        <i class="now-ui-icons objects_diamond"></i>
                        <p>Widgets</p>
                    </a>
                </li>
                <li>
                    <a href="../examples/charts.html">
                        <i class="now-ui-icons business_chart-pie-36"></i>
                        <p>Charts</p>
                    </a>
                </li>
                <li>
                    <a href="../examples/calendar.html">
                        <i class="now-ui-icons media-1_album"></i>
                        <p>Calendar</p>
                    </a>
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
