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
                            <p class="title-size">{{ tarea.nom_tarea_servicio }}</p>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                        <ion-col>
                            <p class="subtitle-size">La tarea se entrega: {{ formatDate(tarea.fecha_entega_servicio) }}</p>
                        </ion-col>
                    </ion-row>

                </ion-card-header>
    
                <ion-card-content>
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Planta</ion-label>
                        <p class="text-size">{{ tarea?.plants?.nom_planta || 'Sin planta asignada' }}</p>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label class="subtitle-size" position="stacked">Servicio</ion-label>
                        <p class="text-size" >{{ tarea?.service?.nom_servicio || 'Sin servicio asignado' }}</p>
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
                            <ion-button v-if="btnfin" @click.prevent="finalizar">Final</ion-button>
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
            const taskData = localStorage.getItem('task-detail');
            this.tarea = taskData ? JSON.parse(taskData) : null;
            const User = localStorage.getItem('User-login');

            if (!this.tarea) {
                console.log('No se encontró ninguna tarea en localStorage');
                return;
            }

            // Fetch data from APIs
            try {
                const [responseServices, responsePlants, responseUsers, responsePriorities, responseStatus] = await Promise.all([
                    fetch('https://192.168.1.69:7296/api/Cat_Servicios'),
                    fetch('https://192.168.1.69:7296/api/Cat_Plantas'),
                    fetch('https://192.168.1.69:7296/api/Usu_Usuarios'),
                    fetch('https://192.168.1.69:7296/api/Tareas_Prioridades'),
                    fetch('https://192.168.1.69:7296/api/Tareas_Estatus')
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

                this.direccion= this.tarea.plants.ubicacion;

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

        async obtenerCoordenadas(direccion) {
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
              this.coordenadas = {
                lat: data[0].lat,
                lon: data[0].lon
              };
              console.log(`Latitud: ${this.coordenadas.lat}, Longitud: ${this.coordenadas.lon}`);
              this.latestatica=this.coordenadas.lat;
              this.lonestatica=this.coordenadas.lon;
              console.log('latitud estatica ',this.latestatica, 'longitud estatica', this.lonestatica);
            } else {
              alert('No se encontraron coordenadas para la dirección proporcionada.');
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
                this.obtenerCoordenadas(this.direccion);
            } catch (error) {
                alert('Error al obtener la ubicación', error);
            }
        },

       async inicio(lat,lon){
            this.obtenerUbicacion();
            const nlat= parseFloat(this.latestatica);
            const nlon= parseFloat(this.lonestatica);
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();
            const sumalat = nlat + 0.01;
            const reslat = nlat - 0.01;
            const sumalong = nlon + 0.01;
            const reslong = nlon - 0.01;

            console.log(`Rango de latitud: ${reslat} a ${sumalat}`);
            console.log(`Rango de longitud: ${reslong} a ${sumalong}`);

            if (lat >= reslat && lat <= sumalat) {
                if (lon >= reslong && lon <= sumalong) {
                    console.log("Realizar el post");

                    await fetch('https://192.168.1.69:7296/api/Tareas_Servicios', {
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
                                      idtareaestatus_servicio: 4,
                                      idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log("TAREA INICIADA");
                    
                                await fetch('https://192.168.1.69:7296/api/Monitoreo_Tareas_Servicios', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        idtareaservicio: tarea.id_tarea_servicio,
                                        fecha_inicio_servicio: fechaFormateada,
                                        fecha_finalizacion_servicio: null,
                                    })
                                });            
                } else {
                    console.log("La longitud sobrepasa el rango establecido");
                }
            } else {
                console.log("La latitud sobrepasa el rango establecido");
            }
        }

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
