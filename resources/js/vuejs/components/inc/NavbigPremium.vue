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
                    <img :src="userData.avatar" :alt="userData.first_name"/>
                </div>
                <div class="info">
                    <a data-toggle="collapse" href="#collapseExample" class="collapsed">
              <span>
               {{ userData.first_name }}
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
                    <router-link :to="{ name: 'premium_user_index.site', params: { userData: userData.slug  } }">
                        <i class="now-ui-icons design_app"></i>
                        <p>Dashboard</p>
                    </router-link >
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
                                <router-link :to="{ name: 'premium_user_annonce_locations.site', params: { userData: userData.slug  }}">
                                    <span class="sidebar-mini-icon">ALS</span>
                                    <span class="sidebar-normal"> Articles blogs locations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'premium_user_annonce_reservations.site',params: { userData: userData.slug  }}">
                                    <span class="sidebar-mini-icon">ARS</span>
                                    <span class="sidebar-normal"> Articles blogs reservations </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'premium_user_annonce_ventes.site',params: { userData: userData.slug  }}">
                                    <span class="sidebar-mini-icon">AVS</span>
                                    <span class="sidebar-normal"> Articles blogs ventes </span>
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
        name: "NavbigPremium",
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
