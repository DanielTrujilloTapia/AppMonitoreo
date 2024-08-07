<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>

        <ion-content>
            

            <ion-card style="margin: 0px;">

                <ion-card-header>
                    <div style="display: flex; justify-content: space-between;">
                        <p class="title-size">Apartado de Fallas</p>
                        <p class="button-custom" @click.prevent="navigateToServiceform">nueva falla</p>
                    </div>

                    <div>
                        <p class="subtitle-size">Recuerda que al crear una falla puede ser Modificada o se puede convertirse en un servicio</p>
                        <p class="button-custom" @click.prevent="navigateToViewTasks">Ver todas las fallas?</p>
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
import CardTareasReutilizableComponent from '../components/cardFailuresTasks.vue'
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
            ionRouter.push('/failuresForm');
        }

        const navigateToCreateServiceform = () => {
            ionRouter.push('/createService');
        }

        const navigateToViewTasks = () => {
            ionRouter.push('/viewTasksfailures');
        }

        return{
            navigateToServiceform,
            navigateToCreateServiceform,
            navigateToViewTasks,
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
                const responseServices = await fetch('https://192.168.1.69:7296/api/Tareas_Fallas');
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