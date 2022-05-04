const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User } = require('../db/models');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');
const mailService = require('./mailService');

const {
	generateTokens, saveToken, removeToken, validateRefreshToken, findToken,
} = require('./tokenService');

module.exports.register = async (firstName, lastName, email, password, next) => {
	try {
		const candidate = await User.findOne({ where: { email } });

		if (candidate) {
			throw ApiError.BadRequest(`User with email ${email} already exists`);
		} else {
			const hashPassword = await bcrypt.hash(password, 10);
			const activationLink = uuid.v4();
			const user = await User.create({
				firstName, lastName, email, password: hashPassword, phone: 'укажите номер', activationLink,
			});

			await mailService.sendActivationMail(
				email,
				`${process.env.API_URL}/auth/activate/${activationLink}`,
			);

			const userDto = new UserDto(user);
			console.log(userDto);
			const tokens = generateTokens({ ...userDto });
			await saveToken(userDto.id, tokens.refreshToken);

			return { ...tokens, user: userDto };
		}
	} catch (error) {
		console.log('{{{userService register}}}error>>>', error);
		next(error);
	}
};

module.exports.login = async (email, password, next) => {
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			throw ApiError.BadRequest(`No account with ${email} is found`);
		}

		const isSamePassw = await bcrypt.compare(password, user.password);
		if (!isSamePassw) {
			throw ApiError.BadRequest('Wrong password');
		}

		const userDto = new UserDto(user);
		const tokens = generateTokens({ ...userDto });
		await saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	} catch (error) {
		console.log('{{{{{{{login error}}}}}', error);
		next(error);
	}
};

module.exports.refresh = async (refreshToken, next) => {
	try {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = validateRefreshToken(refreshToken);
		// console.log('{{{[userData}}}}', userData);
		const tokenFromDb = await findToken(refreshToken);
		// console.log('{{{tokenfromdDb', tokenFromDb);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await User.findOne({ where: { id: userData.id } });
		const userDto = new UserDto(user);
		const tokens = generateTokens({ ...userDto });
		await saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	} catch (error) {
		console.log('{{{{{refresh error}}}}', error);
		next(error);
	}
};

module.exports.logout = async (refreshToken, next) => {
	try {
		const token = await removeToken(refreshToken, next);
		return token;
	} catch (error) {
		console.log('{{{{{{logout error}}}}}}', error);
		next(error);
	}
};

module.exports.getAllUsers = async () => {
	try {
		const users = await User.findAll();
		return users;
	} catch (error) {
		console.log('{{{{{{getAllUSers error}}}}}}}', error);
	}
};

module.exports.activate = async (activationLink, next) => {
	try {
		const user = await User.findOne({ where: { activationLink } });
		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link');
		}
		user.isActivated = true;
		await user.save();
	} catch (error) {
		console.log('{{{activate err}}}', error);
		next(error);
	}
};
