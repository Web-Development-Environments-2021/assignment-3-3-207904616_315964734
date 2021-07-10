<template>
  <div class="box">
    <!-- <h1 class="title">Search Page</h1> -->
    <center>

    <b-input-group prepend="Search" id="search-input">
      <b-form-input v-debounce:300ms="saveQuery" v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <!-- <b-button @click="searchTeamAndPlayers" variant="success">Search</b-button><br/> -->
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <b-form-select v-model="selectedTeam" :options="teamNames"></b-form-select>
        <b-form-select v-model="selectedPosition" :options="positionList"></b-form-select>
          <!-- <b-button v-b-modal.modal-player>modal</b-button> -->

          </b-input-group-append>
    </b-input-group>
    </center>
      <br/>
      <!-- Your search Query: {{ searchQuery }} -->
      <br/> 
      <div class="container_search">
        <div class="row">
      <div id="teamsDisplay" class="column">        
      <center><h3>Teams</h3></center>      
        <!-- <h5>Results: {{resultsTeams}}</h5> -->
        <br/>
        <div class="teamclass">
        <div v-if="zeroTeams"><center><h2 >No Result</h2></center></div>

        <TeamPreview v-for="team in filterTeamsByTeamName" :key="team.id"
        :teamId="team.id" :teamName="team.name" :imageUrl="team.imageUrl"></TeamPreview>
        </div>
      </div>
      <br/> <br/>
          
      <div id ="playersDisplay" class="column"> 
      <center><h3>Players</h3></center>
            <br/>
        <div class="playerclass">

        <div v-if="zeroPlayers"><center><h2 >No Result</h2></center></div>

        <PlayerPreview v-for="player in filterPlayerbyPosition" :key="player.id"
          :player="player" 
          @firePlayer="funcToPopPlayerModal"
          ></PlayerPreview>        
          </div>         
        </div>
      </div>
      </div>
    

  <b-modal id="modal-player" title="Player Card" size="lg" :hide-footer="true" >
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
import PlayerFull from '../components/PlayerFull.vue';
import PlayerPreview from '../components/PlayerPreview.vue'
import TeamPreview from "../components/TeamPreview.vue";

export default {
 
 components:{   
  PlayerPreview: PlayerPreview,
  TeamPreview: TeamPreview,
  PlayerFull: PlayerFull
 },

 data() {
    return {
      showPlayerModal: false,
      playerClicked: {},
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
      lastSearchQuery: "",
    };
  },
  mounted(){
    if (localStorage.getItem("LastQuery")){
    this.searchQuery = localStorage.getItem("LastQuery")
    }
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
    },
    
    zeroTeams(){
      if (this.filterTeamsByTeamName.length == 0) return true 
      return false
    },
    zeroPlayers(){
    if (this.filterPlayerbyPosition.length == 0) return true 
      return false
    }
    },
  methods:{

    funcToPopPlayerModal(player){
      this.$bvModal.show("modal-player")
      this.playerClicked = player
    },

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
    },
    saveQuery(data){
      // console.log(data)
      localStorage.setItem("LastQuery", data)
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