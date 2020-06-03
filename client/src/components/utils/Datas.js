const continents=[
    {"_id":1,"name" : "Africa"},
    {"_id":2,"name":"Asia"},
    {"_id":3,"name":"Europe"},
    {"_id":4,"name":"North America"},
    {"_id":5,"name":"South America"},
    {"_id":6,"name":"Australia"},
    {"_id":7,"name":"Antartica"}
]

const productPrice = [

    {
        "_id":0,
        "name":"Any",
        "array":[]
    },
    {
        "_id":1,
        "name":"$0 to $499",
        "array":[0,499]
    },
    {
        "_id":2,
        "name":"$500 to $999",
        "array":[500,999]
    },
    {
        "_id":3,
        "name":"$1000 to $1499",
        "array":[1000,1499]
    },
    {
        "_id":4,
        "name":"$1500 to $1999",
        "array":[1500,1999]
    },
    {
        "_id":5,
        "name":"$2000 to $2999",
        "array":[2000,2999]
    },
    {
        "_id":6,
        "name":"more than $3000",
        "array":[3001,150000]
    }
]

export {continents, productPrice}