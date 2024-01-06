import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { UserRole } from './enums';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(UserRole.USER)
	@Get()
	getUser(@Request() req) {
		return req.user;
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
