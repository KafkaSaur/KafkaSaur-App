/** @format */

import {
  listenAndServe,
  ServerRequest,
} from 'https://deno.land/std@0.65.0/http/mod.ts';

import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';

import {
  WebSocketClient,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.1.1/mod.ts';

const PORT = { port: 3000 };
const app = new Application();
const router = new Router();

const test = new Router().post('/', (ctx, next) => {
  console.log('IN THE POST /api');
  ctx.response.body = `You made it to the POST request`;
  return ctx.response;
});

const wss = new WebSocketServer(8080);
wss.on('connection', function (ws: WebSocketClient) {
  ws.on('message', function (message: string) {
    console.log(message);
    ws.send(message);
  });
});

const testyBoi = new Router().use('/api', test.routes(), test.allowedMethods());

app.use(testyBoi.routes());

// app.use((ctx, next) => {
//   // console.log("URL ", ctx.request.url)
//    ctx.response.status = 200;
//    const {response} = ctx
//   //  console.log(response);
//    return next();
// })

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/client`,
    index: 'index.html',
  });

  return ctx.response.status;
});

// app.use(test.routes());
// app.use(test.allowedMethods());

//router.post('/api')

await app.listen(PORT);
