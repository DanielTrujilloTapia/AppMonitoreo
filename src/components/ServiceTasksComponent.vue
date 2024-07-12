<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>
        
        <ion-content>
            <ion-card>
                <div>
                    <p>ServiciosTask</p>
                    <p>Este apartado nos permite asignar tareas a los empleados acerca de un servicio</p>
                    <p>Por otro lado contamos con una gran variedad de servicios para brindar mantenimiento potimo <a href="/service">Servicios</a></p>
                </div>
            </ion-card>

            <ion-card>
                <div style="display: flex; justify-content: space-between">
                    <p class="title-size">Tareas Asignadas</p>
                    <p class="subtitle-size">Ver Todas</p>
                </div>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
            </ion-card>
            
            <ion-card>
                <div style="display: flex; justify-content: space-between">
                    <p class="title-size">Pendientes</p>
                    <p class="subtitle-size">Ver Todas</p>
                </div>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
            </ion-card>

            <ion-card>
                <div style="display: flex; justify-content: space-between">
                    <p class="title-size">No Completadas</p>
                    <p class="subtitle-size">Ver Todas</p>
                </div>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
                <ion-item>
                    <p>Servicio 1</p>
                    <p slot="end">05/07/2024</p>
                </ion-item>
            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonItem } from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'

export default {
    name: 'ServiceTasksComponent',
    components: {
        IonPage,
        IonHeader,
        ToolbarComponent,
        IonContent,
        IonCard,
        IonItem
    }
}
</script>

<style scoped>
.title-size{
    font-size: 16px;
    color: var(--ion-title-color);
    font-weight: bold;
    padding-left: 16px;
}
.subtitle-size{
    font-size: 14px;
    color: var(--ion-subtitle-color);
    font-weight: bold;
    padding-right: 20px;
}
</style>