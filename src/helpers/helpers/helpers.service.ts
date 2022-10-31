/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class HelpersService {
  getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };
  getPagingData = (data, page, limit, tableName) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, [tableName]: records, totalPages, currentPage };
  };

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

  async capitalizeFirstLetter(word: string) {
    const data = word.split('_');
    if (data.length > 1) {
      return data.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async getTotalLine(fileName) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    return data.length;
  }

  async splitFileTextByWord(fileName, splitWord) {
    const data = fs.readFileSync(fileName).toString().split(splitWord);
    return data;
    // data[1] has the model: line where we should add the model
    // divide data again to find the exact location
  }

  checkFileForAString(fileName, searchString) {
    const data = fs.readFileSync(fileName).toString();
    return data.includes(searchString);
  }

  async insertAtLine(fileName, lineNumber, textToWrite) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    //console.log(data);
    data.splice(lineNumber, 0, textToWrite);
    //console.log(data);
    const text = data.join('\n');
    const writeFile = promisify(fs.writeFile);
    return await writeFile(fileName, text, 'utf8');
  }

  async getBelongsTo(fileName) {
    const result = [];
    const data = fs
      .readFileSync(fileName)
      .toString()
      .split('@BelongsTo(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      result.push(data2[0]);
    }

    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
    }
    return result;
  }

  async getHasMany(fileName) {
    const data = fs.readFileSync(fileName).toString().split('@HasMany(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      return data2[0];
    }
    const result = [];
    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
      return result;
    }
  }

  async getHasOne(fileName) {
    const data = fs.readFileSync(fileName).toString().split('@HasOne(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      return data2[0];
    }
    const result = [];
    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
      return result;
    }
  }
}
