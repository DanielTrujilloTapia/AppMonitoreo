<template>
    <ion-page>
        <ion-content>
            
            <ion-card style="margin: 0px;">
                <ion-card>
                    <ion-card-header>
                        <ion-row >
                            <ion-col size="12" style="display: flex; justify-content: space-between;">
                                <p style="margin: 0px;" class="title-size">Tus tareas Pendientes</p>
                                <p style="margin: 0px;" class="subtitle-size" @click.prevent="navigateBack">volver</p>
                            </ion-col>
                        </ion-row>
                    </ion-card-header>
                    
                    <ion-card-content style="margin: 0px; padding: 0px; height: 367.5px;">
                        <ion-item v-for="pendiente in paginatedTasksPendiente" :key="pendiente.id_tarea_servicio">
                            <ion-grid>
                                <ion-row>
                                    <ion-col style="margin: 0px;">
                                        <p class="subtitle-size" >{{ pendiente.userEncargado ? pendiente.userEncargado.nom_usuario : 'n/a' }}</p>
                                    </ion-col>
                                    <ion-col style="display: flex; justify-content: end;">
                                        <p class="subtitle-size">{{ formatFecha(pendiente.fecha_entega_servicio)}}</p>    
                                    </ion-col>
                                </ion-row>
    
                                <ion-row>
                                    <ion-col size="10">
                                        <p style="margin: 0px;" class="text-size">{{ pendiente.nom_tarea_servicio }}</p>
                                    </ion-col>
    
                                    <ion-col size="2" style="display: flex; justify-content: end;">
                                        <p style="margin: 0px;" class="text-size">revisar</p>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                            
                        </ion-item>
                    </ion-card-content>

                    <div style="display: flex; justify-content: space-around; text-align: center;">
                        <ion-button fill="clear" @click="prevPagePendiente" :disabled="currentPagePendiente === 1">Anterior</ion-button>
                        <ion-button fill="clear" @click="nextPagePendiente" :disabled="currentPagePendiente >= totalPagesPendiente">Siguiente</ion-button>
                    </div>
                </ion-card>

                <ion-card style="height: 600px;">
                    
                </ion-card>

                <ion-card style="height: 600px;">
                    
                </ion-card>

                <ion-card style="height: 600px;">
                    
                </ion-card>
            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonButton, IonItem, IonGrid, IonRow, IonCol} from '@ionic/vue'
import { useIonRouter } from '@ionic/vue';

export default {
    name:'ViewTasksComponent',
    components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonButton,
        IonItem,
        IonGrid,
        IonRow,
        IonCol
    },
    data(){
        return{
            tasksCompletadas: [],
            tasksNoCompletada: [],
            tasksPendiente: [],
            tasksProceso: [],

            services: [],
            plants: [],
            users: [],
            priorities: [],
            status: [],

            currentPagePendiente: 1,
            pageSizePendiente: 5,
        }
    },
    setup() {
        const ionRouter = useIonRouter();
        
        const navigateBack = () => {
            ionRouter.back();
        };
        return{
            navigateBack
        }
    },
    computed: {
        totalPagesPendiente() {
            return Math.ceil(this.tasksPendiente.length / this.pageSizePendiente);
        },
        paginatedTasksPendiente() {
            const start = (this.currentPagePendiente - 1) * this.pageSizePendiente;
            const end = start + this.pageSizePendiente;
            return this.tasksPendiente.slice(start, end);
        }
    },
    methods: {
        async UpdateStateTask(){
            try {
                const response = await fetch('https://localhost:7296/api/Tareas_Servicios');
                this.tasksUpdates = await response.json();

                for (let i = 0; i < this.tasksUpdates.length; i++) {
                    console.log('tarea numero: ' + i);
                    const tarea = this.tasksUpdates[i];
                    const today = new Date();
                    const fecha_entrega = new Date(tarea.fecha_entega_servicio);

                    if(tarea.idtareaestatus_servicio === 1){
                        console.log('Tarea COMPLETADA');
                    }
                    
                    if (tarea.idtareaestatus_servicio === 4) {
                        if (fecha_entrega < today) {
                            try {
                                await fetch('https://localhost:7296/api/Tareas_Servicios', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        id_tarea_servicio: tarea.id_tarea_servicio,
                                        nom_tarea_servicio: tarea.nom_tarea_servicio,
                                        idcatservicios: tarea.idcatservicios,
                                        idusuusuario_encargado: tarea.idusuusuario_encargado,
                                        idusuusuario_ayudante: tarea.idusuusuario_ayudante,
                                        idusuusuario_admin: tarea.idusuusuario_admin,
                                        idcatplantas: tarea.idcatplantas,
                                        fecha_publicacion_servicio: tarea.fecha_publicacion_servicio,
                                        fecha_entega_servicio: tarea.fecha_entega_servicio,
                                        idtareaestatus_servicio: 2,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambió a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        } else {
                            console.log('Tarea en PROCESO'); // La fecha de entrega aún no ha pasado
                        }
                    }

                    if(fecha_entrega < today){

                        if(tarea.idtareaestatus_servicio === 2){
                            console.log('NO ENTREGADA');
                        }else{
                            try{
                                await fetch('https://localhost:7296/api/Tareas_Servicios', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        id_tarea_servicio: tarea.id_tarea_servicio,
                                        nom_tarea_servicio: tarea.nom_tarea_servicio,
                                        idcatservicios: tarea.idcatservicios,
                                        idusuusuario_encargado: tarea.idusuusuario_encargado,
                                        idusuusuario_ayudante: tarea.idusuusuario_ayudante,
                                        idusuusuario_admin: tarea.idusuusuario_admin,
                                        idcatplantas: tarea.idcatplantas,
                                        fecha_publicacion_servicio: tarea.fecha_publicacion_servicio,
                                        fecha_entega_servicio: tarea.fecha_entega_servicio,
                                        idtareaestatus_servicio: 2,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambio a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        }
                    }

                    if(fecha_entrega > today){
                        if(tarea.idtareaestatus_servicio === 3){
                            console.log('PENDIENTE');
                        } else {
                            try{
                                await fetch('https://localhost:7296/api/Tareas_Servicios', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        id_tarea_servicio: tarea.id_tarea_servicio,
                                        nom_tarea_servicio: tarea.nom_tarea_servicio,
                                        idcatservicios: tarea.idcatservicios,
                                        idusuusuario_encargado: tarea.idusuusuario_encargado,
                                        idusuusuario_ayudante: tarea.idusuusuario_ayudante,
                                        idusuusuario_admin: tarea.idusuusuario_admin,
                                        idcatplantas: tarea.idcatplantas,
                                        fecha_publicacion_servicio: tarea.fecha_publicacion_servicio,
                                        fecha_entega_servicio: tarea.fecha_entega_servicio,
                                        idtareaestatus_servicio: 3,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambio a pendiente');
                            } catch (error) {
                                console.error("Error en el cambio a PENDIENTE");
                            }
                        }
                    }

                }
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }
        },

        async GetTasks() {
            try {
                const responseTasks = await fetch('https://localhost:7296/api/Tareas_Servicios');
                const tasks = await responseTasks.json();

                this.tasksCompletadas = tasks.filter(task => task.idtareaestatus_servicio === 1);
                this.tasksNoCompletada = tasks.filter(task => task.idtareaestatus_servicio === 2);
                this.tasksPendiente = tasks.filter(task => task.idtareaestatus_servicio === 3);
                this.tasksProceso = tasks.filter(task => task.idtareaestatus_servicio === 4);

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responseServices = await fetch('https://localhost:7296/api/Cat_Servicios');
                this.services = await responseServices.json();
                
            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responsePlants = await fetch('https://localhost:7296/api/Cat_Plantas');
                this.plants = await responsePlants.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responseUsers = await fetch('https://localhost:7296/api/Usu_Usuarios');
                this.users = await responseUsers.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responsePriorities = await fetch('https://localhost:7296/api/Tareas_Prioridades');
                this.priorities = await responsePriorities.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responseStatus = await fetch('https://localhost:7296/api/Tareas_Estatus');
                this.status  = await responseStatus.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }


            this.tasksCompletadas = this.tasksCompletadas.map(completa => {
                completa.servicio = this.services.find(service => service.id_servicio == completa.idcatservicios);
                completa.plants = this.plants.find(plant => plant.id_planta == completa.idcatplantas);
                completa.userEncargado = this.users.find(user => user.id_usuario == completa.idusuusuario_encargado);
                completa.userAyudante = this.users.find(user => user.id_usuario == completa.idusuusuario_ayudante);
                completa.userAdmin = this.users.find(user => user.id_usuario == completa.idusuusuario_admin);
                completa.status = this.status.find(status => status.id_estatus == completa.idtareaestatus_servicio);
                completa.priority = this.priorities.find(priority => priority.id_prioridad == completa.idtareasprioridad);
                return completa;
            });

            this.tasksNoCompletada = this.tasksNoCompletada.map(no_completa => {
                no_completa.servicio = this.services.find(service => service.id_servicio == no_completa.idcatservicios);
                no_completa.plants = this.plants.find(plant => plant.id_planta == no_completa.idcatplantas);
                no_completa.userEncargado = this.users.find(user => user.id_usuario == no_completa.idusuusuario_encargado);
                no_completa.userAyudante = this.users.find(user => user.id_usuario == no_completa.idusuusuario_ayudante);
                no_completa.userAdmin = this.users.find(user => user.id_usuario == no_completa.idusuusuario_admin);
                no_completa.status = this.status.find(status => status.id_estatus == no_completa.idtareaestatus_servicio);
                no_completa.priority = this.priorities.find(priority => priority.id_prioridad == no_completa.idtareasprioridad);
                return no_completa;
            });

            this.tasksPendiente = this.tasksPendiente.map(pendiente => {
                pendiente.servicio = this.services.find(service => service.id_servicio == pendiente.idcatservicios);
                pendiente.plants = this.plants.find(plant => plant.id_planta == pendiente.idcatplantas);
                pendiente.userEncargado = this.users.find(user => user.id_usuario == pendiente.idusuusuario_encargado);
                pendiente.userAyudante = this.users.find(user => user.id_usuario == pendiente.idusuusuario_ayudante);
                pendiente.userAdmin = this.users.find(user => user.id_usuario == pendiente.idusuusuario_admin);
                pendiente.status = this.status.find(status => status.id_estatus == pendiente.idtareaestatus_servicio);
                pendiente.priority = this.priorities.find(priority => priority.id_prioridad == pendiente.idtareasprioridad);
                return pendiente;
            });
            this.tasksProceso = this.tasksProceso.map(proceso => {
                proceso.servicio = this.services.find(service => service.id_servicio == proceso.idcatservicios);
                proceso.plants = this.plants.find(plant => plant.id_planta == proceso.idcatplantas);
                proceso.userEncargado = this.users.find(user => user.id_usuario == proceso.idusuusuario_encargado);
                proceso.userAyudante = this.users.find(user => user.id_usuario == proceso.idusuusuario_ayudante);
                proceso.userAdmin = this.users.find(user => user.id_usuario == proceso.idusuusuario_admin);
                proceso.status = this.status.find(status => status.id_estatus == proceso.idtareaestatus_servicio);
                proceso.priority = this.priorities.find(priority => priority.id_prioridad == proceso.idtareasprioridad);
                return proceso;
            });
        },
        formatFecha(fecha) {
            return fecha ? fecha.slice(0, 10) : '';
        },
        formatTiempo(tiempo) {
            return tiempo ? tiempo.slice(11, 16) : '';
        },

        nextPagePendiente() {
            if (this.currentPagePendiente < this.totalPages) {
                this.currentPagePendiente++;
            }
        },
        prevPagePendiente() {
            if (this.currentPagePendiente > 1) {
                this.currentPagePendiente--;
            }
        },

        get_id_task(id_task){

        }
    },
    created(){
        this.UpdateStateTask();
        this.GetTasks();
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

</style>