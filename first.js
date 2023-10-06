const http = require('http');
const url = require('url');

const PORT = 3000; //port dimana server akan dijalankan

const server = http.createServer((req,res)=>{ //menangani permintaan (req) dan memberikan respons (res)
    
    try { //blok  yang akan dikerjakan ketika
        if(req.method === 'GET'){

            //mengekstrak url dari request
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;

            if(pathname === '/'){
                
                res.setHeader('Content-Type', 'html'); //menentukan tipe response body (html)
                
                res.writeHead(200); //memberikan status code pada response (OK, success)
                
                res.end('<h1>Halo</h1>\n') //memberikan data pada response body dan mengakhiri response
            
            } else if(pathname === '/users'){ //menghandle request dari path /users
    
                const { users } = require('./users.js'); //mengambil data dari file users.js
    
                res.setHeader('Content-Type', 'application/json'); //menentukan tipe response body (json)
                
                res.writeHead(200); //memberikan status code pada response (OK, success)
                
                res.end(JSON.stringify(users)); //memberikan data pada response body dan mengakhiri response
            
            } else { //error handling jika path tidak ditemukan

                const { err404 } = require('./error.js'); //mengambil data dari file error.js
                
                res.setHeader('Content-Type', 'application/json'); //menentukan tipe response body
                
                res.writeHead(404); //memberikan status code pada response (resource tidak ditemukan)
                
                res.end(JSON.stringify(err404)); //memberikan data pada response body dan mengakhiri response
            }

        } else { throw new err('Not Allowed'); } //jika menggunakan method selain GET, maka akan di lempar ke blok catch

    } catch (err) { //menghandle error method selain GET

        const { err405 } = require('./error.js'); //mengambil data dari file error.js
        
        res.setHeader('Content-Type', 'application/json'); //menentukan tipe response body (json)
            
        res.writeHead(405); //memberikan status code pada response (method selain GET tidak diizinkan)
        
        res.end(JSON.stringify(err405)); //memberikan data pada response body dan mengakhiri response
    }

})

server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`); //mendengarkan server
});