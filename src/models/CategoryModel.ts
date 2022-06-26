import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./UserModel";

export class Category {
      
    @prop({ required: true })
    name: string;
  
    @prop({ required: true, lowercase: true })
    description: string;
  
    @prop({ required: false, default: true })
    active: Boolean

    @prop({ required: false })
    parent: String

    @prop({ ref: () => User, required: true })
    user: Ref<User>
    
} 
  
const CategoryModel = getModelForClass(Category);
export default CategoryModel;