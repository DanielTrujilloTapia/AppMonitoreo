<template>
    <ion-card style="height: 301px;">
        <ion-card-header>
            <div class="custom-title">
                <p class="title-size">{{ title }}</p>
                <p class="button-custom" @click.prevent="navigateToViewTasks">ver mas</p>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-item class="item-click-custom" v-for="task in tasks.slice(0,5)" :key="task.id_tarea_falla">
                <p class="text-size">{{ task.nom_tarea }}</p>
                <p class="text-size" slot="end">{{ formatFecha(task.fecha_entrega_falla) }}</p>
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
            ionRouter.push('/viewTasksfailures');
        }
        
        return {
            navigateToViewTasks
        }
    },
    methods: {

        async UpdateStateTask(){
            try {
                const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas');
                this.tasksUpdates = await response.json();

                for (let i = 0; i < this.tasksUpdates.length; i++) {
                    console.log('tarea numero: ' + i);
                    const tarea = this.tasksUpdates[i];
                    const today = new Date();
                    const fecha_entrega = new Date(tarea.fecha_entrega_falla);

                    if(tarea.idtareaestatus_falla === 1){
                        console.log('Tarea COMPLETADA');
                    }
                    console.log("id",tarea.id_tarea_falla);
                    
                    if (tarea.idtareaestatus_falla === 4) {
                        if (fecha_entrega < today) {
                            try {
                                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: tarea.id_tarea_falla,
                                      nom_tarea: tarea.nom_tarea,
                                      descripcion_tarea: tarea.descripcion_tarea,
                                      fecha_publicacion_falla: tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 2,
                                      idusuario_admin: tarea.idusuario_admin,
                                      idusuario_encargado: tarea.idusuario_encargado,
                                      idusuario_ayudante: tarea.idusuario_ayudante,
                                      idcatplanta: tarea.idcatplanta,
                                     
                                      idtareaprioridad: tarea.idtareaprioridad
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

                        if(tarea.idtareaestatus_falla === 3){
                            try{
                                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: tarea.id_tarea_falla,
                                      nom_tarea: tarea.nom_tarea,
                                      descripcion_tarea: tarea.descripcion_tarea,
                                      fecha_publicacion_falla: tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 2,
                                      idusuario_admin: tarea.idusuario_admin,
                                      idusuario_encargado: tarea.idusuario_encargado,
                                      idusuario_ayudante: tarea.idusuario_ayudante,
                                      idcatplanta: tarea.idcatplanta,
                                     
                                      idtareaprioridad: tarea.idtareaprioridad
                                    })
                                });
                                console.log('La tarea se cambio a no entregada');
                            } catch (error) {
                                console.error("Error en el cambio a no ENTREGADA");
                            }
                        }else{
                            console.log("La tarea conserva su estatus");
                        }
                    }

                    if(fecha_entrega > today){
                        if(tarea.idtareaestatus_falla === 2) {
                            try{
                                await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id_tarea_falla: tarea.id_tarea_falla,
                                      nom_tarea: tarea.nom_tarea,
                                      descripcion_tarea: tarea.descripcion_tarea,
                                      fecha_publicacion_falla: tarea.fecha_publicacion_falla,
                                      fecha_entrega_falla: tarea.fecha_entrega_falla,
                                      idtareaestatus_falla: 3,
                                      idusuario_admin: tarea.idusuario_admin,
                                      idusuario_encargado: tarea.idusuario_encargado,
                                      idusuario_ayudante: tarea.idusuario_ayudante,
                                      idcatplanta: tarea.idcatplanta,
                                     
                                      idtareaprioridad: tarea.idtareaprioridad
                                    })
                                });
                                console.log('La tarea se cambio a pendiente');
                            } catch (error) {
                                console.error("Error en el cambio a PENDIENTE");
                            }
                        }else{
                            console.log("La tarea conserva su estatus");
                        }
                    }

                }
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }
        },

        async GetTask() {
            try {
                const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas');
                const tasks = await response.json();
                this.tasks = tasks.filter(task => task.idtareaestatus_falla === this.Status);
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }

            try {
                const responsePriorities = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Prioridades');
                this.priorities = await responsePriorities.json();
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }

            // Map task priorities
            this.tasks = this.tasks.map(task => {
                const priority = this.priorities.find(priority => priority.id_prioridad === task.idtareasprioridad);
                task.nom_prioridad = priority ? priority.nom_prioridad : 'Sin Prioridad';
                return task;
            });

        },

        formatFecha(fecha) {
            return fecha ? fecha.slice(0, 10) : '';
        }
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