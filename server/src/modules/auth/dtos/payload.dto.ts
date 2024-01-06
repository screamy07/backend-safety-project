import { User } from "src/modules/user/models";

export class PayloadDto {
	email: string;
	sub: number;

	static toDto(user: User): PayloadDto {
		const dto = new PayloadDto();

		dto.email = user.email;
		dto.sub = user.id;

		return dto;
	}
}