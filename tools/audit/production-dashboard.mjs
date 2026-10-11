import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dir,'../..');
const folder=path.join(root,'reports/production-2026-10-09');
const read=(name,fallback={})=>fs.existsSync(path.join(folder,name))?JSON.parse(fs.readFileSync(path.join(folder,name),'utf8')):fallback;
const inventory=read('docs-inventory.json',{documents:[],summary:{}});
const suite=read('suite.json',{results:[]});
const closure=read('production-closure.json',{gaps:[]});
const e=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const files=fs.readdirSync(folder,{recursive:true}).map(n=>String(n).replaceAll('\\','/')).filter(n=>/\.(svg|csv|json|md)$/.test(n)&&!n.startsWith('docs-inventory')).sort();
const coverage=read('content-coverage.json',{documents:[]});
const reviewed=new Map(coverage.documents.map(d=>[d.path,d.sha256]));
const rows=inventory.documents.map(d=>`<tr><td>${e(d.title)}</td><td>${e(d.origin)}</td><td>${e(reviewed.has(d.path)&&reviewed.get(d.path)===d.remoteSha256?'SOURCE REVIEW · remote full read; local separate':d.contentReview)}</td><td><code>${e(d.path)}</code></td></tr>`).join('');
const cards=suite.results.map(r=>`<article><h3>${e(r.name)}</h3><strong class="${r.status==='FAIL'?'fail':'model'}">${e(r.status)}</strong><p><a href="${e(r.log)}">Xem kết quả test</a></p></article>`).join('');
const gallery=files.filter(n=>n.endsWith('.svg')).map(n=>`<figure><img src="${e(n)}" alt="${e(n)}"><figcaption>${e(n)} · biểu đồ mô hình, không phải ảnh gameplay</figcaption></figure>`).join('');
const closureTable=`<h2>Sửa GAP · nguồn mới ${e(closure.latest?.slice(0,12))}</h2><p>Đã sửa docs/data/tool theo từng ID. Các ca engine và quyết định chưa có bằng chứng giữ mở; không đổi chữ thành PASS.</p><div class="scroll"><table><thead><tr><th>ID</th><th>Kết quả sửa</th><th>Còn cần bằng chứng</th></tr></thead><tbody>${closure.gaps.map(g=>`<tr><td>${e(g.id)}</td><td><a href="${e(g.artifact)}">${e(g.status)}</a></td><td>${e(g.remaining)}</td></tr>`).join('')}</tbody></table></div>`;
fs.writeFileSync(path.join(folder,'index.html'),`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cổ Linh · Production workbench</title>
<style>:root{font:16px/1.5 system-ui;color:#e6efe9;background:#0c1718}body{max-width:1200px;margin:auto;padding:28px}h1,h2{color:#cbe7df}p{max-width:90ch}a{color:#84dedb}code{font-size:12px;overflow-wrap:anywhere}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}article,figure{background:#17292a;border:1px solid #30504d;border-radius:12px;padding:16px;margin:0 0 16px}.model{color:#97dfb4}.fail{color:#ffb09f}input{padding:12px;border-radius:6px;width:min(95%,600px)}table{border-collapse:collapse;width:100%;font-size:14px}th,td{padding:10px;text-align:left;border-bottom:1px solid #30504d}td:last-child{max-width:330px}.scroll{overflow:auto}img{width:100%;background:#fff}.notice{border-left:4px solid #e4ba71;padding:12px;background:#263132}</style>
<header><p>COLINH: Gods Unremembered · 09/10/2026</p><h1>Bàn kiểm sản xuất</h1><p>Item · luật trận · Mạch Đăng · Bible. Dữ liệu, test, trace và biểu đồ đặt cùng nhau để đội sản xuất kiểm lại.</p><p class="notice">PASS_MODEL là test mô hình. Không phải PASS trong engine, điện thoại thật hoặc chứng nhận cân bằng toàn game. Những số đề xuất chưa thành luật được duyệt.</p></header>
<h2>1. Bằng chứng tự chạy</h2><section class="cards">${cards}</section>
${closureTable}
<h2>2. Sơ đồ và kết quả mô phỏng</h2>${gallery||'<p>Chưa có biểu đồ tại lần dựng dashboard này.</p>'}
<h2>3. File dữ liệu và báo cáo</h2><ul>${files.map(n=>`<li><a href="${e(n)}">${e(n)}</a></li>`).join('')}</ul>
<h2>4. Kiểm kê tài liệu</h2><p>${e(inventory.summary.documents)} bản đích; ${e(inventory.summary.different)} bản local khác remote. Kiểm kê máy không thay thẩm định nội dung. Nguồn ghim: <code>${e(inventory.commit)}</code>.</p><input id="search" placeholder="Tìm theo tên tài liệu, trạng thái hoặc đường dẫn" aria-label="Tìm tài liệu"><div class="scroll"><table><thead><tr><th>Tài liệu</th><th>Nguồn</th><th>Mức kiểm</th><th>Đường dẫn</th></tr></thead><tbody id="rows">${rows}</tbody></table></div><p><a href="docs-inventory.json">Coverage JSON + hash</a> · <a href="docs-inventory.csv">Coverage CSV</a> · <a href="docs-link-findings.csv">Link thiếu</a></p>
<script>const rows=[...document.querySelectorAll('#rows tr')];document.querySelector('#search').addEventListener('input',e=>{const q=e.target.value.toLocaleLowerCase();rows.forEach(r=>r.hidden=!r.textContent.toLocaleLowerCase().includes(q));});</script></html>`);
process.stdout.write('Dashboard written: reports/production-2026-10-09/index.html\n');
