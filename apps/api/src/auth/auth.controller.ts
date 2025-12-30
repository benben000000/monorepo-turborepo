import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard'; // To be implemented

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: any) {
        // In real app, use DTO
        return this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
