<template>
 <div>
    
    <b-modal id="createGame" size="lg" :hide-footer="true"
      title="Create New Game"
      :home-team="homeTeam"
      :away-team="awayTeam"
      :game-date="gameDate"
      :game-hour="gameHour"
      :game-stadium="gameStadium"
      :referee="referee"
       @ok="createNewGame"
    >
      <b-container fluid>

      <b-form @submit.prevent="createNewGame" @reset.prevent="onReset"> 

        <b-row class="mb-1">
          <b-col cols="2">Home Team</b-col>
          <b-col>
            <b-form-select
              v-model="homeTeam"
              :options="teamNames"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="2">Away Team</b-col>
          <b-col>
            <b-form-select
              v-model="awayTeam"
              :options="teamNames"
            ></b-form-select>
          </b-col>

        </b-row>

        <b-row class="mb-1">
          <b-col cols="2">Stadium</b-col>
          <b-col>
            <b-form-select
              v-model="gameStadium"
              :options="stadiumList"
            ></b-form-select>
          </b-col>

        </b-row>

        <b-row class="mb-1">
          <b-col cols="2">Date</b-col>
          <b-col>

            <b-form-datepicker v-model="gameDate" id="example-datepicker"  class="mb-2" ></b-form-datepicker>

          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="2">Hour</b-col>
          <b-col>

            <b-time v-model="gameHour" locale="en" :hour12="false" ></b-time>

          </b-col>

        </b-row>

        <b-row class="mb-1">
          <b-col cols="2">Referee</b-col>
          <b-col>
            <b-form-select
              v-model="referee"
              :options="refereeList"
            ></b-form-select>
          </b-col>

        </b-row>

      <b-button type="reset" variant="secondary">Reset</b-button>
      <b-button
        type="submit"
        variant="success"
        style="width:250px;"
        class="ml-5 w-75"
        >Create Game</b-button
      >
    </b-form>

      </b-container>

    </b-modal>


  </div>
</template>

<script>
import {bus} from "../main";

  export default {
    data() {
    //   // 15th two months prior
     
      return {
     
        allTeams: JSON.parse(localStorage.getItem('allTeams')),
        refereeList: ["Select Referee", "1", "2", "3", "4"],
        stadiumList: ["Select Stadium", "Old Trafford", "Anfield Road", "San Siro", "The Maracanã", "Santiago Bernabeu", "Camp Nou"],
        homeTeam: 'Select Team',
        awayTeam: 'Select Team',
        gameDate: '',
        gameHour: '',
        gameStadium: 'Select Stadium',
        referee: 'Select Referee'
      }
    },    
    methods:{
        async createNewGame(){
          // if (this.homeTeam == this.awayTeam || this.referee == "Select Referee" || this.gameStadium == "Select Stadium" ||
          //   this.gameDate == '' || this.gameHour == '' ){
          //     return false
          // }

          let dateTime = this.gameDate + " " + this.gameHour

          if(this.homeTeam == this.awayTeam){
            this.$root.toast("Create failed", "Home and Away teams are the same", "danger");
            this.onReset()
            return false;
          } else if(this.homeTeam == 'Select Team') {
            this.$root.toast("Create failed", "Home team isn't chosen", "danger");
            this.onReset()
            return false;            
          } else if(this.awayTeam == 'Select Team'){
            this.$root.toast("Create failed", "Away team isn't chosen", "danger");
            this.onReset()
            return false;        
          } else if(this.gameStadium === 'Select Stadium'){
            this.$root.toast("Create failed", "Stadium isn't chosen", "danger");
            this.onReset()
            return false;      
          } else if(this.gameDate == ''){
            this.$root.toast("Create failed", "Date isn't chosen", "danger");
            this.onReset()
            return false; 
          } else if(this.gameHour == ''){
            this.$root.toast("Create failed", "Hour isn't chosen", "danger");
            this.onReset()
            return false; 
          } else if(this.referee == 'Select Referee'){
            this.$root.toast("Create failed", "Referee isn't chosen", "danger");
            this.onReset()
            return false; 
          } else if(new Date(dateTime) < new Date()){
            this.$root.toast("Create failed", "Please Enter future Date", "danger");
            this.onReset()
            return false; 
          }

          try{
            // Create game post
            const response = await this.axios.post("http://localhost:3000/manage/createGame",
            {
              home_team_id: this.homeTeamIdSelected,
              away_team_id: this.awayTeamIdSelected,
              date_time: dateTime,
              stadium: this.gameStadium,
              referee_id: this.referee
            });
            this.$root.toast("Game created", "Game created suuccessfully", "success");
            this.onReset()
            //////
            bus.$emit("updateGamesInCurStage", "hello fired" )
            this.$bvModal.hide("createGame")
            ////////
          }catch (err) {
            this.$root.toast("Create failed", "Game wasnt created", "danger");
            this.onReset()            
            console.log(err.response);
            this.form.submitError = err.response.data.message;
          }


        },
        onReset(){
          this.homeTeam = 'Select Team',
          this.awayTeam = 'Select Team',
          this.gameDate = '',
          this.gameHour = '',
          this.gameStadium = 'Select Stadium',
          this.referee = 'Select Referee'
        },
        validateState(param) {
          const { $dirty, $error } = this.$v.form[param];
          return $dirty ? !$error : null;
        },
    },
    computed:{
    teamNames(){
      return ["Select Team",...this.allTeams.map(team => team.name)]
    },
    homeTeamIdSelected(){
      return this.allTeams.filter(team => team.name == this.homeTeam)[0].id
    },
    awayTeamIdSelected(){
      return this.allTeams.filter(team => team.name == this.awayTeam)[0].id
    },
  }
  }
</script>