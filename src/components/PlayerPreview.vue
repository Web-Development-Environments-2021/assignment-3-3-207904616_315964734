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
<div>
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
        <ul class="game-content">  
            <li> Player Id: {{ id }}</li>
            <li> Team: {{ teamName }}</li>
            <li> Position Id: {{ position }}</li>     
        </ul> 
    </b-card-text>

    <b-button href="#" variant="primary">for more details</b-button>
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
    }
}
</script>

<style>

</style>