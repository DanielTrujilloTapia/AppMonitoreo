<template>
    <ion-page>
      <ion-content>
        <ion-card style="margin: 0px;">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-input placeholder="Buscar nombre" v-model="searchName"></ion-input>
              </ion-col>
              <ion-col>
                <ion-select v-model="searchTipo">
                  <ion-select-option value="">Tipo</ion-select-option>
                  <ion-select-option v-for="tipo in tipos" :key="tipo.id_tipo" :value="tipo.nom_tipo">
                    {{ tipo.nom_tipo }}
                  </ion-select-option>
                </ion-select>
              </ion-col>
              <ion-col>
                <ion-select v-model="searchEstado">
                  <ion-select-option value="">Estado</ion-select-option>
                  <ion-select-option v-for="estado in estados" :key="estado.id_estado" :value="estado.nom_estado">
                    {{ estado.nom_estado }}
                  </ion-select-option>
                </ion-select>
              </ion-col>
              <ion-col>
                <ion-select v-model="searchPuesto">
                  <ion-select-option value="">Puesto</ion-select-option>
                  <ion-select-option v-for="puesto in puestos" :key="puesto.id_puesto" :value="puesto.nom_puesto">
                    {{ puesto.nom_puesto }}
                  </ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
  
            <ion-row>
              <ion-col>Nombre</ion-col>
              <ion-col>Contraseña</ion-col>
              <ion-col>Estado</ion-col>
              <ion-col>Tipo</ion-col>
              <ion-col>Puesto</ion-col>
            </ion-row>
  
            <ion-row v-if="filteredUsers.length === 0">
              <ion-col>No hay usuarios para mostrar</ion-col>
            </ion-row>
  
            <ion-row v-else v-for="user in filteredUsers" :key="user.id_usuario">
              <ion-col>{{ user.nom_usuario }}</ion-col>
              <ion-col>{{ user.contrasena }}</ion-col>
              <ion-col>{{ user.estadoUsuario ? user.estadoUsuario.nom_estado : 'N/A' }}</ion-col>
              <ion-col>{{ user.tipoUsuario ? user.tipoUsuario.nom_tipo : 'N/A' }}</ion-col>
              <ion-col>{{ user.puestoUsuario ? user.puestoUsuario.nom_puesto : 'N/A' }}</ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
  
  export default {
    name: 'UsersComponent',
    components: {
      IonPage,
      IonContent,
      IonCard,
      IonGrid,
      IonRow,
      IonCol,
      IonInput,
      IonSelect,
      IonSelectOption
    },
    data() {
      return {
        users: [],
        estados: [],
        tipos: [],
        puestos: [],
        searchName: '',
        searchTipo: '',
        searchEstado: '',
        searchPuesto: ''
      };
    },
    methods: {
      async Get_Datas() {
        try {
          const responseUsers = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Usuarios');
          this.users = await responseUsers.json();
        } catch (error) {
          console.error("Error en la consulta de los USUARIOS");
        }
  
        try {
          const responseEstados = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Estados_Usuarios');
          this.estados = await responseEstados.json();
        } catch (error) {
          console.error("Error en la consulta de los ESTADOS");
        }
  
        try {
          const responseTipos = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Tipos_Usuarios');
          this.tipos = await responseTipos.json();
        } catch (error) {
          console.error("Error en la consulta de los TIPOS");
        }
  
        try {
          const responsePuestos = await fetch('https://sitemapiapp20240812132426.azurewebsites.net/api/Usu_Puestos_Usuarios');
          this.puestos = await responsePuestos.json();
        } catch (error) {
          console.error("Error en la consulta de los PUESTOS");
        }
  
        this.users = this.users.map(user => {
          user.estadoUsuario = this.estados.find(estado => estado.id_estado === user.idusuestado);
          user.tipoUsuario = this.tipos.find(tipo => tipo.id_tipo === user.idusutipousuario);
          user.puestoUsuario = this.puestos.find(puesto => puesto.id_puesto === user.idusupuestousuario);
          return user;
        });
      }
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => {
          const matchesName = this.searchName ? user.nom_usuario.toLowerCase().includes(this.searchName.toLowerCase()) : true;
          const matchesTipo = this.searchTipo ? (user.tipoUsuario && user.tipoUsuario.nom_tipo === this.searchTipo) : true;
          const matchesEstado = this.searchEstado ? (user.estadoUsuario && user.estadoUsuario.nom_estado === this.searchEstado) : true;
          const matchesPuesto = this.searchPuesto ? (user.puestoUsuario && user.puestoUsuario.nom_puesto === this.searchPuesto) : true;
          return matchesName && matchesTipo && matchesEstado && matchesPuesto;
        });
      }
    },
    created() {
      this.Get_Datas();
    }
  };
  </script>
  