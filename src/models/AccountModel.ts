import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import { User } from './UserModel';

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true 
  },
})

export class Account {

    @prop({ required: true })
    name: string;
    
    @prop({ ref: () => User, required: true })
    user: Ref<User>

    @prop({ required: true })
    type: String

    @prop({ required: false, default: true })
    active: Boolean

    @prop({ required: false })
    amount: Number

    @prop({ required: false })
    description: String

    @prop({ required: false })
    paymantDueDay: Number

    @prop({ required: false })
    statementDay: Number

    @prop({ required: false, default: false })
    showInResume: Boolean
}

const AccountModel = getModelForClass(Account);
export default AccountModel;