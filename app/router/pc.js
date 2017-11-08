var Router = require('koa-router');
var router = new Router();
var ctrl = {};
var fs = require('fs');
var path = require('path');



module.exports = function (app) {


   

        // fs.readdirSync(webconfig.pc).forEach(function (file) {
        //     if (file.indexOf('.js') != -1) {
        //         var ctrlName = file.split('.')[0];
        //         ctrl[ctrlName] = require(path.join(webconfig.pc, file));
        //     }
        // });
    
    

    app.use(async function (ctx, next) {
        fs.readdirSync(webconfig.pc).forEach(function (file) {
            if (file.indexOf('.js') != -1) {
                var ctrlName = file.split('.')[0];
                var project = require(path.join(webconfig.pc, file))
                ctrl[ctrlName] = new project(ctx,next);
            }
        });
        next();
    })




    //判断是否是ie以下
    router.use(async function (ctx, next) {
        var userAgent = ctx.request.header["user-agent"]; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            var IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE6) {
                ctx.isIE8 = true;
                next()
            }
            if (IE7) {
                ctx.isIE8 = true;
                next()
            }
            if (IE8) {
                ctx.isIE8 = true;
                next()
            }
            ctx.isIE8 = false;
            next();

        } //isIE end

        ctx.isIE8 = false;
        next();
    })


    //
    router.get('/', async function (ctx, next) {
        await ctrl.index.index();
        
    });


    //运用路由
    app.use(router.routes());
    console.log('app-werwe')

}