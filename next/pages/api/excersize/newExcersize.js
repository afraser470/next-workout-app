import connectToDB from '../../../lib/connectToDB';

export default async (req, res) => {
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

}
