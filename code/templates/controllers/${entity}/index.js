function index(router, app){

    console.info('controllers :: ${entity} :: index');

    router.get    ('/:id', resolve('get'   ));
    router.post   ('/',    resolve('post'  ));
    router.put    ('/:id', resolve('put'   ));
    router.patch  ('/:id', resolve('patch' ));
    router.delete ('/:id', resolve('delete'));

    function resolve(method){
        return (req, res) => {
            app
                .modules
                    .controllers
                        [__dirname.split('/').slice(-1)[0]]
                            [method]
                                (req, res, app);
        }
    }

    return router;

}

module.exports = index;