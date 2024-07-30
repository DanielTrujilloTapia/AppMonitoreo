<template>
    <ion-page>
        <ion-content>
            <div class="position-card">
                <ion-card class="card-custom">
                    asdasdasdasd
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'

export default {
    name: 'LoginComponent',
    components: {
        IonPage,
        IonContent
    }
}
</script>

<style scoped>

@media (max-width: 599px) {
    .card-custom {
        margin: 0;
        
    }
}

/* Con margen para pantallas de tablet o mayores */
@media (min-width: 600px) {
    .card-custom {
        margin: 16px; /* Ajusta este valor según tus necesidades */
        height: 667px;
        width: 400px;
    }

    .position-card{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .card-position{
        display: flex;
        justify-content: center;
        align-content: center;
    }
}

</style>