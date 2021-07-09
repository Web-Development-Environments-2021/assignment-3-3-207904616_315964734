<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" style="background-color: #009E60; padding-top: 12px" >
      <img src="/12.png" height="45" style="padding-left: 5px; padding: 1px; margin-top: -10px; margin-right: 10px; cursor: pointer;" @click="gotoHome()">
      <!-- <b-navbar-brand :to="{ name: 'main' }" style="padding-left: 20px; margin-top: -4px">Superliga Home</b-navbar-brand> -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Games</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">About</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            Welcome {{$root.store.username}}
          </template>
          <b-dropdown-item href="#">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      const response = this.axios.post(
          "http://localhost:3000/logout",
        );
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    gotoHome(){
        this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  // color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nav-item li a{
  color: #42b983 !important;
  }


</style>
