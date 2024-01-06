import { IRegisterUserValidationConstants } from "../interfaces";

export const constants: IRegisterUserValidationConstants = {
	firstName: {
		minLength: 1,
		maxLength: 50
	},
	lastName: {
		minLength: 1,
		maxLength: 50
	},
	password: {
		minLength: 8,
		maxLength: 50
	},
	longitude: {
		min: -180,
		max: 180
	},
	latitude: {
		min: -90,
		max: 90
	}
}