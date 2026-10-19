import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist'),origin='https://morphlet.nfks.co.in';
const pages=['index.html','features.html','download.html','releases.html'];
const titles=new Set(),descriptions=new Set();
for(const name of pages){
 const html=await readFile(resolve(root,name),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${name}: one primary heading`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],description=html.match(/name="description" content="([^"]+)"/)?.[1];
 assert(title&&description,`${name}: title and description`);assert(!titles.has(title)&&!descriptions.has(description),'Unique page metadata');titles.add(title);descriptions.add(description);
 const canonical=origin+(name==='index.html'?'/':'/'+name);
 assert(html.includes(`rel="canonical" href="${canonical}"`),`${name}: canonical URL`);
 assert(html.includes('Mayank Kumar Jha'),`${name}: developer credit`);
 assert(html.includes('name="twitter:card"')&&html.includes('property="og:image"'),`${name}: social metadata`);
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))assert(JSON.parse(json)['@graph'].length>0,`${name}: valid structured data`);
 for(const [,attr]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:|#)/.test(attr))continue;
  const [file,hash]=attr.split('#'),local=resolve(root,file.split('?')[0]);
  assert((await stat(local)).isFile(),`${name}: missing ${file}`);
  if(hash&&file.endsWith('.html'))assert((await readFile(local,'utf8')).includes(`id="${hash}"`),`${name}: missing anchor ${attr}`);
 }
}
assert((await readFile(resolve(root,'robots.txt'),'utf8')).includes(origin+'/sitemap.xml'));
assert.equal((await readFile(resolve(root,'CNAME'),'utf8')).trim(),'morphlet.nfks.co.in');
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');for(const page of pages)assert(sitemap.includes(origin+(page==='index.html'?'/':'/'+page)));
assert(!(await readdir(root)).some(f=>/^\.env/.test(f)));
console.log('Site checks passed: metadata, structured data, links, assets, sitemap and domain.');
