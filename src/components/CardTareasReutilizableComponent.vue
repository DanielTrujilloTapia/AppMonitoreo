<template>
    <ion-card style="height: 301px;">
        <ion-card-header>
            <div class="custom-title">
                <p class="title-size">{{ title }}</p>
                <p class="button-custom" @click.prevent="navigateToViewTasks">ver mas</p>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-item class="item-click-custom" v-for="task in tasks.slice(0,5)" :key="task.id_tarea_servicio">
                <p class="text-size">{{ task.nom_tarea_servicio }}</p>
                <p class="text-size" slot="end">{{ formatDate(task.fecha_entega_servicio) }}</p>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonItem } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'CardTareasReutiizableComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonItem,
    },
    props: {
        title: String,
        Status: Number,
    },
    data() {
        return{
            tasksUpdates: [],
            tasks: [],
            Users: [],
            priorities: []
        };
    },
    setup() {
        const ionRouter = useIonRouter();

        const navigateToViewTasks = () => {
            ionRouter.push('/viewTasks');
        }
        
        return {
            navigateToViewTasks
        }
    },
    methods: {

        async UpdateStateTask(){
            try {
                const response = await fetch('https://192.168.1.69:7296/api/Tareas_Servicios');
                this.tasksUpdates = await response.json();

                for (let i = 0; i < this.tasksUpdates.length; i++) {
                    console.log('tarea numero: ' + i);
                    const tarea = this.tasksUpdates[i];
                    const today = new Date();
                    const fecha_entrega = new Date(tarea.fecha_entega_servicio);

                    if(tarea.idtareaestatus_servicio === 1){
                        console.log('Tarea COMPLETADA');
                    }
                    
                    if (tarea.idtareaestatus_servicio === 4) {
                        if (fecha_entrega < today) {
                            try {
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
                                        idtareaestatus_servicio: 2,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambió a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        } else {
                            console.log('Tarea en PROCESO'); // La fecha de entrega aún no ha pasado
                        }
                    }

                    if(fecha_entrega < today){

                        if(tarea.idtareaestatus_servicio === 2){
                            console.log('NO ENTREGADA');
                        }else{
                            try{
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
                                        idtareaestatus_servicio: 2,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambio a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        }
                    }

                    if(fecha_entrega > today){
                        if(tarea.idtareaestatus_servicio === 3){
                            console.log('PENDIENTE');
                        } else {
                            try{
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
                                        idtareaestatus_servicio: 3,
                                        idtareasprioridad: tarea.idtareasprioridad
                                    })
                                });
                                console.log('La tarea se cambio a pendiente');
                            } catch (error) {
                                console.error("Error en el cambio a PENDIENTE");
                            }
                        }
                    }

                }
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }
        },

        async GetTask() {
            try {
                const response = await fetch('https://192.168.1.69:7296/api/Tareas_Servicios');
                const tasks = await response.json();
                const tasksss = tasks.filter(task => task.idtareaestatus_servicio === this.Status);

                const userToLogin = JSON.parse(localStorage.getItem('User-login'));

                if(userToLogin.idusutipousuario === 1){
                    this.tasks = tasksss.filter(tarea => tarea.idusuusuario_admin === userToLogin.id_usuario);
                }
                if(userToLogin.idusutipousuario === 2){
                    this.tasks = tasksss.filter(tarea => tarea.idusuario_encargado === userToLogin.id_usuario || tarea.idusuario_ayudante === userToLogin.id_usuario );
                }

            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }

        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} de ${month} de ${year}`;
        },
    },
    created() {
        this.UpdateStateTask();
        this.GetTask();
    }
}
</script>

<style scoped>
p{
    margin: 0px;
}

.custom-title{
    display: flex;
    justify-content: space-between; 
}

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