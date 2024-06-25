<template>
    <ion-toolbar>
        <ion-title>Sitem</ion-title>
        <ion-buttons slot="end">
            <ion-menu-button :auto-hide="false"></ion-menu-button>
        </ion-buttons>
    </ion-toolbar>
</template>

<script>
import { IonToolbar, IonTitle, IonButtons, IonMenuButton} from '@ionic/vue'

export default {
    name: 'ToolbarComponent',
    components: {
        IonToolbar,
        IonTitle,
        IonButtons,
        IonMenuButton,
    },
    setup() {

        return {
            
        }
    }
}
</script>

<style>

</style>
