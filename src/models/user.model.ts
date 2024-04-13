import { Schema, model } from 'mongoose';
import { IUser } from '../types/models';

const userSchema = new Schema<IUser>(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
        min: [6, 'Too few eggs'],
        max: [12, 'Only allow Max 12 characters'],
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        min: [6, 'Too few eggs'],
        max: [12, 'Only allow Max 12 characters'],
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function (v: string) {
            return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
          },
          message: (props:any) => `${props.value} is not a valid email!`,
        },
      },
      mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 10,
        validate: {
          validator: function (value: string) {
            const phoneRegex = /(0[3|5|7|8|9])([0-9]{8})/i;
            return phoneRegex.test(value);
          },
          message: `{VALUE} is not a valid phone!`,
          // message: (props) => `{props.value} is not a valid email!`,
        },
      },
    },
    { 
      timestamps: true 
    }
);

const User = model<IUser>('User', userSchema);
export default User;