<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>
        
        <ion-content>
            <ion-card>
                <div class="header-card-custom">
                    <p>Servicios</p>

                    <ion-buttons>
                        <ion-button>
                            <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </div>
                    
                    <p>
                        Como empresa SITEM brindamos servicios de mantenimiento de la mas alta calidad para que sus equipos den el 100% 
                        de su rendimiento
                    </p>

                    <p>Por otro lado contamos con una gran variedad de servicios para brindar mantenimiento optimo <a>servicios</a></p>
            </ion-card>

            <card-tareas-reutilizable-component :title="'Pendientes'" :Status="3"/>
            <card-tareas-reutilizable-component :title="'No Completada'" :Status="2"/>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonItem } from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CardTareasReutilizableComponent from '../components/CardTareasReutilizableComponent.vue'
import { addOutline, personCircle } from 'ionicons/icons'

export default {
    name: 'ServiceTasksComponent',
    components: {
        IonPage,
        IonHeader,
        ToolbarComponent,
        IonContent,
        IonCard,
        CardTareasReutilizableComponent,
    },
    setup() {
        return{
            addOutline,
            personCircle
        }
    }
}
</script>

<style scoped>

.header-card-custom {
    display: flex;
    justify-content: space-between;
}
</style>