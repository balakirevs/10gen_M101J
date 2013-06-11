use blog;
db.posts.aggregate([
    {"$unwind":$commeents},
    {"$group":
      {
        _id: "$comments.author",
        num_comments: {$sum;1} 
      }
      },
      {"$sort": {'num_comments':-1}},
      {"$limit":10}
      ])

// answer = Elizabet Kleine