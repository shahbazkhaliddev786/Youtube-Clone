import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type: String,
        required: true
    },
    thumbnails:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type:Number,
        required: true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type: Boolean,
        default:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

// we can add our own plugin in mongodb
videoSchema.plugin(mongooseAggregatePaginate); // now we can write aggregation queries on video document.
export const Video = mongoose.model("Video", videoSchema);