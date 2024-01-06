import { UserRole } from "src/modules/user/enums";

export class ReturnUserDto {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	longitude: number;
	latitude: number;
	roles: UserRole[];

	// static toDto(user: User): ReturnUserDto {
	// 	const dto = new ReturnUserDto();

	// 	dto.id = user.id;
	// 	dto.firstName = user.firstName;
	// 	dto.lastName = user.lastName;
	// 	dto.email = user.email;
	// 	dto.longitude = user.longitude;
	// 	dto.latitude = user.latitude;
	// 	dto.roles = user.roles;

	// 	return dto;
	// }
}