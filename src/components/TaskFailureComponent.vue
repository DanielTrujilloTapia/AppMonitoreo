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
                        <ion-item v-for="pendiente in paginatedTasksPendiente" :key="pendiente.id_tarea_falla">
                            <ion-grid>
                                <ion-row>
                                    <ion-col style="margin: 0px;">
                                        <p class="subtitle-size" >{{ pendiente.userEncargado ? pendiente.userEncargado.nom_usuario : 'n/a' }}</p>
                                    </ion-col>
                                    <ion-col style="display: flex; justify-content: end;">
                                        <p class="subtitle-size">{{ formatFecha(pendiente.fecha_entrega_falla)}}</p>    
                                    </ion-col>
                                </ion-row>
    
                                <ion-row>
                                    <ion-col size="10">
                                        <p style="margin: 0px;" class="text-size">{{ pendiente.nom_tarea }}</p>
                                    </ion-col>
    
                                    <ion-col size="2" style="display: flex; justify-content: end;">
                                        <p style="margin: 0px;" class="text-size" @click.prevent="Get_task(pendiente)">revisar</p>
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

                <ion-card>
                    <ion-card-header>
                        <ion-row >
                            <ion-col size="12" style="display: flex; justify-content: space-between;">
                                <p style="margin: 0px;" class="title-size">Tareas en Proceso</p>
                                <p style="margin: 0px;" class="subtitle-size" @click.prevent="navigateBack">volver</p>
                            </ion-col>
                        </ion-row>
                    </ion-card-header>
                    
                    <ion-card-content style="margin: 0px; padding: 0px; height: 367.5px;">
                        <ion-item v-for="proceso in paginatedTasksProceso" :key="proceso.id_tarea_falla">
                            <ion-grid>
                                <ion-row>
                                    <ion-col style="margin: 0px;">
                                        <p class="subtitle-size" >{{ proceso.userEncargado ? proceso.userEncargado.nom_usuario : 'n/a' }}</p>
                                    </ion-col>
                                    <ion-col style="display: flex; justify-content: end;">
                                        <p class="subtitle-size">{{ formatFecha(proceso.fecha_entrega_falla)}}</p>    
                                    </ion-col>
                                </ion-row>
    
                                <ion-row>
                                    <ion-col size="10">
                                        <p style="margin: 0px;" class="text-size">{{ proceso.nom_tarea }}</p>
                                    </ion-col>
    
                                    <ion-col size="2" style="display: flex; justify-content: end;">
                                        <p style="margin: 0px;" class="text-size" @click.prevent="Get_task(proceso)">revisar</p>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                            
                        </ion-item>
                    </ion-card-content>

                    <div style="display: flex; justify-content: space-around; text-align: center;">
                        <ion-button fill="clear" @click="prevPageProceso" :disabled="currentPageProceso === 1">Anterior</ion-button>
                        <ion-button fill="clear" @click="nextPageProceso" :disabled="currentPageProceso >= totalPagesProceso">Siguiente</ion-button>
                    </div>
                </ion-card>

                <ion-card>
                    <ion-card-header>
                        <ion-row >
                            <ion-col size="12" style="display: flex; justify-content: space-between;">
                                <p style="margin: 0px;" class="title-size">Tareas Completadas</p>
                                <p style="margin: 0px;" class="subtitle-size" @click.prevent="navigateBack">volver</p>
                            </ion-col>
                        </ion-row>
                    </ion-card-header>
                    
                    <ion-card-content style="margin: 0px; padding: 0px; height: 367.5px;">
                        <ion-item v-for="completa in paginatedTasksCompletadas" :key="completa.id_tarea_falla">
                            <ion-grid>
                                <ion-row>
                                    <ion-col style="margin: 0px;">
                                        <p class="subtitle-size" >{{ completa.userEncargado ? completa.userEncargado.nom_usuario : 'n/a' }}</p>
                                    </ion-col>
                                    <ion-col style="display: flex; justify-content: end;">
                                        <p class="subtitle-size">{{ formatFecha(completa.fecha_entega_falla)}}</p>    
                                    </ion-col>
                                </ion-row>
    
                                <ion-row>
                                    <ion-col size="10">
                                        <p style="margin: 0px;" class="text-size">{{ completa.nom_tarea }}</p>
                                    </ion-col>
    
                                    <ion-col size="2" style="display: flex; justify-content: end;">
                                        <p style="margin: 0px;" class="text-size" @click.prevent="Get_task(completa)">revisar</p>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                            
                        </ion-item>
                    </ion-card-content>

                    <div style="display: flex; justify-content: space-around; text-align: center;">
                        <ion-button fill="clear" @click="prevPageComplete" :disabled="currentPageCompleta === 1">Anterior</ion-button>
                        <ion-button fill="clear" @click="nextPageComplete" :disabled="currentPageCompleta >= totalPagesCompleta">Siguiente</ion-button>
                    </div>
                </ion-card>

                <ion-card>
                    <ion-card-header>
                        <ion-row >
                            <ion-col size="12" style="display: flex; justify-content: space-between;">
                                <p style="margin: 0px;" class="title-size">Tareas no Completadas</p>
                                <p style="margin: 0px;" class="subtitle-size" @click.prevent="navigateBack">volver</p>
                            </ion-col>
                        </ion-row>
                    </ion-card-header>
                    
                    <ion-card-content style="margin: 0px; padding: 0px; height: 367.5px;">
                        <ion-item v-for="no_completa in paginatedTasksNoCompletadas" :key="no_completa.id_tarea_falla">
                            <ion-grid>
                                <ion-row>
                                    <ion-col style="margin: 0px;">
                                        <p class="subtitle-size" >{{ no_completa.userEncargado ? no_completa.userEncargado.nom_usuario : 'n/a' }}</p>
                                    </ion-col>
                                    <ion-col style="display: flex; justify-content: end;">
                                        <p class="subtitle-size">{{ formatFecha(no_completa.fecha_entega_falla)}}</p>    
                                    </ion-col>
                                </ion-row>
    
                                <ion-row>
                                    <ion-col size="10">
                                        <p style="margin: 0px;" class="text-size">{{ no_completa.nom_tarea }}</p>
                                    </ion-col>
    
                                    <ion-col size="2" style="display: flex; justify-content: end;">
                                        <p style="margin: 0px;" class="text-size" @click.prevent="Get_task(no_completa)">revisar</p>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                            
                        </ion-item>
                    </ion-card-content>

                    <div style="display: flex; justify-content: space-around; text-align: center;">
                        <ion-button fill="clear" @click="prevPageNoComplete" :disabled="currentPageNo_Completa === 1">Anterior</ion-button>
                        <ion-button fill="clear" @click="nextPageNoComplete" :disabled="currentPageNo_Completa >= totalPagesNoCompleta">Siguiente</ion-button>
                    </div>
                </ion-card>
            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonButton, IonItem, IonGrid, IonRow, IonCol} from '@ionic/vue'
import { useIonRouter } from '@ionic/vue';

export default {
    name:'TasksDetailFailureComponent',
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

            currentPageProceso: 1,
            pageSizeProceso: 5,

            currentPageNo_Completa: 1,
            pageSizeNo_Completa: 5,

            currentPageCompleta: 1,
            pageSizeCompleta: 5,
        }
    },
    setup() {
        const ionRouter = useIonRouter();
        
        const navigateBack = () => {
            ionRouter.back();
        };
        const navigateToViewTasFailkDetails = () => {
            ionRouter.push('/viewTaskFailsDetails');
        };
        return{
            navigateBack,
            navigateToViewTasFailkDetails
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
        },
        totalPagesProceso() {
            return Math.ceil(this.tasksProceso.length / this.pageSizeProceso);
        },
        paginatedTasksProceso() {
            const start = (this.currentPageProceso - 1) * this.pageSizeProceso;
            const end = start + this.pageSizeProceso;
            return this.tasksProceso.slice(start, end);
        },
        totalPagesCompleta() {
            return Math.ceil(this.tasksCompletadas.length / this.pageSizeCompleta);
        },
        paginatedTasksCompletadas() {
            const start = (this.currentPageCompleta - 1) * this.pageSizeCompleta;
            const end = start + this.pageSizeCompleta;
            return this.tasksCompletadas.slice(start, end);
        },
        totalPagesNoCompleta() {
            return Math.ceil(this.tasksNoCompletada.length / this.pageSizeNo_Completa);
        },
        paginatedTasksNoCompletadas() {
            const start = (this.currentPageNo_Completa - 1) * this.pageSizeNo_Completa;
            const end = start + this.pageSizeNo_Completa;
            return this.tasksNoCompletada.slice(start, end);
        },
    },
    methods: {
        async UpdateStateTask(){
            try {
                const response = await fetch('https://177.17.10.11:7296/api/Tareas_Fallas');
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
                                await fetch('https://177.17.10.11:7296/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: this.tarea.id_tarea_falla,
                                      nom_tarea: this.tarea.nom_tarea,
                                      descripcion_tarea: this.tarea.descripcion_tarea,
                                      fecha_publicacion_falla: this.tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: this.tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 2,
                                      idusuario_admin: this.tarea.idusuario_admin,
                                      idusuario_encargado: this.tarea.idusuario_encargado,
                                      idusuario_ayudante: this.tarea.idusuario_ayudante,
                                      idcatplanta: this.tarea.idcatplanta,
                                     
                                      idtareaprioridad: this.tarea.idtareaprioridad
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

                        if(tarea.idtareaestatus_servicio === 3){
                            try{
                                await fetch('https://177.17.10.11:7296/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: this.tarea.id_tarea_falla,
                                      nom_tarea: this.tarea.nom_tarea,
                                      descripcion_tarea: this.tarea.descripcion_tarea,
                                      fecha_publicacion_falla: this.tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: this.tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 2,
                                      idusuario_admin: this.tarea.idusuario_admin,
                                      idusuario_encargado: this.tarea.idusuario_encargado,
                                      idusuario_ayudante: this.tarea.idusuario_ayudante,
                                      idcatplanta: this.tarea.idcatplanta,
                                     
                                      idtareaprioridad: this.tarea.idtareaprioridad
                                    })
                                });
                                console.log('La tarea se cambio a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        }else{
                            console.log("La tarea conserva su estatus");
                        }
                    }

                    if(fecha_entrega > today){
                        if(tarea.idtareaestatus_servicio === 2) {
                            try{
                                await fetch('https://177.17.10.11:7296/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: this.tarea.id_tarea_falla,
                                      nom_tarea: this.tarea.nom_tarea,
                                      descripcion_tarea: this.tarea.descripcion_tarea,
                                      fecha_publicacion_falla: this.tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: this.tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 3,
                                      idusuario_admin: this.tarea.idusuario_admin,
                                      idusuario_encargado: this.tarea.idusuario_encargado,
                                      idusuario_ayudante: this.tarea.idusuario_ayudante,
                                      idcatplanta: this.tarea.idcatplanta,
                                     
                                      idtareaprioridad: this.tarea.idtareaprioridad
                                    })
                                });
                                console.log('La tarea se cambio a pendiente');
                            } catch (error) {
                                console.error("Error en el cambio a PENDIENTE");
                            }
                        }else{
                            console.log("La tarea conserva su estatus");
                        }
                    }

                }
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }
        },

        async GetTasks() {
            try {
                const responseTasks = await fetch('https://192.168.1.69:7296/api/Tareas_Fallas');
                const tasks = await responseTasks.json();

                const userToLogin = JSON.parse(localStorage.getItem('User-login'));

                if(userToLogin.idusutipousuario === 1){
                    const tareaCompletada = tasks.filter(task => task.idtareaestatus_falla === 1);
                    this.tasksCompletadas = tareaCompletada.filter(TC => TC.idusuario_admin === userToLogin.id_usuario); 

                    const tareaNoCompletada = tasks.filter(task => task.idtareaestatus_falla === 2); 
                    this.tasksNoCompletada = tareaNoCompletada.filter(TNC => TNC.idusuario_admin === userToLogin.id_usuario); 

                    const tareaPendiente = tasks.filter(task => task.idtareaestatus_falla === 3);
                    this.tasksPendiente = tareaPendiente.filter(TP => TP.idusuario_admin === userToLogin.id_usuario); 

                    const tareaProceso = tasks.filter(task => task.idtareaestatus_falla === 4); 
                    this.tasksProceso = tareaProceso.filter(TPRO => TPRO.idusuario_admin === userToLogin.id_usuario); 
                }
                if(userToLogin.idusutipousuario === 2){
                    const tareaCompletada = tasks.filter(task => task.idtareaestatus_falla === 1);
                    this.tasksCompletadas = tareaCompletada.filter(TC => TC.idusuario_encargado === userToLogin.id_usuario || TC.idusuusuario_ayudante === userToLogin.id_usuario ); 

                    const tareaNoCompletada = tasks.filter(task => task.idtareaestatus_falla === 2); 
                    this.tasksNoCompletada = tareaNoCompletada.filter(TNC => TNC.idusuario_encargado === userToLogin.id_usuario || TNC.idusuusuario_ayudante === userToLogin.id_usuario ); 

                    const tareaPendiente = tasks.filter(task => task.idtareaestatus_falla === 3);
                    this.tasksPendiente = tareaPendiente.filter(TP => TP.idusuario_encargado === userToLogin.id_usuario || TP.idusuusuario_ayudante === userToLogin.id_usuario ); 

                    const tareaProceso = tasks.filter(task => task.idtareaestatus_falla === 4); 
                    this.tasksProceso = tareaProceso.filter(TPRO => TPRO.idusuario_encargado === userToLogin.id_usuario || TPRO.idusuusuario_ayudante === userToLogin.id_usuario ); 
                }

            } catch (error) {
                console.log('Sucedio un : ', error);
            }
            /*
            try {
                const responseServices = await fetch('https://localhost:7296/api/Cat_Servicios');
                this.services = await responseServices.json();
                
            } catch (error) {
                console.log('Sucedio un : ', error);
            }
            */

            try {
                const responsePlants = await fetch('https://192.168.1.69:7296/api/Cat_Plantas');
                this.plants = await responsePlants.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responseUsers = await fetch('https://192.168.1.69:7296/api/Usu_Usuarios');
                this.users = await responseUsers.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responsePriorities = await fetch('https://192.168.1.69:7296/api/Tareas_Prioridades');
                this.priorities = await responsePriorities.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }

            try {
                const responseStatus = await fetch('https://192.168.1.69:7296/api/Tareas_Estatus');
                this.status  = await responseStatus.json();

            } catch (error) {
                console.log('Sucedio un : ', error);
            }


            this.tasksCompletadas = this.tasksCompletadas.map(completa => {
               // completa.servicio = this.services.find(service => service.id_servicio == completa.idcatservicios);
                completa.plants = this.plants.find(plant => plant.id_planta == completa.idcatplanta);
                completa.userEncargado = this.users.find(user => user.id_usuario == completa.idusuario_encargado);
                completa.userAyudante = this.users.find(user => user.id_usuario == completa.idusuario_ayudante);
                completa.userAdmin = this.users.find(user => user.id_usuario == completa.idusuario_admin);
                completa.status = this.status.find(status => status.id_estatus == completa.idtareaestatus_falla);
                completa.priority = this.priorities.find(priority => priority.id_prioridad == completa.idtareaprioridad);
                return completa;
            });

            this.tasksNoCompletada = this.tasksNoCompletada.map(no_completa => {
               // no_completa.servicio = this.services.find(service => service.id_servicio == no_completa.idcatservicios);
                no_completa.plants = this.plants.find(plant => plant.id_planta == no_completa.idcatplanta);
                no_completa.userEncargado = this.users.find(user => user.id_usuario == no_completa.idusuario_encargado);
                no_completa.userAyudante = this.users.find(user => user.id_usuario == no_completa.idusuario_ayudante);
                no_completa.userAdmin = this.users.find(user => user.id_usuario == no_completa.idusuario_admin);
                no_completa.status = this.status.find(status => status.id_estatus == no_completa.idtareaestatus_falla);
                no_completa.priority = this.priorities.find(priority => priority.id_prioridad == no_completa.idtareaprioridad);
                return no_completa;
            });

            this.tasksPendiente = this.tasksPendiente.map(pendiente => {
               // pendiente.servicio = this.services.find(service => service.id_servicio == pendiente.idcatservicios);
                pendiente.plants = this.plants.find(plant => plant.id_planta == pendiente.idcatplanta);
                pendiente.userEncargado = this.users.find(user => user.id_usuario == pendiente.idusuario_encargado);
                pendiente.userAyudante = this.users.find(user => user.id_usuario == pendiente.idusuario_ayudante);
                pendiente.userAdmin = this.users.find(user => user.id_usuario == pendiente.idusuario_admin);
                pendiente.status = this.status.find(status => status.id_estatus == pendiente.idtareaestatus_falla);
                pendiente.priority = this.priorities.find(priority => priority.id_prioridad == pendiente.idtareaprioridad);
                return pendiente;
            });
            this.tasksProceso = this.tasksProceso.map(proceso => {
             //   proceso.servicio = this.services.find(service => service.id_servicio == proceso.idcatservicios);
                proceso.plants = this.plants.find(plant => plant.id_planta == proceso.idcatplanta);
                proceso.userEncargado = this.users.find(user => user.id_usuario == proceso.idusuario_encargado);
                proceso.userAyudante = this.users.find(user => user.id_usuario == proceso.idusuario_ayudante);
                proceso.userAdmin = this.users.find(user => user.id_usuario == proceso.idusuario_admin);
                proceso.status = this.status.find(status => status.id_estatus == proceso.idtareaestatus_falla);
                proceso.priority = this.priorities.find(priority => priority.id_prioridad == proceso.idtareaprioridad);
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
            if (this.currentPagePendiente < this.nextPagePendiente) {
                this.currentPagePendiente++;
            }
        },
        prevPagePendiente() {
            if (this.currentPagePendiente > 1) {
                this.currentPagePendiente--;
            }
        },
        nextPageProceso() {
            if (this.currentPageProceso < this.nextPageProceso) {
                this.currentPageProceso++;
            }
        },
        prevPageProceso() {
            if (this.currentPageProceso > 1) {
                this.currentPageProceso--;
            }
        },
        nextPageComplete() {
            if (this.currentPageCompleta < this.nextPageComplete) {
                this.currentPageCompleta++;
            }
        },
        prevPageComplete() {
            if (this.currentPageCompleta > 1) {
                this.currentPageCompleta--;
            }
        },
        nextPageNoComplete() {
            if (this.currentPageNo_Completa < this.nextPageNoComplete) {
                this.currentPageNo_Completa++;
            }
        },
        prevPageNoComplete() {
            if (this.currentPageNo_Completa > 1) {
                this.currentPageNo_Completa--;
            }
        },

        Get_task(task){
            localStorage.setItem('task-fail-detail', JSON.stringify(task));
            this.navigateToViewTaskDetails()
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} de ${month} de ${year}`;
        },
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