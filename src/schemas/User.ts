import { model, Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    name: string, 
    email: string, 
    password: string,
    creation: Date,
}

const UserSchema = new Schema({
    name: {
        type: String, 
        unique: true,
        required:[true, 'Nome Obrigatório'], 
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: [true, 'Senha Obrigatória'],
        select: false,
    },
    creation: {
        type: Date,
        default: Date.now,
    },

}); 

export default model<UserInterface>('User, UserSchema');
