<template>
    <ion-page>
        <ion-card>
            <ion-header>
                <p @click.prevent="navigateBack">volver</p>
            </ion-header>
            {{ tarea.nom_tarea_servicio }}
            <br>
            <br>
            {{ tarea.fecha_publicacion_servicio }}
            <br>
            <br>
            {{ tarea.fecha_entega_servicio }}
            <br>
            <br>
            {{ tarea?.service?.nom_servicio || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.plants?.nom_planta || 'Sin servicio asignado' }}
            {{ tarea?.plants?.descripcion_planta || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.userEncargado?.nom_usuario || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.userAyudante?.nom_usuario || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.userAdmin?.nom_usuario || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.status?.nom_estatus || 'Sin servicio asignado' }}
            <br>
            <br>
            {{ tarea?.priority?.nom_prioridad || 'Sin servicio asignado' }}
        </ion-card>
    </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';


export default {
    name: 'ViewTaskDetailsComponent',
    components: {
        IonPage
    },
    data() {
        return {
            tarea: null,
            services: [],
            plants: [],
            users: [],
            priorities: [],
            status: [],
        }
    },
    setup() {
        const ionRouter = useIonRouter();
        
        const navigateBack = () => {
            ionRouter.back();
        };
        return {
            navigateBack
        }
    },
    methods: {
        async GetDetailsTask() {
            // Obtener la tarea desde localStorage
            const taskData = localStorage.getItem('task-detail');
            this.tarea = taskData ? JSON.parse(taskData) : null;

            if (!this.tarea) {
                console.log('No se encontró ninguna tarea en localStorage');
                return;
            }

            // Fetch data from APIs
            try {
                const [responseServices, responsePlants, responseUsers, responsePriorities, responseStatus] = await Promise.all([
                    fetch('https://localhost:7296/api/Cat_Servicios'),
                    fetch('https://localhost:7296/api/Cat_Plantas'),
                    fetch('https://localhost:7296/api/Usu_Usuarios'),
                    fetch('https://localhost:7296/api/Tareas_Prioridades'),
                    fetch('https://localhost:7296/api/Tareas_Estatus')
                ]);

                this.services = await responseServices.json();
                this.plants = await responsePlants.json();
                this.users = await responseUsers.json();
                this.priorities = await responsePriorities.json();
                this.status = await responseStatus.json();

                // Map the task details to the corresponding entities
                this.tarea.service = this.services.find(service => service.id_servicio === this.tarea.idcatservicios);
                this.tarea.plants = this.plants.find(plant => plant.id_planta === this.tarea.idcatplantas);
                this.tarea.userEncargado = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_encargado);
                this.tarea.userAyudante = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_ayudante);
                this.tarea.userAdmin = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_admin);
                this.tarea.status = this.status.find(status => status.id_estatus === this.tarea.idtareaestatus_servicio);
                this.tarea.priority = this.priorities.find(priority => priority.id_prioridad === this.tarea.idtareasprioridad);

            } catch (error) {
                console.log('Sucedió un error:', error);
            }
        }
    },
    created() {
        this.GetDetailsTask();
    }
}
</script>
