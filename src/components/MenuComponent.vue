<template>
    <ion-menu side="end" content-id="main-content" :disabled="ocultarMenu">
        <ion-header class="custom-header container-center">
            <ion-grid>
                <ion-row>
                    <ion-col size="5" class="container-center">
                        <ion-img class="custom-photo-user" src="photo-user.png"></ion-img>
                    </ion-col>

                    <ion-col class="center-container">
                        <p class="custom-username">{{ userToLogin.nom_usuario }}</p>
                        <p class="custom-name">{{ datos_user.nombres }}</p>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-header>
        
        <ion-content>
            <ion-card style="margin: 0px; height: 100%; width: 100%;">

                <div class="items-menu">
                    <ion-item lines="none" style="font-size: 20px;">Menu</ion-item>
                    <ion-item lines="none" @click.prevent="navigateToHome"><ion-icon class="custom-icon-menu" :icon="homeOutline" color="primary"/>Home<ion-icon slot="end" :icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none" @click.prevent="navigateToService"><ion-icon class="custom-icon-menu" :icon="newspaperOutline" color="primary"/>Servicios Asignados<ion-icon slot="end" :icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none" @click.prevent="navigateToFailures"><ion-icon class="custom-icon-menu" :icon="hammerOutline" color="primary"/>Fallas Mecanicas<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none" @click.prevent="navigateToAutomated"><ion-icon class="custom-icon-menu" :icon="calendarNumberOutline" color="primary"/>Tareas Automatizadas<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none" @click.prevent="navigateToMonitoring"><ion-icon class="custom-icon-menu" :icon="eyeOutline" color="primary"/>Monitoreo de Tareas<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none" @click.prevent="navigateToUsers"><ion-icon class="custom-icon-menu" :icon="peopleOutline" color="primary"/>Usuarios SITEM<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                </div>
                
                <div class="items-ajustes">
                    <ion-item lines="none" style="font-size: 20px;">Ajustes</ion-item>
                    <ion-item lines="none"><ion-icon class="custom-icon-menu" :icon="personOutline" color="primary"/>Cuenta<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                    <ion-item lines="none"><ion-icon class="custom-icon-menu" :icon="logOutOutline" color="primary"/>Cerrar Sesion<ion-icon slot="end":icon="chevronForwardOutline"/></ion-item>
                </div>

            </ion-card>

        </ion-content>
    </ion-menu>
</template>

<script>
import { IonMenu, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonImg, IonCard, IonIcon, IonItem } from '@ionic/vue'
import { homeOutline, newspaperOutline, hammerOutline, calendarNumberOutline, eyeOutline, personOutline, peopleOutline, logOutOutline, chevronForwardOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default {
    name: 'MenuComponent',
    components: {
        IonMenu,
        IonHeader,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
        IonCard,
        IonIcon,
        IonItem
    },
    data() {
        return {
            ocultarMenu: true,
        }
    },
    setup() {

        const router  = useRouter();

        const navigateToHome = () => {
            router.push('/home');
        };

        const navigateToService = () => {
            router.push('/service');
        };

        const navigateToFailures = () => {
            router.push('/failures');
        };

        const navigateToAutomated = () => {
            router.push('/automated');
        };

        const navigateToMonitoring = () => {
            router.push('/monitoring');
        };

        const navigateToUsers = () => {
            router.push('/users');
        };

        return {
            //NAVIGATE
            navigateToHome,
            navigateToService,
            navigateToFailures,
            navigateToAutomated,
            navigateToMonitoring,
            navigateToUsers,

            //ICONS
            homeOutline,
            hammerOutline,
            newspaperOutline,
            calendarNumberOutline,
            eyeOutline,
            personOutline,
            peopleOutline,
            logOutOutline,
            chevronForwardOutline,
        }
    },
    watch: {
        '$route'(to) {
          if (to.path === '/login') {
            this.ocultarMenu = true;
          }else{
            this.ocultarMenu = false;
          }
        }
    }
}
</script>

<style scoped>

.custom-header {
    background: var(--ion-color-primary);
    height: 130px;
}

.container-center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.custom-icon-menu{
    padding-right: 10px;
    width: 20px;
    height: 20px; 
}

.custom-username {
    color: var(--ion-color-white);
    font-weight: bold;
}
.custom-name {
    color: var(--ion-color-white);
    font-weight: bold;
}

.custom-photo-user {
    width: 100px;
    height: 100px;
}

.items-menu {
    border-bottom: solid 1px;
    border-color: rgb(112, 112, 112);
    padding: 15px 0;
}

.items-ajustes {
    padding: 15px 0;
}
</style>