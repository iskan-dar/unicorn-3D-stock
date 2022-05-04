const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');
const {
	register,
	login,
	logout,
	refresh,
	getAllUsers,
	activate,
} = require('../service/userService');

module.exports.registerUser = async (req, res, next) => {
	console.log('<<<<<<<userController registerUser>>>>>>>', req.body);
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(
				ApiError.BadRequest('Wrong email or password', errors.array()),
			);
		}

		const {
			firstName, lastName, email, password,
		} = req.body;
		const userData = await register(
			firstName,
			lastName,
			email,
			password,
			next,
		);
		console.log(userData);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		}).json(userData);
	} catch (error) {
		console.error('{{{{{{registerUser<<<<error>>>>}}}}}}', error);
		next(error);
	}
};

module.exports.loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const userData = await login(email, password, next);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		}).json(userData);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

module.exports.logoutUser = async (req, res, next) => {
	const { refreshToken } = req.cookies;
	console.log(req.cookies, '{{{{logoutUser}}}refreshToken>>>>', refreshToken);
	try {
		const token = await logout(refreshToken, next);

		res.clearCookie('refreshToken');
		return res.json(token);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

module.exports.refreshUser = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		const userData = await refresh(refreshToken, next);

		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		}).json(userData);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

module.exports.getUsers = async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.json(users);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

module.exports.activateUser = async (req, res, next) => {
	try {
		const activationLink = req.params.link;
		await activate(activationLink, next);
		return res.redirect(process.env.CLIENT_URL);
	} catch (e) {
		next(e);
	}
};
