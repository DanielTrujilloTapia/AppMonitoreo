<template>
    <ion-card>
        <ion-card-header>
            <div class="custom-title">
                <p>{{ title }}</p>
                <p>Ver mas</p>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-item v-for="task in tasks.slice(0,10)" :key="task.id_tarea_servicio">
                <p>{{ task.nom_tarea_servicio }}</p>
                <p slot="end">{{ formatFecha(task.fecha_entega_servicio) }}    </p>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonItem } from '@ionic/vue';

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
        };
    },
    methods: {

        async UpdateStateTask(){
            try {
                const response = await fetch('https://localhost:7296/api/Tareas_Servicios');
                this.tasksUpdates = await response.json();

                for (let i = 0; i < this.tasksUpdates.length; i++) {
                    const tarea = this.tasksUpdates[i];
                    const today = new Date();
                    const fecha_entrega = new Date(tarea.fecha_entega_servicio);

                    if(fecha_entrega < today){

                        if(tarea.idtareaestatus_servicio === 2){
                            console.log('NO ENTREGADA');
                        }else{
                            try{
                                await fetch('https://localhost:7296/api/Tareas_Servicios', {
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
                                await fetch('https://localhost:7296/api/Tareas_Servicios', {
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
                const response = await fetch('https://localhost:7296/api/Tareas_Servicios');
                const tasks = await response.json();
                this.tasks = tasks.filter(task => task.idtareaestatus_servicio === this.Status);
            } catch (error) {
              console.error("Error en la consulta de Tareas:", error);
            }
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

</style>