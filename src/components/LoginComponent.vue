  <template>
      <ion-page>
        <ion-content>
          <div class="blur-background">
            <ion-card class="background-card">
              <ion-img src="fondo.jpg" class="background-img"></ion-img>
            </ion-card>
          </div>
    
          <ion-card class="overlay-card">
            <ion-card-header class="overlay-header">
              <ion-title>Iniciar Sesión</ion-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-item >
                      <ion-label position="floating">Usuario</ion-label>
                      <br>
                      <ion-input v-model="username" type="text" placeholder="Ingresa tu usuario" maxlength="10" clear-input></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
    
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="floating">Contraseña</ion-label>
                      <br>
                      <ion-input v-model="password" type="password" placeholder="Ingresa tu contraseña" clear-input></ion-input>
                    </ion-item>
                  </ion-col>
                </ion-row>
    
                <ion-row>
                  <ion-col>
                    <ion-button @click.prevent="login()" expand="block" color="primary" class="login-button">Iniciar sesión</ion-button>
                  </ion-col>
                </ion-row>
    
                <ion-row>
                  <ion-col class="forgot-password">
                    <ion-button fill="clear" size="small">¿Olvidaste tu contraseña?</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-page>
    </template>
    
    <script>
    import { IonPage, IonContent, IonCard, IonCardHeader, IonCardContent, IonTitle, IonImg, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
    import { useIonRouter } from '@ionic/vue';

    export default {
      name: 'LoginComponent',
      components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonTitle,
        IonImg,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
      },
      data() {
          return {
              username: '',
              password: ''
          }
      },
      setup() {
        const ionRouter = useIonRouter();

        const navigateToHome = () => {
          ionRouter.push('/home');
        }
        return {
          navigateToHome
        }
      },
      methods: {
          async login() {

              if(this.username !== '' && this.password !== '' ){

                  const response = await fetch('https://177.17.10.11:7296/api/Usu_Usuarios');
                  const existe = await response.json();
                  
                  const userToLogin = existe.find(user => user.nom_usuario === this.username);
                  
                  if (userToLogin) {
                    console.log('usuario encontrado');

                    if(this.password === userToLogin.contrasena){
                      console.log('usuario inicio sesion correctamente');
                      console.log(userToLogin);
                      this.navigateToHome();
                    }else{
                      console.log('la contraseña es incorrecta');
                      alert('verifica que los datos sean correctos');
                    }
                  }else{
                      console.log('no se encontro al usuario');
                      alert('verifica que los datos sean correctos');
                  }
              }else{
                  alert('RELLENA TODOS LOS CAMPOS');
              }
              
          }
      }
    }
    </script>
    
<style scoped>
.blur-background {
  filter: blur(5px);
  -webkit-filter: blur(5px); /* Para Safari */
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}

.background-card {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.background-img {
  height: 100%;
  width: 100%;
  object-fit: cover; /* Asegura que la imagen cubra todo el área del card */
}

.overlay-card {
  position: absolute;
  top: 45%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 300px; /* Ajusta el ancho del card según sea necesario */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.overlay-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-button {
  margin-top: 20px;
}

.forgot-password {
  text-align: center;
  margin-top: 10px;
}

@media (min-width: 600px) {
  .overlay-card {
    width: 500px;
    height: auto; /* Permite que el card se ajuste al contenido */
  }
}
</style>
    