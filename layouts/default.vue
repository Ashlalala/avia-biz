<template>
<ion-menu content-id="main-content">
  <ion-header>
    <ion-toolbar>
      <ion-title>Menu Content</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding flex flex-col gap-6">
    <div>
      <a href="/" class="w-full bg-green-500">Table</a>
    </div>
    <div>
      <a href="/test">Timeline</a>
    </div>
    <div>
      <a href="/chat">Chat</a>
    </div>

  </ion-content>
</ion-menu>
<ion-page id="main-content">
  <ion-header class="mb-10">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>
  <div class="mt-[200px]">
    <slot />
  </div>
</ion-page>

</template>