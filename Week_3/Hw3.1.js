db.students.count()
200
> db.students.find({_id:100}).pretty()
{
	"_id" : 100,
	"name" : "Demarcus Audette",
	"scores" : [
		{
			"score" : 30.61740640636871,
			"type" : "exam"
		},
		{
			"score" : 14.23233821353732,
			"type" : "quiz"
		},
		{
			"score" : 31.41421298576332,
			"type" : "homework"
		}
	]
}
> db.students.aggregate({'$unwind':'$scores'},{'$group':{'_id':'$_id', 'average':{$avg:'$scores.score'}}}, {'$sort':{'average':-1}}, {'$limit':1})
{
	"result" : [
		{
			"_id" : 37,
			"average" : 91.45054199087797
		}
	],
	"ok" : 1
}
