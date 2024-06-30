# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list





## -----Селф ревью-----

Чтож, это была одна из самых тяжелых для меня на данный момент домашек, так как с next и redux я не работал, делал проект на mobX, но как оказалось помогло это несильно. Что по итогу у меня получилось и не получилось. Так как я начал делать проект в тот же день, как выставили дз, я начал делать его с неправильным сервером и по итогу переделал его, поэтому если что, напишите в телеграмм, если возникнут проблемы с получением данных, так как у меня всё работает.

Не получилось:

 - Вроде как, на мой скромный взгляд все требования я выполнил. Разве что некоторые вещи банально затипизировать не смог, так как с TS тоже не так давно начал работать.

Получилось:

 - Верстка соответствует макету, стили тоже (я про липкую шапку)
 - Проект запускается (ну у меня по крайней мере, если что напишите в тг, постараюсь помочь разобраться в том, что у меня вышло)
 - Сделал авторизацию, которая о чудо, работает, токен сохранял в локалсторедж, а фильмы, которым поставил оценку авторизованный пользователь в куки, при выходе пользователя куки удаляются, соответственно для пользователя, который авторизировался после выхода, оценуи прошлого не видны.
 - Фильтры сохранял в квери параметры, чтобы при перезагрузке страницы они сохранялись, лоадер сделал, всё гуд в этом плане. Дропдаун вообще я считаю я хороший сделал
 - Поиск тоже работает, сделал задержку в 0.5 секунд
 - Использовал rtk и rtk-query
 - Все данные получаются, пагинация по 10 фильмов работает, всё круто.
 - Оценку поставить можно, даже как оказалось несколько и все они будут менять общий рейтинг, я спрашивал в чате норм ли это, ответили, что да, поэтому я оставил как есть. При перезагрузке страницы можно убедиться в том, что рейтинг меняется. Сделал запрос мутации.
 - Обработка ошибок присутствует и вроде как однообразно
 - Селекторы оптимальны, сделал через css модуляцию