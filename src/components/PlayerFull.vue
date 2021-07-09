<template>

<div class="container-player-full">
    <div class="row">
      <div class="column">

    
  <b-card
    :title= "playerName"
    :img-src= "imageUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
   
  ></b-card>
  </div>
   <div class="column">
    <b-card-text>
        <ul class="player-content">  
            <!-- <li> Player Id: {{ id }}</li> -->
            <li v-if="teamName"> Team: {{ teamName }}</li>
            <li v-if="playerPos"> Position: {{ playerPos }}</li>  
            <li v-if="common_name"> Common name: {{common_name}}</li>
            <li v-if="nationality"> Nationality: {{nationality}}</li>
            <li v-if="birthDate"> Birth Date: {{birthDate}}</li>
            <li v-if="birthCountry"> Birth Country: {{birthCountry}}</li> 
            <li v-if="height"> height: {{height}}</li>
            <li v-if="weight"> weight: {{weight}}</li>
        </ul> 
    </b-card-text>
    </div>
    </div>
    <!-- <b-button href="#" variant="primary">for more details</b-button> -->
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
        },
        common_name:{
            type: String,
            // required: true
        },
        nationality:{
            type: String,
            // required: true
        },
        birthDate:{
            type: Number,
            // required:true
        },
        birthCountry:{
            type: String,
            // required: true
        },
        height:{
            type: String,
            // required: true
        },
        weight:{
            type: String,
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
.container-player-full{
    width: 100%;
}
.player-content{
    list-style-type: none;
    padding: 20px; 
    margin: 10px;
    color: #1e311b; 
    font-family: 'Lato', sans-serif; 
    font-size: 20px; 
    line-height: 35px;
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
</style>