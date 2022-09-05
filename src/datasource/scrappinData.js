const puppeteer = require('puppeteer')
const { getRandom } = require('random-useragent');
const { writeEvent } = require('../../utils/handle/logger.handle');

//@exports
const scrapeData = async() => {
    try{
        //Obtenemos usuario/agente virtual [robot]
        const header = iniciarUsuario();
                
        //Puppeteer initialization and configuration
        const browser = await puppeteer.launch({ defaultViewport: { width:1920, height:1080 } });
        const page = await browser.newPage();

        //Simulamos la visita de usuario a pagina, mandando el UserAgent
        await page.setUserAgent(header);

        //
        await getPopularDishes(page);

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

const getPopularDishes = async(page) => {
    const Uri = 'https://www.yelp.com/biz/dagabi-cucina-boulder';

    try{
        //Open
        await page.goto(Uri);

        //
        await page.waitForSelector('#main-content');
        
        //
        const _PopularDishes = await page.evaluate(() => {
            const _containers = document.querySelectorAll('div.css-1uk2nuw div.css-19cdu5a [data-font-weight="bold"]');
            
            const _prices = [];
            for(const Container of _containers)
            {
                _prices.push(Container.innerText);
            }

            return _prices;
        });

        console.log(_PopularDishes);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

/**/
module.exports = { scrapeData };