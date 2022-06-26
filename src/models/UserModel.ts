import {
    DocumentType,
    getModelForClass,
    prop,
    pre
  } from "@typegoose/typegoose";
  import bcrypt from "bcryptjs";
  
  @pre<User>('save', function() {
    
  })

export class User {
      
    @prop({ required: true })
    name: string;
  
    @prop({ required: true, lowercase: true })
    email: string;
  
    @prop({ required: true })
    password: string;

    public async comparePassword(this: DocumentType<User>, reqPassword: string): Promise<boolean>{
        return await bcrypt.compare(reqPassword, this.password);
    }
}
 
const UserModel = getModelForClass(User);
export default UserModel;