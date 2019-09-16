/*
Explaination:

API_ROOT_URL contains the root for the API, and should always be used first in the call.

API_GET_X contains the GET for each X and should be put right after API_ROOT_URL in the call.

API_SAVE_X contains the POST for each X and should be used in place of the GET after the API_ROOT_URL. 

Note that API_GET_X and API_SAVE_X can not be used in the same call

API_TOKEN contains the TOKEN used to be authorized to cockpit. It should always be called after either API_GET_X or API_SAVE_X.

*/

const API = {
    ROOT_URL: "https://cockpit-0fd022.devspace.host/api/collections/",
    GET_PRODUCTS: "get/products?=",
    GET_REVIEWS: "get/review?=",
    SAVE_REVIEW: "save/review?=",
    SAVE_ORDER: "save/order?=",
    TOKEN: "b66a6aa37d732772938ec3de8e0b7f",

}

export default API;