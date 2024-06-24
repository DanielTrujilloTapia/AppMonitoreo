<template>
    <ion-toolbar>
        <ion-title>SITEM</ion-title>
        <ion-icon :icon="listOutline" slot="end" class="custom-icon"></ion-icon>
    </ion-toolbar>
</template>

<script>
import { IonToolbar, IonTitle, IonIcon } from '@ionic/vue'
import { listOutline } from 'ionicons/icons';

export default {
    name: 'ToolbarComponent',
    components: {
        IonToolbar,
        IonTitle,
        IonIcon,
    },
    setup() {

        return {
            listOutline
        }
    }
}
</script>

<style>

.custom-icon{
    width: 30px;
    height: 30px;
    margin-right: 15px;
}

</style>
