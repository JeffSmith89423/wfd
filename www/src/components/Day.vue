<template>
    <tr droppable="true" v-on:drop.capture="addItem" ondragover="event.preventDefault()">
        <td class="day">{{dayprop.name}}             </td>
        <td><img :src="dayprop.recipe.imageUrl" class="ian" alt=""></td>
        <td><h5 data-toggle="modal" data-target="#myModal" @click="setActiveRecipe">{{dayprop.recipe.label}}</h5></td>
    </tr>
</template>
<script>
    export default {
        name: 'cookBook',
        props: ["dayprop", "index"],
        data() {
            return {}
        },
        methods: {
            addItem(event) {
                var dinner = JSON.parse(event.dataTransfer.getData('text/javascript'))
                console.log("dinner:", dinner, "Day:", this.dayprop);
                this.$store.dispatch('setDay', {
                    index: this.index,
                    recipe: dinner
                })

            },
            setActiveRecipe() {
                this.$store.dispatch("setActiveRecipe", this.mealprop)
            },
            saveDays(){
                this.$store.dispatch('saveDays', this.days)
            }
        },
        computed: {
            days(){
                return this.$store.state.days
            }
        }
    }
</script>
<style>
    .day {
        width: 2em !important;
    }
    
    div.table-title {
        display: block;
        margin: auto;
        max-width: 600px;
        padding: 5px;
        width: 100%;
    }
    
    .table-title h3 {
        color: #fafafa;
        font-size: 30px;
        font-weight: 400;
        font-style: normal;
        font-family: "Roboto", helvetica, arial, sans-serif;
        text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        text-transform: uppercase;
    }
    /*** Table Styles **/
    
    .table-fill {
        background: white;
        border-radius: 3px;
        border-collapse: collapse;
        height: 320px;
        margin: auto;
        max-width: 600px;
        padding: 5px;
        width: 100%;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        animation: float 5s infinite;
    }
    
    th {
        color: #D5DDE5;
        background-color: #333;
        border-bottom: 4px solid #9ea7af;
        border-right: 1px solid #343a45;
        font-size: 23px;
        font-weight: 100;
        padding: 24px;
        text-align: left;
    }
    
    th:first-child {
        border-top-left-radius: 3px;
    }
    
    th:last-child {
        border-top-right-radius: 3px;
        border-right: none;
    }
    
    tr {
        border-top: 1px solid #C1C3D1;
        border-bottom: 1px solid #C1C3D1;
        color: #666B85;
        font-size: 16px;
        font-weight: normal;
        text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
    }
    
    tr:first-child {
        border-top: none;
    }
    
    tr:last-child {
        border-bottom: none;
    }
    
    tr:last-child td:first-child {
        border-bottom-left-radius: 3px;
    }
    
    tr:last-child td:last-child {
        border-bottom-right-radius: 3px;
    }
    
    td {
        background: #FFFFFF;
        padding: 20px;
        text-align: center;
        vertical-align: middle;
        font-weight: 300;
        font-size: 18px;
        text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        border-right: 1px solid #C1C3D1;
        width: 5em;
    }
    
    td:last-child {
        border-right: 0px;
    }
    
    th.text-left {
        text-align: left;
    }
    
    th.text-center {
        text-align: center;
    }
    
    th.text-right {
        text-align: right;
    }
    
    td.text-left {
        text-align: left;
    }
    
    td.text-center {
        text-align: center;
    }
    
    td.text-right {
        text-align: right;
    }
    
    .ian {
        height: 9rem;
    }
</style>