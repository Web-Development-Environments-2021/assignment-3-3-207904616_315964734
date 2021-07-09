<template>
<div class="container-team">
    <center>
        <div class="generalTeamData">
            <h3> {{teamName}} </h3> <br/>
            <img :src="this.imageUrl" style="max-width: 17rem;">
            <br/>
        </div>
    </center>


    <div class="column">
    <div class="row">
        <!-- <br/><center><h5>Players</h5></center><br/><br/> -->
        <PlayerPreview v-for="player in filteredPlayersByTeam" :key="player.id"
        :id="player.id"
        :playerName="player.name"
        :teamName="player.team_name"
        :position="player.position_id"
        :imageUrl="player.imageUrl"
        ></PlayerPreview>
    </div>
</div>
    <div class="teamsPastGames">
        <br/><center><h5>Past Games</h5></center><br/>
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

    <div class="teamsFutureGames">
        <br/><center><h5>Future Games</h5></center><br/>
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

  


</div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue"
import PastGame from "../components/PastGame.vue"
import GamePreview from "../components/GamePreview.vue"

export default {
    name: "TeamPage",
    components: {
        PlayerPreview,
        PastGame,
        GamePreview
    },
    data(){
        return{
            idOfTeam: "86",
            imageUrl:"https://cdn.sportmonks.com/images//soccer/teams/22/86.png",
            teamName:"Silkeborg",
            allPlayers: JSON.parse(localStorage.getItem('allPlayers')),            
            futureGames: JSON.parse(localStorage.getItem('curStage')).futureGames,
            pastGames: JSON.parse(localStorage.getItem('curStage')).pastGames
        }
    },
    computed:{
        filteredPlayersByTeam(){
            return this.allPlayers.filter(player => player.team_id == this.idOfTeam)
        },
        filteredPastGamesOfTeam(){
            return this.pastGames.filter(game => game.home_team_id == this.idOfTeam || game.away_team_id == this.idOfTeam)
        },
        filteredFutureGamesOfTeam(){
            return this.futureGames.filter(game => game.home_team_id == this.idOfTeam || game.away_team_id == this.idOfTeam)
        }
    }
        
}
</script>

<style>
.container-team{
  margin: auto;
  margin: 20px;
  align-items: center;

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
</style>