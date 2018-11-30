// import querystring from 'querystring';

// export default class {
//     static async request(action, headers = {}) {

//         let method = action.method || 'GET';
//         let request = {
//             method: method,
//             headers: Object.assign({
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             }, headers)
//         };
//         if (action.token) {
//             request.headers['Authorization'] = "Bearer " + action.token;
//             console.log('asdasdasdasdasdasdasdasdas',action.token)
//         }
//         let url = action.api;
//         if (action.payload) {
//             if (method === "GET") {
//                 url = querystring.stringify(action.payload);
//             } else {
//                 request['body'] = JSON.stringify(action.payload);
//             }
//         }
//         let response = await fetch(url, request);
//         let json = await response.json();

//         if (json.code === 400) {
//             json.data.message = "Tham số đầu vào không chính xác. Xin vui lòng kiểm tra lại";
//         }
//         return json;
//     }
// }



export default class {
    static async request(action, headers = {}) {
        let method = action.method || 'GET';
        let request = {
            method: method,
            headers: Object.assign({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, headers)
        };
        if (action.token) {
            request.headers['Authorization'] = "Bearer " + action.token;
        }
        if ((method == "POST" || method == "DELETE" || method == "PUT") && action.payload) {
            request['body'] = JSON.stringify(action.payload);
        }
        let response = await fetch(action.api, request);
        return await response.json();
    }
}