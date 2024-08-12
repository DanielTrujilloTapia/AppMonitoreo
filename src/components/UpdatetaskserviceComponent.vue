<template>
    <ion-page>
        <ion-content>
            <ion-card style="margin: 0px;">
                <ion-card-header>

                    <ion-row>
                        <h1>Actualización de tarea</h1>
                        <ion-col style="display: flex; justify-content: end;">
                            <p @click.prevent="navigateBack" style="cursor: pointer;">Cerrar</p>
                        </ion-col>
                    </ion-row>

                </ion-card-header>
    
                <ion-card-content>
                    <ion-item lines="none">
                        <ion-input label="Nombre tarea" label-placement="floating" fill="outline" placeholder="Enter text" v-model="tarea.nom_tarea_servicio"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedServices" placeholder="Selecciona un servicio">
                            <ion-select-option v-for="service in services" :key="service.id_servicio" :value="service.id_servicio">
                                {{ service.nom_servicio }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedUserEnc" placeholder="Selecciona un usuario encargado">
                            <ion-select-option v-for="usuenc in usuariosencargados" :key="usuenc.id_usuario" :value="usuenc.id_usuario">
                                {{ usuenc.nom_usuario }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedUserAyu" placeholder="Selecciona un usuario ayudante">
                            <ion-select-option v-for="usuenc in usuariosayudantes" :key="usuenc.id_usuario" :value="usuenc.id_usuario">
                                {{ usuenc.nom_usuario }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedUserAdmin" placeholder="Selecciona un usuario administrador">
                            <ion-select-option v-for="usuenc in usuariosadmin" :key="usuenc.id_usuario" :value="usuenc.id_usuario">
                                {{ usuenc.nom_usuario }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedPlant" placeholder="Selecciona una planta">
                            <ion-select-option v-for="plant in plants" :key="plant.id_planta" :value="plant.id_planta">
                                {{ plant.nom_planta }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-datetime display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD" v-model="tarea.fecha_publicacion_servicio" placeholder="Selecciona una fecha"></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-datetime display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD" v-model="tarea.fecha_entega_servicio" placeholder="Selecciona una fecha"></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-select v-model="selectedStatus" placeholder="Selecciona un Estatus">
                            <ion-select-option v-for="stat in status" :key="stat.id_estatus" :value="stat.id_estatus">
                                {{ stat.nom_estatus }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                   <ion-button @click.prevent="atualización">Actualizar</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonRow, IonCol, IonItem, IonLabel, IonButton } from '@ionic/vue';
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
        IonLabel,
        IonButton
    },
    data() {
        return {
            tarea: null,
            services: [],
            plants: [],
            users: [],
            priorities: [],
            status: [],
            usuariosadmin:[],
            usuariosencargados:[],
            usuariosayudantes:[],

            selectedPlant: null,
            selectedServices:null,
            selectedUserEnc:null,
            selectedUserAyu:null,
            selectedStatus:null,
            selectedPriority:null,

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
            const taskData = localStorage.getItem('id-tarea-s');
            this.tarea = taskData ? JSON.parse(taskData) : null;

            if (!this.tarea) {
                console.log('No se encontró ninguna tarea en localStorage');
                return;
            }

            // Fetch data from APIs
            try {
                const [responseServices, responsePlants, responseUsers, responsePriorities, responseStatus] = await Promise.all([
                    fetch('https://177.17.10.11:7296/api/Cat_Servicios'),
                    fetch('https://177.17.10.11:7296/api/Cat_Plantas'),
                    fetch('https://177.17.10.11:7296/api/Usu_Usuarios'),
                    fetch('https://177.17.10.11:7296/api/Tareas_Prioridades'),
                    fetch('https://177.17.10.11:7296/api/Tareas_Estatus')
                ]);

                this.services = await responseServices.json();
                this.plants = await responsePlants.json();
                this.users = await responseUsers.json();
                this.priorities = await responsePriorities.json();
                this.status = await responseStatus.json();

                //mapeo usuarios
                this.usuariosencargados = this.users.find(user => user.idusutipousuario === 2);
                this.usuariosayudantes = this.users.find(user => user.idusutipousuario === 3);
                this.usuariosadmin = this.users.find(user => user.idusutipousuario === 1);

                // Map the task details to the corresponding entities
                this.tarea.service = this.services.find(service => service.id_servicio === this.tarea.idcatservicios);
                this.tarea.plants = this.plants.find(plant => plant.id_planta === this.tarea.idcatplantas);
                this.tarea.userEncargado = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_encargado);
                this.tarea.userAyudante = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_ayudante);
                this.tarea.userAdmin = this.users.find(user => user.id_usuario === this.tarea.idusuusuario_admin);
                this.tarea.status = this.status.find(status => status.id_estatus === this.tarea.idtareaestatus_servicio);
                this.tarea.priority = this.priorities.find(priority => priority.id_prioridad === this.tarea.idtareasprioridad);

                this.selectedServices = this.tarea.service.id_servicio;
                this.selectedUserEnc = this.tarea.userEncargado.id_usuario;
                this.selectedUserAyu = this.tarea.userAyudante.id_usuario;
                this.selectedUserAdmin = this.tarea.userAdmin.id_usuario;
                this.selectedPlant = this.tarea.plants.id_planta;
                this.selectedStatus = this.tarea.status.id_estatus;
                this.selectedPriority = this.tarea.priority.id_prioridad;

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

        async atualización(){
            try {
                        await fetch('https://177.17.10.11:7296/api/Tareas_Servicios', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                    id_tarea_servicio: this.tarea.id_tarea_servicio,
                                      nom_tarea_servicio: this.tarea.nom_tarea_servicio,
                                      idcatservicios: this.selectedServices,
                                      idusuusuario_encargado: this.selectedUserEnc,
                                      idusuusuario_ayudante: this.selectedUserAyu,
                                      idusuusuario_admin: this.selectedUserAdmin,
                                      idcatplantas: this.selectedPlant,
                                      fecha_publicacion_servicio: this.tarea.fecha_publicacion_servicio,
                                      fecha_entega_servicio: this.tarea.fecha_entega_servicio,
                                      idtareaestatus_servicio: this.selectedStatus,
                                      idtareasprioridad: this.selectedPriority
                                    })
                                });
                    } catch (error) {
                        console.log("NO se realizo el registro en tarea servicios", error);
                    }
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
