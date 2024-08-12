<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>

        <ion-content>
            <ion-card style="margin: 0px;">

                <ion-card-header>
                    <div style="display: flex; justify-content: space-between;">
                        <p class="title-size">Apartado Tareas de Servicios</p>
                        <ion-button @click.prevent="navigateToService">volver</ion-button>
                    </div>
                </ion-card-header>

                <ion-card-content style="margin: 0px; padding: 0px;">
                    <card-tareas-reutilizable-component/>
                </ion-card-content>
            </ion-card>

        </ion-content>

    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonItem, IonInput, IonModal, IonCardHeader, IonCardContent, } from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CardTareasReutilizableComponent from '../components/AllTaskForAdminComponent.vue'
import { addOutline, personCircle, addSharp } from 'ionicons/icons'
import { useIonRouter } from '@ionic/vue';
import { ref } from 'vue';

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

            UserLogin: null
        }
    },
    setup() {
        
        const ionRouter = useIonRouter();
        
        const navigateToServiceform = () => {
            ionRouter.push('/serviceForm');
        }
        const navigateToService = () => {
            ionRouter.push('/service');
        }
        const navigateToAlltask = () => {
            ionRouter.push('/alltask');
        }

        const navigateToCreateServiceform = () => {
            ionRouter.push('/createService');
        }

        const navigateToViewTasks = () => {
            ionRouter.push('/viewTasks');
        }
        
        const TypeUserPermissions = localStorage.getItem('User-login');
        const parsedPermissions = JSON.parse(TypeUserPermissions);
        const permisosAdmin = ref(null);

        if (parsedPermissions.idusutipousuario === 1) {
          permisosAdmin.value = true;
        } else {
          permisosAdmin.value = false;
        }

        return{
            navigateToServiceform,
            navigateToCreateServiceform,
            navigateToViewTasks,
            navigateToAlltask,
            navigateToService,
            addOutline,
            personCircle,
            addSharp,
            permisosAdmin
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
        async GetServices() {
            /* Consulta SERVICIOS */
            try {
                const responseServices = await fetch('https://177.17.10.11:7296/api/Cat_Servicios');
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