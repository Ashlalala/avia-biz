<template>

    <div class="overflow-hidden max-w-full rounded ">
      <div :id="id" class="table-bordered table-sm"></div>
    </div>

  
</template>


<script setup>
import { onMounted } from 'vue';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ref, computed } from 'vue';
// import MultiSelect from 'primevue/multiselect';


const props = defineProps({
cols: {
  type: Array,
  required: true,
},
data: {
  type: Array,
  required: true,
},
id: {
  type: String,
  required: true,
},
})
// fixColsAndData()

const isMobile = true

const columns = ref(props.cols)



const table = computed(()=>{
let newTable
if(document.getElementById(props.id)){
  newTable = new Tabulator("#"+props.id, {

    columnDefaults: {
      resizable:false,
      headerSort:false
    },

    layout:"fitDataStretch",

    height:'auto', 
    data: props.data, 
    columnHeaderVertAlign:"bottom",
    columns: columns.value,
    placeholder:"No Data Available", //display message to user on empty table
    placeholderHeaderFilter:"No Matching Data", //display message to user on empty table due to header filters
  });
}else {
  return {}
}
return newTable
})





onMounted(()=>{

console.log(table.value)  // as of now THIS IS A MUST HAVE FOR THE DATA TRABLE TO LOAD probably possible to change to table.redraw()

})



</script>











<style>


@import  "/node_modules/tabulator-tables/dist/css/tabulator.min.css";


.tabulator .table-footer{
  text-align:left;
}

.title-in-row{
background-color: #E6E6E6;

}

.tabulator-header{
background-color: blue;
/* color: black; */

}

tabulator-header-contents{
background-color: blue;
/* color: black; */
}

.tabulator-headers{
background-color: blue;
}

</style>