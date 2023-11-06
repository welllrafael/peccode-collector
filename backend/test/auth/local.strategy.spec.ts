import { LocalStrategy } from '../../src/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../src/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
    let service: LocalStrategy;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [AuthService, LocalStrategy],
          imports: [
            UsersModule, 
            PassportModule,
            ConfigModule.forRoot(),
            JwtModule.register({
              secret: process.env.SECRET,
              signOptions: { expiresIn: '60s' },
            }),
          ],         
        }).compile();

        service = module.get<LocalStrategy>(LocalStrategy);
    });

    describe('Testing LocalStrategy', () => {

        it('Should validate username and password!', async () => {
            const {username, password} = {
                username: "john", 
                password: "Connor"
            }                              

            await expect(service.validate(username, password))
            .rejects.toThrow("Unauthorized");
        });

        it('Should be work!', async () => {
            const {username, password} = {
                username: "john", 
                password: "changeme"
            }                              

            expect(JSON.stringify(await service.validate(username, password)))
            .toBe(JSON.stringify({userId: 1, username: "john"}));
        });
    });
});
