<template>
  <div v-if="$auth.can('manage-signal')" class="main-panel" id="main-panel">
    <vue-progress-bar />

    <admin-horizontalenavusersite/>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div :class="getColorHeaderUser()">
                <div class="row">
                  <div class="col-md-6">
                    <h4 class="card-title">
                      <b>Signaled renting posts</b>
                    </h4>
                    <p class="card-title">Signaled renting posts</p>
                  </div>
                  <div class="col-md-6 text-right">
                    <span>
                      <i id="tooltipSize" class="material-icons">announcement</i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-body">
               <div class="toolbar"></div>
                <div class="content">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card-body">
                        <div class="table-responsive">
                          <table class="table">
                            <thead class="text-primary">
                              <th>Title</th>
                              <th>User</th>
                              <th class="text-center">Signals</th>
                              <th class="text-center">Status admin</th>
                              <th class="text-right">Actions</th>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in signalannoncelocations"
                                :key="item.id"
                                v-if="item.signalannoncelocations_count > 0"
                              >
                                <td>{{ (item.title.length || "" > 15 ? item.title.substring(0,15)+ "..." : item.title || "") | upText }}</td>
                                <td>
                                  <b
                                    v-if="item.user_id"
                                  >{{ (item.user.first_name.length > 15 ? item.user.first_name.substring(0,15)+ "..." : item.user.first_name) | upText }}</b>
                                  <b v-else>user deleted</b>
                                </td>
                                <td class="text-center">{{item.signalannoncelocations_count}}</td>
                                <td class="text-center">
                                  <div class="timeline-heading">
                                    <span v-if="item.status_admin" class="badge badge-success">
                                      <b>Active</b>
                                    </span>
                                    <span v-else-if="!item.status_admin" class="badge badge-danger">
                                      <b>Disactive</b>
                                    </span>
                                  </div>
                                </td>
                                <td class="text-right">
                                  <template>
                                    <button
                                      v-if="item.status_admin"
                                      @click="disableItem(item.id)"
                                      class="btn btn-success btn-icon btn-sm"
                                      title="Disable"
                                    >
                                      <i class="now-ui-icons ui-1_check" />
                                    </button>
                                    <button
                                      v-else-if="!item.status_admin"
                                      @click="activeItem(item.id)"
                                      class="btn btn-danger btn-icon btn-sm"
                                      title="Activate"
                                    >
                                      <i class="now-ui-icons ui-1_simple-delete" />
                                    </button>
                                  </template>
                                  <router-link
                                    :to="{ name: 'signalannoncelocations.show', params: { annoncelocation: item.slug  } }"
                                    class="btn btn-info btn-icon btn-sm"
                                  >
                                    <i class="fas fa-eye"></i>
                                  </router-link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="toolbar">
                        <div class="submit text-center">
                          <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                            <span slot="no-more">No more data</span>
                          </infinite-loading>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    document.title = `Dashboard annonces locations signalées  - Ivemo`;
    return {
      page: 1,
      signalannoncelocations: []
    };
  },

  methods: {
    getColorHeaderUser() {
      return "card-header card-header-" + this.user.color_name;
    },

    /** Ici c'est l'activation de la couleur  **/
    activeItem(id) {
      //Progress bar star
      this.$Progress.start();
      dyaxios
        .get(route("activated_signalannoncelocations", id))
        .then(() => {
          /** Alert notify bootstrapp **/
          $.notify(
            {
              message: `Data activated successfully`
            },
            {
              allow_dismiss: false,
              type: "info",
              placement: {
                from: "top",
                align: "center"
              },
              animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
              }
            }
          );
          /** End alert ***/
          window.location.reload();
          //End Progress bar
          this.$Progress.finish();
        })
        .catch(() => {
          //Alert error
          $.notify("Ooop! Something wrong. Try later", {
            type: "danger",
            animate: {
              enter: "animated bounceInDown",
              exit: "animated bounceOutUp"
            }
          });
        });
    },
    /** Ici c'est la désactivation de la couleur **/
    disableItem(id) {
      //Start Progress bar
      this.$Progress.start();
      dyaxios
        .get(route("unactivated_signalannoncelocations", id))
        .then(() => {
          /** Alert notify bootstrapp **/
          $.notify(
            {
              message: `Data disactivated successfully`
            },
            {
              allow_dismiss: false,
              type: "info",
              placement: {
                from: "top",
                align: "center"
              },
              animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
              }
            }
          );
          /** End alert **/
          window.location.reload();
          //End Progres bar
          this.$Progress.finish();
        })
        .catch(() => {
          //Alert error
          $.notify("Ooop! Something wrong. Try later", {
            type: "danger",
            animate: {
              enter: "animated bounceInDown",
              exit: "animated bounceOutUp"
            }
          });
        });
    },

    infiniteHandler($state) {
      dyaxios
        .get(route("api.signalannoncelocations"), {
          params: {
            page: this.page
          }
        })
        .then(response => {
          if (response.data.length) {
            this.page += 1;
            this.signalannoncelocations.push(...response.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  },

  created() {
    //
  }
};
</script>

<style scoped>
</style>
