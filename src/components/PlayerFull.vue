<template>
 <!-- <div class="card" style="width: 18rem;">
    <ul class="game-content">
      <li> Pic: {{imageUrl}}</li>
      <li>Player Name: {{playerName}} </li>
      <li> Player Id: {{ id }}</li>
      <li> Team: {{ teamName }}</li>
      <li> Position Id: {{ position }}</li>     
    </ul> 
</div> -->
<div class="container">
  <b-card
    :title= "playerName"
    :img-src= "imageUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
   
  >
    <b-card-text>
        <ul class="player-content">  
            <!-- <li> Player Id: {{ id }}</li> -->
            <li> Team: {{ teamName }}</li>
            <li> Position: {{ playerPos }}</li>     
        </ul> 
    </b-card-text>

    <!-- <b-button href="#" variant="primary">for more details</b-button> -->
  </b-card>
</div>
</template>

<script>
export default {
    name: "PlayerFull",    
    props: {
        id: {
            type: Number,
            required: true
        },
        playerName:{
            type: String,
            required: true
        },
        teamName:{
            type: String,
            // required: true
        },
        imageUrl:{
            type: String,
            // required: true
        },
        position:{
            type: Number,
            // required:true
        }
    },
    data() {
    return {
        positionList: [
            "Goalkeeper",
            "Defender",
            "Midfielder",
            "Striker"
        ]
    }
    },
    computed:{
        playerPos(){
            return this.positionList[this.position -1]
        }
    }
}
</script>

<style>
.container{
    width: 50%;
}
.player-content{
list-style-type: none;
padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
</style>