<template>
<div class="container_player">
  <b-card v-on:click="openModal"
    :title= "player.name"
    :img-src= "player.imageUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem; cursor: pointer;"
    class="mb-2"
    
   
  >
  
    <b-card-text>
        <ul class="player_content" >  
            <!-- <li> Player Id: {{ id }}</li> -->
            <li> Team <b>{{ this.player.team_name }}</b></li>
            <li> Position <b>{{ playerPos }}</b></li>     
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
        player: {
            type: Object
        }
    //     id: {
    //         type: Number,
    //         required: true
    //     },
    //     playerName:{
    //         type: String,
    //         required: true
    //     },
    //     teamName:{
    //         type: String,
    //         // required: true
    //     },
    //     imageUrl:{
    //         type: String,
    //         // required: true
    //     },
    //     position:{
    //         type: Number,
    //         // required:true
    //     }
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
            return this.positionList[this.player.position_id -1]
        }
    },
    methods:
    {
        openModal(){
            this.$emit("firePlayer", this.player)
            
        }
    }
}
</script>

<style>
.container_player{
    width: 22%;
    margin: 7px;
    cursor: pointer;
}
.player_content{
    list-style-type: none;
     padding: 0; /* Remove padding */
     margin: 0; /* Remove margins */
  
}
</style>