<template>
    <ion-card style="margin: 0; margin-bottom: 5px; margin-top: 5px;">
        <ion-grid>
            <ion-row>
                <ion-col size="4" class="container-image">
                    <ion-img :src="img" class="custom-image"></ion-img>
                </ion-col>
                <ion-col size="8" class="container-text">
                    <div>
                        <p>{{ title }}</p>
                        <p>{{ subtitle }}</p>
                        <p v-if=" textOne != null" ><ion-icon :icon="iconOne" color="success" ></ion-icon> {{textOne}}</p>
                        <p v-if=" textTwo != null" ><ion-icon :icon="iconTwo" color="success" ></ion-icon> {{textTwo}}</p>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-card>
</template>

<script>
import { IonCard, IonGrid, IonCol, IonRow, IonImg, IonIcon } from '@ionic/vue'

export default {
    name: 'CardReutilizableComponent',
    components: {
        IonCard,
        IonGrid,
        IonCol,
        IonRow,
        IonImg,
        IonIcon
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

<style>
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

ion.icon{
    margin-right: 5px; 
}

</style>