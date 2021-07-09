<template>

<div class="container_player">
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
        <ul class="player_content">  
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
    name: "PlayerPreview",    
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
.container_player{
    width: 22%;
    margin: 7px;
}
.player_content{
    list-style-type: none;
     padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
</style>