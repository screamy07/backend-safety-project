import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserRoleDto } from "../dtos";
import { UserRoleModel } from "../models";

@Injectable()
export class UserRoleRepository {
	constructor(@InjectModel(UserRoleModel) private readonly userRoleModel: typeof UserRoleModel) { }

	async findOneById(id: number): Promise<UserRoleModel | null> {
		return this.userRoleModel.findByPk(id);
	}

	async findOneByName(name: string): Promise<UserRoleModel | null> {
		return this.userRoleModel.findOne({ where: { name } });
	}

	async createOne(createUserRoleDto: CreateUserRoleDto): Promise<UserRoleModel> {
		return this.userRoleModel.create(createUserRoleDto as any);
	}

	async addUserId(id: number, userId: number): Promise<void> {
		await this.userRoleModel.update({ userId }, { where: { id } });
	}
}