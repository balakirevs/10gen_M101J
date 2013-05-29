package com.hw3-1;

import com.mongodb.*;

import java.net.UnknownHostException;
import java.util.Iterator;

public class LowestScoreDrop {
    public static void main(String[] args) throws UnknownHostException {
        MongoClient client = new MongoClient();
        DB db = client.getDB("hw31");
        DBCollection collection = db.getCollection("students");

        // create our pipeline operations, first with the $match
        DBObject match = new BasicDBObject("$match", new BasicDBObject("scores.type", "homework") );

        // $unwind op
        //DBObject unwind = new BasicDBObject("$unwind", "$scores");

        // Now the $group operation
        DBObject groupFields = new BasicDBObject( "_id", "$student_id");
        //groupFields.put("score", new BasicDBObject( "$min", "scores.$score"));
        DBObject group = new BasicDBObject("$group", groupFields);
//
//        // $sort operation
//        DBObject sortFields = new BasicDBObject("_id", 1).append("score", 1);
//        DBObject sort = new BasicDBObject("$sort", sortFields);

        // run aggregation
        AggregationOutput output = collection.aggregate(match, group);

        for(Iterator<DBObject> i = output.results().iterator(); i.hasNext();) {
            DBObject result = i.next();
            System.out.println(result);
//            collection.remove(QueryBuilder.start("student_id").is(result.get("_id"))
//                    .and("score").is(result.get("score")).and("type").is("homework").get());
        }

        System.out.println(collection.count());
    }
}