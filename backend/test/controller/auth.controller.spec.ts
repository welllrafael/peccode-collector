import { AuthService } from '../../src/service/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { AuthController } from '../../src/controller/auth.controller';

const token = {
    access_token: "123456789"
};

describe('AuthController', () => {

    let authController: AuthController;     
    let authService: AuthService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{
                provide: AuthService,
                useValue: {
                    login: jest.fn().mockResolvedValue(JSON.stringify(token))
                }
            }],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('Should be defined', () => {                    
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    }); 

    it('should get a token successfully', async () => {
        const user = {
            username: "john", 
            password: "changeme"
        }

        const result = await authController.login(user);
  
        expect(result).toEqual(JSON.stringify(token));
        expect(authService.login).toHaveBeenCalledTimes(1);
      });

});