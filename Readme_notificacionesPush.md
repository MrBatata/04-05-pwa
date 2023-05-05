# Notificaciones Push en React

En la lección 07 seguimos profundizando en la configuración del Service Worker y añadimos funcionalidades para Notificaciones Push

## Lección 07 - Profundizando en los Service Workers y añadiendo funcionalidad de notificaciones Push

1. Veremos ejemplos de notificaciones push en otros proyectos
   
2. Seguimos trabajando en la aplicación de la lista de la compra que empezamos en la sesión 04
   
3. Instalamos las dependencias para generar las vapid keys, con el fin de poder gestionar las notificaciones push en nuestro proyecto
   `npm i -g web-push` versión con más descargas @3.4.5
   `web-push generate-vapid-keys [--json]`
   Genera dos keys: 1 pública y 1 privada. Incluimos en `serviceWorkerRegistration.js`:
   `const vapidKey = { publicKey: '...key...', privateKey: '...key...'}`

4. Modificamos la función register()
   // Start modification for Push Notifications
   .then((registration) => {
   registration.pushManager.getSubscription()
   .then(async sub => {
   // const pushSubscription =
   await registration.pushManager.subscribe({
   userVisibleOnly: true,
   applicationServerKey: vapidKeys.publicKey
   });
   // Aquí se lo enviamos al servidor
   // await axios.post('http://localhost:8000/subscription', {
   // pushSubscription
   // });
   });
   // End modification for Push Notifications

5. Gestionamos los permisos del navegador
   
6. Crearemos una notificación push indicando que existe una nueva versión del código
   En `service-worker.js`:
   `self.registration.showNotification("Existe una nueva versión!", {body: "Instalala!"})`
