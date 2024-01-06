import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDto, LoginUserDto, RegisterUserDto } from './dtos';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signup')
	async register(@Body() body: RegisterUserDto): Promise<AccessTokenDto> {
		return this.authService.signup(body);
	}

	@HttpCode(HttpStatus.OK)
	@Post('signin')
	async login(@Body() body: LoginUserDto): Promise<AccessTokenDto> {
		return this.authService.signin(body.email, body.password);
	}
}
