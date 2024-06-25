<template>
    <ion-card style="margin: 0; margin-bottom: 5px; ">
        <ion-grid>
            <ion-row>
                <ion-col size="4" class="container-image">
                    <ion-img :src="img" class="custom-image"></ion-img>
                </ion-col>
                <ion-col size="8" class="container-text">
                    <div>
                        <p class="title-size" >{{ title }}</p>
                        <p class="subtitle-size">{{ subtitle }}</p>
                        <ion-item lines="none" v-if=" textOne != null"><ion-icon :icon="iconOne" color="primary" class="custom-icon-card"></ion-icon><p class="text-size"> {{textOne}} </p></ion-item>
                        <ion-item lines="none" v-if=" textTwo != null"><ion-icon :icon="iconTwo" color="primary" class="custom-icon-card"></ion-icon><p class="text-size"> {{textTwo}} </p></ion-item>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-card>
</template>

<script>
import { IonCard, IonGrid, IonCol, IonRow, IonImg, IonIcon, IonItem } from '@ionic/vue'

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
    }
}
</script>

<style scoped> 
.container-image{
    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px solid;
    border-image: linear-gradient(transparent 1%, white 5%, rgb(100, 100, 100) 50%, white 95%, transparent 100%) 1; 
}

.container-text{
    display: flex;
    align-items: center;
    padding-left: 15px;
}

.custom-image {
    width: 100px;
    height: 100px;
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

</style>