import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../src/user/user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UserService;
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
    find: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const result = await service.findOne('mockid');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(mockUserModel, 'findById').mockResolvedValue(null);
      await expect(service.findOne('mockid')).rejects.toThrow('User with ID mockid not found');
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const result = await service.findOneByEmail('test@example.com');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found by email', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);
      await expect(service.findOneByEmail('test@example.com')).rejects.toThrow('User with email test@example.com not found');
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const result = await service.create({ email: 'test@example.com', password: 'password', username: 'testuser' });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const result = await service.update('mockid', { username: 'updateduser' });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(mockUserModel, 'findByIdAndUpdate').mockResolvedValue(null);
      await expect(service.update('mockid', { username: 'updateduser' })).rejects.toThrow('User with ID mockid not found');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      await service.delete('mockid');
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith('mockid');
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(mockUserModel, 'findByIdAndDelete').mockResolvedValue(null);
      await expect(service.delete('mockid')).rejects.toThrow('User with ID mockid not found');
    });
  });
});
