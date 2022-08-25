Проект разбиваем на две части: frontend и backend.

(Одновременная работа в двух терминалах)

backend запускается через server.js `npm run server`.

На frontend реакт `npx create-react-app .`
C основной папки проекта nodejs-practice запускаем реакт `npm run client`

---

config -> .env - настройки
config -> db.js подключение к БД

---

обертка try-catch `npm i express-async-handler`

---

`npm i cross-env` для винды

package.json -> разделяем разработку от продакшена

```
"start": "cross-env NODE_ENV=production node backend/server.js",
 "server": "cross-env NODE_ENV=development nodemon backend/server.js",
```

---

Обработка ошибок

middlewares -> errorHandler.js - показывать ошибку в зависимости от production/development

development `npm run server` - stack ошибки
production `npm run start` - null

---

### registration / authorization / authentication

`npm i bcrypt` - хеширование пароля
`npm i jsonwebtoken` - генерирование токена
на сайте `jwt.io` - можно увидеть составные токена
