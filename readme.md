## KazouGroup 

- **[KazouTech](http://kazoutech.com)**
- **[KazouCoin](http://kazoucoin.com)**
## Configuration

1- Clonez le projet en http ou ssh

2- Positionnez vous dans le fichier (ex: cd nom_fichier)

<<<<<<< HEAD
3- Tapez ensuite  ``` composer update ``` si vous êtes sur window faites ``` composer install --ignore-platform-reqs ```
=======
Configurer votre fichier ``` .env``` en duplicant celle de ``` .env.example ```
>>>>>>> 44a63da5b39ab65b04bb900486b9a61529954c77

4- Créez une base de donnée sur votre local (ex sur MySql: create database nom_base_donnee)

5- Configurez votre fichier ``` .env``` (dupliquez celui de ``` .env.example ```) avec les identifiants de la base de donnée (database, username, password)

6- Faites ensuite  ``` php artisan key:generate ``` 

7- Migrez les tables dans la base de donnée en faisant  ``` php artisan migrate:fresh --seed```

8- Ensuite faites un <code>npm i</code> et <code>npm run watch</code>

9- Ouvrez une autre fenêtre de commande et faites ``` php artisan serve ```

10- Vous auriez ce lien **[http://127.0.0.1:8000](http://127.0.0.1:8000)** (port 8000 par default)



## Configuration base de donner

``` mysql -uroot -p``` entrer votre mot de passe mysql ``` CREATE DATABASE ivemo;```

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [dasgivemoi@gmail.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
