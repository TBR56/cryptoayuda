import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export function initDb() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
}

export function getUsers() {
    initDb();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

export function saveUser(user: any) {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function findUserByEmail(email: string) {
    const users = getUsers();
    return users.find((u: any) => u.email === email);
}
