import { model, Document, Schema} from 'mongoose';

interface SUrl extends Document {
    baseUrl:string,
    shortnedId:string;
    expiration?: Date ;
}

const urlSchema = new Schema<SUrl>({
    baseUrl:{
        type:String,
        required:true,
        unique:true,
    },
    shortnedId:{
        type:String,
        required:true,
        unique:true,
    },
    expiration: {
        type: Date,
        default: null, 
      },
})

const Url = model<SUrl>('url', urlSchema);
export default Url;