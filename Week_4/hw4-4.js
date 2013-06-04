mongoimport -d m101 -c profile < sysprofile.json

use m101

db.profile.find({'ns': /^school2/}, {millis: true, _id: false}).sort({millis: -1}).limit(1)