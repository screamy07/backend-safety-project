import { IsEmail, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { constants } from '../constants';

export class RegisterUserDto {
	@IsString()
	@MinLength(constants.firstName.minLength)
	@MaxLength(constants.firstName.maxLength)
	firstName: string;

	@IsString()
	@MinLength(constants.lastName.minLength)
	@MaxLength(constants.lastName.maxLength)
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(constants.password.minLength)
	@MaxLength(constants.password.maxLength)
	password: string;

	@IsNumber()
	@Min(constants.longitude.min)
	@Max(constants.longitude.max)
	longitude: number;

	@IsNumber()
	@Min(constants.latitude.min)
	@Max(constants.latitude.max)
	latitude: number;
}
