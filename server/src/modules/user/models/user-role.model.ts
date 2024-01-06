import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserRole } from "../enums";
import { User } from "./user.model";

@Table({
	tableName: 'user_roles',
	paranoid: true
})
export class UserRoleModel extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataType.ENUM(...Object.keys(UserRole)),
		allowNull: false,
	})
	name: UserRole;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		field: 'user_id'
	})
	userId: number;

	@BelongsTo(() => User)
	user: User;
}