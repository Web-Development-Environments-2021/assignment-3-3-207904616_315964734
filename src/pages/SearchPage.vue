<template>
  <div class="box">
    <!-- <h1 class="title">Search Page</h1> -->
    <center>

    <b-input-group prepend="Search" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <!-- <b-button @click="searchTeamAndPlayers" variant="success">Search</b-button><br/> -->
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <b-form-select v-model="selectedTeam" :options="teamNames"></b-form-select>
        <b-form-select v-model="selectedPosition" :options="positionList"></b-form-select>

      </b-input-group-append>
    </b-input-group>
    </center>
      <br/>
      <!-- Your search Query: {{ searchQuery }} -->
      <br/> 
      <div class="container_search">
        <div class="row">
      <div id="teamsDisplay" class="column">        
      <h3>Teams</h3>      
        <!-- <h5>Results: {{resultsTeams}}</h5> -->
        <br/>
        <div class="teamclass">

        <TeamPreview v-for="team in filterTeamsByTeamName" :key="team.id"
        :teamId="team.id" :teamName="team.name" :imageUrl="team.imageUrl"></TeamPreview>
        </div>
      </div>
      <br/> <br/>
          
      <div id ="playersDisplay" class="column"> 
      <h3>Players</h3>
        <!-- <h5>Results: {{resultsPlayers}}</h5>   -->
            <br/>
        <div class="playerclass">
        <PlayerPreview v-for="player in filterPlayerbyPosition" :key="player.id"
          :id="player.id"
          :playerName="player.name"
          :teamName="player.team_name"
          :position="player.position_id"
          :imageUrl="player.imageUrl"></PlayerPreview>        
          </div>         
        </div>
      </div>
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
      selectedTeam: "Select Team",
      selectedPosition: "Select Position",
      allTeams: JSON.parse(localStorage.getItem('allTeams')),
      allPlayers: JSON.parse(localStorage.getItem('allPlayers')),
      relevantTeams: this.relevantTeams,
      relevantPlayers: this.relevantPlayers,
      resultsTeams: "",
      resultsPlayers: "",
      selected: "Sort By Defult",
      options: [
        "Sort By Defult",
        "Sort Team by name",
        "Sort Players by name",
        "Sort Players by Team",
        "Sort Players by position",
      ],
      positionList: [
            "Select Position",
            "Goalkeeper",
            "Defender",
            "Midfielder",
            "Striker"
        ],
      sortedAndFilteredTeams: JSON.parse(localStorage.getItem('allTeams')),
      lastSearchQuery: ""
    };
  },
  computed:{
    teamNames(){
      return ["Select Team",...this.allTeams.map(team => team.name)]
    },
    searchQueryLowerCase(){
      return this.searchQuery.toLowerCase()
    },
    filteredTeams(){
      return this.allTeams.filter(team => team.name.toLowerCase().includes(this.searchQueryLowerCase)) 
    },
    filteredPlayers(){
      return this.allPlayers.filter(player => player.name.toLowerCase().includes(this.searchQueryLowerCase))
    },
    // sortTeamByName(){
    //     return [...this.filteredTeams].sort((a,b) =>(a.name > b.name ? 1 : -1))
    sortTeamDisplay(){
        if (this.selected === "Sort Team by name") {
        // this.sortedAndFilteredTeams = this.sortTeamByName
        return [...this.filteredTeams].sort((a,b) =>(a.name > b.name ? 1 : -1))

        }
        return this.filteredTeams
    },
    sortPlayerDisplay(){
      if  (this.selected === "Sort Players by name"){
         return [...this.filteredPlayers].sort((a,b) =>(a.name > b.name ? 1 : -1))
      } else if( this.selected === "Sort Players by Team") {
         return [...this.filteredPlayers].sort((a,b) =>(a.team_name > b.team_name ? 1 : -1))
      } else if( this.selected === "Sort Players by position") {
         return [...this.filteredPlayers].sort((a,b) =>(a.position_id > b.position_id ? 1 : -1))
      }
      return this.filteredPlayers
    },
    filterPlayersByTeamName(){
      if (this.selectedTeam == "Select Team") return this.sortPlayerDisplay 
    
      return this.sortPlayerDisplay.filter(player => player.team_name === this.selectedTeam)
    },
    filterTeamsByTeamName(){
      if (this.selectedTeam == "Select Team") return this.sortTeamDisplay
       return this.sortTeamDisplay.filter(team => team.name === this.selectedTeam)
    },
    filterPlayerbyPosition(){
      if (this.selectedPosition == "Goalkeeper"){
        return this.filterPlayersByTeamName.filter(player => player.position_id == 1)
      } 
       if (this.selectedPosition == "Defender"){
        return this.filterPlayersByTeamName.filter(player => player.position_id == 2)
      } 
       if (this.selectedPosition == "Midfielder"){
        return this.filterPlayersByTeamName.filter(player => player.position_id == 3)
      } 
       if (this.selectedPosition == "Striker"){
        return this.filterPlayersByTeamName.filter(player => player.position_id == 4)
      } 
      
      return this.filterPlayersByTeamName 
    }
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
  }
}

</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 55%; 

  /* text-align: center */
}
.container_search{
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

.playerclass{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.title{
  color: #1e311b; font-family: 'Lato', sans-serif; font-size: 54px; font-weight: 300; line-height: 58px; margin: 20px 20px 30px; text-align: center
}
.box{
  margin-top: 30px;
}
.teamclass{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>