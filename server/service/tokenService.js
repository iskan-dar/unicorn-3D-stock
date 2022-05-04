const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

module.exports.generateTokens = (payload) => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
	return { accessToken, refreshToken };
};

module.exports.saveToken = async (userId, refreshToken) => {
	try {
		const tokenData = await Token.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({ userId, refreshToken });
		return token;
	} catch (error) {
		console.log('{{{saveToken err}}}}', error);
	}
};

module.exports.validateAccessToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		return userData;
	} catch (error) {
		console.log('{{{{{{validateAccessToken err}}}}}', error);
		return null;
	}
};

module.exports.validateRefreshToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		return userData;
	} catch (error) {
		console.log('{{{{{{validateRefreshToken err}}}}}', error);
		return null;
	}
};

module.exports.findToken = async (refreshToken) => {
	try {
		const token = await Token.findOne({ where: { refreshToken } });
		return token;
	} catch (error) {
		console.log('{{{{{findToken err}}}}}}', error);
	}
};

module.exports.removeToken = async (refreshToken, next) => {
	try {
		const tokenData = await Token.destroy({ where: { refreshToken } });
		console.log('{{{{tokenData in removeToken}}}}sequelize destroy value check>>>>>>', tokenData);
		return tokenData;
	} catch (error) {
		console.log('{{{{{removeToken err}}}}}}', error);
		next(error);
	}
};
