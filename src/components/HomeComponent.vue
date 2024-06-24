<template>
    <ion-page>
        <ion-header>
            <toolbar-component></toolbar-component>
        </ion-header>
        <ion-content>
            <card-reutilizable-component :img="'planificacion-de-tareas.png'" :iconOne="addCircleOutline" :title="'Servicios SITEM'" :subtitle="'Tareas generadas con servicios'" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
            <card-reutilizable-component :img="'falla2.png'" :title="'Fallas Mecanicas'" :subtitle="'Tareas sobre fallos mecanicos'" :iconOne="addCircleOutline" :textOne="'Crear Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
            <card-reutilizable-component :img="'calendario.png'" :title="'Tareas Automatizadas'" :subtitle="'Tareas automaticas generadas mensualmente'" :iconOne="addCircleOutline" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
            <card-reutilizable-component :img="'vigilancia.png'" :title="'Monitoreo de Tareas'" :subtitle="'Control y supervision de tareas'" :iconOne="eyeOutline" :textOne="'Monitorear tareas'" />
            <card-reutilizable-component :img="'usuario.png'" :title="'Usuarios SITEM'" :subtitle="'Gestionar usuarios existentes'" :iconOne="addCircleOutline" :textOne="'Crear nuevo usuario'" :iconTwo="eyeOutline" :textTwo="'Consultar usuarios'" />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import CardReutilizableComponent from '../components/CardReutilizableComponent.vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import { addCircleOutline, eyeOutline } from 'ionicons/icons';

export default {
    name: 'HomeComponent',
    components: {
        IonPage,
        IonHeader,
        IonContent,
        CardReutilizableComponent,
        ToolbarComponent,
        
    },
    setup() {
        return {
            addCircleOutline,
            eyeOutline
        }
    }
}
</script>

<style>
</style>