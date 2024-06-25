<template>
    <ion-menu side="end" content-id="main-content">
        <ion-header class="custom-header">
            asdasd
        </ion-header>

        <ion-content>This is the end menu content.</ion-content>

    </ion-menu>
</template>

<script>
import { IonMenu, IonHeader, IonContent } from '@ionic/vue'

export default {
    nmae: 'MenuComponent',
    components: {
        IonMenu,
        IonHeader,
        IonContent
    }
}
</script>

<style scoped>
.custom-header {
    box-shadow: none;
    background: var(--ion-color-primary);
    height: 150px;
}
</style>