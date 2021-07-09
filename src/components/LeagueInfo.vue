<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      img-src="/Superliga.png"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <!-- <b-card-title>{{leagueName}}</b-card-title> -->
      <b-card-title >
        <br/>
        Season: {{ season }}
        <br/>
        <br/>
        Stage: {{ stage }}
      </b-card-title>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
  </div>
</template>

<script>
export default {
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
  text-align: center;
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

</style>