<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button @click="searchTeamAndPlayers" variant="success">Search</b-button><br/>
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }}
      <br/> 
      <h3>Teams:</h3>      
      <div id="teamsDisplay">        
        <h5>Results: {{resultsTeams}}</h5>
        <br/>
        <TeamPreview v-for="team in relevantTeams" :key="team.id"
        :teamId="team.id" :teamName="team.name" :imageUrl="team.imageUrl"></TeamPreview>
      </div>
      <br/> <br/>
      <h3>Players:</h3>
      <div id ="playersDisplay"> 
        <h5>Results: {{resultsPlayers}}</h5>  
            <br/>         
        <PlayerPreview v-for="player in relevantPlayers" :key="player.id"
          :id="player.id"
          :playerName="player.name"
          :teamName="player.team_name"
          :position="player.position_id"
          :imageUrl="player.imageUrl"></PlayerPreview>        
      </div>
    
  </div>
</template>

<script>
import PlayerPreview from '../components/PlayerPreview.vue'
import TeamPreview from "../components/TeamPreview.vue";

export default {
 
 components:{   
  PlayerPreview: PlayerPreview,
  TeamPreview: TeamPreview
 },

 data() {
    return {
      searchQuery:"",
      allTeams: JSON.parse(localStorage.getItem('allTeams')),
      allPlayers: JSON.parse(localStorage.getItem('allPlayers')),
      relevantTeams: this.relevantTeams,
      relevantPlayers: this.relevantPlayers,
      resultsTeams: "",
      resultsPlayers: "",
      selected: null,
      options: [
        "Sort Team by name",
        "Sort Players by name",
        "Sort Players by Team",
        "Sort Players by position"
      ],
      lastSearchQuery: ""
    };
  },
  methods:{
    searchTeamAndPlayers(){
      this.relevantTeams = []
      this.relevantPlayers = []
      this.resultsTeams = ""
      this.resultsPlayers = ""
      console.log(this.selected)

      // Search relevant teams
      for (let index = 0; index < this.allTeams.length; index++) {
        const element = this.allTeams[index];
        const lower = element.name.toLowerCase()
        if(lower.includes(this.searchQuery.toLowerCase())){
          this.relevantTeams.push(element)
        }        
      }

      if(this.relevantTeams.length === 0){        
        this.resultsTeams = "There are no matching Teams";
      } else if(this.selected === "Sort Team by name") {
        // Sort
        this.relevantTeams = this.relevantTeams.sort((a,b) =>(a.name > b.name ? 1 : -1));
      }
     
      // Search relevant players
      for (let index = 0; index < this.allPlayers.length; index++) {
        const element = this.allPlayers[index];
        const lower = element.name.toLowerCase()
        if(lower.includes(this.searchQuery.toLowerCase())){
          this.relevantPlayers.push(element)
        }        
      }

      if(this.relevantPlayers.length === 0 ){        
        this.resultsPlayers = "There are no matching Players";
      } else if(this.selected === "Sort Players by name"){
        this.relevantPlayers = this.relevantPlayers.sort((a,b) =>(a.name > b.name ? 1 : -1))
      } else if( this.selected === "Sort Players by Team") {
        this.relevantPlayers = this.relevantPlayers.sort((a,b) =>(a.team_name > b.team_name ? 1 : -1))
      } else if( this.selected === "Sort Players by position") {
        this.relevantPlayers = this.relevantPlayers.sort((a,b) =>(a.position_id > b.position_id ? 1 : -1))
      }
    }     
  },  
 
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>