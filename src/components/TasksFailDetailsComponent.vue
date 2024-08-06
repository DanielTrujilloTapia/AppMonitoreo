<template>
    <ion-page>
        <ion-content>
            <ion-card style="margin: 0px;">
                <ion-card-header>

                    <ion-row>
                        <ion-col style="display: flex; justify-content: end;">
                            <p @click.prevent="navigateBack" style="cursor: pointer;">Cerrar</p>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                        <ion-col>
                            <p class="title-size">{{ tarea.nom_tarea }}</p>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                        <ion-col>
                            <p class="subtitle-size">La tarea se entrega: {{ formatDate(tarea.fecha_entrega_falla) }}</p>
                        </ion-col>
                    </ion-row>

                </ion-card-header>
    
                <ion-card-content>
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Planta</ion-label>
                        <p class="text-size">{{ tarea?.plants?.nom_planta || 'Sin planta asignada' }}</p>
                    </ion-item>
                  
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Encargado</ion-label>
                        <p class="text-size" >{{ tarea?.userEncargado?.nom_usuario || 'Sin encargado asignado' }}</p>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Ayudante</ion-label>
                        <p class="text-size" >{{ tarea?.userAyudante?.nom_usuario || 'Sin ayudante asignado' }}</p>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Estatus</ion-label>
                        <p class="text-size" >{{ tarea?.status?.nom_estatus || 'Sin estatus asignado' }}</p>
                    </ion-item>

                    <ion-row>
                        <ion-col sise="10" style="margin: 0px; padding: 0px">
                            <ion-item lines="none">
                                <ion-label class="subtitle-size" position="stacked">Prioridad</ion-label>
                                <p class="text-size" >{{ tarea?.priority?.nom_prioridad || 'Sin prioridad asignada' }}</p>
                            </ion-item>
                        </ion-col>
                        <ion-col size="4" style="display: flex; justify-content: center; align-items: center; padding-top: 20px;">
                            <ion-button>Iniciar</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonRow, IonCol, IonItem, IonLabel } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'ViewTaskDetailsComponent',
    components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonRow,
        IonCol,
        IonItem,
        IonLabel
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
            const taskData = localStorage.getItem('task-fail-detail');
            this.tarea = taskData ? JSON.parse(taskData) : null;

            if (!this.tarea) {
                console.log('No se encontró ninguna tarea en localStorage');
                return;
            }

            // Fetch data from APIs
            try {
                const [responseServices, responsePlants, responseUsers, responsePriorities, responseStatus] = await Promise.all([
                   // fetch('https://localhost:7296/api/Cat_Servicios'),
                    fetch('https://localhost:7296/api/Cat_Plantas'),
                    fetch('https://localhost:7296/api/Usu_Usuarios'),
                    fetch('https://localhost:7296/api/Tareas_Prioridades'),
                    fetch('https://localhost:7296/api/Tareas_Estatus')
                ]);

              //  this.services = await responseServices.json();
                this.plants = await responsePlants.json();
                this.users = await responseUsers.json();
                this.priorities = await responsePriorities.json();
                this.status = await responseStatus.json();

                // Map the task details to the corresponding entities
               // this.tarea.service = this.services.find(service => service.id_servicio === this.tarea.idcatservicios);
                this.tarea.plants = this.plants.find(plant => plant.id_planta === this.tarea.idcatplanta);
                this.tarea.userEncargado = this.users.find(user => user.id_usuario === this.tarea.idusuario_encargado);
                this.tarea.userAyudante = this.users.find(user => user.id_usuario === this.tarea.idusuario_ayudante);
                this.tarea.userAdmin = this.users.find(user => user.id_usuario === this.tarea.idusuario_admin);
                this.tarea.status = this.status.find(status => status.id_estatus === this.tarea.idtareaestatus_falla);
                this.tarea.priority = this.priorities.find(priority => priority.id_prioridad === this.tarea.idtareaprioridad);

            } catch (error) {
                console.log('Sucedió un error:', error);
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} de ${month} de ${year}`;
        },
    },
    created() {
        this.GetDetailsTask();
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
}

p {
    margin: 0;
    padding: 0;
}

ion-item {
    --padding-start: 0px;
    --inner-padding-end: 0px;
    --inner-padding-start: 0px;
    --padding-end: 0px;
    margin: 10px 0;
}

ion-label {
    font-weight: bold;
}

p {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
