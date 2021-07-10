<template>
  <div class="container">
    <center>
    <h1 class="title">Welcome To the Superliga</h1>
    </center>
    <div class="row">
      
      <div class="column-main">
      
    <LeagueInfo @updateGamesHere="flagGamesUpdate=true"></LeagueInfo>
     
     </div>
      <div class="column-main">
       
    <LoginPage v-if="!$root.store.username"></LoginPage>
    <FavoriteGames v-else :flagGamesUpdate="flagGamesUpdate" @resetFlag="flagGamesUpdate=false"></FavoriteGames>

      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  data(){
    return{
      flagGamesUpdate: false
    }
  },
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.column-main {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
.container{
  width: 100%;
  margin: auto;
}
.title{
  color: #1e311b; font-family: 'Lato', sans-serif; font-size: 54px; font-weight: 300; line-height: 58px; margin: 20px 20px 58px;
}

</style>
