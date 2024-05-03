const express = require('express');
const bodyParser = require('body-parser');
const { Console } = require('console');

const app =  express().use(bodyParser.json());

app.post('/webhook',(req, res)=>{
    console.log('POST:Webhook');
    const body = req.body;
    if(body.object == 'page'){
        body.entry.forEach(entry => {
            //recepcion de mensajes
            const webhookEvent = entry.messagin[0];
            console.log(webhookEvent)
        });
        req.status(200).send('Evento recivido');
    }else{
        res.sendStatus(404);
    }
});
app.get('/webhook',(req, res)=>{
    console.log('Get:Webhook');
    const VERIFY_TOKEN = 'a9kM0LqqR3oi3F50h40WhzaLtEegosPuJwIME2EUXSOQGFzL4qSLrvpUp00TwdIzxlAhk';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
});
app.listen(3000,()=>{
    console.log('Servidor iniciado');

})