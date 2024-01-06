import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RainLevel, SnowLevel, TemperatureLevel, WaterLevel } from "../enums";

export class CreateLocationDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description?: string;

	@IsLongitude()
	longitude!: number;

	@IsLatitude()
	latitude!: number;

	@IsEnum(WaterLevel,
		{
			message: `Рівень води повинен бути одним із значень ${Object.values(WaterLevel).join(', ')}`
		})
	waterLevel!: WaterLevel;

	@IsEnum(TemperatureLevel,
		{
			message: `Температура повинна бути одною із значень ${Object.values(TemperatureLevel).join(', ')}`
		})
	temperatureLevel!: TemperatureLevel;

	@IsEnum(SnowLevel,
		{
			message: `Рівень снігу повинен бути одним із значень ${Object.values(SnowLevel).join(', ')}`
		})
	snowLevel!: SnowLevel;

	@IsEnum(RainLevel,
		{
			message: `Рівень дощу повинен бути одним із значень ${Object.values(RainLevel).join(', ')}`
		})
	rainLevel: RainLevel;
}
