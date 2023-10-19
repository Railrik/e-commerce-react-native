## Projet E-commerce React Native

Ce projet est une `Démonstration` d'application mobile E-commerce développée en utilisant React Native. Elle permet aux utilisateurs de parcourir des cours, d'ajouter des cours au panier, de passer des commandes et de gérer leur profil. Les données sont en temps réel, ce qui signifie qu'aucun rafraîchissement n'est nécessaire pour voir les mises à jour, grâce à l'utilisation d' **Apollo GraphQL** et **Prisma**

![Demo Gif](https://ligny.pro/assets/ecommerce-rn-1.gif)

[Demo Gif](https://ligny.pro/assets/ecommerce-rn-1.gif)

### Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système :

- Git
- Node.js
- npm
- PostgreSQL
- Expo CLI (pour lancer l'application)

### Installation

1. Clonez ce dépôt dans votre dossier de travail :

```sh
git clone https://github.com/Railrik/e-commerce-react-native.git
cd e-commerce-react-native/
```

2. Installez les dépendances du projet :

```sh
npm install && (cd server && npm install)
```

3. Importez la base de données dans PostgreSQL en utilisant le fichier `server/courses_app.sql`.

4. Modifiez le fichier `.env` dans le dossier `server` pour faire pointer vers votre serveur PostgreSQL.

### Utilisation

##

#### Prisma Studio

Lancez Prisma Studio pour explorer la base de données
Dans un terminal, exécutez les commandes suivantes :

```sh
cd server
node index.js
cd prisma
npx prisma studio
```

##

#### GraphQL (avec Apollo 3)

Lancez le serveur GraphQL avec Apollo 3 dans un autre terminal :

```sh
cd server
nodemon graphql/index.js
```

##

#### Expo

Lancez l'application mobile avec Expo :
Dans un terminal séparé, exécutez la commande suivante :

```sh
npx expo start
```

touche `i` et ou touche `a` pour lancer l'application (ou depuis le qr code sur votre mobile)

Vous êtes maintenant prêt à utiliser l'application E-commerce React Native. Suivez ces instructions pour installer et exécuter le projet sur votre machine. Bon développement ! 🚀

## Contact

> :link: https://ligny.pro
>
> :wink: par e-mail benjamin@ligny.pro
>
> :fist_right: [via linkedin](https://www.linkedin.com/in/benjamin-ligny/)
