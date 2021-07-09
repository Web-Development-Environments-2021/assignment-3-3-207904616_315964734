<template>
  <div class="game-preview-pastGame">
    <center>
    <div :title="game_id" class="game-title">

    <br/>
    </div>
    <div class="game-content">
      <div class="row">
      <div class="column">
      Home Team: {{ homeTeamName }}
      <img :src= this.homeTeamURL class="center">

      </div>
      <div class="column">
      Away Team: {{ awayTeamName }}
      <img :src= this.awayTeamURL class="center">
      </div>
      </div>

      <br/>
      
      <li>Game Id: {{ game_id }}</li>
      <li> Time: {{ time }}</li>
      <li> Date: {{ date }}</li>
      <li> Stadium: {{ stadium }}</li>
      <li>Home Team Goals: {{home_goals}}</li>
      <li>Away Team Goals: {{away_goals}} </li>
      <li>Winner Team: {{winnerTeamName}}</li>
      <li><b>Events</b></li>
      <!-- <li v-for="e in events" :key="e.id">
        <b>Event id:</b> {{e.event_id}} <br/>
        Date_time: {{e.date_time}} <br/>
        Minute: {{e.minute}} <br/>
        Description: {{e.description}} <br/>
      </li> -->
        <div class="container">
        <div class="row">
      <ul class="events-display "><li v-for="e in events" :key="e.id">
        <Event :id="e.event_id"
            :date_time="e.date_time"
            :minute="e.minute"
            :description="e.description"      
        ></Event>
        <br/>
      </li></ul>
      </div>
    </div>

    </div>
      </center>
  </div>
</template>

<script>
import Event from './Event.vue';
// import Event from "../components/Event.vue"

export default {
  components: { Event },
  name: "PastGame",
  components:{
    Event
  },
  data(){
    return {
      allTeams: JSON.parse(localStorage.getItem('allTeams'))
    }
  },
  
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
        type: Number,
        required: true
      },
      away_goals: {
        type: Number,
        required: true
        },
      winner_team_id: {
        type: Number,
        required: true
      },
      events:{
        type: Array,
        required: true
      }
  }, 
  mounted(){
    console.log("game preview mounted")
    
  },
  computed:{
    homeTeamName(){
      return this.allTeams.filter(team => team.id == this.home_team_id)[0].name
    },
    awayTeamName(){
      return this.allTeams.filter(team => team.id == this.away_team_id)[0].name
    },
    winnerTeamName(){
        return this.allTeams.filter(team => team.id == this.winner_team_id)[0].name
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
    }
  }

};
</script>

<style>
.game-preview-pastGame {
  display: inline-block;
  width: 450px;
  height: 850px;
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

.game-preview-pastGame .game-title {
  text-align: center;
  text-transform: uppercase;
  /* color:  #426347; */
  color: #373940;
  font-weight: normal
}

.game-preview-pastGame .game-content {
  width: 100%;
  overflow: hidden;
  list-style-type: none;
}

.events-display{
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
