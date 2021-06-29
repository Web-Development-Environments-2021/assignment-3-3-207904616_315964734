<template>
  <b-card
    :title= "teamName"
    :img-src= "imageUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
        <ul class="game-content">              
            <li> Team Id: {{ teamId }}</li>               
        </ul> 
    </b-card-text>

    <b-button href="#" variant="primary">for games</b-button>
  </b-card>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      teamId: {
        type: Number,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
      imageUrl:{
          type: String
      }
  }, 
}
</script>

<style>


</style>