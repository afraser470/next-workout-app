export default function FindPB(data){
    let best;
    if(data[0].history.length != 0){
        const sets = data[0].history.map(s=>parseInt(s.weight))
        let maxWeight = Math.max(...sets);
        let reps = data[0].history.find(x=>x.weight == maxWeight);
        best = maxWeight+" Kg x "+reps.reps+" Reps";
    }else{
        best = "";
    }
    return best;
}