import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto): Promise<TokenResponse> {
    const existingUser = this.users.find((u) => u.email === registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const userId = String(Date.now());
    const user: User = {
      id: userId,
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: registerDto.password,
    };

    this.users.push(user);

    const payload = { sub: userId, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const user = this.users.find((u) => u.email === loginDto.email);
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
