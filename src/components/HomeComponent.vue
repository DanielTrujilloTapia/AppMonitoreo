<template>
    <div>
        <menu-component/>
        
        <ion-page id="main-content">
            <ion-header class="header-toolbar-custom">
                <toolbar-component/>
            </ion-header>
    
            <ion-content>
                <card-reutilizable-component :img="'planificacion-de-tareas.png'" :iconOne="addOutline" :title="'Tareas de Servicios'" :subtitle="'Tareas generadas con servicios'" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
                <card-reutilizable-component :img="'falla2.png'" :title="'Fallas Mecanicas'" :subtitle="'Tareas sobre fallos mecanicos'" :iconOne="addOutline" :textOne="'Crear Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
                <card-reutilizable-component :img="'calendario.png'" :title="'Tareas Automatizadas'" :subtitle="'Tareas automaticas generadas mensualmente'" :iconOne="addOutline" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
                <card-reutilizable-component :img="'vigilancia.png'" :title="'Monitoreo de Tareas'" :subtitle="'Control y supervision de tareas'" :iconOne="eyeOutline" :textOne="'Monitorear tareas'" />
                <card-reutilizable-component :img="'usuario.png'" :title="'Usuarios SITEM'" :subtitle="'Gestionar usuarios existentes'" :iconOne="addOutline" :textOne="'Crear nuevo usuario'" :iconTwo="eyeOutline" :textTwo="'Consultar usuarios'" />
    
            </ion-content>
        </ion-page>
    </div>
</template>

<script>
import { IonPage, IonHeader, IonContent, } from '@ionic/vue';
import MenuComponent from '../components/MenuComponent.vue'
import CardReutilizableComponent from '../components/CardReutilizableComponent.vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import { addOutline, eyeOutline } from 'ionicons/icons';

export default {
    name: 'HomeComponent',
    components: {
        IonPage,
        IonHeader,
        IonContent,
        MenuComponent,
        CardReutilizableComponent,
        ToolbarComponent,
    },
    setup() {
        return {
            addOutline,
            eyeOutline,
        }
    }
}
</script>

<style scoped>

.header-toolbar-custom {
    border: none;
}

</style>
