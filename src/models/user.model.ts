import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

//typescript interface
export interface UserDocument extends mongoose.Document {
    email: string;
    fullName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

//mongoose schema
const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        fullName: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
);


//hash password on save
UserSchema.pre("save", async function(next){
    let user = this as UserDocument;

    //only hash password if it has been modified or new
    if(!user.isModified("password")) return next();

    //Random additional data
    const salt = await bcrypt.genSalt(config.get<number>("saltSeed"));

    const hash = await bcrypt.hashSync(user.password, salt);

    //Replace the password with the hash
    user.password = hash;

    return next();
});

//compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string) : Promise<boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}


const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;