const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { isEmail, isURL } = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: [true, 'Поле avatar должно быть заполнено'],
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
			validate: [isURL, 'Не валидный URL'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Не валидный Email'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
	});
	userSchema.statics.findUserByCredentials = function (email, password) {
		return this.findOne({ email }).select('+password')
			.then((user) => {
				if (!user) {
					return Promise.reject(new Error('Неправильные почта или пароль'));
				}
	
				return bcrypt.compare(password, user.password)
					.then((matched) => {
						if (!matched) {
							return Promise.reject(new Error('Неправильные почта или пароль'));
						}
	
						return user; // теперь user доступен
					});
			});
	};

module.exports = mongoose.model('user', userSchema);
