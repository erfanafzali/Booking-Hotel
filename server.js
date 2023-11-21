import { create, defaults, router } from 'json-server';

const server = create();
const jsonRouter = router('server/db.json');
const middlewares = defaults();

server.use(middlewares);
server.use(jsonRouter);
server.listen(5000, () => {
    console.log('JSON Server is running');
});
