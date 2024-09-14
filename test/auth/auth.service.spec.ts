import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../src/user/user.service';
import { User, UserDocument } from '../../src/user/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UserService;
  let jwtService: JwtService;
  let userModel: Model<UserDocument>;

  const mockUser = {
    _id: 'mockid',
    email: 'test@example.com',
    password: 'hashedpassword',
    username: 'testuser',
    profile: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
      const createUserDto = { email: 'test@example.com', password: 'password', username: 'testuser' };
      const result = await authService.register(createUserDto as any);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user already exists', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(mockUser);
      const createUserDto = { email: 'test@example.com', password: 'password', username: 'testuser' };
      await expect(authService.register(createUserDto as any)).rejects.toThrow('User already exists');
    });
  });

  describe('validateUser', () => {
    it('should validate a user', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toEqual(mockUser);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const result = await authService.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const jwtToken = 'jwt.token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(jwtToken);
      const result = await authService.login(mockUser as any);
      expect(result).toEqual({ access_token: jwtToken });
    });
  });

  describe('changePassword', () => {
    it('should change the password', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');
      const changePasswordDto = { oldPassword: 'oldpassword', newPassword: 'newpassword' };
      await authService.changePassword('mockid', changePasswordDto as any);
      expect(mockUserModel.save).toHaveBeenCalled();
    });

    it('should throw an error if old password is incorrect', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const changePasswordDto = { oldPassword: 'wrongpassword', newPassword: 'newpassword' };
      await expect(authService.changePassword('mockid', changePasswordDto as any)).rejects.toThrow('Old password is incorrect');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateProfileDto = { firstName: 'John', lastName: 'Doe' };
      const result = await authService.updateProfile('mockid', updateProfileDto as any);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(mockUserModel, 'findById').mockResolvedValue(null);
      const updateProfileDto = { firstName: 'John', lastName: 'Doe' };
      await expect(authService.updateProfile('mockid', updateProfileDto as any)).rejects.toThrow('User with ID mockid not found');
    });
  });
});
