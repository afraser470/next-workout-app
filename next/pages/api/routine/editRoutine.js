import connectToDB from '../../../lib/connectToDB';
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try{
        const id = ObjectId(req.body._id);
        const { db } = await connectToDB();
        var myquery = { _id:id};
        var newvalues = { $set: { name: req.body.name, description:req.body.description, excersizes:req.body.excersizes } };
        const conn = await db
        .collection("routines")
        .updateOne(myquery,newvalues);
        res.json({success:true, result:conn});
    }catch(error){
        res.json({success:false, result:error.message});
        throw error;
    }

}
