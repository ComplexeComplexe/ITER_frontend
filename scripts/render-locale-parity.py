#!/usr/bin/env python3
"""Render the preparation package as an offline, searchable reading document."""
import csv,html,json,re,sys
from pathlib import Path

def inline(text):
 text=html.escape(text)
 text=re.sub(r'\[([^\]]+)\]\((https://[^ )]+)\)',r'<a href="\2">\1</a>',text)
 text=re.sub(r'`([^`]+)`',r'<code>\1</code>',text)
 return re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',text)

def markdown(source):
 lines=source.splitlines();out=[];i=0
 while i<len(lines):
  line=lines[i].strip()
  if not line:i+=1;continue
  if line.startswith('#'):
   level=len(line)-len(line.lstrip('#'));out.append(f'<h{level}>{inline(line[level:].strip())}</h{level}>');i+=1;continue
  if line.startswith('|'):
   cells=[]
   while i<len(lines) and lines[i].strip().startswith('|'):
    row=[c.strip() for c in lines[i].strip().strip('|').split('|')]
    if not all(re.fullmatch(r'[:\- ]+',c) for c in row):cells.append(row)
    i+=1
   out.append('<div class="tablewrap"><table><thead><tr>'+''.join('<th>'+inline(c)+'</th>' for c in cells[0])+'</tr></thead><tbody>')
   out.extend('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in cells[1:]);out.append('</tbody></table></div>');continue
  if line.startswith('- '):
   out.append('<ul>')
   while i<len(lines) and lines[i].strip().startswith('- '):out.append('<li>'+inline(lines[i].strip()[2:])+'</li>');i+=1
   out.append('</ul>');continue
  if re.match(r'\d+\. ',line):
   out.append('<ol>')
   while i<len(lines) and re.match(r'\d+\. ',lines[i].strip()):out.append('<li>'+inline(re.sub(r'^\d+\. ','',lines[i].strip()))+'</li>');i+=1
   out.append('</ol>');continue
  para=[line];i+=1
  while i<len(lines) and lines[i].strip() and not re.match(r'^(#|\||- |\d+\. )',lines[i].strip()):para.append(lines[i].strip());i+=1
  out.append('<p>'+inline(' '.join(para))+'</p>')
 return '\n'.join(out)

repo=Path(__file__).resolve().parents[1];doc=repo/'docs/locale-parity'
output=Path(sys.argv[1]);output.parent.mkdir(parents=True,exist_ok=True)
with (doc/'Matrice-complete-FR-EN-ES.csv').open(encoding='utf-8-sig',newline='') as f:matrix=list(csv.DictReader(f,delimiter=';'))
with (doc/'Tickets.csv').open(encoding='utf-8-sig',newline='') as f:tickets=list(csv.DictReader(f,delimiter=';'))
rows=[]
for r in matrix:
 cells=[r['FR'],r['famille'],r['EN_cible'],r['EN_action'],r['ES_cible'],r['ES_action']]
 rows.append('<tr>'+''.join('<td>'+html.escape(str(c))+'</td>' for c in cells)+'</tr>')
ticket_rows=''.join('<tr>'+''.join('<td>'+inline(r[c])+'</td>' for c in ['Ticket','Priorité','Lot','Sujet','Travaux','Critères'])+'</tr>' for r in tickets)
body=markdown((doc/'Brief-implementation.md').read_text())
result='''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Iter Advisors | Préparation de la parité FR EN ES</title><style>
:root{--ink:#20202b;--purple:#4320c5;--line:#e0dfe8}*{box-sizing:border-box}body{margin:0;background:#f7f7fa;color:var(--ink);font:16px/1.65 system-ui,sans-serif}header{background:var(--ink);color:white;padding:48px max(20px,calc((100vw - 1184px)/2))}header h1{font-size:clamp(30px,4vw,46px);line-height:1.15;margin:12px 0}header p{max-width:850px;color:#ddd}header a{color:#d8ef65}.eyebrow{text-transform:uppercase;letter-spacing:.1em;font-size:12px;font-weight:700}.wrap{max-width:1224px;padding:32px 20px;margin:auto}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.metric,section{background:white;border:1px solid var(--line);border-radius:14px;padding:24px}.metric strong{display:block;color:var(--purple);font-size:34px;line-height:1.2}.metric span{font-size:14px}section{margin-top:24px}h2{font-size:25px;margin:36px 0 12px}h3{font-size:20px;margin:28px 0 10px}h1{line-height:1.2}p{max-width:1000px}a{color:var(--purple);text-underline-offset:3px}code{font-size:.87em;background:#f0edf9;border-radius:4px;padding:2px 4px;overflow-wrap:anywhere}nav{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}nav a{background:white;border:1px solid var(--line);padding:9px 15px;border-radius:8px;font-weight:600}.note{background:#f0edf9;border-left:4px solid var(--purple);padding:16px 20px}.tablewrap{overflow:auto;max-width:100%;border:1px solid var(--line);border-radius:8px;margin:20px 0}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;min-width:120px}th{background:#f0edf9}td{overflow-wrap:anywhere}#inventory td{min-width:170px;max-width:330px}label{display:block;font-weight:600}input{width:100%;max-width:650px;border:1px solid #999;border-radius:8px;min-height:48px;padding:12px;font:inherit}button,a,input:focus-visible{outline-offset:4px}footer{padding:32px 20px;text-align:center;color:#5b5b6b}@media(max-width:700px){.metrics{grid-template-columns:repeat(2,1fr)}section{padding:18px}.wrap{padding:20px 12px}}@media print{body{background:white}nav,input,label,.noprint{display:none}section{border:0;padding:0}.tablewrap{overflow:visible}header{padding:20px;color:var(--ink);background:white}header p{color:var(--ink)}a{color:var(--ink)}}
</style></head><body><header><div class="eyebrow">Iter Advisors · Préparation · 2 octobre 2026</div><h1>Un même site dans trois langues</h1><p>Design et gabarits partagés, contenus intégralement traduits, navigation et URL cohérentes. Le dossier couvre le site éditorial et les parcours hors sitemap.</p><p><strong>Statut :</strong> modifications préparées. Traductions à rédiger et relire; aucune nouvelle page ni redirection publiée par ce dossier.</p></header><main class="wrap"><div class="metrics"><div class="metric"><strong>146</strong><span>références françaises couvertes</span></div><div class="metric"><strong>192</strong><span>nouvelles traductions EN + ES</span></div><div class="metric"><strong>100</strong><span>versions traduites à aligner</span></div><div class="metric"><strong>17</strong><span>tickets avec critères de livraison</span></div></div><nav><a href="#brief">Brief complet</a><a href="#tickets">Tickets</a><a href="#inventory">Toutes les pages</a><a href="Matrice-complete-FR-EN-ES.csv">Télécharger la matrice</a></nav><div class="note"><strong>Correction prioritaire :</strong> le design unifié est aujourd'hui limité au layout FR et aux sélecteurs CSS français. Le partage du style précède la migration des gabarits. Le pilier passe de 18 blocs EN et 15 blocs ES à la structure FR de huit blocs, en conservant les informations utiles et le périmètre réel.</div><section id="brief">'''+body+'''</section><section id="tickets"><h2>Les 17 tickets de développement et de contenu</h2><p>Les responsables sont proposés. Chaque famille publie ses traductions et ses routes ensemble, après recette.</p><div class="tablewrap"><table><thead><tr><th>Ticket</th><th>Priorité</th><th>Lot</th><th>Sujet</th><th>Travaux</th><th>Critères</th></tr></thead><tbody>'''+ticket_rows+'''</tbody></table></div></section><section id="inventory"><h2>Les 146 pages et leurs équivalents</h2><p>Les URL EN/ES sont des cibles proposées. « translate-new » signifie contenu à créer; « align-existing » signifie version existante à revoir. Les dix parcours hors sitemap sont inclus sans modifier leur indexabilité.</p><label for="filter">Rechercher une page, une famille ou un besoin</label><input id="filter" type="search" placeholder="Ex. ia-finance, comptabilite, pricing…"><p id="counter">146 références affichées</p><div class="tablewrap"><table id="pages"><thead><tr><th>Référence FR</th><th>Famille</th><th>Cible EN</th><th>Action EN</th><th>Cible ES</th><th>Action ES</th></tr></thead><tbody>'''+''.join(rows)+'''</tbody></table></div></section></main><footer>Référence éditoriale : production du lot 163. Contrôle des 22 parcours supplémentaires en HTTP le 2 octobre 2026. Aucun gain de classement ou de visibilité IA n'est affirmé.</footer><script>const q=document.getElementById('filter'),rows=[...document.querySelectorAll('#pages tbody tr')];q.addEventListener('input',()=>{let n=0;for(const r of rows){r.hidden=!r.textContent.toLowerCase().includes(q.value.toLowerCase());if(!r.hidden)n++}document.getElementById('counter').textContent=n+' références affichées'});</script></body></html>'''
output.write_text(result)
print(json.dumps({'output':str(output),'bytes':output.stat().st_size,'inventoryRows':len(matrix),'tickets':len(tickets)},ensure_ascii=False))
