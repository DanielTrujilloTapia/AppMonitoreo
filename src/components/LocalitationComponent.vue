<template>
    <ion-page id="main-content">
        <ion-header class="header-toolbar-custom">
            <toolbar-component :title="'Service'"/>
        </ion-header>
        
        <ion-content>

            <ion-card>
                <ion-card-title>Localizacion</ion-card-title>
                <ion-card-content>
                   <p> La latitud es: {{ lat }} L a longitud es: {{ lon }}</p>
                   <p>La localización es: {{ ubicacionDetallada }}</p>
                   <p>Estas son las coordenadas al ingresar la ubicacion detallada: {{nuevalat}} y{{ nuevalon }}</p>
                    <ion-button @click="obtenerUbicacion()">Obtener</ion-button>
                    <ion-button @click="obtenerCoordenadas(ubicacionDetallada)">Obtener Coordenadas</ion-button>
                </ion-card-content>
            </ion-card>
                                    
            <ion-card>
              <ion-card-title>Post coordenadas</ion-card-title>
              <ion-button @click="postubicacion(lat,lon)">Enviar coordenadas</ion-button>
            </ion-card>

        </ion-content>

    </ion-page>
</template>

<script>
    import { IonPage, IonHeader, IonContent, IonCard, IonItem, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import { addOutline, personCircle } from 'ionicons/icons'

export default {
    name: 'LocalitationComponent',
    components: {
        IonPage,
        IonHeader,
        ToolbarComponent,
        IonContent,
        IonCard,
        IonItem,
        IonCardTitle,
        IonCardContent,
        IonButton
    },
    setup() {
        return{
           
        }
    },
    data() {
        return {
            ubi:null,
            ubicacionDetallada: null,
            lat:null,
            lon:null,
            nuevalat:null,
            nuevalon:null,
            latitudestatica: null,
            longitudestatica: null
        }
    },
    methods: {
        async obtenerUbicacion() {
      try {
        const obtenerPosicion = () => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        };

        const position = await obtenerPosicion();
        this.ubi = position;
        this.lat = this.ubi.coords.latitude;
        this.lon = this.ubi.coords.longitude;
        console.log(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
        this.obtenerUbicacionDetallada(this.ubi.coords.latitude, this.ubi.coords.longitude);
      } catch (error) {
        alert('Error al obtener la ubicación', error);
      }
    },
    async obtenerUbicacionDetallada(latitud, longitud) {
      try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`);
    const data = await response.json();
    this.ubicacionDetallada = data.display_name;
    console.log(`Ubicacion de tallada: ${this.ubicacionDetallada}`);
  } catch (error) {
   alert('Error al obtener la ubicación detallada', error);
  }
    },

        async obtenerCoordenadas(direccion) {
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
              this.coordenadas = {
                lat: data[0].lat,
                lon: data[0].lon
              };
              console.log(`Latitud: ${this.coordenadas.lat}, Longitud: ${this.coordenadas.lon}`);
              this.nuevalat=this.coordenadas.lat;
              this.nuevalon=this.coordenadas.lon;
            } else {
              alert('No se encontraron coordenadas para la dirección proporcionada.');
            }
          } catch (error) {
            console.log('Error al obtener las coordenadas', error);
          }
        },

        postubicacion(lat,lon){
          const nlat= parseFloat(this.nuevalat);
          const nlon= parseFloat(this.nuevalon);
    const sumalat = nlat + 0.01;
    const reslat = nlat - 0.01;
    const sumalong = nlon + 0.01;
    const reslong = nlon - 0.01;

    console.log(`Rango de latitud: ${reslat} a ${sumalat}`);
    console.log(`Rango de longitud: ${reslong} a ${sumalong}`);

    if (lat >= reslat && lat <= sumalat) {
        if (lon >= reslong && lon <= sumalong) {
            console.log("Realizar el post");
        } else {
            console.log("La longitud sobrepasa el rango establecido");
        }
    } else {
        console.log("La latitud sobrepasa el rango establecido");
    }
}
    }
    };
    </script>