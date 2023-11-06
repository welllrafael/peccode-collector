import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../src/users/users.module';
import { JwtStrategy } from '../../src/auth/jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('JwtStrategy', () => {
    let service: JwtStrategy;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [AuthService, JwtStrategy],
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

        service = module.get<JwtStrategy>(JwtStrategy);
    });

    describe('Testing JwtStrategy', () => {

        it('Should be work!', async () => {
            let userPass = {
              sub: "000001", 
              username: "PecCode"
            };                                  

            expect(JSON.stringify(await service.validate(userPass)))
            .toBe(JSON.stringify({userId: "000001", username: "PecCode"}));
        });
    });
});
