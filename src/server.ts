import App from './app';
<<<<<<< HEAD
=======
import DashController from './controllers/DashController';
>>>>>>> 1dc019863d22ada2781015614ea666094b0cc0d5
import TaskController from './controllers/TaskController';
import UserController from './controllers/UserController';

const app = new App([
  new UserController(),
  new TaskController(),
<<<<<<< HEAD
=======
  new DashController(),
>>>>>>> 1dc019863d22ada2781015614ea666094b0cc0d5
]);

app.listen(3333);

