<template>
    <ion-card style="height: 301px;">
        <ion-card-header>
            <div class="custom-title">
                <p class="title-size">Tareas servicios</p>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-item class="item-click-custom" v-for="task in tasks.slice(0,8)" :key="task.id_tarea_servicio" >
                <p class="text-size">{{task.nom_tarea_servicio}}</p>
                <p class="button-custom" @click.prevent="updateTask(task.id_tarea_servicio)">Actualizar</p>
                <p class="button-custom" @click.prevent="deleteTask(task.id_tarea_servicio)">Eliminar</p>
            </ion-item>
        </ion-card-content>
    </ion-card>

    <ion-card style="height: 301px;">
        <ion-card-header>
            <div class="custom-title">
                <p class="title-size">Tareas fallas</p>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-item class="item-click-custom" v-for="fail in failtasks.slice(0,8)" :key="fail.id_tarea_falla" >
                <p class="text-size">{{fail.nom_tarea}}</p>
                <p class="button-custom" @click.prevent="updatefailTask(fail.id_tarea_falla)">Actualizar</p>
                <p class="button-custom" @click.prevent="deleteTaskfail(fail.id_tarea_falla)">Eliminar</p>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonItem } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';

export default {
    name: 'CardTareasReutilizableComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonItem,
    },
   
    data() {
        return {
            tasks: [],
            failtasks:[],
        };
    },
    setup() {
        const ionRouter = useIonRouter();

        const navigateToViewTasks = () => {
            ionRouter.push('/viewTasks');
        }
        const navigateToViewupdatetask = () => {
            ionRouter.push('/updatetask');
        }
        const navigateToViewupdatefailtask = () => {
            ionRouter.push('/updatefailtask');
        }
        
        return {
            navigateToViewTasks,
            navigateToViewupdatetask,
            navigateToViewupdatefailtask
        }
    },
    methods: {
        async GetTask() {
            try {
                const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Servicios');
                const tasks = await response.json();
                this.tasks = tasks;
            } catch (error) {
                console.error("Error en la consulta de Tareas:", error);
            }
            try {
                const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas');
                const tasksfail = await response.json();
                this.failtasks = tasksfail;
            } catch (error) {
                console.error("Error en la consulta de Tareas_Fallas:", error);
            }
        },

        updateTask(taskId) {
            console.log('Actualizar tarea:', taskId);
            localStorage.setItem('id-tarea-s', JSON.stringify(taskId));
            this.navigateToViewupdatetask();
        },
        updatefailTask(taskId) {
            console.log('Actualizar tarea falla:', taskId);
            localStorage.setItem('id-tarea-s', JSON.stringify(taskId));
            this.navigateToViewupdatefailtask();
        },

        async deleteTask(taskId) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.');

    if (confirmDelete) {
        console.log('Eliminar tarea:', taskId);
            const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Servicios');
            const tablamonitoreo = await response.json();
            const registromonitoreo = tablamonitoreo.filter(tmon => tmon.idtareaservicio === taskId);
            
            /*
            const response2 = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Img_Tarea');
            const tablaimg = await response2.json();
            const registroimg = tablaimg.filter(tmon => tmon.idserviciotarea === taskId);
        
            try {
            await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Img_Tarea/${registroimg.id_img}`, {
                method: 'DELETE',
            }).then(() => {
                console.log("Eliminada la imagen correctamente");
            }).catch(error => {
                console.error('Error eliminando la imagen:', error);
            });
        } catch (error) {
            console.log("Error con la eliminación");
        }
        */

        if(registromonitoreo.length>0){
            console.log("si existe el moitoreo para la tarea", taskId);
            try {
            await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Servicios/${registromonitoreo.id_monitoreo_servicio}`, {
                method: 'DELETE',
            }).then(() => {
                console.log("Eliminada el registro en monitoreo correctamente");
            }).catch(error => {
                console.error('Error eliminando el registro en monitoreo:', error);
            });
        } catch (error) {
            console.log("Error con la eliminación");
        }
        }else{
            console.log("no existe el monitoreo para la tarea", taskId);
        }

        try {
        const response = await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Servicios?id=${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error en la eliminación: ${response.statusText}`);
        }

        // Llama a la función para obtener las tareas actualizadas
        await this.GetTask();

        console.log("Eliminada la tarea correctamente");
    } catch (error) {
        console.error('Error eliminando la tarea:', error);
    }
    } else {
        console.log("Eliminación cancelada");
    }
},

async deleteTaskfail(taskId) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.');

    if (confirmDelete) {
        console.log('Eliminar tarea:', taskId);
            const response = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas');
            const tablamonitoreo = await response.json();
            const registromonitoreo = tablamonitoreo.filter(tmon => tmon.idtareafalla === taskId);
            
            /*
            const response2 = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Img_Tarea');
            const tablaimg = await response2.json();
            const registroimg = tablaimg.filter(tmon => tmon.idserviciotarea === taskId);
        
            try {
            await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Cat_Img_Tarea/${registroimg.id_img}`, {
                method: 'DELETE',
            }).then(() => {
                console.log("Eliminada la imagen correctamente");
            }).catch(error => {
                console.error('Error eliminando la imagen:', error);
            });
        } catch (error) {
            console.log("Error con la eliminación");
        }
        */

        if(registromonitoreo.length>0){
            console.log("si existe el moitoreo para la tarea", taskId);
            try {
            await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Monitoreo_Tareas_Fallas?id=${taskId}`, {
                method: 'DELETE',
            }).then(() => {
                console.log("Eliminada el registro en monitoreo correctamente");
            }).catch(error => {
                console.error('Error eliminando el registro en monitoreo:', error);
            });
        } catch (error) {
            console.log("Error con la eliminación");
        }
        }else{
            console.log("no existe el monitoreo para la tarea", taskId);
        }

        try {
        const response = await fetch(`https://sitemapiapp20240812132426.azurewebsites.net/api/Tareas_Fallas?id=${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error en la eliminación: ${response.statusText}`);
        }

        // Llama a la función para obtener las tareas actualizadas
        await this.GetTask();

        console.log("Eliminada la tarea correctamente");
    } catch (error) {
        console.error('Error eliminando la tarea:', error);
    }
    } else {
        console.log("Eliminación cancelada");
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
        this.GetTask();
    }
}
</script>

<style scoped>
p {
    margin: 0px;
}

.custom-title {
    display: flex;
    justify-content: space-between; 
}

.title-size {
    font-size: 15px;
    color: var(--ion-title-color);
    font-weight: bold;
    text-align: justify;
}

.text-size {
    font-size: 13px;
    text-align: justify;
}

.button-custom {
    color: var(--ion-color-primary);
    padding-left: 3px;
}

.button-custom:active {
    color: rgb(9, 105, 46);
}

.item-click-custom:active {
    --color: var(--ion-color-primary);
}
</style>
