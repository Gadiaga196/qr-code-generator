### COMPTE-RENDU DE PROJET
#### Prénom : Ndeye Absa

#### Nom : Gadiaga

#### Niveau : L2DSBD

#### Projet : Générateur de QR Code

##### 1. Initialisation du projet et installation des modules
Pour commencer, nous avons initialisé le projet Node.js avec la commande :

Bash
npm init -y
Ensuite, nous avons installé les deux paquets nécessaires (express pour le serveur web et qrcode pour la génération des codes) à l'aide des commandes :

Bash
npm install express
npm install qrcode
##### 2. Importation des outils et configuration de l'application
Dans le fichier principal de notre application (index.js), nous avons commencé par importer les modules grâce à la fonction require() de Node.js, puis nous avons configuré notre application serveur sur le port 3000 :

JavaScript
// Importation des outils
const express = require('express');
const QRcode = require('qrcode');

// Configuration de l'application
const app = express();
const port = 3000;
##### 3. Mise en place de la route principale et gestion des requêtes
Nous avons créé une route HTTP de type GET (app.get('/')) pour gérer la page d'accueil. Cette route récupère le texte ou le lien saisi par l'utilisateur transmis dans l'URL via la requête (req.query.text) :

JavaScript
app.get('/', async (req, res) => {
    // Récupération de la saisie de l'utilisateur
    const texteSaisi = req.query.text || '';
    let qrimage = '';

    // Vérification et génération du QR code correspondant
    if (texteSaisi) {
        try {
            qrimage = await QRcode.toDataURL(texteSaisi);
        } catch (err) {
            console.error(err);
        }
    }
##### 4. Génération de l'interface HTML dynamique
Le serveur renvoie ensuite une page HTML complète au navigateur. Grâce aux littéraux de gabarit (template literals avec les balises ` et ${...}), la page intègre dynamiquement :

Le formulaire de saisie qui conserve le texte entré (value="${texteSaisi}").

L'affichage conditionnel du QR code sous forme d'image (<img src="...">) dès que la génération est réussie.

JavaScript
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Générateur de QR Code</title>
        </head>
        <body style="text-align : center; margin-top : 50px; font-family : Arial;">
            <h2>Générateur de QR Code</h2> 
            
            <!-- Le formulaire HTML -->
            <form action="/" method="GET">
                <input type="text" name="text" placeholder="Entrer le lien ici..." value="${texteSaisi}" required>
                <button type="submit">Générer</button>
            </form> 
            
            <!-- Affichage du QR code s'il a été généré -->
            ${qrimage ? `
                <div style="margin-top: 20px;">
                    <p>Voici le QR Code :</p>
                    <img src="${qrimage}" alt="QR Code">
                </div>
            ` : ''}  
        </body>
        </html>
    `);
});
##### 5. Démarrage et écoute du serveur
Enfin, nous avons configuré le serveur pour qu'il écoute les connexions entrantes sur le port 3000, en confirmant le bon fonctionnement par un message dans la console :

JavaScript
// Lancement du serveur
app.listen(port, () => {
    console.log("Le port est à 3000");
});
##### 6. Utilisation et démonstration
Lancement du serveur depuis le terminal :

Bash
##### node index.js
Accès à l'application depuis un navigateur web à l'adresse : http://localhost:3000

Saisie d'une URL ou d'un texte dans le champ de recherche puis clic sur le bouton Générer : le QR code correspondant est instantanément généré et affiché à l'écran.