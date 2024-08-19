<template>
    <ion-page>
        <ion-content>
            <ion-card style="margin: 0px;">
                <ion-card-header>
                    <ion-row>
                        <h1>Actualización de tarea Falla</h1>
                        <ion-col style="display: flex; justify-content: end;">
                            <p @click.prevent="navigateBack" style="cursor: pointer;">Cerrar</p>
                        </ion-col>
                    </ion-row>
                </ion-card-header>

                <ion-card-content>
                    <ion-item lines="none">
                        <ion-input v-model="icertarea" label="Nombre tarea" label-placement="floating" fill="outline"></ion-input>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-textarea style="height: 200px;" v-model="desctarea" :auto-grow="true" label="Descripción de la falla" label-placement="floating" fill="outline" placeholder="Descripción"></ion-textarea>
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
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonRow, IonCol, IonItem, IonLabel, IonButton, IonInput, IonSelect, IonDatetime, IonSelectOption, IonTextarea } from '@ionic/vue';
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
        IonSelectOption,
        IonTextarea
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
            desctarea: '',
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
                const [ responsePlants, responseUsers, responseStatus] = await Promise.all([
                  //  fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Servicios'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Plantas'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Usuarios'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Estatus')
                ]);

               // this.services = await responseServices.json();
                this.plants = await responsePlants.json();
                this.users = await responseUsers.json();
                this.status = await responseStatus.json();
                
                try {
                    const response = await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas/${this.tarea}`);
                    const tasks = await response.json();
                    this.registrotarea = tasks;
                    console.log(this.registrotarea);

                    // Mapear valores
                    this.icertarea = this.registrotarea.nom_tarea || '';
                  //  this.selectedServices = this.registrotarea.idcatservicios || '';
                    this.desctarea = this.registrotarea.descripcion_tarea || '';
                    this.selectedUserEnc = this.registrotarea.idusuario_encargado || '';
                    this.selectedUserAyu = this.registrotarea.idusuario_ayudante || '';
                    this.selectedUserAdmin = this.registrotarea.idusuario_admin || '';
                    this.selectedPlant = this.registrotarea.idcatplanta || '';
                    this.selectedStatus = this.registrotarea.idtareaestatus_falla || '';
                    this.selectedPriority = this.registrotarea.idtareaprioridad || '';
                    this.slectfechapublicacion = this.registrotarea.fecha_publicacion_falla || '';
                    this.selectfechafinalizacion = this.registrotarea.fecha_entrega_falla || '';

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
                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_tarea_falla: this.tarea,
                        nom_tarea: this.icertarea,
                        descripcion_tarea: this.desctarea,
                        fecha_publicacion_falla: this.slectfechapublicacion,
                        fecha_entrega_falla: this.selectfechafinalizacion,
                        idtareaestatus_falla: this.selectedStatus,
                        idusuario_admin: this.selectedUserAdmin,
                        idusuario_encargado: this.selectedUserEnc,
                        idusuario_ayudante: this.selectedUserAyu,
                        idcatplanta: this.selectedPlant,
                        idtareaprioridad: this.selectedPriority
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

