<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Nueva Tarea'" />
        </ion-header>

        <ion-content>

            <ion-card style="margin: 0px 5px 0px 5px;">
                <ion-grid>                    
                    <ion-row>
                        <ion-col>
                            <ion-input v-model="nameTask" label="Nombre de la Tarea" label-placement="floating" fill="outline" placeholder="Servicio de mantenimiento 1"></ion-input>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col v-show="noshowService">
                            <ion-input label="Servicio:" label-placement="stacked" fill="outline" readonly="true" :value="selectedService.nom_servicio">
                                <ion-icon :icon="closeOutline" slot="end" @click="ServiceShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col v-show="noshowEncargado">
                            <ion-input label="Encargado:" label-placement="stacked" fill="outline" readonly="true" :value="selectedEncargado.nom_usuario">
                                <ion-icon :icon="closeOutline" slot="end" @click="EncargadoShow()"></ion-icon>
                            </ion-input>
                        </ion-col>
                    </ion-row>

                </ion-grid>
            </ion-card>

            <ion-card v-show="showService" style="margin: 2px 5px 2px 5px;">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-row style="display: flex; justify-content: start; padding: 10px 0px 0px 15px; color: var(--ion-title-color);">
                                <p>Elija el servicio que quiera Asignar</p>
                            </ion-row>
                            <ion-input  label="Buscar:" fill="solid" v-model="searchName" @ionInput="filterServices"></ion-input>
                            <ion-item lines="none" v-for="service in paginatedServices" :key="service.id_servicio" @click="selectService(service)">
                                <p style="font-size: 13px;">{{ service.nom_servicio }}</p>
                            </ion-item>
                            <ion-row>
                                <ion-col class="custom-buttons-service">
                                    <ion-button @click="prevPage" :disabled="currentPage === 1">Anterior</ion-button>
                                    <ion-button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    
                </ion-grid>
            </ion-card>

            <ion-card v-show="showEncargado" style="margin: 2px 5px 2px 5px;">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-row style="display: flex; justify-content: start; padding: 10px 0px 0px 15px; color: var(--ion-title-color);">
                                <p>Elija al Encargado</p>
                            </ion-row>
                            <ion-input  label="Buscar:" fill="solid" v-model="searchNameEncargado" @ionInput="filterUsers"></ion-input>
                            <ion-item lines="none" v-for="user in paginatedUsersEncargado" :key="user.id_usuario" @click="selectEncargado(user)">
                                <p style="font-size: 13px;">{{ user.nom_usuario }}</p>
                            </ion-item>
                            <ion-row>
                                <ion-col class="custom-buttons-service">
                                    <ion-button @click="prevPage" :disabled="currentPage === 1">Anterior</ion-button>
                                    <ion-button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>


                </ion-grid>
            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonCard, IonGrid, IonRow, IonCol, IonInput, IonItem, IonButton, IonIcon } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons'
import ToolbarComponent from './ToolbarComponent.vue'

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
        IonIcon
    },
    data() {
        return {
            nameTask: null,

            services: [],
            filteredServices: [],

            searchName: '',
            searchNameEncargado: '',
            currentPage: 1,
            itemsPerPage: 5,

            users: [],
            filteredUsersEncargado: [],
            filteredUsersAyudante: [],

            selectedService: [],
            showService: true,
            noshowService: false,

            selectedEncargado: [],
            showEncargado: true,
            noshowEncargado: false,

        };
    },
    setup() {
        return{
            closeOutline,
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

        /************************************************** SERVICES **************************************************/
        paginatedUsersEncargado() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredUsersEncargado.slice(start, end);
        },
        totalPagesEncargado() {
            return Math.ceil(this.filteredUsersEncargado.length / this.itemsPerPage);
        }
    },
    methods: {
        async GetServices_Users() {
            try {
                const responseServices = await fetch('https://localhost:7296/api/Cat_Servicios');
                this.services = await responseServices.json();
                this.filteredServices = this.services;
            } catch (error) {
                console.error("Error en la consulta de los servicios");
            }
            
            try {
                const responseUsers = await fetch('https://localhost:7296/api/Usu_Usuarios');
                this.users = await responseUsers.json();
                this.filteredUsersEncargado = this.users.filter(user => user.idusupuestousuario === 1); // Filtrar aquí para usuarios con puesto de Encargado
                this.filteredUsersAyudante = this.users.filter(user => user.idusupuestousuario === 2); // Filtrar aquí para usuarios con puesto de ayudante
            } catch (error) {
                console.error("Error en la consulta de los Usuarios");
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
            console.log(this.selectedService.id_servicio);
            this.NoServiceShow();
        },
        ServiceShow(){
            this.showService = true;
            this.noshowService = false;
        },
        NoServiceShow(){
            this.showService = false;
            this.noshowService = true;
        },
        
/********************************************************  USERS, FILTER AND PAGES  ****************************************************************************************************************************/

        filterUsers() {
            this.filteredUsersEncargado = this.users.filter(user => 
            user.nom_usuario.toLowerCase().includes(this.searchNameEncargado.toLowerCase()) &&
            user.idusupuestousuario === 1 
            );
            this.currentPage = 1; // Reset to first page on new search
        },

        selectEncargado(usuario) {
            this.selectedEncargado = usuario;
            console.log(this.selectedEncargado.id_usuario);
            this.NoEncargadoShow();
        },
        EncargadoShow(){
            this.showEncargado = true;
            this.noshowEncargado = false;
        },
        NoEncargadoShow(){
            this.showEncargado = false;
            this.noshowEncargado = true;
        }
    },
    created() {
        this.GetServices_Users();
    }
};
</script>

<style>
.header-toolbar-custom {
    border: none;
}

.custom-buttons-service {
    display: flex; 
    justify-content: space-around;
}
</style>
