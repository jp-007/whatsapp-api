// // import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
var express = require('express');
const fs = require('fs');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); 
app.use(express.static('public'));
let client=null;

// const getClient = async()=>{
//     const client=await venom.create({
//         session: 'session-name', //name of session
//         multidevice: false // for version not multidevice use false.(default: true)
//       });
//       return client;
// }

// venom.create({
//         session: 'session-name', //name of session
//         multidevice: false // for version not multidevice use false.(default: true)
//       })
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });
// venom
//   .create(
//     'sessionName',
//     (base64Qr, asciiQR, attempts, urlCode) => {
//       console.log(asciiQR); // Optional to log the QR in the terminal
//       var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//         response = {};

//       if (matches.length !== 3) {
//         return new Error('Invalid input string');
//       }
//       response.type = matches[1];
//       response.data = new Buffer.from(matches[2], 'base64');

//       var imageBuffer = response;
      
//       require('fs').writeFile(
//         __dirname+'/public/out.png',
//         imageBuffer['data'],
//         'binary',
//         function (err) {
//           if (err != null) {
//             console.log(err);
//           }
//         }
//       );
//       // res.send("SUCCESS")
      
//     },
//     undefined,
//     { logQR: false }
//   )
//   .then((client1) => {
//     client=client1;
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });





app.post('/send', (req, res)=>{
    console.log(req)
    const phone=req.query.phone;
    const otp=req.query.otp;
    if(client){
        client.sendText(phone+'@c.us', 'Your One time Password: '+otp)
        .then((result) => {
        console.log('Result: ', result); //return object success
        }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
        res.send('SUCCESS');
    }else{
        res.send("ERROR");
    }   
    
})

app.get('/', function (req, res) {
    res.send('miniOrange Whatsapp API');
})

app.get('/scan', function (req, res) {
                var page = `
                    <html>
                        <body>
                            <div id="qrcode"></div>
                            <img src="http://localhost:8081/out.png">
                        </body>
                        <script>
                        setInterval(function() {
                          location.reload();
                        }, 5000);
                        </script>
                    </html>
                `
                res.write(page)
                res.end();
  
})


app.get('/getqr', function (req, res) {
  venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      
      require('fs').writeFile(
        __dirname+'/public/out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
      // res.send("SUCCESS")
      
    },
    undefined,
    { logQR: false }
  )
  .then((client1) => {
    client=client1;
  })
  .catch((erro) => {
    console.log(erro);
  });
  
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})




