<template>
  <div class="team_content">

  <b-card  v-on:click="openTeamPage"
    :title= "teamName"
    :img-src= "imageUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem; text-align: center; cursor: pointer;"
    class="mb-2"
  >

  </b-card>
  </div>
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
   data(){
    return {}},

  methods:{
    openTeamPage(){
    this.$router.push(`/team/${this.teamId}`).catch(() => {
        this.$forceUpdate();
      });    
  },
  
}
}
</script>

<style>
.team_content{
  width: 30%;
  margin: 8px;
}

</style>