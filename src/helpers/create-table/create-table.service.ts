/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import {
  IConfig,
  ModelBuilder,
  DialectMySQL,
} from 'sequelize-typescript-generator';
import {
  D_BOOL,
  D_DATE,
  D_INT,
  D_STRING,
  D_UUID,
  S_BOOL,
  S_DATE,
  S_INT,
  S_STRING,
  S_UUID,
  T_BOOL,
  T_DATE,
  T_NUMBER,
  T_STRING,
  T_UUID,
} from '../constants/constants';
@Injectable()
export class CreateTableService {
  async createTable(createTableDto: CreateTableDto) {
    const { tableName, fieldList } = createTableDto;
    // console.log(tableName, fieldList);
    const fileNameSuffix = `create-${tableName}-table`;
    await promisify(exec)(
      `npx sequelize-cli migration:generate --name ${fileNameSuffix}`,
      {
        shell: 'powershell.exe',
      },
    );
    const migrationFiles = fs
      .readdirSync('./src/database/migrations')
      .filter((fn) => fn.endsWith(fileNameSuffix + '.js'));
    // console.log(migrationFiles);
    const migrationFile = migrationFiles[migrationFiles.length - 1];
    let data = `/* eslint-disable prettier/prettier */\n'use strict';\n`;

    let fieldListString = '';
    for (let i = 0; i < fieldList.length; i++) {
      const fieldType = await this.returnFieldType(fieldList[i].type);
      let refValue, defValue;
      if (fieldList[i].reference !== undefined) {
        // console.log(fieldList[i].reference);
        refValue = `\nreferences:{model:'${fieldList[i].reference.right_table}',
                key:'${fieldList[i].reference.right_table_key}',},`;
      } else {
        refValue = '';
      }
      if (fieldList[i].default !== undefined) {
        defValue = `\ndefaultValue:${fieldList[i].default},`;
      } else {
        defValue = '';
      }
      if (fieldList[i].primaryKey) {
        fieldListString += `${fieldList[i].field}:{
                    type:${fieldType},
                    allowNull:false,
                    autoIncrement:true,                
                    unique:true,
                    primaryKey:true,                              
                },\n\t\t\t\t\t`;
        continue;
      }
      if (
        fieldList[i].foreignKey === true &&
        fieldList[i].reference.relation.toLowerCase() !== 'm:n'
      ) {
        fieldListString += `${fieldList[i].field}:{
                    type:${fieldType},
                    allowNull:true,
                    references: {
                      model: '${fieldList[i].reference.right_table}',
                      key: '${fieldList[i].reference.right_table_key}',
                    },                                              
                },\n\t\t\t\t\t`;
        continue;
      }
      if (
        fieldList[i].foreignKey &&
        fieldList[i].reference.relation.toLowerCase() === 'm:n'
      ) {
        fieldListString += `${fieldList[i].field}:{
                    type:${fieldType},
                    allowNull:false,                               
                    primaryKey:true,
                    references: {
                      model: '${fieldList[i].reference.right_table}',
                      key: '${fieldList[i].reference.right_table_key}',
                    },                                   
                },\n\t\t\t\t\t`;
        continue;
      }

      fieldListString += `${fieldList[i].field}:{
                    type:${fieldType},
                    allowNull:${fieldList[i].optional},                                   
                    unique:${fieldList[i].unique},
                    ${defValue}                                
                },\n\t\t\t\t\t`;
    }
    fieldListString += `isActive: {
            field: 'is_active',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },      
          createdBy: {
            field: 'created_by',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          updatedBy: {
            field: 'updated_by',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          createdAt: {
            field: 'created_at',
            allowNull: false,
            type: Sequelize.DATE,        
          },
          updatedAt: {
            field: 'updated_at',
            allowNull: true,
            type: Sequelize.DATE,        
          },
          deletedAt: {
            field: 'deleted_at',
            allowNull: true,
            type: Sequelize.DATE,
          },`;
    data += `module.exports = {
            async up (queryInterface, Sequelize) {
                await queryInterface.createTable('${tableName}', {
                    ${fieldListString}
                });
            },

            async down (queryInterface, Sequelize) {
                await queryInterface.dropTable('${tableName}');
            }
        };`;
    const newMigration = await this.createFile(
      './src/database/migrations/',
      migrationFile,
      data,
    );
    const { stdout } = await promisify(exec)(`npx sequelize-cli db:migrate`, {
      shell: 'powershell.exe',
    });
    //console.log(stdout);
    // await this.createUserModule(tableName);
    // lets create the CRUD service now

    return createTableDto;
  }

  async createUserModule(table: CreateTableDto) {
    // first create a directory under module name inside the modules folder
    // then create a dto folder inside it
    // create two dto - called create-modelname-dto and update-modelname-dto inside it
    // create a model file inside the module directory
    // create a service have the crud services
    // create a controller having the crud controller
    // create the model
    // update the app.module
    const { tableName, fieldList } = table;
    const modulePath = `./src/modules/${tableName}`;
    if (!this.checkIfFileOrDirectoryExists(modulePath)) {
      fs.mkdirSync(modulePath);
    }
    const dtoPath = modulePath + '/dto/';

    const dtoImportSring = `/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  MaxLength,
  MinLength,
} from 'class-validator'\n;
`;

    let createDtoData = `export class Create${tableName}Dto {\n`;

    let dtoFieldString = '';

    for (let i = 0; i < fieldList.length; i++) {
      if (fieldList[i].primaryKey) continue; // no need to enter primary key as it is autogenerated
      const fieldName = fieldList[i].field;
      const fieldType = fieldList[i].type;
      const defaultValueString = fieldList[i].default
        ? ' = ' + fieldList[i].default
        : '';
      const isOptionalString = fieldList[i].optional ? '@IsOptional()\n' : '';

      const isNumber = fieldType === 'number';

      const isString = fieldType === 'string';
      const isBoolean = fieldType === 'boolean';
      const isDecimal = fieldType === 'decimal';
      const dataTypeValidatorString = isString
        ? '@IsString()\n'
        : isNumber
        ? '@IsNumber()\n'
        : isBoolean
        ? '@IsBoolean()\n'
        : '';
      const fieldString =
        dataTypeValidatorString +
        isOptionalString +
        fieldName +
        ':' +
        fieldType +
        defaultValueString +
        ';\n\n';

      dtoFieldString += fieldString;
    }
    createDtoData += dtoFieldString;

    const dtoName = `${tableName}.dto.ts`;
    await this.createUserDto(
      dtoName,
      dtoImportSring + createDtoData + '}',
      dtoPath,
    );

    // await this.createUserService(tableName, 'data', modulePath);
    // await this.createUserController(tableName, 'data', modulePath);
    // const { stdout } = await promisify(exec)(
    //   `nest g resource /modules/${tableName} --no-spec`,
    //   { shell: 'powershell.exe' },
    // );
    // return { moduleDetails: stdout };
    // const data = `/* eslint-disable prettier/prettier */\n`;
    // const newModule = await this.createFile(
    //   `./src/modules/${moduleName}/`,
    //   `${moduleName}-module.ts`,
    //   data,
    // );
    // return { ModulePath: newModule };
  }

  async createUserDto(dtoName: string, dtoData: string, dtoPath: string) {
    const newDto = await this.createFile(dtoPath, `${dtoName}`, dtoData);
    return { DtoPath: newDto };
  }

  async createUserService(
    serviceName: string,
    serviceData: string,
    servicePath: string,
  ) {
    const newService = await this.createFile(
      servicePath,
      `${serviceName}.service.ts`,
      serviceData,
    );
    return { ServicePath: newService };
  }

  async createUserController(
    controllerName: string,
    controllerData: string,
    controllerPath: string,
  ) {
    const newController = await this.createFile(
      controllerPath,
      `${controllerName}.controller.ts`,
      controllerData,
    );
    return { controllerPath: newController };
  }

  async createModel(createTableDto: CreateTableDto) {
    let data = `/* eslint-disable prettier/prettier */\n`;
    data += `import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';\n`;
    let primaryKeyString = '';
    let generalColumnString = '';
    let importModelString = '';
    let foriegnTableImportModelString = '';
    let foreignTableForeignKeyString = '';

    let foreignKeyString = '';
    let belongsToString = '';
    // these columns will be added to the foreign table
    let HasManyString = '';
    let HasOneString = '';
    let belongsToManyString = '';

    const { tableName, fieldList } = createTableDto;
    // check if any key is a primary key.
    for (let i = 0; i < fieldList.length; i++) {
      const fieldType = await this.returnColumnFieldType(fieldList[i].type);
      const fieldName = fieldList[i].field;
      if (fieldList[i].primaryKey) {
        const primaryKey = fieldList[i].field;
        primaryKeyString += `\t@Column({primaryKey: true, autoIncrement: true,type: ${D_INT}})
\t@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
\t${primaryKey}?: number;\n`;
        continue;
      }
      // primary key is done. now lets add the foreign key columns
      //check if any field is foreign key
      // if it is, then import the reference model from the reference table
      if (fieldList[i].foreignKey) {
        // now the reference has all the relationship info
        const foreignTable = fieldList[i].reference.right_table;
        const foreignKey = fieldList[i].reference.right_table_key;
        const thisTable = fieldList[i].reference.left_table;
        const thisTableKey = fieldList[i].reference.left_table_key;

        // so there is a module in the src path under same name
        // and there is a model under same name in the model folder inside module folder
        importModelString += `import { ${foreignTable} } from 'src/modules/${foreignTable}/${foreignTable}.model';\n`;
        // import adding is done
        // now check the relationship style.
        // firstcheck if it's one to many
        if (fieldList[i].reference.relation.toLowerCase() === '1:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignTable})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t${foreignKey}?: ${fieldList[i].type};\n`;
          belongsToString += `
\t@BelongsTo(() => ${foreignTable})
\t${foreignKey.split('_')[0]}?: ${foreignTable};\n`;
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString = `import { ${thisTable} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          // now define the column that will indicate the association
          HasManyString = `
\t@HasMany(() => ${thisTable})
\t${thisTable}?: ${thisTable}[];\n`;
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          await this.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            1,
            foriegnTableImportModelString,
          );
          const foreignModelFileTotalLine = await this.getTotalLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
          );
          await this.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            foreignModelFileTotalLine - 2,
            HasManyString,
          );
        } // 1:N relatioship is done
        if (fieldList[i].reference.relation.toLowerCase() === '1:1') {
          // in this case foreignKey atttribute should be added before the primaryKey column
          const tempStr = primaryKeyString;
          primaryKeyString = `@ForeignKey(() => ${foreignTable})\n`;
          primaryKeyString += tempStr;
          // now define the belongs to assosiation
          belongsToString += `
          @BelongsTo(() => ${foreignTable})
          ${foreignTable}?: ${foreignTable};\n`;
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString += `import { ${thisTable} } from 'src/modules/${thisTable}/models/${thisTable}.model';\n`;
          // add the primary key of this model to foreign model
          foreignTableForeignKeyString += `
          @Column({            
            type: DataType.INTEGER 
          })
          @Index({
            name: "${foreignTable}_${thisTable}_${thisTableKey}_fk",
            using: "BTREE",
            order: "ASC",
            unique: false 
          })
          ${thisTableKey}!: number;\n`;
          // defing hasone association
          HasOneString += `
          @HasOne(() => ${thisTable})
          ${thisTable}?: ${thisTable};\n`;
          //done
        }
        if (fieldList[i].reference.relation.toLowerCase() === 'm:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignTable})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t@Index({
\nname: "PRIMARY",
\tusing: "BTREE",
\torder: "ASC",
\tunique: true 
\t})
\t${foreignKey}?: ${fieldList[i].type};\n`;
          const joinTable = fieldList[i].reference.join_table;
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString = `import { ${thisTable} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          foriegnTableImportModelString += `import { ${joinTable} } from 'src/modules/${joinTable}/${joinTable}.model';\n`;
          // now define the column that will indicate the association
          belongsToManyString = `
\t@BelongsToMany(() => ${joinTable}, () => ${thisTable})
\t${joinTable}?: ${joinTable}[];\n`;
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          await this.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            1,
            foriegnTableImportModelString,
          );
          const foreignModelFileTotalLine = await this.getTotalLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
          );
          await this.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            foreignModelFileTotalLine - 2,
            belongsToManyString,
          );
        } // 1:N relatioship is done
        // we will skip the many-to-many relationship for now

        continue;
      }
      // we will process the other fields for the moment
      // the fieldlist field is neither primary nor foreign key. therefore, it's a normal field
      const requiredTypeString = fieldList[i].optional ? '?' : '!';
      const uniqueColumnString = fieldList[i].unique
        ? 'unique: true'
        : 'unique: false';
      generalColumnString += `
\t@Column({type: ${fieldType}, ${uniqueColumnString}})
\t${fieldName}${requiredTypeString}: ${fieldList[i].type};\n`;
    }
    const mandatoryColumnString = `
    \t@Column({type: ${D_BOOL}})
\tis_active!: boolean;

\t@Column({type: ${D_INT}})
\tcreated_by?: number;

\t@Column({type: ${D_INT}})
\tupdated_by?: number;

\t@Column({type: ${D_DATE}})
\tcreated_at!: Date;

\t@Column({type: ${D_DATE}})
\tupdated_at?: Date;

\t@Column({type: ${D_DATE}})
\tdeleted_at?: Date;\n`;
    // lets process model information for this table
    data += importModelString;
    const tableDecorationString = `\n\t@Table({tableName: '${tableName}',timestamps: false,comment: ""})\n`;

    data += tableDecorationString;
    const exportModelString = `\texport class ${tableName} extends Model {\n`;

    data += exportModelString;

    data += primaryKeyString;
    data += generalColumnString;
    data += mandatoryColumnString;
    data += foreignKeyString;
    data += belongsToString;

    const modelCloserString = `
    }\n`;
    data += modelCloserString;

    // the data variable now has everything for the model file of this table
    // let's create a module folder under the same name, and write the model file inside it.
    const newModel = await this.createFile(
      `./src/modules/${tableName}/`,
      `${tableName}.model.ts`,
      data,
    );

    return { modelPath: newModel };
  }

  async returnFieldType(field: string) {
    switch (field) {
      case T_NUMBER:
        return S_INT;
      case T_STRING:
        return S_STRING;
      case T_BOOL:
        return S_BOOL;
      case T_DATE:
        return S_DATE;
      case T_UUID:
        return S_UUID;
      default:
        return null;
    }
  }

  async returnColumnFieldType(field: string) {
    switch (field) {
      case T_NUMBER:
        return D_INT;
      case T_STRING:
        return D_STRING;
      case T_BOOL:
        return D_BOOL;
      case T_DATE:
        return D_DATE;
      case T_UUID:
        return D_UUID;
      default:
        return null;
    }
  }
  createFile = async (
    path: string,
    fileName: string,
    data: string,
  ): Promise<void> => {
    if (!this.checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(path);
    }

    const writeFile = promisify(fs.writeFile);

    return await writeFile(`${path}/${fileName}`, data, 'utf8');
  };

  async insertAtLine(fileName, lineNumber, textToWrite) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    //console.log(data);
    data.splice(lineNumber, 0, textToWrite);
    //console.log(data);
    const text = data.join('\n');
    const writeFile = promisify(fs.writeFile);
    return await writeFile(fileName, text, 'utf8');
  }

  async splitFileTextByWord(fileName, splitWord) {
    const data = fs.readFileSync(fileName).toString().split(splitWord);
    return data;
    // data[1] has the model: line where we should add the model
    // divide data again to find the exact location
  }

  async addModelToApp(modelToAdd) {
    const fileName = 'src/app.module.ts';
    const modelPath = `src/modules/${modelToAdd}/${modelToAdd}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
    const splitter = 'models: [';

    const data = await this.splitFileTextByWord(fileName, splitter);
    if (data[0].includes(modelPath) === false)
      await this.insertAtLine(fileName, 1, importString);
    if (data[1].includes(modelToAdd)) return true;
    const data2 = await this.splitFileTextByWord(fileName, splitter);
    const temp = splitter + modelToAdd + ',';
    const finalData = data2[0] + temp + data2[1];
    const writeFile = promisify(fs.writeFile);
    await writeFile(fileName, finalData, 'utf8');
  }

  async addModelToModule(modelToAdd) {
    const fileName = `src/modules/${modelToAdd}/${modelToAdd}.module.ts`;
    const modelPath = `src/modules/${modelToAdd}/${modelToAdd}.model`;
    const importStringForModel = `import {${modelToAdd}} from '${modelPath}';\n`;
    const importStringForSequelizeModule = `import { SequelizeModule } from "@nestjs/sequelize";\n`;
    const importModelString = `imports:[SequelizeModule.forFeature([${modelToAdd}])],\n`;

    const data = await this.splitFileTextByWord(fileName, '@Module({');
    // check if module is already updated with the model imports
    if (!data[0].includes('modelPath')) {
      await this.insertAtLine(fileName, 0, importStringForSequelizeModule);
    }

    if (!data[0].includes(modelPath)) {
      await this.insertAtLine(fileName, 1, importStringForModel);
    }
    if (data[1].includes('SequelizeModule.forFeature')) {
      if (data[1].includes(modelToAdd)) {
        return true;
      } else {
        // add model here
        const data2 = await this.splitFileTextByWord(
          fileName,
          'SequelizeModule.forFeature([',
        );
        const finalData =
          data2[0] + 'SequelizeModule.forFeature([' + modelToAdd + data2[1];
        const writeFile = promisify(fs.writeFile);
        await writeFile(fileName, finalData, 'utf8');
        return true;
      }
    } else {
      if (data[1].includes('imports: [')) {
        const data = await this.splitFileTextByWord(fileName, 'imports: [');
        const finalData =
          data[0] +
          `imports: [SequelizeModule.forFeature([${modelToAdd}]),` +
          data[1];
        const writeFile = promisify(fs.writeFile);
        await writeFile(fileName, finalData, 'utf8');
        return true;
      } else {
        const finalData =
          data[0] +
          `imports: [SequelizeModule.forFeature([${modelToAdd}])],\n` +
          data[1];
        const writeFile = promisify(fs.writeFile);
        await writeFile(fileName, finalData, 'utf8');
        return true;
      }
    }
  }

  async getTotalLine(fileName) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    return data.length;
  }
  checkIfFileOrDirectoryExists = (path: string): boolean => {
    return fs.existsSync(path);
  };

  tableToModel = async () => {
    const config: IConfig = {
      connection: {
        dialect: 'mysql',
        database: 'devdb',
        username: 'root',
        password: 'ApsisINT@123',
      },

      metadata: {
        case: 'LOWER',
        associationsFile: 'assoc.csv',
      },
      output: {
        clean: true,
        outDir: 'models',
      },
      strict: false,
    };

    const dialect = new DialectMySQL();

    const builder = new ModelBuilder(config, dialect);

    try {
      await builder.build();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
}
