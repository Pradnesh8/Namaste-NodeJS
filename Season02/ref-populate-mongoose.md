# Ref

Set the model that this path refers to. This is the option that 'populate' looks at to determine the foreign collection it should query

eg.
const connectionRequestSchema = new mongoose.Schema({
fromUserId: {
type: String,
ref: "user",// this builds the relation with other mongoose model
required: true
},
})

# Populate()

MongoDB has the join-like $lookup aggregation operator in versions >= 3.2. Mongoose has a more powerful alternative called populate(), which lets you reference documents in other collections.

Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.

eg.
const conectionRequests = await ConnectionRequest.find({
toUserId: loggedInUser.\_id,
status: "interested"
}).populate("fromUserId", ["firstName", "lastName", "photo_url"])
