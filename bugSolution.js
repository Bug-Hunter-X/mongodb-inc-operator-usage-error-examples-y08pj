```javascript
//Correct usage of $inc operator using $setOnInsert to handle non-existent field
db.collection('myCollection').updateOne({"_id":ObjectId("someId")},{
  $set:{"field":0},
  $inc:{"field":value},
  $setOnInsert:{"field":0} // this ensures that if the field doesn't exist, it's added with value 0 before incrementing
});

//Alternative approach:  First check if field exists, then update
let doc = db.collection('myCollection').findOne({"_id":ObjectId("someId")});
if(doc && typeof doc.field === 'number'){
  db.collection('myCollection').updateOne({"_id":ObjectId("someId")},{$inc:{field:value}});
}else{
  // Handle the case where the field does not exist or is not a number. For example:
  db.collection('myCollection').updateOne({"_id":ObjectId("someId")},{$set:{field: value}});
}
```