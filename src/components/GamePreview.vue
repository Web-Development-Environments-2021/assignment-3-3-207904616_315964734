<template>
  <div class="game-preview">
    <center>
    <div :title="game_id" class="game-title">

    <br/>
    </div>
    <div class="game-content">
      <div class="row">
      <div class="column">
      Home Team 
      <img :src= this.homeTeamURL class="center" style="cursor: pointer;" @click="homeTeamPage">
      {{ homeTeamName }}
      </div>
      <div class="column">
      Away Team 
      <img :src= this.awayTeamURL class="center" style="cursor: pointer;" @click="awayTeamPage">
      {{ awayTeamName }}
      </div>
      </div>

      
      <li>Game Id: {{ game_id }}</li>
      <li> Time: {{ time }}</li>
      <li> Date: {{ date }}</li>
      <li> Stadium: {{ stadium }}</li>
      <b-button variant="success" @click="addGameToFavorites" v-if="$root.store.username && addButtom " style="margin: 10px;"> Add To Favorites</b-button>
      <b-button variant="danger" @click="removeGameFromFavorites" v-if="$root.store.username && !addButtom " style="margin: 10px;"> Remove From Favorites</b-button>

      
    </div>
      </center>
  </div>
</template>

<script>
import {bus} from "../main";

export default {
  data(){
    return {
      allTeams: JSON.parse(localStorage.getItem('allTeams')),
      add: true
    }
  },
  name: "GamePreview",
  props: {
      game_id: {
        type: Number,
        required: true
      },
      home_team_id: {
        type: Number,
        required: true
      },
      away_team_id: {
        type: Number,
        required: true
      },
      date_time: {
        type: String,
        required: true
      },
      stadium: {
        type: String,
        required: true
      },
      home_goals: {
        type: Number
      },
      away_goals: {
        type: Number
        },

      winner_team_id: {
        type: Number
      }
 
  },
  created(){
      bus.$on("favoritesChanged", (data) => {
        this.addButtom
    })
  } ,
  mounted(){
    // console.log("game preview mounted")
    if (this.$root.store.favorites){
          if (this.$root.store.favorites.find(game => game.game_id == this.game_id)){
            this.add = false}} else { this.add = true}
  },
  computed:{
    homeTeamName(){
      return this.allTeams.filter(team => team.id == this.home_team_id)[0].name
    },
    awayTeamName(){
      return this.allTeams.filter(team => team.id == this.away_team_id)[0].name
    },
    date(){
      return new Date(this.date_time.split("T")[0]).toDateString()
    },
    time(){
      return this.date_time.split("T")[1].split(".")[0]
    },
    homeTeamURL(){
      return this.allTeams.filter(team => team.id == this.home_team_id)[0].imageUrl
    },
    awayTeamURL(){
      return this.allTeams.filter(team => team.id == this.away_team_id)[0].imageUrl
    },
    addButtom(){
      if (this.add) return true
      return false
    }
    // alreadyFav(){
    //   if (this.$root.store.favorites){
    //       if (this.$root.store.favorites.find(game => game.game_id == this.game_id)){
    //         this.add = false
    //         return false
    //       }
    //   }
    //   this.add = true
    //   return true
    //   // console.log($FavoriteGames.favGames)
      
    // }
  },
  methods:{
    async addGameToFavorites(){
      try{
        const response = await this.axios.post(
          "http://localhost:3000/favorites/addGame",
          {
            id: this.game_id
          }
        );
        this.$root.toast("Games added Successfully", "For more information Please see Favorites Page", "success");
        this.$emit("updateGamesHere")
        bus.$emit("favoritesChanged", "added" )

        this.add = false
        

      }
      catch{
        this.$root.toast("Something went Wrong", "Game already in favorite list or Please try again in few seconds", "danger");
      }
    },
    async removeGameFromFavorites(){
      try{
        const response = await this.axios.post(
          "http://localhost:3000/favorites/delGame",
          {
            id: this.game_id
          }
        );
        this.$root.toast("Games Removed Successfully", "Please see Favorites Page", "success");
        this.$emit("updateGamesHere")
        bus.$emit("favoritesChanged", "removed" )
        this.add = true
      }
      catch{
        this.$root.toast("Something went Wrong", "Game already in Removed or Please try again in few seconds", "danger");
      }
    },
    homeTeamPage(){
        this.$router.push(`/team/${this.home_team_id}`).catch(() => {
        this.$forceUpdate();
      }); 
    },
    awayTeamPage(){
        this.$router.push(`/team/${this.away_team_id}`).catch(() => {
        this.$forceUpdate();
      });
    },
    // renderAfterChange(){
    //   if (this.$root.store.favorites){
    //       if (this.$root.store.favorites.find(game => game.game_id == this.game_id)){
    //         return this.add = false}} else { return this.add = true}
    // }
  
  }

};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 470px;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  color: #373940;
  /* font-weight: bold; */
  border-radius: 3px;
  border-width: 5px;
  border-color: #dcdfe4;
  background-color: #dcdfe4;
  /* background-image: url("/soccer-field-2.jpg"); */
  /* opacity: 0.2; */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-position: center; /* Center the image */
  text-transform: uppercase;

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  /* color:  #426347; */
  color: #373940;
  font-weight: normal
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
  list-style-type: none;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85px;
  margin-top: 5px;
}
</style>
