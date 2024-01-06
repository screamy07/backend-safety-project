import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/enums';
import { UserService } from '../user/user.service';
import { AccessTokenDto, PayloadDto, RegisterUserDto } from './dtos';


@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService) { }

	public async signup(registerUserDto: RegisterUserDto): Promise<AccessTokenDto> {
		const hashSalt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(registerUserDto.password, hashSalt);

		try {
			const createdUser = await this.userService.createUser({
				...registerUserDto,
				password: hashedPassword,
				roles: /^[A-Z0-9+_.-]+@admin\.[A-Z0-9.-]+$/gmi.test(registerUserDto.email)
					? [UserRole.USER, UserRole.ADMIN] : [UserRole.USER]
			});

			return { access_token: await this.jwtService.signAsync({ ...PayloadDto.toDto(createdUser) }), }
		} catch (error) {
			console.error(error);

			if ((error as Error).name === 'SequelizeUniqueConstraintError') {
				throw new BadRequestException('User with this email already exist, try another one');
			}

			throw error;
		}
	}

	public async signin(email: string, password: string): Promise<AccessTokenDto> {
		const user = await this.userService.getUserByEmail(email);

		const isPasswordMatching = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordMatching) {
			throw new UnauthorizedException('Wrong credentials provided');
		}

		return { access_token: await this.jwtService.signAsync({ ...PayloadDto.toDto(user) }), }
	}
}
