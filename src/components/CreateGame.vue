<template>
 <div>
    
    <b-modal id="createGame" size="lg"
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

      <b-form @submit.prevent="onRegister" @reset.prevent="onReset"> 

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
        >Register</b-button
      >
    </b-form>

      </b-container>

    </b-modal>


  </div>
</template>

<script>
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
        createNewGame(){
            if (homeTeam == awayTeam || referee == "Select Referee" || gameStadium == "Select Stadium"){
                return
            }
        }
    },
    computed:{
    teamNames(){
      return ["Select Team",...this.allTeams.map(team => team.name)]}
  }
  }
</script>