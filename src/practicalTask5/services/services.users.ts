import * as fs from 'fs';
import { db } from '../config/config'

import * as interfaces from '../interfaces/interfaces.users';

export async function get(id: number) {
    if (id) {
        let raw_users = await fs.promises.readFile(db.dbpath, 'utf8');
        let json_users = JSON.parse(raw_users);
        return json_users.find(user => user.id === id);
    } else {
        let raw_users = await fs.promises.readFile(db.dbpath, 'utf8');
        return JSON.parse(raw_users);
    }
}

export async function create(user_data: interfaces.User) {
    let raw_users = await fs.promises.readFile(db.dbpath, 'utf8');
    let json_users = JSON.parse(raw_users);
    let response = {
        id: json_users.length,
        username: user_data.username,
        name: user_data.name ? user_data.name : undefined
    };
    json_users.push(response);
    await fs.promises.writeFile(db.dbpath, JSON.stringify(json_users));
    return response;
}

export async function update(id: number, user_data: interfaces.User) {
    let raw_users = await fs.promises.readFile(db.dbpath, 'utf8');
    let json_users = JSON.parse(raw_users);
    let old_user_data = json_users.filter(user => user.id === id)[0];
    let response = {
        id: id,
        username: user_data.username ? user_data.username : old_user_data.username,
        name: user_data.name ? user_data.name : old_user_data.name
    };
    json_users = json_users.filter(user => user.id !== id);
    json_users.push(response);
    await fs.promises.writeFile(db.dbpath, JSON.stringify(json_users));
    return response
}

export async function remove(id: number) {
    let raw_users = await fs.promises.readFile(db.dbpath, 'utf8');
    let json_users: interfaces.User[] = JSON.parse(raw_users);
    json_users = json_users.filter(item => item.id !== id);
    await fs.promises.writeFile(db.dbpath, JSON.stringify(json_users));
    return 'users deleted';
}

module.exports = {
    get,
    create,
    update,
    remove
};