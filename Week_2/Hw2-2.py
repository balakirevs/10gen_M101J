import pymongo

from pymongo import Connection

#Get connection
connection = Connection('localhost', 27017)

db = connection.students

grades = db.grades

sorted_home_work_grades = db.grades.find({'type':'homework'}).sort([('student_id',1), ('score',-1)])

index = 1
for grade in sorted_home_work_grades:
	grade_id = grade['_id']
	if(index%2==0):
		db.grades.remove({'_id':grade_id})
	index+=1