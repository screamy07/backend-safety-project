import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RegisterUserDto } from "src/modules/auth/dtos";
import { User, UserRoleModel } from "../models";

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User) private readonly userModel: typeof User) { }

	async findOneById(id: number): Promise<User | null> {
		return this.userModel.findByPk(id, { include: UserRoleModel });
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ where: { email }, include: UserRoleModel });
	}

	async createOne(createUserDto: RegisterUserDto & { roles: UserRoleModel[] }): Promise<User> {
		return this.userModel.create(createUserDto as any, { include: UserRoleModel });
	}

	async addUserRoles(id: number, roles: UserRoleModel[]): Promise<void> {
		await this.userModel.update({ roles }, { where: { id } });
	}
}