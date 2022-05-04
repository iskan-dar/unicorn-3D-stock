module.exports = class UserDto {
	id;

	firstName;

	lastName;

	email;

	phone;

	avatarUrl;

	isAdmin;

	isMaker;

	isCreator;

	isActivated;

	constructor(model) {
		this.id = model.id;
		this.email = model.email;
		this.phone = model.phone;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
		this.avatarUrl = model.avatarUrl;
		this.isAdmin = model.isAdmin;
		this.isMaker = model.isMaker;
		this.isCreator = model.isCreator;
		this.isActivated = model.isActivated;
	}
};
