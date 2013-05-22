> db.grades.count() 
600
Now let us find the student who holds the 101st best grade across all grades:
> db.grades.find().sort({'score':-1}).skip(100).limit(1)
{ "_id" : ObjectId("513257f68d6e7cb63d7b1ead"), "student_id" : 164, "type" : "exam", "score" : 87.06518186605459 }
Now let us sort the students by student_id, score and see what the top five docs are:
> db.grades.find({},{'student_id':1, 'type':1, 'score':1, '_id':0}).sort({'student_id':1, 'score':1, }).limit(5)
{ "student_id" : 0, "type" : "quiz", "score" : 16.28337833467709 }
{ "student_id" : 0, "type" : "exam", "score" : 64.40706888325151 }
{ "student_id" : 0, "type" : "homework", "score" : 80.31845193864314 }
{ "student_id" : 1, "type" : "quiz", "score" : 11.45004974085635 }
{ "student_id" : 1, "type" : "homework", "score" : 31.56114538077717 }
To verify that you have completed this task correctly, provide the identify of the student with the highest average in the class with following query that uses the aggregation framework. The answer will appear in the _id field of the resulting document.

> db.grades.aggregate({'$group':{'_id':'$student_id', 'average':{$avg:'$score'}}}, {'$sort':{'average':-1}}, {'$limit':1})

answer : 124