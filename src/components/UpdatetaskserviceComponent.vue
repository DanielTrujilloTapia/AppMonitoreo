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
                        <ion-input v-model="icertarea" label="Nombre tarea" label-placement="floating" fill="outline"></ion-input>
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
                            <ion-select-option v-for="usuayu in usuariosayudantes" :key="usuayu.id_usuario" :value="usuayu.id_usuario">
                                {{ usuayu.nom_usuario }}
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
                        <ion-datetime display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD" v-model="slectfechapublicacion" placeholder="Selecciona una fecha"></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-datetime display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD" v-model="selectfechafinalizacion" placeholder="Selecciona una fecha"></ion-datetime>
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
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonRow, IonCol, IonItem, IonLabel, IonButton, IonInput, IonSelect, IonDatetime, IonSelectOption } from '@ionic/vue';
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
        IonButton,
        IonInput,
        IonSelect,
        IonDatetime,
        IonSelectOption
    },
    data() {
        return {
            tarea: {
                fecha_publicacion_servicio: '',
                fecha_entega_servicio: ''
            },
            services: [],
            plants: [],
            users: [],
            status: [],
            usuariosadmin: [],
            usuariosencargados: [],
            usuariosayudantes: [],
            icertarea: '',
            selectedPlant: '',
            selectedServices: '',
            selectedUserEnc: '',
            selectedUserAyu: '',
            selectedUserAdmin: '',
            selectedStatus: '',
            selectedPriority: '',
            slectfechapublicacion:'',
            selectfechafinalizacion:'',
        };
    },
    setup() {
        const ionRouter = useIonRouter();
        
        const navigateBack = () => {
            ionRouter.back();
        };
        return {
            navigateBack
        };
    },
    methods: {
        async GetDetailsTask() {
            const taskData = localStorage.getItem('id-tarea-s');
            this.tarea = taskData ? JSON.parse(taskData) : {
                fecha_publicacion_servicio: '',
                fecha_entega_servicio: ''
            };

            try {
                const [responseServices, responsePlants, responseUsers, responseStatus] = await Promise.all([
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Servicios'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Plantas'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Usuarios'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Estatus')
                ]);

                this.services = await responseServices.json();
                this.plants = await responsePlants.json();
                this.users = await responseUsers.json();
                this.status = await responseStatus.json();
                
                try {
                    const response = await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Servicios/${this.tarea}`);
                    const tasks = await response.json();
                    this.registrotarea = tasks;
                    console.log(this.registrotarea);

                    // Mapear valores
                    this.icertarea = this.registrotarea.nom_tarea_servicio || '';
                    this.selectedServices = this.registrotarea.idcatservicios || '';
                    this.selectedUserEnc = this.registrotarea.idusuusuario_encargado || '';
                    this.selectedUserAyu = this.registrotarea.idusuusuario_ayudante || '';
                    this.selectedUserAdmin = this.registrotarea.idusuusuario_admin || '';
                    this.selectedPlant = this.registrotarea.idcatplantas || '';
                    this.selectedStatus = this.registrotarea.idtareaestatus_servicio || '';
                    this.selectedPriority = this.registrotarea.idtareasprioridad || '';
                    this.slectfechapublicacion = this.registrotarea.fecha_publicacion_servicio || '';
                    this.selectfechafinalizacion = this.registrotarea.fecha_entega_servicio || '';

                } catch (error) {
                    console.error("Error en la consulta de Tareas:", error);
                }

                this.usuariosencargados = this.users.filter(user => user.idusupuestousuario === 1);
                this.usuariosayudantes = this.users.filter(user => user.idusupuestousuario === 2);
                this.usuariosadmin = this.users.filter(user => user.idusutipousuario === 1);

            } catch (error) {
                console.log('Sucedió un error:', error);
            }
        },

        async atualización() {
            try {
                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Servicios', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_tarea_servicio: this.tarea,
                        nom_tarea_servicio: this.icertarea,
                        idcatservicios: this.selectedServices,
                        idusuusuario_encargado: this.selectedUserEnc,
                        idusuusuario_ayudante: this.selectedUserAyu,
                        idusuusuario_admin: this.selectedUserAdmin,
                        idcatplantas: this.selectedPlant,
                        fecha_publicacion_servicio: this.slectfechapublicacion,
                        fecha_entega_servicio: this.selectfechafinalizacion,
                        idtareaestatus_servicio: this.selectedStatus,
                        idtareasprioridad: this.selectedPriority
                    })
                });
                console.log("Actualizado correctamente");
            } catch (error) {
                console.log("NO se realizó la actualización en tareas servicios", error);
            }
        }
    },
    created() {
        this.GetDetailsTask();
    }
}
</script>

