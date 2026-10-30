//Importation des outils
const express  = require('express');
const QRcode = require('qrcode');
//Configuration de l'application
const app = express();
const port = 3000;
//Route principale
app.get('/', async (req, res) => {
    // Récupération de la saisie de l'utilisateur
    const texteSaisi = req.query.text || '';
    let qrimage = '';
    // Vérification et génération du QR code correspondant
    if(texteSaisi){
        try{
            qrimage = await QRcode.toDataURL(texteSaisi);
        }catch (err) {
            console.error(err);
        }
    }
    // On envoie la page HTML avec le formulaire et l'affichage du code qr
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Generateur de QR Code</title>
        </head>
        <body style="text-align : center; margin-top : 50px; font-family : Arial;">
            <h2>Generateur de QR Code</h2> 
            <!-- Le formulaire html -->
            <form action="/" method="GET">
                <input type="text" name="text" placeholder="Entrer le lien ici..." value="${texteSaisi}" required>
                <button type="submit">Generer</button>
            </form> 
            <!-- Si un QR code a ete generer , on l'affiche -->
            ${qrimage ?`
                <div style="margin-top: 20px;">
                    <p>Voici le QR Code :</p>
                    <img src="${qrimage}" alt="QR Code">
                </div>
            ` : ''}  
        </body>
        </html>
    `);
});    
//Lancement du serveur
app.listen(port, () => {
    console.log("le port est a 3000" );
});