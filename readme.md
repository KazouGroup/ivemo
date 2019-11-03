## KazouGroup 

- **[Kazoutech](http://kazoutech.com)**
- **[Kazoucoin](http://kazoucoin.com)**
## Configuration

Cloner le fichier puis faire un <code>composer update</code> si vous ete sur window faite <code>composer install --ignore-platform-reqs</code>

Ensuite faite un <code>npm i</code> et <code>npm run watch</code>

Configurer votre votre fichier <code>.env</code> en duplicant celle de <code>.env.example</code> 

Faite ensuite <code>php artisan key:generate</code> et faire <code>php artisan serve</code>

Vous aurrez ce lien **[http://127.0.0.1:8000](http://127.0.0.1:8000)** 

Apres la configuration de la base de donner <code>php artisan migrate:fresh --seed</code>

##Configuration base de donner

<code>mysql -uroot -p</code> entrer votre mot de passe mysql <code>CREATE DATABASE ivemo;</code>

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [dasgivemoi@gmail.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
