<template>

  <div>
    <NuxtLayout>
      <NuxtPage />

    </NuxtLayout>
  </div>
</template>

<script setup>
import 'primevue/resources/themes/aura-light-green/theme.css'

import {DateTime} from 'luxon'
window.DateTime = DateTime

useHead({
  script: [
    {
      src: 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    },
    {
      type: 'text/javascript', src: 'https://cdn.scaledrone.com/scaledrone.min.js'
    }
  ]
})

</script>