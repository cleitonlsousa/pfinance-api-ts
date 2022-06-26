import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import { User } from './UserModel';
import { Account } from "./AccountModel";
import { Category } from "./CategoryModel";

@modelOptions({
  schemaOptions: {
    versionKey: false
  }
})

class Transaction {
    
    @prop({ required: true })
    type: string

    @prop({ required: true })
    value: Number

    @prop({ required: true })
    date: Date

    @prop({ ref: () => User, required: true })
    user: Ref<User>

    @prop({ ref: () => Account, required: true })
    account: Ref<Account>

    @prop({ ref: () => Category, required: true })
    category: Ref<Category>

    @prop({ required: true })
    recurring: string

    @prop({ required: true, default: false})
    split: boolean

    @prop({ required: false, default: false })
    recurringInterval: boolean

    @prop({ required: false, default: false })
    splitTransactionId: boolean
}

const TransactionModel = getModelForClass(Transaction);
export default TransactionModel;