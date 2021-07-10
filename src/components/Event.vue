<template>
  <div class="container-event-details">
    <ul class="event-properties">
      <li>Event Id: {{id}}</li>
      <li>Date: {{date}}</li>
      <li>Time: {{time}}</li>
      <li>Minute: {{minute}}</li>
      <li>Description: {{description}}</li>
   </ul>
  </div>
</template>

<script>
export default {
    name:"Event",
    props:{
        id:{
            type: Number,
            required: true
        },
        date_time:{
            type: String,
            required:true
        },
        minute:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    },
    computed:{
        date(){
        return new Date(this.date_time.split("T")[0]).toDateString()
        },
        time(){
        return this.date_time.split("T")[1].split(".")[0]
        },
    }

}
</script>

<style>
.container-event-details{
    list-style-type: none;
    width: 30%;
    margin: 5px;
}
.event-properties{    
    border-radius: 15px;
    border: 2px solid #A8A8A8;
    padding: 5px; 
    width: 130px;
    height: auto;    
    list-style-type: none; 
    font-size: 11px;
    margin: 0;
}

</style>