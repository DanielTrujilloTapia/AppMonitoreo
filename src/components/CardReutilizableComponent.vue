<template>
    <ion-card style="margin: 0; margin-bottom: 5px; ">
        <ion-grid>
            <ion-row>
                <ion-col size="4" class="container-image">
                    <ion-img @click.prevent="navigateToService" :src="img" class="custom-image imagen-scale"></ion-img>
                </ion-col>
                <ion-col size="8" class="container-text">
                    <div>
                        <p @click.prevent="navigateToService" class="title-size" >{{ title }}</p>
                        <p class="subtitle-size">{{ subtitle }}</p>
                        <ion-item @click.prevent="navigateToCreateService" lines="none" v-if=" textOne != null && permisosAdmin"><ion-icon :icon="iconOne" color="primary" class="custom-icon-card"></ion-icon><p class="text-size"> {{textOne}} </p></ion-item>
                        <ion-item @click.prevent="navigateToViewTasks" lines="none" v-if=" textTwo != null"><ion-icon :icon="iconTwo" color="primary" class="custom-icon-card"></ion-icon><p class="text-size"> {{textTwo}} </p></ion-item>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-card>
</template>

<script>
import { IonCard, IonGrid, IonCol, IonRow, IonImg, IonIcon, IonItem } from '@ionic/vue'
import { useIonRouter } from '@ionic/vue';
import { ref } from 'vue';

export default {
    name: 'CardReutilizableComponent',
    components: {
        IonCard,
        IonGrid,
        IonCol,
        IonRow,
        IonImg,
        IonIcon,
        IonItem
    },
    props: {
        img: String,
        iconOne: String,
        iconTwo: String,
        title: String,
        subtitle: String,
        textOne: String,
        textTwo: String,
        navigate: String,
        RutaOne: String,
        RutaTwo: String
    },
    setup(props) {
        
        const ionRouter = useIonRouter();

        const navigateToService = () => {
          ionRouter.push(props.navigate);
        }
        const navigateToCreateService = () => {
          ionRouter.push(props.RutaOne);
        }
        const navigateToViewTasks = () => {
          ionRouter.push(props.RutaTwo);
        }

        const TypeUserPermissions = localStorage.getItem('User-login');
        const parsedPermissions = JSON.parse(TypeUserPermissions);
        const permisosAdmin = ref(null);

        if (parsedPermissions.idusutipousuario === 1) {
          permisosAdmin.value = true;
        } else {
          permisosAdmin.value = false;
        }

        return {
            navigateToService,
            navigateToCreateService,
            navigateToViewTasks,
            permisosAdmin

        }
    }
}
</script>

<style scoped> 
.container-image{
    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px solid;
    border-image: linear-gradient(transparent 10%, rgb(164, 164, 164) 5%, rgb(164, 164, 164) 50%, rgb(164, 164, 164) 95%, transparent 90%) 1; 
}

.container-text{
    display: flex;
    align-items: center;
    padding-left: 15px;
}

.custom-image {
    width: 140px;
    height: 140px;
}

.custom-icon-card{
    margin-right: 10px;
    width: 20px;
    height: 20px; 
}

.title-size{
    font-size: 16px;
    color: var(--ion-title-color);
    font-weight: bold;
}
.subtitle-size{
    font-size: 14px;
    color: var(--ion-subtitle-color);
    font-weight: bold;
}
.text-size{
    font-size: 14px;
    font-weight: bold;
}

@media screen and (max-width: 760px) {
    .custom-image {
        width: 100px;
        height: 100px;
    }
}


</style>