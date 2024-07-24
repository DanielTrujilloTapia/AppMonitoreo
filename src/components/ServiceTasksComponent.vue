<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>

        <ion-content>
            
            <ion-card style="margin: 0px 0px 2px 0px;">
                <ion-card>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div style="display: flex; justify-content: space-between; padding-left: 15px; padding-right: 15px;">
                                    <p class="title-size">Servicios SITEM</p>
                                    <p class="button-custom">agregar servicio</p>
                                </div>
                            </ion-col>
                        </ion-row>
    
                        <ion-row>
                            <ion-col>
                                <ion-input  label="Buscar:" fill="solid" v-model="searchName" @ionInput="filterServices"></ion-input>
                                <ion-item class="item-click-custom" @click="openModal(service)" lines="none" v-for="service in paginatedServices" :key="service.id_servicio" >
                                    <p class="text-size">{{ service.nom_servicio }}</p>
                                </ion-item>
    
                                <ion-modal :is-open="showModal" @ionModalDidDismiss="dismissModal" :initial-breakpoint="1" :breakpoints="[0, 1]" >
                                    <ion-content>
                                        <ion-card style="margin: 0px;">
                                            <ion-card-header>
                                                <p style="text-align: center; font-size: 15px; color: var(--ion-title-color)">{{selectedService.nom_servicio}}</p>
                                            </ion-card-header>
                                            <ion-card-content>
                                                <p  style="text-align: justify; font-size: 14px; color: var(--ion-subtitle-color)">{{ selectedService.descripcion_servicio }}</p>
                                            </ion-card-content>
                                        </ion-card>
                                    </ion-content>
                                </ion-modal>
    
                                
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
            </ion-card>

            <ion-card style="margin: 0px;">

                <ion-card-header>
                    <div style="display: flex; justify-content: space-between;">
                        <p class="title-size">Apartado Tareas de Servicios</p>
                        <p class="button-custom" @click.prevent="navigateToServiceform">nueva tarea</p>
                    </div>

                    <div>
                        <p class="subtitle-size">Recuerda que al crear una tarea puede ser Modificada o se puede Eliminar en caso de algun error</p>
                        <p class="button-custom">Ver todas mis tareas?</p>
                    </div>
                </ion-card-header>

                <ion-card-content style="margin: 0px; padding: 0px;">
                    <card-tareas-reutilizable-component :title="'Pendientes'" :Status="3"/>
                    <card-tareas-reutilizable-component :title="'No Completada'" :Status="2"/>
                </ion-card-content>
            </ion-card>

        </ion-content>

    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonItem, IonInput, IonModal, IonCardHeader, IonCardContent, } from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CardTareasReutilizableComponent from '../components/CardTareasReutilizableComponent.vue'
import { addOutline, personCircle, addSharp } from 'ionicons/icons'
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'ServiceTasksComponent',
    components: {
        IonPage,
        IonHeader,
        ToolbarComponent,
        IonContent,
        IonCard,
        CardTareasReutilizableComponent,
        IonGrid, 
        IonRow,
        IonCol,
        IonButtons,
        IonButton,
        IonItem,
        IonInput,
        IonModal,
        IonCardHeader,
        IonCardContent,
    },
    data() {
        return{
            services: [],
            filteredServices: [],
            searchName: '',

            showModal: false,
            selectedService: null, // Inicialmente no hay ningún servicio seleccionado

            currentPage: 1,
            itemsPerPage: 5,
        }
    },
    setup() {
        
        const ionRouter = useIonRouter();
        
        const navigateToServiceform = () => {
            ionRouter.push('/serviceForm');
        }

        return{
            navigateToServiceform,
            addOutline,
            personCircle,
            addSharp,
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
    },
    methods: {
      /********************************************************  SERVICES, FILTER AND PAGES  ****************************************************************************************************************************/

      async GetServices() {
            /* Consulta SERVICIOS */
            try {
                const responseServices = await fetch('https://localhost:7296/api/Cat_Servicios');
                this.services = await responseServices.json();
                this.filteredServices = this.services;
            } catch (error) {
                console.error("Error en la consulta de los servicios");
            }
        },

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
        openModal(service) {
          this.selectedService = service;
          this.showModal = true;
        },

        dismissModal() {
          this.showModal = false;
        },

    },
    created() {
        this.GetServices();
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

.header-card-custom {
    display: flex;
    justify-content: space-between;
}

.button-custom {
    color: var(--ion-color-primary);
}

.button-custom:active {
    color: rgb(9, 105, 46);
}

.item-click-custom:active {
  --color: var(--ion-color-primary); /* Color gris semitransparente */
}

</style>