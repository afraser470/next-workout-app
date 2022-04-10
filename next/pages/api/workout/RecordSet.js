import connectToDB from '../../../lib/connectToDB';
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react"

export default async (req, res) => {
    const session = await getSession({ req });
    if(session){
        try{
            const id = ObjectId(req.body._id);
            const { db } = await connectToDB();
            var myquery = { _id:id};
            var newvalues = { $push: { "history": { "weight": req.body.weight, "reps": req.body.reps, "date": req.body.date} } };
            const conn = await db
            .collection("excersizes")
            .updateOne(myquery,newvalues);
            res.json({success:true, result:conn});
        }catch(error){
            res.json({success:false, result:error.message});
            throw error;
        }
    }else {
        // Not Signed in
        res.redirect('/api/auth/signin');
    }

}
