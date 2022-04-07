import connectToDB from '../../../lib/connectToDB';

export default async (req, res) => {
    try{
        const { db } = await connectToDB();
        const conn = await db
        .collection("routines")
        .insert({name:req.body.name, description:req.body.description, excersizes:req.body.excersizes})
        res.json({success:true, result:conn});
    }catch(error){
        res.json({success:false, result:error.message});
        throw error;
    }

}
