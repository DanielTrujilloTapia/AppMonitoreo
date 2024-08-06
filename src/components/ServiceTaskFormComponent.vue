<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Nueva Tarea'" />
        </ion-header>

        <ion-content>
            <ion-card style="margin: 0px;">
                <ion-grid>
                    
                    <ion-row class="custom-ion-row">
                        <ion-col>
                            <ion-input v-model="nameTask" label="Nombre de la Tarea" label-placement="floating" fill="outline" placeholder="Servicio de mantenimiento 1"></ion-input>
                        </ion-col>
                    </ion-row>

                    <ion-row class="custom-ion-row">
                        <ion-col v-show="noshowService">
                            <ion-input label="Servicio:" label-placement="floating" fill="outline" readonly="true" :value="selectedService.nom_servicio">
                                <ion-icon :icon="closeOutline" slot="end" @click="ServiceShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>
                    <ion-card v-show="showService" style="margin: 0px 5px 0px 5px;">
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-row class="custom-title-card">
                                        <p>Elija el servicio que quiera Asignar</p>
                                    </ion-row>
                                    <ion-input  label="Buscar:" fill="solid" v-model="searchName" @ionInput="filterServices"></ion-input>
                                    <ion-item lines="none" v-for="service in paginatedServices" :key="service.id_servicio" @click="selectService(service)">
                                        <p style="font-size: 13px;">{{ service.nom_servicio }}</p>
                                    </ion-item>
                                    <ion-row>
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="prevPage" :disabled="currentPage === 1">
                                                    Anterior
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                        
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="nextPage" :disabled="currentPage === totalPages">
                                                    Siguiente
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card>


                    <ion-row class="custom-ion-row">
                        <ion-col v-show="noshowEncargado">
                            <ion-input label="Encargado:" label-placement="floating" fill="outline" readonly="true" :value="selectedEncargado.nom_usuario">
                                <ion-icon :icon="closeOutline" slot="end" @click="EncargadoShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>
                    <ion-card v-show="showEncargado" style="margin: 0px 5px 0px 5px;">
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-row class="custom-title-card">
                                        <p>Seleccione al Encargado:</p>
                                    </ion-row>
                                    <ion-input label="Buscar:" fill="solid" v-model="searchNameEncargado" @ionInput="filterUsersEncargado"></ion-input>
                                    <ion-item lines="none" v-for="user in paginatedUsersEncargado" :key="user.id_usuario" @click="selectEncargado(user)">
                                        <p style="font-size: 13px;">{{ user.nom_usuario }}</p>
                                    </ion-item>
                                    <ion-row>
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="prevPageEncargado" :disabled="currentPageEncargado === 1">
                                                    Anterior
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                        
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="nextPageEncargado" :disabled="currentPageEncargado === totalPagesEncargado">
                                                    Siguiente
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                     </ion-card>


                    <ion-row class="custom-ion-row">
                        <ion-col v-show="noshowAyudante">
                            <ion-input label="Ayudante:" label-placement="floating" fill="outline" readonly="true" :value="selectedAyudante.nom_usuario">
                                <ion-icon :icon="closeOutline" slot="end" @click="AyudanteShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>
                    <ion-card v-show="showAyudante" style="margin: 0px 5px 0px 5px;">
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-row class="custom-title-card">
                                        <p>Seleccione al Ayudante:</p>
                                    </ion-row>
                                    <ion-input  label="Buscar:" fill="solid" v-model="searchNameAyudante" @ionInput="filterUsersAyudante"></ion-input>
                                    <ion-item lines="none" v-for="user in paginatedUsersAyudante" :key="user.id_usuario" @click="selectAyudante(user)">
                                        <p style="font-size: 13px;">{{ user.nom_usuario }}</p>
                                    </ion-item>
                                    <ion-row>
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="prevPageAyudante" :disabled="currentPageAyudante === 1">
                                                    Anterior
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                        
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="nextPageAyudante" :disabled="currentPageAyudante === totalPagesAyudante">
                                                    Siguiente
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card>


                    <ion-row class="custom-ion-row">
                        <ion-col v-show="noshowPlanta">
                            <ion-input label="Planta Industrial:" label-placement="floating" fill="outline" readonly="true" :value="selectedPlanta.nom_planta">
                                <ion-icon :icon="closeOutline" slot="end" @click="PlantaShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>
                    <ion-card v-show="showPlanta" style="margin: 0px 5px 0px 5px;">
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-row class="custom-title-card">
                                        <p>Elija la planta</p>
                                    </ion-row>
                                    <ion-input  label="Buscar:" fill="solid" v-model="searchNamePlanta" @ionInput="filterPlants"></ion-input>
                                    <ion-item lines="none" v-for="planta in paginatedPlants" :key="planta.id_planta" @click="selectPlanta(planta)">
                                        <p style="font-size: 13px;">{{ planta.nom_planta }}</p>
                                    </ion-item>
                                    <ion-row>
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="prevPagePlanta" :disabled="currentPagePlanta === 1">
                                                    Anterior
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                        
                                        <ion-col style="display: flex; justify-content: center;">
                                            <ion-buttons>
                                                <ion-button @click="nextPagePlanta" :disabled="currentPagePlanta === totalPagesPlants">
                                                    Siguiente
                                                </ion-button>
                                            </ion-buttons>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card>


                    <ion-row class="custom-ion-row">
                        <ion-col>
                            <ion-select label="Prioridad:" label-placement="floating" fill="outline" v-model="id_prioridades">
                              <ion-select-option v-for="priority in priorities" :key="priority.id_prioridad" :value="priority.id_prioridad">{{ priority.nom_prioridad }}</ion-select-option>
                            </ion-select>
                        </ion-col>
                    </ion-row>


                    <ion-row class="custom-ion-row">
                        <ion-col> 
                            <ion-input label="Fecha y Hora:" fill="outline" label-placement="floating" readonly="true" :value="'Fecha: '+ formatFecha(selectedDate) + '        ' + 'Hora: ' + formatTiempo(selectedDate)" >
                                        <ion-icon id="auto-trigger" :icon="calendarClear" slot="end">
                                            <ion-popover trigger="auto-trigger">
                                                <ion-datetime v-model="selectedDate">
                                                    <span slot="time-label">Tiempo</span>
                                                </ion-datetime>
                                            </ion-popover>
                                        </ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>

                    <ion-row class="custom-ion-row">
                        <ion-col style="display: flex; justify-content: center;">
                            <ion-buttons>
                                <ion-button color="primary" @click="navigateToService">Cancelar</ion-button>
                            </ion-buttons>
                        </ion-col>

                        <ion-col style="display: flex; justify-content: center;"> 
                            <ion-button @click="CreatedTask()">Crear Tarea</ion-button>
                        </ion-col>
                    </ion-row>

                </ion-grid>
            </ion-card>

                    
                
            

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonGrid, IonRow, IonCol, IonInput, IonItem, IonButtons, IonButton, IonIcon, IonDatetime, IonPopover, IonSelect, IonSelectOption, } from '@ionic/vue';
import { closeOutline, calendarClear, caretForwardOutline, caretBackOutline } from 'ionicons/icons'
import ToolbarComponent from './ToolbarComponent.vue'
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'ServiceTaskFormComponent',
    components: {
        IonPage,
        ToolbarComponent,
        IonHeader,
        IonContent,
        IonCard,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonItem,
        IonButton,
        IonButtons,
        IonIcon,
        IonDatetime,
        IonPopover,
        IonSelect,
        IonSelectOption,
    },
    data() {
        return {
            nameTask: null,

            services: [],
            filteredServices: [],

            searchName: '',
            searchNameEncargado: '',
            searchNameAyudante: '',
            searchNamePlanta: '',
            currentPage: 1,
            itemsPerPage: 5,

            currentPageEncargado: 1,
            itemsPerPageEncargado: 5,

            currentPageAyudante: 1,
            itemsPerPageAyudante: 5,

            currentPagePlanta: 1,
            itemsPerPagePlanta: 5,

            users: [],
            filteredUsersEncargado: [],
            filteredUsersAyudante: [],

            selectedService: [],
            showService: true,
            noshowService: false,
            id_servicio: null,

            selectedEncargado: [],
            showEncargado: true,
            noshowEncargado: false,
            id_encargado: null,

            selectedAyudante: [],
            showAyudante: true,
            noshowAyudante: false,
            id_ayudante: null,

            plants: [],
            filteredPlants: [],
            selectedPlanta: [],
            showPlanta: true,
            noshowPlanta: false,
            id_planta: null,

            selectedDate: null,

            priorities: [],
            id_prioridades: null
        }
    },
    setup() {

        const ionRouter = useIonRouter();
        
        const navigateToService = () => {
            ionRouter.back();
        };

        return{
            closeOutline,
            calendarClear,
            caretForwardOutline,
            caretBackOutline,
            navigateToService
        }
    },
    computed: {

        /************************************************** SERVICES **************************************************/
        paginatedServices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredServices.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredServices.length / this.itemsPerPage);
        },

        /************************************************** ENCARGADO **************************************************/
        paginatedUsersEncargado() {
            const start = (this.currentPageEncargado - 1) * this.itemsPerPageEncargado;
            const end = start + this.itemsPerPageEncargado;
            return this.filteredUsersEncargado.slice(start, end);
        },
        totalPagesEncargado() {
            return Math.ceil(this.filteredUsersEncargado.length / this.itemsPerPageEncargado);
        },

        /************************************************** AYUDANTE **************************************************/
        paginatedUsersAyudante() {
            const start = (this.currentPageAyudante - 1) * this.itemsPerPageAyudante;
            const end = start + this.itemsPerPageAyudante;
            return this.filteredUsersAyudante.slice(start, end);
        },
        totalPagesAyudante() {
            return Math.ceil(this.filteredUsersAyudante.length / this.itemsPerPageAyudante);
        },

        /************************************************** AYUDANTE **************************************************/
        paginatedPlants() {
            const start = (this.currentPagePlanta - 1) * this.itemsPerPagePlanta;
            const end = start + this.itemsPerPagePlanta;
            return this.filteredPlants.slice(start, end);
        },
        totalPagesPlants() {
            return Math.ceil(this.filteredPlants.length / this.itemsPerPagePlanta);
        }
    },
    methods: {
        async GetDatas() {
            /* Consulta SERVICIOS */
            try {
                const responseServices = await fetch('https://177.17.10.11:7296/api/Cat_Servicios');
                this.services = await responseServices.json();
                this.filteredServices = this.services;
            } catch (error) {
                console.error("Error en la consulta de los servicios");
            }

            /* Consulta USUARIOS */
            try {
                const responseUsers = await fetch('https://177.17.10.11:7296/api/Usu_Usuarios');
                this.users = await responseUsers.json();
                this.filteredUsersEncargado = this.users.filter(user => user.idusupuestousuario === 1); // Filtrar aquí para usuarios con puesto de Encargado
                this.filteredUsersAyudante = this.users.filter(user => user.idusupuestousuario === 2); // Filtrar aquí para usuarios con puesto de ayudante
            } catch (error) {
                console.error("Error en la consulta de los Usuarios");
            }

            /* Consulta CAT PRIORIDAD */
            try {
                const responsePriorities = await fetch('https://177.17.10.11:7296/api/Tareas_Prioridades');
                this.priorities = await responsePriorities.json();
            } catch (error) {
                console.error("Error en la consulta de los Proridades");
            }

            /* Consulta a PLANTAS */
            try {
                const responsePlants = await fetch('https://177.17.10.11:7296/api/Cat_Plantas');
                this.plants = await responsePlants.json();
                this.filteredPlants = this.plants;
            } catch (error) {
                console.error("Error en la consulta de las Plantas");
            }
        },

        /********************************************************  SERVICES, FILTER AND PAGES  ****************************************************************************************************************************/
        filterServices() {
            this.filteredServices = this.services.filter(service => 
                service.nom_servicio.toLowerCase().includes(this.searchName.toLowerCase())
            );
            this.currentPage = 1; // Reset to first page on new search
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        selectService(servicio) {
            this.selectedService = servicio;
            this.id_servicio = servicio.id_servicio;
            console.log(this.selectedService.id_servicio);
            console.log(this.id_servicio);
            this.NoServiceShow();
        },
        ServiceShow(){
            this.showService = true;
            this.noshowService = false;
            this.selectedService = [];
            this.id_servicio = null;

            console.log(this.selectedService);
            console.log(this.id_servicio);
        },
        NoServiceShow(){
            this.showService = false;
            this.noshowService = true;
        },
        
/********************************************************  ENCARGADO, FILTER AND PAGES  ****************************************************************************************************************************/

        filterUsersEncargado() {
            this.filteredUsersEncargado = this.users.filter(user => 
            user.nom_usuario.toLowerCase().includes(this.searchNameEncargado.toLowerCase()) &&
            user.idusupuestousuario === 1 
            );
            this.currentPageEncargado = 1; // Reset to first page on new search
        },

        selectEncargado(usuario) {
            this.selectedEncargado = usuario;
            this.id_encargado = usuario.id_usuario;
            console.log(this.selectedEncargado.id_usuario);
            console.log(this.id_encargado);
            this.NoEncargadoShow();
        },
        EncargadoShow(){
            this.showEncargado = true;
            this.noshowEncargado = false;
            this.selectedEncargado = [];
            this.id_encargado = null,
            console.log(this.selectedEncargado);
            console.log(this.id_encargado);
        },
        NoEncargadoShow(){
            this.showEncargado = false;
            this.noshowEncargado = true;
        },

        prevPageEncargado() {
            if (this.currentPageEncargado > 1) {
                this.currentPageEncargado--;
            }
        },
        nextPageEncargado() {
            if (this.currentPageEncargado < this.totalPagesEncargado) {
                this.currentPageEncargado++;
            }
        },

/********************************************************  AYUDANTE, FILTER AND PAGES  ****************************************************************************************************************************/

        filterUsersAyudante() {
            this.filteredUsersAyudante = this.users.filter(user => 
            user.nom_usuario.toLowerCase().includes(this.searchNameAyudante.toLowerCase()) &&
            user.idusupuestousuario === 2 
            );
            this.currentPageAyudante = 1; // Reset to first page on new search
        },

        selectAyudante(usuario) {
            this.selectedAyudante = usuario;
            this.id_ayudante = usuario.id_usuario;
            console.log(this.selectedAyudante.id_usuario);
            console.log(this.id_ayudante);
            this.NoAyudanteShow();
        },
        AyudanteShow(){
            this.showAyudante = true;
            this.noshowAyudante = false;
            this.selectedAyudante = [];
            this.id_ayudante = null;
            console.log(this.selectedAyudante);
            console.log(this.id_ayudante);
        },
        NoAyudanteShow(){
            this.showAyudante= false;
            this.noshowAyudante = true;
        },

        prevPageAyudante() {
            if (this.currentPageAyudante > 1) {
                this.currentPageAyudante--;
            }
        },
        nextPageAyudante() {
            if (this.currentPageAyudante < this.totalPagesAyudante) {
                this.currentPageAyudante++;
            }
        },

/********************************************************  PLANTAS, FILTER AND PAGES  ****************************************************************************************************************************/

        filterPlants() {
            this.filteredPlants = this.plants.filter(plant => 
                plant.nom_planta.toLowerCase().includes(this.searchNamePlanta.toLowerCase()) 
            );
       
            this.currentPagePlanta = 1; // Reset to first page on new search
        },

        selectPlanta(planta) {
            this.selectedPlanta = planta;
            this.id_planta = planta.id_planta;
            console.log(this.selectedPlanta.id_planta);
            console.log(this.id_planta);
            this.NoPlantaShow();
        },
        PlantaShow(){
            this.showPlanta = true;
            this.noshowPlanta = false;
            this.selectedPlanta = [];
            this.id_planta = null,

            console.log(this.selectedPlanta);
            console.log(this.id_planta);
        },
        NoPlantaShow(){
            this.showPlanta = false;
            this.noshowPlanta = true;
        },

        prevPagePlanta() {
            if (this.currentPagePlanta > 1) {
                this.currentPagePlanta--;
            }
        },
        nextPagePlanta() {
            if (this.currentPagePlanta < this.totalPagesPlants) {
                this.currentPagePlanta++;
            }
        },

/**************************************FECHA Y HORA *************************************************************/

        formatFecha(fecha) {
            return fecha ? fecha.slice(0, 10) : '';
        },
        formatTiempo(tiempo) {
            return tiempo ? tiempo.slice(11, 19) : '';
        },

        async CreatedTask(){ 

            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString(); // Formato ISO 8601
            
            const userToLogin = JSON.parse(localStorage.getItem('User-login'));


            if(this.nameTask !== null && this.id_servicio !== null && this.id_encargado !== null && this.id_ayudante !== null && this.id_planta !== null && this.selectedDate !== null && this.id_prioridades !== null){
                console.log("ID NOMBRE TAREA: ", this.nameTask);
                console.log("ID SERVICIO: ", this.id_servicio);
                console.log("ID ENCARGADO: ", this.id_encargado);
                console.log("ID AYUDANTE: ", this.id_ayudante);

                console.log('ID ADMIN: ', userToLogin.id_usuario);

                console.log("ID PLANTA: ", this.id_planta);
                console.log("FECHA PUBLICACION: ", fechaFormateada);
                console.log("FECHA ENTREGA: ", this.selectedDate);
                console.log('ID PRIORIDAD: ', this.id_prioridades);
                console.log('ID ESTATUS: ', 3);

                try {
                    const createdTaskService = await fetch('https://177.17.10.11:7296/api/Tareas_Servicios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nom_tarea_servicio: this.nameTask,
                        idcatservicios: this.id_servicio,
                        idusuusuario_encargado: this.id_encargado,
                        idusuusuario_ayudante: this.id_ayudante,

                        idusuusuario_admin: userToLogin.id_usuario,

                        idcatplantas: this.id_planta,
                        fecha_publicacion_servicio: fechaFormateada,
                        fecha_entega_servicio: this.selectedDate,
                        idtareaestatus_servicio: 3,
                        idtareasprioridad: this.id_prioridades
                    })
                });

                if (createdTaskService.ok) {
                    console.log('La tarea de servicio se creo CORRECTAMENTE');
                    this.navigateToService();
                }

                } catch (error) {
                    console.log('Algo fallo: ', error);
                }
                
            } else{
                alert("Rellena todos los campos del formulario");
            }
        }

    },
    created() {
        this.GetDatas();
    }
};
</script>

<style>
.header-toolbar-custom {
    border: none;
}

.custom-title-card{
    display: flex; 
    justify-content: center;
    color: var(--ion-title-color);
}

ion-icon{
    width: 25px;
    height: 25px;
}

.custom-ion-row{
    margin-bottom: 10px;
    margin-top: 10px;
}

ion-popover {
    --width: 350px;
    --backdrop-opacity: 0.8;
  }

</style>
