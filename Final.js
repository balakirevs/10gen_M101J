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

5. db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}
   a_1_b_1

   a_1_c_1

   c_1 

   a_1_b_1_c_-1

6. answers: Set w=0, j=0 on writes

            Remove all indexes from the collection 


7. mongoimport -d test -c albums < albums.json
   mongoimport -d test -c images < images.json 

  db.albums.ensureIndex({"images" : 1});null;

  cur = db.images.find({}); null;
  while(cur.hasNext()){
	 img = cur.next(); null;
	 if (db.albums.find({"images" : img._id}).count() == 0)
		db.images.remove({"_id":img._id});
   }

    db.images.find({"tags":"sunrises"}).count();

8. public class Question8 {



        public static void main(String[] args) throws IOException {
            MongoClient c =  new MongoClient(new MongoClientURI("mongodb://localhost"));
            DB db = c.getDB("test");
            DBCollection animals = db.getCollection("animals");


            BasicDBObject animal = new BasicDBObject("animal", "monkey");

            animals.insert(animal);
            animal.removeField("animal");
            animal.append("animal", "cat");
            animals.insert(animal);
            animal.removeField("animal");
            animal.append("animal", "lion");
            animals.insert(animal);

        }

    }

    answer: 1

9. Imagine an electronic medical record database designed to hold the medical records of every individual in the United States. Because each person has more than 16MB of medical history and records, it's not feasible to have a single document for every patient. Instead, there is a patient collection that contains basic information on each person and maps the person to a patient_id, and a record collection that contains one document for each test or procedure. One patient may have dozens or even hundreds of documents in the record collection. 

   We need to decide on a shard key to shard the record collection. What's the best shard key for the record collection, provided that we are willing to run scatter gather operations to do research and run studies on various diseases and cohorts? That is, think mostly about the operational aspects of such a system.


   answer: patient_id    
