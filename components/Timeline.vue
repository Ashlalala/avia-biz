<template>
  <div class="w-full flex justify-center">

    <div class="w-[1650px] max-h-[800px] overflow-y-scroll border border-solid border-black border-2 outline outline-white max-w-full rounded">
      <div id="visualization" :class="isPopup && isMobile ? 'hidden' : ''"></div>
      <!-- <div id="visualization" ></div> -->
    </div>
  </div>

  <div class="bg-white p-8 rounded-lg shadow-md">
        <form @submit.prevent="submitForm" class="flex flex-col sm:grid sm:grid-cols-2 md:sm:grid-cols-4 gap-6">
            <div class="flex flex-col">
                <label class="text-lg mb-1">STD:</label>
                <input type="datetime-local" v-model="formData.std" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="flex flex-col">
                <label class="text-lg mb-1">PTD:</label>
                <input type="datetime-local" v-model="formData.ptd" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="flex flex-col">
                <label class="text-lg mb-1">ETD:</label>
                <input type="datetime-local" v-model="formData.etd" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="flex flex-col">
                <label class="text-lg mb-1">ATD:</label>
                <input type="datetime-local" v-model="formData.atd" class="border border-gray-300 rounded-lg p-2">
            </div>

            <!-- <div class="flex flex-col">
                <label class="text-lg mb-1">ABN:</label>
                <input type="datetime-local" v-model="formData.abn" class="border border-gray-300 rounded-lg p-2">
            </div> -->

            <div class="flex flex-col">
                <label class="text-lg mb-1">STA:</label>
                <input type="datetime-local" v-model="formData.sta" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="flex flex-col">
                <label class="text-lg mb-1">PTA:</label>
                <input type="datetime-local" v-model="formData.pta" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="flex flex-col">
                <label class="text-lg mb-1">ETA:</label>
                <input type="datetime-local" v-model="formData.eta" class="border border-gray-300 rounded-lg p-2">
            </div>

            <!-- <div class="flex flex-col">
                <label class="text-lg mb-1">TDN:</label>
                <input type="datetime-local" v-model="formData.tdn" class="border border-gray-300 rounded-lg p-2">
            </div> -->

            <div class="flex flex-col">
                <label class="text-lg mb-1">ATA:</label>
                <input type="datetime-local" v-model="formData.ata" class="border border-gray-300 rounded-lg p-2">
            </div>

            <div class="col-span-1"</div>
            <button type="submit" class="col-span-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
    </div>


  <div v-if="isPopup" @click="isPopup = false" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div @click.stop class="bg-white rounded-lg shadow-md">
      <!-- Popup Content Goes Here -->
      
      <div class="">
        <div class="flex justify-between p-4">
          <h2 class="text-lg font-semibold mb-4">Flight {{currFlight.id}}</h2>

          <button @click="isPopup = false" class="text-gray-600 hover:text-gray-800">
            X
          </button>
        </div>

        <div v-if="!isMobile" class="flex flex-col items-center justify-center align-center w-full max-w-full gap-2">
          <MiniDataTable id="table1" :cols="columns" :data="currFlight.data" class="w-[565px]" />
          <MiniDataTable id="table2" :cols="columns2" :data="currFlight.data2" class="w-[565px]" />
          <MiniDataTable id="table3" :cols="columns3" :data="currFlight.data3" class="w-[565px]" />
        </div>  
        <div v-else class="flex flex-col items-center justify-center align-center w-full max-w-full gap-4 z-90">
          <div class="border border-black border-4">

            <MiniDataTable id="table1a" :cols="formatToMobile(columns).a" :data="currFlight.data" class="w-screen sm:w-[565px]" />
            <MiniDataTable id="table1b" :cols="formatToMobile(columns).b" :data="currFlight.data" class="w-screen sm:w-[565px]" />
          </div>


          <div class="border border-black border-4">

            <MiniDataTable id="table2a" :cols="formatToMobile(columns2).a" :data="currFlight.data2" class="w-screen sm:w-[565px]" />
            <MiniDataTable id="table2b" :cols="formatToMobile(columns2).b" :data="currFlight.data2" class="w-screen sm:w-[565px]" />
          </div>

          <div class="border border-black border-4">
            
            <MiniDataTable id="table3a" :cols="formatToMobile(columns3).a" :data="currFlight.data3" class="w-screen sm:w-[565px]" />
            <MiniDataTable id="table3b" :cols="formatToMobile(columns3).b" :data="currFlight.data3" class="w-screen sm:w-[565px]" />
          </div>
        </div>  
      </div>

    </div>
  </div>

</template>





<script setup>

const columns = [
   { title: "FLIGHT DETAILS", columns: [ 
      { title: "", field: "titleDep", cssClass:"title-in-row"},
      { title: "DEPARTURE", field: "dep", },
      { title: "", field: "titleArr", cssClass:"title-in-row"},
      { title: "ARRIVAL", field: "arr", },
    ]
},


  { title: "PAX BKD - PNL", width: 500, columns: [ 

      { title: "", field: "titleTotal1", cssClass:"title-in-row"},
      { title: "TOTAL", field: "total1", width: 100 },
    ]
  },

  { title: "PAX ACT - LDM", columns: [ 

      { title: "", field: "titleTotal2", cssClass:"title-in-row"},
      { title: "TOTAL", field: "total2", width: 100},
    ]
  },
]
const columns2 = [
{ title: "", field: "title", cssClass:"title-in-row"},
{ title: "BAGGAGE PCs / WT", field: "1", },
{ title: "CARGO PCs / WT", field: "2", },
{ title: "EIC", field: "3", },
{ title: "MAIL", field: "4", },
{ title: "TOTAL", field: "5", },
]
const columns3 = [
{ title: "FUEL", field: "title", cssClass:"title-in-row"},
{ title: "IN TANKS", field: "1", },
{ title: "UPLIFTED", field: "2", },
{ title: "DEPARTURE", field: "3", },
{ title: "UTILISED", field: "4", },
{ title: "ARRIVAL", field: "5", },
{ title: "DEFUEL", field: "6", },
]



const formData = ref({
  std: '',
  ptd: '',
  etd: '',
  atd: '',
  abn: '',
  sta: '',
  pta: '',
  eta: '',
  tdn: '',
  ata: ''
})

const currFlight = ref({
  data: [],
})

const getContent = (from, to) => {
    const item = document.createElement('div');
    item.classList.add('custom-timeline-item'); // Add your custom class here

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'center';

    const leftContent = document.createElement('div');
    leftContent.textContent = to;

    const centerContent = document.createElement('div');
    centerContent.style.display = 'flex';
    centerContent.style.flexDirection = 'column';
    centerContent.style.textAlign = 'center';

    const para1 = document.createElement('p');
    para1.textContent = 'L0 384';

    const para2 = document.createElement('p');
    para2.textContent = 'A756';

    const rightContent = document.createElement('div');
    rightContent.textContent = from;

    centerContent.appendChild(para1);
    centerContent.appendChild(para2);

    container.appendChild(leftContent);
    container.appendChild(centerContent);
    container.appendChild(rightContent);

    item.appendChild(container);

    return item;
}


const res = ref({})


const isMobile = false

const isPopup = ref(false)


function formatToMobile(arr){
    console.log('org', arr);
    let ans = {
      a:arr[0].columns ? arr.slice(0, 1) : arr.slice(0,3),
      b:arr[0].columns ? arr.slice(1) : [...arr.slice(0, 1), ...arr.slice(3)]
    }
    console.log('ans', ans);
    return ans

}



// create groups
var numberOfGroups = 5;
var groups = new vis.DataSet();
for (let i = 0; i < numberOfGroups; i++) {
  groups.add({
    id: i,
    content: "Track " + i,
  });
}




onMounted(async() => {

  await fetchAllFlights()


  // create items
  var numberOfItems = res.value.all.length;
  var items = new vis.DataSet();

  var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);

  for (let i = 0; i < numberOfItems; i++) {
    // var date = new Date('2003-03-1'+truck+'T17:08:11.714Z');
    var date = new Date(res.value.all[i].departure);

      date.setHours(date.getHours() + 4 * (Math.random() < 0.2));
      var start = new Date(date);

      date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
      var end = new Date(date);

      items.add({
        id: res.value.all[i].id + 'R' + Math.random(),
        group: Math.floor(Math.random() * 5),
        start: start,
        end: end,
        className: 'text-white bg-black',
        content: getContent(res.value.all[i].from, res.value.all[i].to),
        editable:false,
      });
    
  }

  // specify options
  var options = {
    // stack: false,
    // verticalScroll: true,
    // horizontalScroll: true,

  //   editable:{
  //     add: false,
  //     remove: false,
  //     updateGroup: false,
  //     updateTime: false,
  //     overrideItems: false
  // },
    zoomKey: "",
    maxHeight: 2000,
    start: new Date(new Date().valueOf()-1000*60*60*24/2),
    end: new Date(1000 * 60 * 60 * 24 / 2 + new Date().valueOf()),
    editable: true,
    margin: {
      item: 2, // minimal margin between items
      axis: 2, // minimal margin between items and the axis
    },
    orientation: "top",

    groupHeightMode: 'fixed',

  };


  // create a Timeline
  var container = document.getElementById("visualization");
  const timeline = new vis.Timeline(container, items, groups, options);


  timeline.on('click', async function(e){
    console.log(e);
    if(e.item) {
      await fetchFlight(e.item)
      isPopup.value = true
    }


  })


})


async function fetchFlight(id){
  console.log('item id for the fetch:', id);
  res.value.curr = await $fetch('http://localhost:8000/api/flight/' + id, {
    method: "GET"
  })
  console.log(res.value.curr);
  format(res.value.curr)
}

async function fetchAllFlights(id){
  console.log('item id for the fetch:', id);
  res.value.all = await $fetch('http://localhost:8000/api/flight', {
    method: "GET"
  })
  console.log('res.value.all');

  console.log(res.value.all);
}


function format(flight){
  let a = flight.flight_info_a
  let b = flight.flight_info_b
  let c = flight.flight_info_c

  let ttt = '2024-04-03 09:29:34'

  const data = [
    {titleDep: 'STD', dep:	a.std.slice(5), titleArr: 'STA', arr:	a.sta.slice(5), titleTotal1:	'F', total1: '',	titleTotal2:	'F', total2: '' 	},
    {titleDep: 'PTD', dep:	a.ptd.slice(5), titleArr: 'PTA', arr:	a.pta.slice(5), titleTotal1:	'F', total1: '',	titleTotal2:	'F', total2: '' 	},
    {titleDep: 'ETD', dep:	a.etd.slice(5), titleArr: 'ETA', arr:	a.eta.slice(5), titleTotal1:	'F', total1: '',	titleTotal2:	'F', total2: '' 	},
    {titleDep: 'ATD', dep:	a.atd.slice(5), titleArr: 'ATA', arr:	a.ata.slice(5), titleTotal1:	'F', total1: '',	titleTotal2:	'F', total2: '' 	},
  ]

  const data2 = [  
    {title: 'TOTAL', 1:	b.baggage, 2: b.cargo, 3:	b.eic, 4:	b.mail, 5: b.total, },
  ]

  const data3 = [
  {title: 'TOTAL',  1:	c.in_tanks, 2: c.uplifted, 3:	c.departure, 4:	c.utilised, 5: c.arrival,  6:	c.defuel},
  ]

  currFlight.value.id = flight.id

  currFlight.value.data = data
  currFlight.value.data2 = data2
  currFlight.value.data3 = data3

  formData.value = {
  std: a.std,
  ptd: a.ptd,
  etd: a.etd,
  atd: a.atd,
  abn: 'a.abn',// abn: a.abn,
  sta: a.sta,
  pta: a.pta,
  eta: a.eta,
  tdn: 'a.tdn',// tdn: a.tdn,
  ata: a.ata
  }


}


</script>



<style>
.custom-timeline-item{
  width: 100%;
  font-size:smaller;
}

.vis-item .vis-item-content{
  width: 100%;
  padding: 0;
}
</style>