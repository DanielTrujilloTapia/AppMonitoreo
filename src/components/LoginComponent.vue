<template>
    <ion-page>
        <ion-content>
            <ion-card style="margin: 0px; height: 100%;">
    
                <ion-card style="margin: 0px; height: 180px; border-bottom-left-radius: 50px; border-bottom-right-radius: 50px; background:var(--ion-color-primary);">
                    <div style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
                        <ion-img src="photo-user.png" style="width: 70px; height: 70px;  border: 1px solid #ccc; border-radius: 40px; box-shadow: 0 4px 8px rgba(0, 6, 0, 0.6);"></ion-img>
                        <p style="color: var(--ion-color-white); margin: 10px 0 0 0; font-size: 25px; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Bienvenido</p>
                        <p style="color: var(--ion-color-white); margin: 10px 0 0 0; font-size: 15px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Inicia sesion para comenzar</p>
                    </div>
                </ion-card>
    
                <ion-card-content style="padding-top: 15%;" >
                    <div style="display: flex; flex-direction: column; align-items: center">
                        <ion-input style="margin-bottom: 40px;" fill="outline" label-placement="floating" label="Nombre de Usuario"></ion-input>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; align-items: center">
                        <ion-input style="margin-bottom: 60px;" fill="outline" label-placement="floating" label="Contraseña del Usuario"></ion-input>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; align-items: center">
                        <ion-button style="text-transform: lowercase; " >iniciar sesion</ion-button>
                    </div>
    
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, } from '@ionic/vue';

export default {
    name: 'LoginComponent',
    components: {
        IonPage,
        IonContent,
        IonCard,
    }
}
</script>

<style scoped>

@media (max-width: 599px) {
    ion-button{
        width: 100%;
    }
}

/* Con margen para pantallas de tablet o mayores */
@media (min-width: 600px) {

    ion-input{
        max-width: 500px;
    }
    ion-button{
        width: 500px;
    }
}
</style>
