const express = require("express"); // por qué importa en CommonJS?
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/dknPhDI6IqY:APA91bHm5JZejRFwBidlORWOTYmfNfrDDFobb1iQWi6d8RO4fs8Y8rRdovkyOckbNMG_OsUO9m5_HvgCL-zBySt1NFwmR-ca2S8ymse_lsO1ncEBO_9v-2AuXytoG26t_eiRilPfFEId',
    expirationTime: null,
    keys: {
        p256dh: 'BDiY0QAKzA8L7dx6l_fJumlh8U7jpRKbkhLNFkS4Q_O6k83dD3DRnrO7rnTdmHpH3Lw2LTNAnZEmE3J6rbqLvyw',
        auth: 'nh8oFhaKte2gle5SMKnTmw' // este es el nombre de la app encriptado
    }
}
const vapidKeys = {
    publicKey: 'BJOta691c6vSqcOqEFW_FKJ7uIvb789qJvqmt5R6EfXa_AAcNJ5_SJsBnDtVJvBzTkVOgH7eV2MSX35RuvMXPNg',
    privateKey: '_xxCPR_ne2lJR-PfkxbIx_WmeNweSFssphbM59XZnAA'
}
webpush.setVapidDetails(
    'mailto:batata@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Routes
app.get('/', async (req, res) => {

    res.sendStatus(200).json(); // devuelve en localhost:8000 --> OK

    const payload = JSON.stringify({ title: "Mensaje del servidor!", message: "Soy un mensaje del más allá" });
    // webpush.sendNotification(pushSubscription, payload);
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    } catch (error) { console.log(error) }
});

app.post('/subscription', (req, res) => {
    console.log(req.body);
    res.sendStatus(200).json();
});

app.listen(port, () => console.log(`Server listening on port ${port}`));