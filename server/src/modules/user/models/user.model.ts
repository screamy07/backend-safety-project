import { DataTypes } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserRoleModel } from './user-role.model';

@Table({
	tableName: 'users',
	paranoid: true,
})
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	})
	email: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	password: string;

	@Column({
		type: DataTypes.STRING,
		field: 'first_name',
		allowNull: false,
	})
	firstName: string;

	@Column({
		type: DataTypes.STRING,
		field: 'last_name',
		allowNull: false,
	})
	lastName: string;

	@Column({
		type: DataTypes.DOUBLE,
		validate: {
			min: -180,
			max: 180
		},
		allowNull: false,
	})
	longitude: number;

	@Column({
		type: DataTypes.DOUBLE,
		validate: {
			min: -90,
			max: 90
		},
		allowNull: false,
	})
	latitude: number;

	// @ForeignKey(() => UserRoleModel)
	// @Column({
	// 	type: DataType.INTEGER,
	// 	allowNull: false,
	// 	field: 'user_role_id'
	// })
	// userRoleId: number;

	@HasMany(() => UserRoleModel)
	roles: UserRoleModel[];
}
