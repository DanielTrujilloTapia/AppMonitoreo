<template >
        <ion-page id="main-content">
            <ion-header class="header-toolbar-custom">
                <toolbar-component :title="'Sitem'"/>
            </ion-header>
    
            <ion-content>
                <card-reutilizable-component :img="'planificacion-de-tareas.png'" :iconOne="addOutline" :title="'Tareas de Servicios'" :subtitle="'Tareas generadas con servicios'" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" :navigate="'/service'" :RutaOne="'/serviceForm'" :RutaTwo="'viewTasks'"/>
                <card-reutilizable-component :img="'falla2.png'" :title="'Fallas Mecanicas'" :subtitle="'Tareas sobre fallos mecanicos'" :iconOne="addOutline" :textOne="'Crear Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" :navigate="'/failures'" :RutaOne="'/failuresForm'" :RutaTwo="null" />
                <card-reutilizable-component :img="'calendario.png'" :title="'Tareas Automatizadas'" :subtitle="'Tareas automaticas generadas mensualmente'" :iconOne="addOutline" :textOne="'Nueva Tarea'" :iconTwo="eyeOutline" :textTwo="'Consultar Tareas'" />
                <card-reutilizable-component :img="'vigilancia.png'" :title="'Monitoreo de Tareas'" :subtitle="'Control y supervision de tareas'" :iconOne="eyeOutline" :textOne="'Monitorear tareas'" />
                <card-reutilizable-component :img="'usuario.png'" :title="'Usuarios SITEM'" :subtitle="'Gestionar usuarios existentes'" :iconOne="addOutline" :textOne="'Crear nuevo usuario'" :iconTwo="eyeOutline" :textTwo="'Consultar usuarios'" />
    
            </ion-content>
        </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, } from '@ionic/vue';
import MenuComponent from '../components/MenuComponent.vue'
import CardReutilizableComponent from '../components/CardReutilizableComponent.vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import { addOutline, eyeOutline } from 'ionicons/icons';
import { Geolocation } from '@ionic-native/geolocation';

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
    },
    methods:{
        async checkLocationEnabled() {
      try {
        const position = await Geolocation.getCurrentPosition();
      } catch (error) {
        if (error.code === error.PERMISSION_DENIED) {
          console.error('Permiso denegado', error);
          this.promptEnableLocation();
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.error('Posición no disponible', error);
          this.promptEnableLocation();
        } else {
          console.error('Error al obtener la ubicación', error);
        }
      }
    },
    },
    created(){
        this.checkLocationEnabled();
    }
}
</script>

<style scoped>

.header-toolbar-custom {
    border: none;
}

</style>
