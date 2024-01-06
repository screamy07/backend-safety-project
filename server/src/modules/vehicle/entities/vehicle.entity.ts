import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	paranoid: true,
	tableName: 'vehicles'
})
export class Vehicle extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataType.STRING,
		unique: true
	})
	name: string;

	@Column({
		type: DataType.INTEGER
	})
	capacity: number;

	@Column({
		type: DataType.INTEGER
	})
	amount: number;
}
