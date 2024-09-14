import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { ChangePasswordDto } from '../../src/auth/dto/change-password.dto';
import { UpdateProfileDto } from '../../src/auth/dto/update-profile.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    validateUser: jest.fn(),
    login: jest.fn(),
    changePassword: jest.fn(),
    updateProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password', username: 'testuser' };
      await controller.register(createUserDto);
      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      await controller.login(loginDto);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });
  });

  describe('changePassword', () => {
    it('should change the password', async () => {
      const changePasswordDto: ChangePasswordDto = { oldPassword: 'oldpassword', newPassword: 'newpassword' };
      await controller.changePassword('mockid', changePasswordDto);
      expect(mockAuthService.changePassword).toHaveBeenCalledWith('mockid', changePasswordDto);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateProfileDto: UpdateProfileDto = { username: 'John', email: 'hola@a.es' };
      await controller.updateProfile('mockid', updateProfileDto);
      expect(mockAuthService.updateProfile).toHaveBeenCalledWith('mockid', updateProfileDto);
    });
  });
});
