import { Test, TestingModule } from '@nestjs/testing';
import { CreateTableService } from './create-table.service';

describe('CreateTableService', () => {
  let service: CreateTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTableService],
    }).compile();

    service = module.get<CreateTableService>(CreateTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
