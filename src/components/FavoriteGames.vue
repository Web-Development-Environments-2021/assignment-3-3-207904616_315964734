<template>
  <div>
    <GamePreview
      v-for="g in this.favGames"
      :id="g.game_id" 
      :hostTeam="g.home_team_id" 
      :guestTeam="g.away_team_id" 
      :date="g.date_time"
      :stadium="g.stadium" 
      :key="g.game_id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  async data() {
    // return {
    //   games: [
    //     {
    //       id:25,
    //       hostTeam: "Maccabi Tel-Aviv",
    //       guestTeam: "Hapoel Beer-Sheva",
    //       date: "27/5/21",
    //       hour: "20:00"
    //     },
    //     {
    //       id:39,
    //       hostTeam: "Hapoel Tel-Aviv",
    //       guestTeam: "Maccabi Haifa",
    //       date: "29/5/21",
    //       hour: "20:00"
    //     }
    //   ]
    // };
    try {
        const response = await this.axios.get(
          "http://localhost:3000/favorites/getGames",
        );
        const games = response.data;
        this.favGames = [];
        this.favGames.push(...games);
        console.log(response.data);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
  },
  // methods: {
  //   async updateGames(){
  //     console.log("response");
  //     try {
  //       const response = await this.axios.get(
  //         "http://localhost:3000/games/favoriteGames",
  //       );
  //       const games = response.data.games;
  //       this.games = [];
  //       this.games.push(...games);
  //       console.log(response);
  //     } catch (error) {
  //       console.log("error in update games")
  //       console.log(error);
  //     }
  //   }
  // }, 
  // mounted(){
  //   console.log("favorite games mounted");
  //   this.updateGames(); 
  // }
};
</script>

<style></style>
