/** Verify structured FAQ against rendered content, including collapsed answers.
 * Usage: node scripts/audit-structured-data.mjs https://www.iteradvisors.com
 */
const base = (process.argv[2] || 'http://127.0.0.1:3100').replace(/\/$/, '');
const canonical = 'https://www.iteradvisors.com';
const normalize = text => text.replace(/<\/?[a-z][^>]*>/gi, ' ')
  .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&nbsp;|&amp;|&quot;|&apos;|&lt;|&gt;/g, entity => ({'&nbsp;':' ', '&amp;':'&', '&quot;':'"', '&apos;':"'", '&lt;':'<', '&gt;':'>'}[entity]))
  .replace(/\[\[([^|]+)\|[^\]]+\]\]/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
async function get(path) {
  for (let attempt=0; attempt<3; attempt++) {
    try { return await fetch(base+path, {signal: AbortSignal.timeout(30000), redirect:'manual'}); }
    catch(error) { if(attempt===2) throw error; }
  }
}
function* objects(value) {
  if (Array.isArray(value)) { for (const item of value) yield* objects(item); }
  else if (value && typeof value==='object') { yield value; for (const item of Object.values(value)) yield* objects(item); }
}
const sitemap = await (await get('/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const failures=[]; const answerDifferences=[]; let questions=0;
const assets = new Set();
let index=0;
await Promise.all(Array.from({length:3}, async()=> {
  while(index<paths.length) {
    const path=paths[index++];
    try {
      const response=await get(path);
      if(response.status!==200) { failures.push({path,test:'status',value:response.status}); continue; }
      const html=await response.text();
      for (const image of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/gi)) {
        const url = image[1].replace(/&amp;/g, '&');
        if (url.startsWith('/') || url.startsWith(canonical+'/')) assets.add(url.replace(canonical, ''));
      }
      const visible=normalize(html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi,''));
      if(!/<main[\s>]/i.test(html)) failures.push({path,test:'main-missing'});
      for(const raw of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
        let data;
        try { data=JSON.parse(raw[1]); } catch { failures.push({path,test:'invalid-json'}); continue; }
        for(const item of objects(data)) {
          if(item['@type']!=='Question') continue;
          questions++;
          if(!visible.includes(normalize(item.name || ''))) failures.push({path,test:'faq-question-not-visible',question:item.name});
          const answer=item.acceptedAnswer?.text;
          if(answer && !visible.includes(normalize(answer))) answerDifferences.push({path,question:item.name,answer});
        }
      }
      const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
      const duplicateIds=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
      if(duplicateIds.length) failures.push({path,test:'duplicate-ids',value:duplicateIds});
    } catch(error) { failures.push({path,test:'fetch',error:error.message}); }
  }
}));
const assetPaths = [...assets];
let assetIndex=0;
await Promise.all(Array.from({length:3}, async()=> {
  while(assetIndex<assetPaths.length) {
    const path=assetPaths[assetIndex++];
    try {
      const response=await get(path);
      if(response.status!==200) failures.push({path,test:'image-status',value:response.status});
      await response.body?.cancel();
    } catch(error) { failures.push({path,test:'image-fetch',error:error.message}); }
  }
}));
const result={base,canonical,pages:paths.length,questions,images:assetPaths.length,failures,answerDifferences};
console.log(JSON.stringify(result,null,2));
if(failures.length || answerDifferences.length) process.exitCode=1;
