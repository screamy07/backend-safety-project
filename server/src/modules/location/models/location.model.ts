import { Column, DataType, Model, Table } from "sequelize-typescript";
import { DangerResult, RainLevel, SnowLevel, TemperatureLevel, WaterLevel } from "../enums";

@Table({
	tableName: 'locations',
	paranoid: true
})
export class Location extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
	})
	description: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	longitude: number;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	latitude: number;

	@Column({
		type: DataType.ENUM(...Object.values(WaterLevel)),
		allowNull: false,
		field: 'water_level'
	})
	waterLevel: WaterLevel;

	@Column({
		type: DataType.ENUM(...Object.values(TemperatureLevel)),
		allowNull: false,
		field: 'temperature_level'
	})
	temperatureLevel: TemperatureLevel;

	@Column({
		type: DataType.ENUM(...Object.values(SnowLevel)),
		allowNull: false,
		field: 'snow_level'
	})
	snowLevel: SnowLevel;

	@Column({
		type: DataType.ENUM(...Object.values(RainLevel)),
		allowNull: false,
		field: 'rain_level'
	})
	rainLevel: RainLevel;

	@Column({
		type: DataType.ENUM(...Object.values(DangerResult)),
		allowNull: false,
		field: 'danger_result'
	})
	dangerResult: DangerResult;
}
