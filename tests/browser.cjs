/* Real browser smoke checks. Start their own loopback static server; never deploy. */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.geojson':'application/geo+json'};
async function scenario(page,base,reduced){
  await page.locator('#trail').selectOption('25');assert.equal(await page.locator('#tracks path').count(),4);

  await page.locator('#search').fill('SIN');assert.equal(await page.locator('#list button[aria-pressed=true]').count(),1);
  assert.equal(await page.locator('#detail h2').textContent(),'SP303');
  await page.locator('#search').fill('no-such-flight');assert.equal(await page.locator('#detail h2').count(),0);
  await page.locator('#search').fill('YYZ');await page.locator('#forward').click();assert.equal(await page.locator('#time').inputValue(),'45');
  await page.locator('#search').fill('');await page.locator('#altitude').selectOption('38000');assert.equal(await page.locator('#list button').count(),1);assert.equal(await page.locator('#detail h2').textContent(),'SP303');
  if(reduced){assert.equal(await page.locator('#play').isDisabled(),true);}
  else{
    await page.evaluate(()=>{window.originalFlightButton=document.querySelector('#list button');});
    await page.locator('#play').click();await page.waitForFunction(()=>Number(document.querySelector('#time').value)>45.1);
    assert.equal(await page.evaluate(()=>window.originalFlightButton===document.querySelector('#list button')),true);
    await page.locator('#play').click();assert.equal(await page.locator('#play').getAttribute('aria-pressed'),'false');
  }

}
async function main(){
  const server=http.createServer(async(req,res)=>{
    try{
      let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      if(pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
      if(pathname==='/')pathname='/index.html';
      const file=path.resolve(root,'.'+pathname);
      if(!file.startsWith(root+path.sep)||pathname.split('/').some(part=>part.startsWith('.'))||!mime[path.extname(file)]){res.writeHead(404);res.end();return;}
      const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]});res.end(body);
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}/`;
  let browser;
  try{
    browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
    await fs.mkdir(path.join(root,'test-results'),{recursive:true});
    for(const profile of [{name:'desktop',width:1440,height:1000,reduced:true},{name:'mobile',width:390,height:844,reduced:true},{name:'motion',width:1440,height:1000,reduced:false}]){
      const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},reducedMotion:profile.reduced?'reduce':'no-preference'});
      const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
      try{
        await page.goto(base);await page.waitForFunction(()=>document.querySelector('main')!==null);await page.waitForLoadState('networkidle');
        await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(el=>document.activeElement===el),true,'Skip link must be first keyboard target');
        await page.evaluate(()=>document.activeElement.blur());
        if(profile.name!=='motion')await page.screenshot({path:path.join(root,'test-results',profile.name+'.jpg'),type:'jpeg',quality:75,fullPage:true});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
        await scenario(page,base,profile.reduced);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow after interactions');
        assert.deepEqual(errors,[],'Uncaught browser errors');
        console.log(profile.name+' browser scenario passed');
      }catch(error){await page.screenshot({path:path.join(root,'test-results',profile.name+'-failure.png'),fullPage:true}).catch(()=>{});throw error;}
      finally{await context.close();}
    }
    console.log('Chromium '+browser.version()+': all 3 browser scenarios passed. Screenshots: test-results/');
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});

