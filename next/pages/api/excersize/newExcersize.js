import connectToDB from '../../../lib/connectToDB';
import { getSession } from "next-auth/react"

export default async (req, res) => {
    const session = await getSession({ req });
    if(session){
        try{
            const { db } = await connectToDB();
            const conn = await db
            .collection("excersizes")
            .insert({name:req.body.name, url:req.body.url, description:req.body.description, history:[]})
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
