const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } =process.env;

// module.exports = (req, _, next) => {
//   const { authorization } = req.headers;
//   const bearer = 'Bearer ';
//   const erorrMsg = 'Ошибка авторизации';

//   if (!authorization || !authorization.startsWith(bearer)) {
//     return next(
//       new Unauthorized(`${erorrMsg}(${authorization})!`),
//     );
//   }

//   const token = authorization.replace(bearer, '');
//   let payload;

//   try {
//     // верификация токена
//     payload = jwt.verify(token, SECRET_KEY);
//   } catch (err) {
//     return next(new Unauthorized(`${erorrMsg}`));
//   }
//   req.user = payload;

//   return next();
// };

const auth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		return next(new Unauthorized('Ошибка авторизации'));
	}
	let payload;
	try {
		payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
	} catch (err){
		return next(new Unauthorized('Ошибка авторизации'));
	}
	req.user = payload;
	return next();
};

module.exports = auth;
