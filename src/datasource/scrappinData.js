const puppeteer = require('puppeteer')
const { getRandom } = require('random-useragent');
const { writeEvent } = require('../../utils/handle/logger.handle');

//@exports
const scrapeData = async() => {
    try{
        //Obtenemos usuario/agente virtual [robot]
        const header = iniciarUsuario();
                
        //Puppeteer initialization and configuration
        const browser = await puppeteer.launch({ headless: false, defaultViewport: { width:1920, height:1080 } });
        const page = await browser.newPage();

        //Simulamos la visita de usuario a pagina, mandando el UserAgent
        await page.setUserAgent(header);

        //
        // await getPopularDishes(page);
        await getMenu(page);

        //Close
        await browser.close();
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

        //
        await page.waitForSelector('#main-content');
        
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

        //Formateado
        return [
            { sourceUri: Uri, alias: 'yelp(app)' }, //[0] => Source
            { name: _PopularDishes[1], price: _PopularDishes[0] }, 
            { name: _PopularDishes[3], price: _PopularDishes[2] }, 
            { name: _PopularDishes[5], price: _PopularDishes[4] }
        ];
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

//Fuente dos
const getMenu = async(page) => {
    const Uri = 'https://postmates.com/store/dagabi-tapas-bar/hEjxXuetRpyI05bxBEOMfw?utm_source=GooglePMAX&utm_campaign=CM2152901-search-googlepmax-googlepmax_1_-99_US-National_pm-e_web_acq_cpc_en_PMax______c&campaign_id=15552588681&adg_id=&fi_id=&match=&net=x&dev=c&dev_m=&ad_id=&cre=&kwid=&kw=&placement=&tar=&gclid=Cj0KCQjwjIKYBhC6ARIsAGEds-KxD03YFv-L1m0MotbRH5U9u4_YKMPtQOv7gDhesjljGi4Y4OXkYb4aAhRcEALw_wcB&gclsrc=aw.ds';
    const _products = [];

    try {
        //Open
        await page.goto(Uri);

        //[0] => Source
        _products.push({ sourceUri: Uri, alias: 'postmates(app)' });

        //
        await page.waitForSelector('[role="dialog"]');

        //Cerramos pop-up de inicio
        await page.click('div.fg.ao.ij.db.ik button.ah.cg.is.it.ik.iu.bh.bi.be.gq.b0.dc.fb.iv');

        // 
        await page.waitForSelector('#main-content');

        //Scrap
        let _Productos = await page.evaluate(() => {
            const _section = document.querySelectorAll('div.hn.ho.h9.ba.hp.ax');
            const _name = document.querySelectorAll('ul.hq.hr.hs.ht.hu.hv.il.hx div.ba.c7.bb.c8.c9.ax span');
            const _price = document.querySelectorAll('ul.hq.hr.hs.ht.hu.hv.il.hx div.i9.ah.f3.ia span');
            const _description = document.querySelectorAll('ul.hq.hr.hs.ht.hu.hv.il.hx div.i9.id.ie.if.cj.ig.c6 span');

            
            for(let i=0; i<_section.length; i++)
            {
                const section = _section[i].innerText;
                const name = _name[i].innerText;
                const price = _price[i].innerText;
                const description = _description[i].innerText;

                console.log({ name, price, description, section });

                //
                _products.push({ name, price, description, section });
            }
            return _products;
        });

        console.log(_Productos);
    } 
    catch(error){
        
    }
}

/**/
module.exports = { scrapeData };