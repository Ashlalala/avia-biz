<template>
  <div class="flex flex-col items-center justify-center align-center bg-black border border-black border-solid border-2 p-2 gap-2 rounded max-w-full">
    <ion-select @ionChange="console.log(table)" aria-label="Fruit" v-model="selectedColumns" placeholder="Select columns" :multiple="true" class="md:w-20rem w-[800px] 
    border border-solid max-w-full rounded bg-white">
      <ion-select-option v-for="(col, i) in columns" :value="col" :key="i">{{col.title}}</ion-select-option>
    </ion-select>

    <div class="w-[1600px] overflow-hidden border border-solid border-black border-2 outline outline-white max-w-full rounded">
      <div id="example-table" class="table-bordered table-sm"></div>
    </div>

    <div class="flex justify-between w-full">
      <div class="flex gap-2 align-center justify-center text-center ">
        <span class="text-white text-lg">Frozen: </span>
          <!-- <ion-button @click="toggleHeight" class="text-white text-lg"></ion-button> -->
          <ion-select @ionChange="changeFrozen" v-model="frozen" aria-label="Fruit" :placeholder="'Select'" 
          class="text-white">
            <template v-for="(col, i) in columns">
              <ion-select-option  v-if="!col.columns" :value="col" :key="i">{{col.title}}</ion-select-option>
            </template>
          </ion-select>
      </div>
      
      <div>
        <ion-button @click="toggleHeight" class="text-white text-lg">V</ion-button>
      </div>
      
      <div>
        <ion-button id="click-trigger">Table</ion-button>
        <ion-popover trigger="click-trigger" trigger-action="click">
          <ion-content class="ion-padding">
            <ion-accordion-group>
              <ion-accordion value="export">
                <ion-item slot="header" color="light">
                  <ion-label>Export</ion-label>
                </ion-item>
                <div class="ion-padding flex flex-col" slot="content">

                  <button v-for="type in ['xlsx', 'csv', 'pdf', 'json', 'html']" @click="exportTable" :value="type" class="bg-blue-200 border border-solid border-black border-2 
                  text-black p-2">{{type.toUpperCase()}}</button>

                </div>
              </ion-accordion>
              <ion-accordion value="second">
                <ion-item slot="header" color="light">
                  <ion-label>Second Accordion</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">Second Content</div>
              </ion-accordion>
              <ion-accordion value="third">
                <ion-item slot="header" color="light">
                  <ion-label>Third Accordion</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">Third Content</div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-content>
        </ion-popover>
      </div>
    </div>
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
  }
})
// fixColsAndData()

const isMobile = true

const columns = ref(props.cols)

const selectedColumns = ref(columns.value)

const isExpanded = ref(false)

const showColumns = computed(() => {
  return columns.value.filter((s) => {
    for(let i=0; i<selectedColumns.value.length; i++){
      if(selectedColumns.value[i].field == s.field && selectedColumns.value[i].title == s.title) return true
    }
  });
})

const frozen = ref({})


const table = computed(()=>{
  let newTable
  if(document.getElementById('example-table')){
    newTable = new Tabulator("#example-table", {
      pagination:true, //enable.
      paginationSize:20,
      paginationSizeSelector:[10, 20, 50, 100, 500, 1000],

      columnDefaults: {
        resizable:'header',
        headerSortTristate: true,
      },

      resizableColumnGuide: true,
      height:'700px', // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      data: props.data, //assign data to table
      columnHeaderVertAlign:"bottom", //align header contents to bottom of cell
      columns: showColumns.value,

      placeholder:"No Data Available", //display message to user on empty table
      placeholderHeaderFilter:"No Matching Data", //display message to user on empty table due to header filters
    });
  }else {
    return {}
  }
  return newTable
})


function toggleHeight(){
  if(isExpanded.value) {
    table.value.setHeight(700)
    isExpanded.value = false
  }
  else {
    table.value.setHeight(2000)
    isExpanded.value = true
  } 
}
function changeFrozen(){
  table.value.columnManager.columns.forEach(col => {
    if(col.modules.frozen){
      col.updateDefinition({frozen:false})
    }
  })
  table.value.updateColumnDefinition(frozen.value.field, {frozen:true})
}


onMounted(()=>{

  console.log(table.value)  // as of now THIS IS A MUST HAVE FOR THE DATA TRABLE TO LOAD probably possible to change to table.redraw()

})


function exportTable(e){
  const type = e.target.value
  const optXLSX = {
    sheetName: 'AeroBis Data Table',
  }
  const optPDF = {
    orientation:"portrait", //set page orientation to portrait
    title:"Example Report", //add title to report
  }
  const opt = type == 'xlsx' ? optXLSX : type == 'pdf' ? optPDF : {} 
  table.value.download(e.target.value, ("data_table_aeroBis."+e.target.value), opt); //download table data as a XLSX formatted file with a file name of data.xlsx
}

// function fixColsAndData(){
  
//   props.cols.forEach(col=>{
//     if(col.columns) {
//       col.columns.forEach(subCol=>{
//         subCol.headerSortTristate = true
//       })
//     } else {
//       col.headerSortTristate = true
//     }
//   })

// }


</script>











<style>
@import  "/node_modules/tabulator-tables/dist/css/tabulator.min.css";
.tabulator .table-footer{
    text-align:left;
}

.blue-background{
  background-color: blue;
}

</style>