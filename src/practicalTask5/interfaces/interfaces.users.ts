export interface User {
    username: string;
    name?: string;
}

export interface UserWithId extends User {
    id: number;
}

export interface UserWithoutUsername extends Omit<User, 'username'> {
    username?: string;
}