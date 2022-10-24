/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import { IConfig, ModelBuilder, DialectMySQL } from 'sequelize-typescript-generator';
import { S_BOOL, S_DATE, S_INT, S_STRING, S_UUID, T_BOOL, T_DATE, T_NUMBER, T_STRING, T_UUID } from '../constants/constants';
@Injectable()
export class CreateTableService {

    async createTable(createTableDto:CreateTableDto){
        const {tableName, fieldList} = createTableDto;
        console.log(tableName,fieldList);
        const fileNameSuffix=`create-${tableName}-table`;
          await promisify(exec)(`npx sequelize-cli migration:generate --name ${fileNameSuffix}`, {
              shell: 'powershell.exe',
          });
          const migrationFiles = fs.readdirSync('./src/database/migrations').filter(fn => fn.endsWith(fileNameSuffix+'.js'));
        console.log(migrationFiles);
        const migrationFile=migrationFiles[migrationFiles.length-1];
        let data= `/* eslint-disable prettier/prettier */\n'use strict';\n`;
        
        
        let fieldListString='';
          for(let i=0;i<fieldList.length;i++)
          {
            const fieldType= await this.returnFieldType(fieldList[i].type);
            let refValue,defValue;
            if(fieldList[i].referece!==undefined)
            {
                refValue=`\nreferences:{model:${fieldList[i].referece.right_table},
                key:${fieldList[i].referece.right_table_key},},`
            }
            else{
                refValue="";
            }
            if(fieldList[i].default!==undefined){
                defValue=`\ndefaultValue:${fieldList[i].default},`;
            }
            else{
                defValue='';
            }

             fieldListString+=`${fieldList[i].field}:{
                    type:${fieldType},
                    allowNull:${fieldList[i].optional},
                    autoIncrement:${fieldList[i].autoIncrement},                
                    unique:${fieldList[i].unique},
                    primaryKey:${fieldList[i].primaryKey},${defValue}${refValue}                                
                },\n\t\t\t\t\t`
          }
          fieldListString+=`isActive: {
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
        data+=`module.exports = {
            async up (queryInterface, Sequelize) {
                await queryInterface.createTable('${tableName}', {
                    ${fieldListString}
                });
            },

            async down (queryInterface, Sequelize) {
                await queryInterface.dropTable('${tableName}');
            }
        };`;
       const newMigration=await this.createFile('./src/database/migrations/',migrationFile,data);
       const { stdout } = await promisify(exec)(`npx sequelize-cli db:migrate`, {
        shell: 'powershell.exe',
    });    
    console.log(stdout);
    await this.createUserModule(tableName);
    // lets create the CRUD service now

        return createTableDto;
    }
    async createUserModule(moduleName: string)
    {
      const data=`/* eslint-disable prettier/prettier */\n`;
      const newModule=await this.createFile(`./src/modules/${moduleName}/`,`${moduleName}-service.ts`,data);
    //    const { stdout } = await promisify(exec)(`npx sequelize-cli db:migrate`, {
    //     shell: 'powershell.exe',
    // }); 
   await this.tableToModel();   
    console.log("service created");
    }

    async createModel(createTableDto:CreateTableDto){
      let data= `/* eslint-disable prettier/prettier */\n`;
      data+=`import { AllowNull, Column, Model, Table, Unique, HasMany,PrimaryKey, AutoIncrement } from 'sequelize-typescript';\n`;

      //check if any field is foreign key
      // if it is, then import the reference model from the reference table
      const {tableName, fieldList} = createTableDto;
      for(let i=0;i<fieldList.length;i++)
      {
        if(fieldList[i].foreignKey)
        {
          // now the reference has all the relationship info
          const foreignTable=fieldList[i].referece.right_table;
          // so there is a module in the src path under same name
          // and there is a model under same name in the model folder inside module folder
          const modelImportString=`import { ${foreignTable} } from 'src/modules/${foreignTable}/models/${foreignTable}.model';\n`;
          data+=modelImportString;
        }
      }
      data+=`@Table({timestamps:true,paranoid:true})\n`;
      data+=`export class ${tableName} extends Model {\n`;
      // now lets loop through the fieldlist and define every column for the model below
      for(let i=0;i<fieldList.length;i++){
        // first check if it's a primaray key
        if(fieldList[i].primaryKey){
          if(fieldList[i].autoIncrement)
          {
            const fieldString=`
            @AutoIncrement
            @PrimaryKey
            @Column
            ${fieldList[i].field}:number;\n`;
            data+=fieldString;
          }
          else{
            const fieldString=`            
            @PrimaryKey
            @Unique
            @Column
            ${fieldList[i].field}:${fieldList[i].type};\n`;
            data+=fieldString;
          }
          
        }
        // now check for the foreign key
        if(fieldList[i].foreignKey){

        }
      }

    }

     async returnFieldType(field:string){
        switch(field){
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

      checkIfFileOrDirectoryExists = (path: string): boolean => {
        return fs.existsSync(path);
      };

      

tableToModel=async () => {
    const config: IConfig = {
        connection: {
            dialect: 'mysql',
            database: 'devdb',
            username: 'root',
            password: 'ApsisINT@123'
        },
        
        metadata:{ 
             case:'LOWER',
            associationsFile:'assoc.csv'          
        },        
        output: {        
            clean: true,
            outDir: 'models'
        },
        strict: false,
    };

    const dialect = new DialectMySQL();

    const builder = new ModelBuilder(config, dialect);

    try {
        await builder.build();
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }    
};
}
