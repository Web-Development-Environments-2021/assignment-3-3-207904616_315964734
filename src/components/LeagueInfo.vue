<template>
    <div class="league-preview">
    <div class="centerLeague">
      <div class="row">

      <center>
      <b-card
      img-alt="Image"
      img-src="/Superliga.png"
      tag="article"
      style="max-width: 17rem; border: none"
      class="mb-2"
    >
      <!-- <b-card-title>{{leagueName}}</b-card-title> -->
      <b-card-title >
        <br/>
        Season: {{ season }}
        <br/>
        <br/>
        Stage: {{ stage }}
        <br/>
        <br/>
        Next Game
        
      </b-card-title>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>

    <GamePreview
          :game_id="nextGame.game_id" 
          :home_team_id="nextGame.home_team_id" 
          :away_team_id="nextGame.away_team_id" 
          :date_time="nextGame.date_time"
          :stadium="nextGame.stadium" 
          @updateGamesHere="fireUpEvent" ></GamePreview>
      </center>
      </div>
    </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";

export default {
  components: {
    GamePreview
  },
 data() {
    return {
      info: JSON.parse(localStorage.getItem('leagueDetails')),
    };
  },
  computed:{
    leagueName(){
      return this.info.league_name
    },
    season(){
      return this.info.current_season_name
    },
    stage(){
      return this.info.current_stage_name
    },
    nextGame(){
      console.log(this.info.next_match_details)
      return this.info.next_match_details

    }
  },
  methods:{
    fireUpEvent(){
      debugger
      this.$emit("updateGamesHere")
    }
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 350px;
  height: 500px;
  position: relative;
  margin: 10px 10px;
  /* border-style: solid;
  border-radius: 10px;
  border-width: 5px; */
  /* border-color:rgb(44, 89, 116); */

}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
.centerLeague {
  display: block;
  margin-left: auto;
  margin-right: auto;
  }

</style>