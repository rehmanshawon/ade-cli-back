import { Test, TestingModule } from '@nestjs/testing';
import { CreateTableController } from './create-table.controller';

describe('CreateTableController', () => {
  let controller: CreateTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTableController],
    }).compile();

    controller = module.get<CreateTableController>(CreateTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
