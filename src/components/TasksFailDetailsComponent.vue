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
                            <ion-button v-if="btninicio" @click.prevent="inicio">Iniciar</ion-button>
                            <ion-button v-if="btnfin" @click.prevent="finalizar" color="danger">Finalizar</ion-button>
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
            btninicio: true,
            btnfin: false,
            tipouser: null,
            id_monitoreo:null,

            ubi:null,
            ubicacionDetallada: null,
            direccion: null,
            lat:null,
            lon:null,
            latestatica:null,
            lonestatica:null,
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
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Plantas'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Usuarios'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Prioridades'),
                    fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Estatus')
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

                this.direccion= this.tarea.plants.ubicacion;
                console.log(this.tarea.plants.ubicacion);
                this.obtenerCoordenadas(this.direccion);

            } catch (error) {
                console.log('Sucedió un error:', error);
            }
        },

        usuariologeado(){
            const userToLogin = JSON.parse(localStorage.getItem('User-login'));
            console.log(this.tarea.status.idtareaestatus_falla);
            console.log(userToLogin.idusutipousuario);

            if(userToLogin.idusutipousuario === 1){
                this.btninicio= false;
                this.btnfin= false;
                console.log("Usuario administrador");
            }else{
                if(this.tarea.status.idtareaestatus_falla===4){
                    this.btninicio=false;
                    this.btnfin= true;
                    console.log("Traea en proceso");
                }else if(this.tarea.status.idtareaestatus_falla===2){
                    this.btninicio= false;
                    this.btnfin= false;
                    console.log("Traea en Completada/No Completada");
                }else if(this.tarea.status.idtareaestatus_falla===1){
                    this.btninicio= false;
                    this.btnfin= false;
                    console.log("Traea en Completada/No Completada");
                }
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} de ${month} de ${year}`;
        },

        async obtenerCoordenadas(direccion) {
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
              this.coordenadas = {
                lat: data[0].lat,
                lon: data[0].lon
              };
              this.latestatica=this.coordenadas.lat;
              this.lonestatica=this.coordenadas.lon;
              console.log('latitud estatica ',this.latestatica, 'longitud estatica', this.lonestatica);
            } else {
              alert('No se encontraron coordenadas para la ubicacion de la planta. Por favor notificar al administrador');
            }
          } catch (error) {
            console.log('Error al obtener las coordenadas', error);
          }
        },

        async obtenerUbicacion() {
            try {
                const obtenerPosicion = () => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                };

                const position = await obtenerPosicion();
                this.ubi = position;
                this.lat = this.ubi.coords.latitude;
                this.lon = this.ubi.coords.longitude;
                console.log(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
            } catch (error) {
                alert('Error al obtener la ubicación', error);
            }
        },

        async inicio(){
            const nlat= parseFloat(this.latestatica);
            const nlon= parseFloat(this.lonestatica);
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();
            const sumalat = nlat + 0.02;
            const reslat = nlat - 0.02;
            const sumalong = nlon + 0.02;
            const reslong = nlon - 0.02;

            console.log(`Rango de latitud: ${reslat} a ${sumalat}`);
            console.log(`Rango de longitud: ${reslong} a ${sumalong}`);

            if (this.lat >= reslat && this.lat <= sumalat) {
                if (this.lon >= reslong && this.lon <= sumalong) {

                    try {
                        await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: this.tarea.id_tarea_falla,
                                      nom_tarea: this.tarea.nom_tarea,
                                      descripcion_tarea: this.tarea.descripcion_tarea,
                                      fecha_publicacion_falla: this.tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: this.tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 4,
                                      idusuario_admin: this.tarea.idusuario_admin,
                                      idusuario_encargado: this.tarea.idusuario_encargado,
                                      idusuario_ayudante: this.tarea.idusuario_ayudante,
                                      idcatplanta: this.tarea.idcatplanta,
                                     
                                      idtareaprioridad: this.tarea.idtareaprioridad
                                    })
                                });
                    } catch (error) {
                        console.log("NO se realizo el registro en tarea servicios", error);
                    }
                    
                    console.log("TAREA INICIADA");
                    try {
                        await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            idtareafalla: this.tarea.idtareafalla ,
                            fecha_inicio_falla: fechaFormateada,
                            fecha_finalizacion_falla: null,
                            }) 
                        });
                        this.btninicio=false;
                        this.btnfin=true;  
                        this.consulta_monitoreo();
                    } catch (error) {
                        console.log("NO se realizo el registro en monitoreo", error);
                    }
                } else {
                    console.log("La longitud sobrepasa el rango establecido");
                }
            } else {
                console.log("La latitud sobrepasa el rango establecido");
            }
        },
        async finalizar(){
            console.log("fin jaja");
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();
        
            const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas');
            const tablamonitoreo = await response.json();
            const registromonitoreo = tablamonitoreo.filter(tmon => tmon.id_monitoreo_servicio === this.id_monitoreo);
            
            try {
                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_monitoreo_falla:this.id_monitoreo.id_monitoreo_falla,
                    idtareafalla: this.id_monitoreo.idtareafalla,
                    fecha_inicio_falla: this.id_monitoreo.fecha_inicio_falla,
                    fecha_finalizacion_falla: fechaFormateada,
                    }) 
                });
            } catch (error) {
                console.log("NO se realizo el registro en monitoreo", error);
            }
            
            try {
                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: this.tarea.id_tarea_falla,
                                      nom_tarea: this.tarea.nom_tarea,
                                      descripcion_tarea: this.tarea.descripcion_tarea,
                                      fecha_publicacion_falla: this.tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: this.tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 1,
                                      idusuario_admin: this.tarea.idusuario_admin,
                                      idusuario_encargado: this.tarea.idusuario_encargado,
                                      idusuario_ayudante: this.tarea.idusuario_ayudante,
                                      idcatplanta: this.tarea.idcatplanta,
                                     
                                      idtareaprioridad: this.tarea.idtareaprioridad
                                    })
                                });
                    } catch (error) {
                        console.log("NO se realizo el registro en tarea servicios", error);
                    }
            
            this.btnfin=false
        },

        async consulta_monitoreo(){
            //Consulta en monitoreo para poder finalizar la tarea
            try {
                const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas');
                const tablamonitoreo = await response.json();
                const registromonitoreo = tablamonitoreo.filter(tmon => tmon.idtareafalla === this.tarea.id_tarea_falla);
                console.log("prueba id monitoreo",registromonitoreo[0].id_monitoreo_falla);
                if (registromonitoreo.length === 0) {
                    this.id_monitoreo = null;
                } else {
                    this.id_monitoreo = registromonitoreo[0];
                }
            } catch (error) {
                console.log("Fallo la consulta de monitoreo");
            }
        }
    },
    created() {
        this.GetDetailsTask();
        this.consulta_monitoreo();
        this.usuariologeado();
        this.obtenerUbicacion();
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
