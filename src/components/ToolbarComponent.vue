<template>
    <ion-toolbar color="primary">
        <ion-title class="title"> {{title}} </ion-title>
        <ion-buttons slot="end" class="custom-icon-menu">
            <ion-menu-button :auto-hide="false"></ion-menu-button>
        </ion-buttons>
    </ion-toolbar>
</template>

<script>
import { IonToolbar, IonTitle, IonButtons, IonMenuButton} from '@ionic/vue'

export default {
    name: 'ToolbarComponent',
    props: {
        title: String
    },
    components: {
        IonToolbar,
        IonTitle,
        IonButtons,
        IonMenuButton,
    },
}
</script>

<style scoped>
.title {
    color: var(--ion-color-white);
}
.custom-icon-menu {
    color: var(--ion-color-white);
}
</style>
