db.excersizes.drop();
db.excersizes.insert([
  {
    name:"example excersize",
    url:"http://excersize.com",
    description:"example description",
    history:[]
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