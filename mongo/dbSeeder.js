db.excersizes.drop();
db.excersizes.insert([
  {
    name:"example excersize",
    url:"http://excersize.com",
    description:"example description",
    history:[
      {
        weight:20,
        reps:10,
        date:'December 17, 1995 03:24:00'
      },
      {
        weight:22,
        reps:10,
        date:'December 18, 1995 03:24:00'
      }
    ]
  }
]);

db.routines.drop();
db.routines.insert([
  {
    name:"example routine",
    description:"example description",
    excersizes:[]
  }
]);