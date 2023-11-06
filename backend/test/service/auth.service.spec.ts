import { UsersModule } from '../../src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/service/auth.service';
import { LocalStrategy } from '../../src/auth/local.strategy';

describe('AuthService', () => {
    let service: AuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [AuthService, LocalStrategy],
          imports: [UsersModule, JwtModule.register({
              secret: 'TEST',
              signOptions: { expiresIn: '60s' },
            })],          
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    describe('Testing fields AuthService', () => {

        it('Should be invalidate unexist user!', async () => {
            
            const username: string = "teste";
            const password: string = "teste";            

            expect(await service.validateUser(username, password)).toBe(null);
        });

        it('Should be validate exist user!', async () => {
            
            const username: string = "john";
            const password: string = "changeme";            

            expect(JSON.stringify(await service.validateUser(username, password)))
            .toBe(JSON.stringify({"userId": 1, "username": "john"}));
        });

        it('Should be work!', async () => {
            let userPass = {
              username: "john", 
              password: "changeme"
            };                      

            expect(await service.login(userPass)).toHaveProperty('access_token');
        });
    });
});
