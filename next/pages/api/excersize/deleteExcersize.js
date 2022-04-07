import connectToDB from '../../../lib/connectToDB';
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try{
        const id = ObjectId(req.body._id);
        const { db } = await connectToDB();
        const conn = await db
        .collection("excersizes")
        .deleteOne({_id:id});
        res.json({success:true, result:conn});
    }catch(error){
        res.json({success:false, result:error.message});
        throw error;
    }

}
