import * as fs from 'fs';

import { Logger, LoggerConfig } from "log4ts";
const logger = Logger.getLogger();

  function getData(dataName, app?){
      try{
          const data = fs.readFileSync(
              'src/utils/data.json',
              'utf8',
          );

          const calls = JSON.parse(data)
          const value = calls[app || 'gohighlevel'][dataName];
          return value;
      }catch (err){
          console.error(
              `Invalid data : ${dataName} to read !!`,

          );
          console.error(err);
          return '';
      }
  }

  module.exports = {
      getData
  };