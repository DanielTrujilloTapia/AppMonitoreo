<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>
        
        <ion-content>
            <ion-card>
                <div class="header-card-custom">
                    <p>Servicios</p>

                    <ion-buttons>
                        <ion-button>
                            <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </div>
                    
                    <p>
                        Como empresa SITEM brindamos servicios de mantenimiento de la mas alta calidad para que sus equipos den el 100% 
                        de su rendimiento
                    </p>

                    <p>Por otro lado contamos con una gran variedad de servicios para brindar mantenimiento optimo <a>servicios</a></p>
            </ion-card>

            <ion-card style="margin: 0px 5px 0px 5px;">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-row class="custom-title-card">
                                <p>Todos los Servicios que brinda SITEM</p>
                            </ion-row>
                            <ion-input  label="Buscar:" fill="solid" v-model="searchName" @ionInput="filterServices"></ion-input>
                            <ion-item lines="none" v-for="service in paginatedServices" :key="service.id_servicio">
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

            <card-tareas-reutilizable-component :title="'Pendientes'" :Status="3"/>
            <card-tareas-reutilizable-component :title="'No Completada'" :Status="2"/>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButtons, IonIcon, IonButton, IonItem, IonInput} from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CardTareasReutilizableComponent from '../components/CardTareasReutilizableComponent.vue'
import { addOutline, personCircle } from 'ionicons/icons'

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
        IonIcon,
        IonButton,
        IonItem,
        IonInput
    },
    data() {
        return{
            services: [],
            filteredServices: [],
            searchName: '',

            currentPage: 1,
            itemsPerPage: 5,
        }
    },
    setup() {
        return{
            addOutline,
            personCircle
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
    },
    created() {
        this.GetServices();
    }
}
</script>

<style scoped>

.header-card-custom {
    display: flex;
    justify-content: space-between;
}
</style>