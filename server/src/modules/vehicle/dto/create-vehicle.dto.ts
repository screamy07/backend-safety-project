import { IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
	@IsString()
	name: string;

	@IsNumber()
	capacity: number;

	@IsNumber()
	amount: number;
}
