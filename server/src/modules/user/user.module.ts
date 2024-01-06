import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, UserRoleModel } from './models';
import { UserRoleRepository } from './repositories/user-role.repository';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [SequelizeModule.forFeature([User, UserRoleModel])],
	controllers: [UserController],
	providers: [UserService, UserRepository, UserRoleRepository],
	exports: [UserService]
})
export class UserModule { }
