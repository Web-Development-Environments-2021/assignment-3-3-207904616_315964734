<template>
<div class="container-team">
    
        <div class="column" >
    <center>
          <div class="generalTeamData" >

  <b-card 
    :title= "team.name"
    :img-src= "team.imageUrl"
    img-alt="Image"
    img-bottom
    tag="article"
    style="max-width: 15rem; text-align: center; cursor: pointer;"
    class="mb-2"
  >

  </b-card>
  </div>
    </center>
     </div>
<div class="row">

    <div class="column">
    <br/><center><h2>Players</h2></center><br/>

    <div class="row">
        <!-- <br/><center><h5>Players</h5></center><br/><br/> -->
        <PlayerPreview v-for="player in filteredPlayersByTeam" :key="player.id"
        :player="player"
        @firePlayer="funcToPopPlayerModal"></PlayerPreview>
    </div>
</div>
<div class="column-games" >

    <div class="teamsFutureGames">
        <br/><center><h2>Future Games</h2></center><br/>
        <center>
        <GamePreview v-for="g in filteredFutureGamesOfTeam" :key="g.game_id"
          :game_id = "g.game_id"
          :home_team_id = "g.home_team_id"
          :away_team_id = "g.away_team_id"
          :date_time = "g.date_time"
          :stadium = "g.stadium"               
          ></GamePreview>
        </center>
    </div>

        <div class="teamsPastGames">
        <br/><center><h2>Past Games</h2></center><br/>
        <center>
        <PastGame v-for="g in filteredPastGamesOfTeam"
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
        </center>
    </div>
</div>
  
</div>

  <b-modal id="modal-player-team" title="Player Card" size="lg" :hide-footer="true" >
    <PlayerFull
    :id="this.playerClicked.id"
    :playerName="this.playerClicked.name"
    :teamName="this.playerClicked.team_name"
    :position="this.playerClicked.position_id"
    :common_name="this.playerClicked.common_name"
    :nationality="this.playerClicked.nationality"
    :birthCountry="this.playerClicked.birthcountry"
    :birthDate="this.playerClicked.birthdate"
    :height="this.playerClicked.height"
    :weight="this.playerClicked.weight"       
    :imageUrl="this.playerClicked.imageUrl"
    ></PlayerFull>
  </b-modal>


</div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue"
import PlayerFull from "../components/PlayerFull.vue"

import PastGame from "../components/PastGame.vue"
import GamePreview from "../components/GamePreview.vue"
// import TeamPreview from "../components/TeamPreview.vue";


export default {
    name: "TeamPage",
    components: {
        PlayerPreview,
        PastGame,
        GamePreview,
        PlayerFull
        // TeamPreview: TeamPreview,

    },
    data(){
        return{
            // idOfTeam: "86",
            // imageUrl:"https://cdn.sportmonks.com/images//soccer/teams/22/86.png",
            // teamName:"Silkeborg",
            playerClicked: {},

            allPlayers: JSON.parse(localStorage.getItem('allPlayers')),            
            futureGames: JSON.parse(localStorage.getItem('curStage')).futureGames,
            pastGames: JSON.parse(localStorage.getItem('curStage')).pastGames,
            allTeams: JSON.parse(localStorage.getItem('allTeams')),

        }
    },
    computed:{
        filteredPlayersByTeam(){
            return this.allPlayers.filter(player => player.team_id == this.team.id)
        },
        filteredPastGamesOfTeam(){
            return this.pastGames.filter(game => game.home_team_id == this.team.id || game.away_team_id == this.team.id)
        },
        filteredFutureGamesOfTeam(){
            return this.futureGames.filter(game => game.home_team_id == this.team.id || game.away_team_id == this.team.id)
        },
        team(){
            return this.allTeams.find(team => team.id == this.$route.params.id)
        }
    },
     methods:{

    funcToPopPlayerModal(player){
      debugger
      this.$bvModal.show("modal-player-team")
      this.playerClicked = player
      
        },
        
    }
}
</script>

<style>
.container-team{
  margin: 30px;
  align-items: center;

}
.row {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
.column-games {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  width: auto;
}
</style>

