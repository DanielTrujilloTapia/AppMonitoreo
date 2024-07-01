<template>
  <ion-app>
    <ion-router-outlet/>
    <menu-component/>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import MenuComponent from './components/MenuComponent.vue';
</script>
