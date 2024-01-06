import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dtos';
import { UserRole } from './enums';
import { User, UserRoleModel } from './models';
import { UserRoleRepository } from './repositories/user-role.repository';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository,
		private readonly userRoleRepository: UserRoleRepository) { }

	async createUser(createUserDto: RegisterUserDto & { roles: UserRole[] }): Promise<User> {
		let roles: UserRoleModel[] = [];
		createUserDto.roles.forEach(async (role) => {
			roles.push(await this.userRoleRepository.createOne({ name: role }));
		});

		const user = await this.userRepository.createOne({ ...createUserDto, roles });

		roles.forEach(async role => {
			await this.userRoleRepository.addUserId(role.id, user.id);
		})

		await this.userRepository.addUserRoles(user.id, roles);

		return this.getUserById(user.id);
	}

	findAll() {
		return `This action returns all user`;
	}

	async getUserById(id: number): Promise<User> {
		const user = await this.userRepository.findOneById(id);

		if (!user) {
			throw new NotFoundException('User does not exist');
		}

		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOneByEmail(email);

		if (!user) {
			throw new NotFoundException('User does not exist');
		}

		return user;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
