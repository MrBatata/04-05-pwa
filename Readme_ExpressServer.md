# Notificaciones Push en React

En la lección 07 parte 2, montamos un servidor Express (simulado).

1.  Generamos carpeta `server` comenzamos con `npm init` para generar el `package.json`.
2.  Instalamos dependencias requeridas en carpeta, debiendo previo ingresar en terminal a dicha carpeta!
    ¡No en el principal del proyecto!!
    `npm i express` https://www.npmjs.com/package/express
    `npm i cors` https://www.npmjs.com/package/cors

3.  Creamos `index.js` dentro de server.

4.  Debemos configurar `swRegistration.js` para enviar registro al servidor.
    Guardamos `registration.pushManager.subscribe(....)` en constante y luego ejecutamos un post mediante axios (podría usarse fetch pero es más simple con axios):
    await axios.post('http://localhost:8000/subscription', {
    pushSubscription
    });

5.  Debieramos poder levantar ambos servidor `node index.js` y la app `npm run server-prod`.

6.  Respuesta en el servidor, simulamos guardando en una constante...
`{
pushSubscription: {
endpoint: 'https://fcm.googleapis.com/fcm/send/dknPhDI6IqY:APA91bHm5JZejRFwBidlORWOTYmfNfrDDFobb1iQWi6d8RO4fs8Y8rRdovkyOckbNMG_OsUO9m5_HvgCL-zBySt1NFwmR-ca2S8ymse_lsO1ncEBO_9v-2AuXytoG26t_eiRilPfFEId',
      expirationTime: null,
      keys: {
         p256dh: 'BDiY0QAKzA8L7dx6l_fJumlh8U7jpRKbkhLNFkS4Q_O6k83dD3DRnrO7rnTdmHpH3Lw2LTNAnZEmE3J6rbqLvyw',
         auth: 'nh8oFhaKte2gle5SMKnTmw'
      }
}
}`

7.  Incluimos las vapidKeys obtenidas.
8.  Ya podemos simular el envío de notificaciones a la app (clientes), desde el servidor `index.js`.
9.  Ahora debemos configurar el SW de nuestra app, para que cada vez que reciba del servidor un evento push, pueda accionar.
`self.addEventListener('push', event => {
const { title, message } = event.data.json();
self.registration.showNotification(title, { body: message });
})`
