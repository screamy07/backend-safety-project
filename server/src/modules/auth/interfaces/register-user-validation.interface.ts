import { INumberValidation, IStringValidation } from "src/interfaces";

export interface IRegisterUserValidationConstants {
	firstName?: IStringValidation,
	lastName?: IStringValidation,
	email?: IStringValidation,
	password?: IStringValidation,
	longitude?: INumberValidation,
	latitude?: INumberValidation
}

