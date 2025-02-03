import { model, Document, Schema} from 'mongoose';

interface SUrl extends Document {
    baseUrl:string,
    shortnedId:string;
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
    }
})

const Url = model<SUrl>('url', urlSchema);
export default Url;