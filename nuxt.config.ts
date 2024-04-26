// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
     'nuxt-primevue', 
    "@nuxtjs/ionic"
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false, //If deploying to iOS or Android, be aware the app must be able to run completely client-side. We recommend setting ssr: false in your nuxt config. Find out more in deploying to both web and device. https://ionic.nuxtjs.org/cookbook/web-and-device

  app: {
    head: {
      title: 'testing title',
      link: [
      //   {rel: "stylesheet", href: "https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css"}
      ],
        script: [
          {type: "text/javascript", src: "https://unpkg.com/vis-timeline@latest/standalone/umd/vis-timeline-graph2d.min.js"}
        ]
    }
  }


})


//[##################] / reify:@capacitor/cli: http fetch GET 200 https://registry.npmjs.org/@capacitor/cli/-/cli-5.7.5.tgz 180463ms (cache miss)