## KazouGroup 

- **[Kazoutech](http://kazoutech.com)**
## Configuration

Cloner le fichier puis faire un ``` composer install ``` si vous ete sur window faite ``` composer install --ignore-platform-reqs ```

Ensuite faite un ``` npm i ``` et ``` npm run watch ```

Configurer votre fichier ``` .env``` en duplicant celle de ``` .env.example ```

Faite ensuite  ``` php artisan key:generate ``` et faire  ``` php artisan serve ```

Vous aurrez ce lien **[http://127.0.0.1:8000](http://127.0.0.1:8000)** 

Apres la configuration de la base de donner  ``` php artisan migrate:fresh --seed```

## Configuration base de donner

``` mysql -uroot -p``` entrer votre mot de passe mysql ``` CREATE DATABASE ivemo;```

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [dasgivemoi@gmail.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
