mongoimport -d students -c grades < grades.json

> use students
> db.grades.count()
800

db.grades.aggregate({'$group':{'_id':'$student_id', 'average':{$avg:'$score'}}}, {'$sort':{'average':-1}}, {'$limit':1})

Find all exam scores greater than or equal to 65. and sort those scores from lowest to highest.
What is the student_id of the lowest exam score above 65?

db.grades.find({type:'exam', score:{$gte: 65}}).sort({score: 1}).limit(1)

answer: 114

