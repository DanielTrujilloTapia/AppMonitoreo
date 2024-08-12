<template>
    <ion-page>
        <ion-content>
            <ion-card style="margin: 0px;" >
                <ion-grid>

                    <ion-card style="margin: 0px 2px 5px 2px;">

                        <ion-card-header>
                            <p class="title-size">Formulario Servicio</p>
                            <p class="subtitle-size">Recuerda que el nombre debe de describir y ser intuitivo para el lector</p>
                        </ion-card-header>

                        <ion-card-content>
                            <ion-input v-model="nameService" maxlength="100" counter="true"  fill="outline" label-placement="floating" label="Nombre del Servicio nuevo" placeholder="SERVICIO 10 MANTENIMIENTO DE COMPUTO"></ion-input>
                        </ion-card-content>
                    </ion-card>
                    
                    <ion-card style="margin: 0px 2px 2px 2px;">
                        <ion-card-header>
                            <p class="subtitle-size">El texto debe describir a detalle el servicio para que no haya malos entendidos a futuro con el servicio. Incluye los objetivos, métodos y plazos de entrega, así como cualquier condición o limitación que pueda aplicarse. Especifica las responsabilidades del proveedor y del cliente, y detalla las expectativas de comunicación y los procedimientos para la resolución de problemas. Una descripción clara y completa ayudará a evitar malentendidos y asegurará que todas las partes tengan una comprensión compartida de lo que se espera.</p>
                        </ion-card-header>
    
                        <ion-card-content>
                            <ion-textarea v-model="descripcionService" style="height: 600px;" class="custom-textarea" :auto-grow="true" label="Descripción de la falla" label-placement="floating" fill="outline" placeholder="Descripción"></ion-textarea>

                            <ion-row style="margin: 30px 0px 30px 0px"> 
                                <ion-col style="display: flex; justify-content: center;">
                                    <ion-buttons>
                                        <ion-button @click.prevent="navigateToService()" style="--border-radius: 20px;" color="primary">
                                            cancelar
                                        </ion-button>
                                    </ion-buttons>
                                </ion-col> 
                                <ion-col style="display: flex; justify-content: center;">
                                    <ion-button style="--border-radius: 20px;" @click.prevent="CreateService()">
                                        crear servicio
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
    
                    </ion-card>

                </ion-grid>
                        
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonButtons, IonButton, } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'CreateServiceFormComponent',
    components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonTextarea,
        IonButtons,
        IonButton,
    },
    data() {
        return {
            nameService: null,
            descripcionService: null
        }
    },
    setup() {

        const ionRouter = useIonRouter();
            
        const navigateToService = () => {
            ionRouter.back();
        };
        
        return {
            navigateToService,
            arrowBack,
        }
    },
    methods: {
        async CreateService(){

            if(this.nameService !== null && this.descripcionService !== null){

                console.log(this.nameService);
                console.log(this.descripcionService);

                try {
                    const createdService = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Servicios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nom_servicio: this.nameService,
                        descripcion_servicio: this.descripcionService
                    })
                });

                if (createdService.ok) {
                    console.log('EL SERVICIO se creo CORRECTAMENTE');
                    this.navigateToService();
                }

                } catch (error) {
                    console.log('Algo fallo al crear el SERVICIO: ', error);
                }
            }else{
                this.nameService == null;
                this.descripcionService == null;

                console.log(this.nameService);
                console.log(this.descripcionService);
                alert('Rellena todos los campos del formulario');
            }
        }  
    }

}

</script>

<style scoped>
.title-size{
    font-size: 15px;
    color: var(--ion-title-color);
    font-weight: bold;
    text-align: justify;
}

.subtitle-size{
    font-size: 14px;
    color: var(--ion-subtitle-color);
    text-align: justify;
}

.text-size{
    font-size: 13px;
    text-align: justify;
    padding-left: 3px ;
    padding-right: 3px ;
}
</style>