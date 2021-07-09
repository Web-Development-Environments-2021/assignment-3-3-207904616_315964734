<template>
  <div>
      <div id="futureGames">
        <br/><center>  <h4>Future Games</h4> </center> <br/>
          <GamePreview v-for="g in futureGames" :key="g.game_id"
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
        <PastGame v-for="g in pastGames" 
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


  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue"
import PastGame from "../components/PastGame.vue"

export default {
    name: "CurStage",
    components:{
        GamePreview,
        PastGame
    },
    data(){
        return{
            futureGames: JSON.parse(localStorage.getItem('curStage')).futureGames,
            pastGames: JSON.parse(localStorage.getItem('curStage')).pastGames
        }
    },
    mounted(){
        console.log(this.pastGames)
    }
}
</script>

<style>

</style>