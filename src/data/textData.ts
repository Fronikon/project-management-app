const textData = {
  header: {
    signIn: {
      ru: 'Вход',
      eng: 'Sign in',
    },
    exit: {
      ru: 'Выход',
      eng: 'Exit',
    },
    signUp: {
      ru: 'Регистрация',
      eng: 'Sign up',
    },
    home: {
      ru: 'Домой',
      eng: 'Home',
    },
    boards: {
      ru: 'Доски',
      eng: 'Boards',
    },
    addBoard: {
      ru: 'Добавить доску',
      eng: 'Add board',
    },
    edit: {
      ru: 'Изменить',
      eng: 'Edit',
    },
    start: {
      ru: 'К доскам',
      eng: 'To boards',
    },
  },
  footer: {
    Andrey: {
      ru: 'Андрей Лаврёнов',
      eng: 'Andrey Lavrenov',
    },
    Dmitry: {
      ru: 'Дмитрий Береснев',
      eng: 'Dmitry Beresnev',
    },
    Daniil: {
      ru: 'Даниил Шаренков',
      eng: 'Daniil Sharenkov',
    },
  },
  welcomePage: {
    textWrapper: {
      ru: 'Мы поможем вам упорядочить вашу работу с помощью инструментов для управления доской с задачами. Для этого зарегистрируйтесь или войдите в свою учётную запись',
      eng: 'We will help you organize your work with the help of task board management tools. To do this, register or sign in to your account',
    },
    team: {
      ru: 'Наша команда',
      eng: 'Our team',
    },
  },
  boardsPage: {
    createBoard: {
      title: {
        ru: 'Создание доски',
        eng: 'Create board',
      },
      inputTitle: {
        label: {
          ru: 'Название',
          eng: 'Title',
        },
        placeholder: {
          ru: 'Введите название...',
          eng: 'Enter title...',
        },
        requiredError: {
          ru: 'Пожалуйста введите название.',
          eng: 'Please enter title.',
        },
      },
      inputDescription: {
        label: {
          ru: 'Описание',
          eng: 'Description',
        },
        placeholder: {
          ru: 'Введите описание...',
          eng: 'Enter description...',
        },
        requiredError: {
          ru: 'Пожалуйста введите описание.',
          eng: 'Please enter description.',
        },
      },
      confirmButton: {
        ru: 'Создать',
        eng: 'Create',
      },
      cancelButton: {
        ru: 'Отмена',
        eng: 'Cancel',
      },
    },
    editBoard: {
      title: {
        ru: 'Редактировать доску',
        eng: 'Edit board',
      },
      confirmButton: {
        ru: 'Изменить',
        eng: 'Edit',
      },
    },
    questionConfirmingDeleteBoard: {
      ru: 'Доска будет удалена. Вы уверены?',
      eng: 'The board will be removed. Are you sure?',
    },
    todo: {
      ru: 'К выполнению',
      eng: 'To do',
    },
    inProgress: {
      ru: 'В процессе',
      eng: 'In progress',
    },
    newColumn: {
      ru: 'Новая колонка',
      eng: 'New column',
    },
    title: {
      ru: 'Название',
      eng: 'Title',
    },
    description: {
      ru: 'Описание',
      eng: 'Description',
    },
    taskColor: {
      ru: 'Выберите цвет задания',
      eng: 'Choose the color of the task',
    },
    boardColor: {
      ru: 'Выберите цвет доски',
      eng: 'Сhoose the color of the board',
    },
    newTask: {
      ru: 'Новое задание',
      eng: 'New task',
    },
    changeTask: {
      ru: 'Изменить задание',
      eng: 'Change task',
    },
  },
  authPage: {
    signIn: {
      ru: 'Вход',
      eng: 'Sign in',
    },
    confirmButtonSignUp: {
      ru: 'Зарегистрироваться',
      eng: 'Register',
    },
    confirmButtonLogIn: {
      ru: 'Войти',
      eng: 'Enter',
    },
    login: {
      ru: 'Логин',
      eng: 'Login',
    },
    loginPlaceholder: {
      ru: 'Введите ваш логин',
      eng: 'Enter your login',
    },
    password: {
      ru: 'Пароль',
      eng: 'Password',
    },
    passwordPlaceholder: {
      ru: 'Введите ваш пароль',
      eng: 'Enter your password',
    },
    submit: {
      ru: 'Отправить',
      eng: 'Submit',
    },
    warning: {
      ru: 'Если у вас нет аккаунта пожалуйста ',
      eng: "If you don't have an account please ",
    },
    warningLink: {
      ru: 'зарегистрируйтесь',
      eng: 'register',
    },
    name: {
      ru: 'Имя',
      eng: 'Name',
    },
    namePlaceholder: {
      ru: 'Введите ваше имя',
      eng: 'Enter your name',
    },
    logOut: {
      ru: 'Вы уверены, что хотите выйти?',
      eng: 'Are you sure you want to log out?',
    },
  },
  errors: {
    required: {
      ru: 'Это поле обязательно для заполнения',
      eng: 'This field is required',
    },
    loginError: {
      ru: 'Введите не менее 3 символов',
      eng: 'Enter at least 3 characters',
    },
    passwordError: {
      ru: 'Введите не менее 6 символов',
      eng: 'Enter at least 6 characters',
    },
  },
  pageNotFound: {
    ru: 'К сожалению такой страницы не существует',
    eng: 'Sorry, there is no such page',
  },
  serverErrors: {
    loginAlready: {
      ru: 'Пользователь с таким логином уже зарегистрирован',
      eng: 'A user with this login is already registered',
    },
    wrongLoginOrPassword: {
      ru: 'Неверный логин или пароль',
      eng: 'Wrong login or password',
    },
    otherError: {
      ru: 'Что-то пошло не так, попробуйте позже',
      eng: 'Something went wrong, try again later',
    },
  },
  general: {
    confirmModal: {
      cancelButton: {
        ru: 'Нет',
        eng: 'No',
      },
      confirmButton: {
        ru: 'Да',
        eng: 'Yes',
      },
    },
  },
};

export default textData;
