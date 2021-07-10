<template>
  <div>
    <center>
      <div id="futureGames">
        <br/><center>  <h4>Future Games</h4> </center> <br/>
          <GamePreview v-for="g in sortedFutureGames" :key="g.game_id"
          :game_id = "g.game_id"
          :home_team_id = "g.home_team_id"
          :away_team_id = "g.away_team_id"
          :date_time = "g.date_time"
          :stadium = "g.stadium"               
          ></GamePreview>
      </div>
    <br/>
    <div id="pastGames">
        <center>  <h4>Past Games</h4> </center> <br/>
        <PastGame v-for="g in sortedPastGames" 
          :game_id ="g.game_id"
          :home_team_id ="g.home_team_id"
          :away_team_id ="g.away_team_id"
          :date_time ="g.date_time"
          :stadium ="g.stadium"
          :home_goals="g.home_goals"
          :away_goals="g.away_goals"
          :winner_team_id="g.winner_team_id"
          :events="g.events"
          :key="g.game_id"
        ></PastGame>


    </div>
</center>

  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue"
import PastGame from "../components/PastGame.vue"
import {bus} from "../main";

export default {
    name: "CurStage",
    components:{
        GamePreview,
        PastGame
    },
    data(){
        return{
            futureGames: JSON.parse(localStorage.getItem('curStage')).futureGames,
            pastGames: JSON.parse(localStorage.getItem('curStage')).pastGames,
            favorites: this.$root.store.favorites
        }
    },
    methods:{
      async loadFutureGamesFromServer(){
        const response = await this.axios.get("http://localhost:3000/league/getCurStage")
        this.futureGames = response.data.futureGames 
      },
      async loadPastGamesFromServer(){
        const response = await this.axios.get("http://localhost:3000/league/getCurStage")
        this.futureGames = response.data.pastGames 
      }
    },
    created(){
        bus.$on("updateGamesInCurStage", (data) => {        
          this.loadFutureGamesFromServer()          
        }) 
        //  bus.$on("favoritesChanged", (data) => {
        // this.favorites = this.favorites
        // })     
    },
    computed:{
      sortedPastGames(){
        return [...this.pastGames].sort((a,b) =>(a.date_time > b.date_time ? 1 : -1))
      },
      sortedFutureGames(){
        return [...this.futureGames].sort((a,b) =>(a.date_time > b.date_time ? 1 : -1))
      }
    }
}
</script>

<style>
.pastGames{
  display: flex;
  align-items: flex-start

}
</style>