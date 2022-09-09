const puppeteer = require('puppeteer')
const { getRandom } = require('random-useragent');
const { writeEvent } = require('../../utils/handle/logger.handle');

//@exports
const scrapeData = async() => {
    try{
        //Obtenemos usuario/agente virtual [robot]
        const header = iniciarUsuario();
                
        //Puppeteer initialization and configuration
        const browser = await puppeteer.launch();
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.setViewport({ width:1920, height:1080 });

        //Simulamos la visita de usuario a pagina, mandando el UserAgent
        await page.setUserAgent(header);

        //Scrapping - GetData
        const _popularDishes = await getPopularDishes(page);
        const _menu = await getMenu(page);

        //Close
        await browser.close();

        return [_popularDishes, _menu];
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

//@static
const iniciarUsuario = () => {
    try{
        return getRandom((ub) => { // ub => user-browser
            return ub.browserName === 'Chrome';
        });
    }
    catch(e){
        throw e;
    }
}

//Fuente uno
const getPopularDishes = async(page) => {
    const Uri = 'https://www.yelp.com/biz/dagabi-cucina-boulder';

    try{
        //Open
        await page.goto(Uri);

        writeEvent('Uri visitada: '+Uri);

        await page.waitForTimeout(5000);

        //
        await page.waitForSelector('main[id="main-content"]');
        
        //Scrap
        let _PopularDishes = await page.evaluate(() => {
            const _containers = document.querySelectorAll('div.css-1uk2nuw div.css-19cdu5a [data-font-weight="bold"]');
            
            const contenido = [];
            for(let x=0; x<6; x++)//[Price,Product] => 3 items
            {
                contenido.push(_containers[x].innerText);
            }

            return contenido;
        });

        //
        writeEvent('Scrapin yelp(app) ends');

        //Formateado
        return [
            { uri: Uri, alias: 'yelp(app)', product: 'platillos populares' }, //[0] => Source
            { nombre: _PopularDishes[1], precio: _PopularDishes[0] }, 
            { nombre: _PopularDishes[3], precio: _PopularDishes[2] }, 
            { nombre: _PopularDishes[5], precio: _PopularDishes[4] }
        ];
    }
    catch(e){
        throw e;
    }
}

//Fuente dos
const getMenu = async(page) => {
    const Uri = 'https://postmates.com/store/dagabi-tapas-bar/hEjxXuetRpyI05bxBEOMfw?utm_source=GooglePMAX&utm_campaign=CM2152901-search-googlepmax-googlepmax_1_-99_US-National_pm-e_web_acq_cpc_en_PMax______c&campaign_id=15552588681&adg_id=&fi_id=&match=&net=x&dev=c&dev_m=&ad_id=&cre=&kwid=&kw=&placement=&tar=&gclid=Cj0KCQjwjIKYBhC6ARIsAGEds-KxD03YFv-L1m0MotbRH5U9u4_YKMPtQOv7gDhesjljGi4Y4OXkYb4aAhRcEALw_wcB&gclsrc=aw.ds';
    try {
        //Open
        await page.goto(Uri);

        writeEvent('Uri visitada: '+Uri);

        await page.waitForTimeout(4000);

        //
        await page.waitForSelector('main[id="main-content"]');

        //Scrap
        let _Productos = await page.evaluate(() => {
            const _Conteiners = document.querySelectorAll('ul.h8.dm.bw li.h9.ha');

            const _productos = [];
            //Iterar array de _Containers[HTMLDom]
            for(let Container of _Conteiners){
                const seccion = Container.querySelector('div.hb.hc.gx.ba.hd.ax').innerText;

                //Sub-contenedores
                const _SubConteiners = Container.querySelectorAll('ul.he.hf.hg.hh.hi.hj.i9.hl li.hm.hn.ho.hp.hq.hr.hs.ht');

                //Iterar array de _SubConteiners[HTMLDom]
                for(let SubContainer of _SubConteiners){
                    const nombre = SubContainer.querySelector('div.ba.c7.bb.c8.c9.ax span').innerText;
                    const precio = SubContainer.querySelector('div.hx.ah.eo.hy span.hz.gf.i0.ba.bz.dp.c0.c1.ax').innerText;
                    const descripcion = SubContainer.querySelector('div.ba.bz.dp.c0.c1.ax span.i5').innerText;

                    //
                    _productos.push({ seccion, nombre, precio, descripcion });
                }
            }

            return _productos;
        });

        //Alterar [_Productos] para poner la Uri-Source al inicio
        _Productos.unshift({ uri: Uri, alias: 'postmates(app)', product: 'menu' })

        writeEvent('Scrapin ends: '+_Productos[0].alias);

        return _Productos;
    } 
    catch(e){
        throw e;
    }
}

/**/
module.exports = { scrapeData };