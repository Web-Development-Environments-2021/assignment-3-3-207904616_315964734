<template>
  <div class="game-preview">
    <div :title="game_id" class="game-title">
      <br/><b>Game Id:</b> {{ game_id }}
    </div>
    <ul class="game-content">
      <li> Home Team: {{ home_team_id }}</li>
      <li> Away Team: {{ away_team_id }}</li>
      <li> Date: {{ date_time }}</li>
      <li> Stadium: {{ stadium }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
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
        type: Number
      },
      away_goals: {
        type: Number
        },

      winner_team_id: {
        type: Number
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 600px;
  height: 187px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  color: aliceblue;
  font-weight: bold;
  /* border-radius: 3px;
  border-width: 5px;
  border-color:cadetblue; */
  /* background-color: #E1EBEE; */
  background-image: url("/soccer-field-2.jpg");
  /* opacity: 0.2; */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-position: center; /* Center the image */

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  #426347;
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
