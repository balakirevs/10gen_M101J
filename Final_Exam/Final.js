1. - $ mongorestore --drop --db enron dump/enron
   - use enron
   - db.messages.find({"headers.From":"andrew.fastow@enron.com","headers.To":"jeff.skilling@enron.com"}).count()
   answer: 3

2. - db.messages.aggregate([
     { $unwind: '$headers.To' },
     { $group: { _id: { 'from' : '$headers.From', 'to' :'$headers.To' },
                'sum': { $sum : 1 } } },
     { $sort : { 'sum' : 1 } }])

   - db.messages.aggregate([
	 {$project: {
		from: "$headers.From",
		to: "$headers.To"
	 }},
	 {$unwind: "$to"},
	 {$project: {
		pair: {
			from: "$from",
			to: "$to"
		},
		count: {$add: [1]}
	 }},
	 {$group: {
		_id: "$pair",
		count: {$sum: 1}
	 }},
	 {$sort: {
		count: -1
	 }},
	 {$limit: 2},
	 {$skip: 1}
     ])
 
    answer: {
	"result" : [
		{
			"_id" : {
				"from" : "susan.mara@enron.com",
				"to" : "richard.shapiro@enron.com"
			},
			"count" : 974
		}
	],
	"ok" : 1
    }

3. db.messages.update({ 'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>' }, { $addToSet: { 'headers.To': 'mrpotatohead@10gen.com' } })
  
   validation code: 897h6723ghf25gd87gh28 

4. validation code: 89jlkfdsjflks34j0d   