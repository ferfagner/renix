import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';

import { User } from './model/user';
import { Car } from './model/car';


const adapter = new SQLiteAdapter({
    schema: schemas
})

export const database = new Database({
    adapter,
    modelClasses: [User, Car]
    
})