<template>
  <div>
    <center>
    <h2 class="title">{{$root.store.username.toUpperCase()}}, Here is Your Upcoming Favorites Games</h2>
    <br/>
    <GamePreview
      v-for="g in favGames.slice(0, this.howSlice)"
      :game_id="g.game_id" 
      :home_team_id="g.home_team_id" 
      :away_team_id="g.away_team_id" 
      :date_time="g.date_time"
      :stadium="g.stadium" 
      :key="g.game_id"
      @updateGamesHere="updateGames" @removeGames="updateGames"></GamePreview>
    </center>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  props:{
      flagGamesUpdate:{
        type: Boolean
      },
      toslice:{
        type: Boolean
      }
  },
  components: {
    GamePreview
  },
  data(){
    return {
      favGames: []
    }
  } ,
  // data () {
  //   // return {

  //   try {
  //       const response = await this.axios.get(
  //         "http://localhost:3000/favorites/getGames",
  //       );
  //       const games = response.data;
  //       // this.favGames = [];
  //       // this.favGames.push(...games);
  //       // console.log(this.favGames);
  //       return {
  //         favorites: games
  //         }
  //     } catch (error) {
  //       console.log("error in update games")
  //       console.log(error);
  //     }
  // },
  methods: {
    async updateGames(){
      // console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/favorites/getGames",
        );
        const games = response.data;
        this.favGames = [];
        this.favGames.push(...games);
        this.favGames.sort((a,b) =>(a.date_time > b.date_time ? 1 : -1))
        // console.log(response.data);
        // console.log("done");
        // console.log(this.favGames)
        this.$root.store.favorites = games
      } catch (error) {
        // console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  },
  computed:{
    howSlice(){
      if (this.toslice) return 3
      return this.favGames.length
    }
   
  },
  watch:{
    flagGamesUpdate(){
      this.updateGames(); 
      this.$emit("resetFlag")
    }
  }
  
};
</script>

<style>


</style>
