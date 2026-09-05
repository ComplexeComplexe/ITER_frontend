import React from "react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
vi.mock("@/components/PageLayout", () => ({default:({children}:{children:React.ReactNode})=><>{children}</>}));
import LeadPage from "../LeadPage";
const events=()=>(window.dataLayer||[]).filter((x)=>x && typeof x==='object' && (x as Record<string,unknown>).event==='lead_form_submitted');
async function fillQuiz(){
  fireEvent.click(screen.getAllByRole('button',{name:'Obtenir mon diagnostic gratuit'})[0]);
  for (const name of ['Pre-Seed / Seed','Préparer une levée de fonds','1 – 10','Dès que possible']) fireEvent.click(await screen.findByRole('button',{name,exact:true}));
  await screen.findByRole('button',{name:'Voir mes résultats'});
  const form=document.querySelector('form')!;
  for(const [name,value] of Object.entries({firstName:'Test',lastName:'Example',email:'test@example.com',company:'Example'})){
    const input=form.querySelector(`[name="${name}"]`);
    if(input)fireEvent.change(input,{target:{value}});
  }
  fireEvent.submit(form);
}
describe('Diagnostic lead delivery',()=>{
 beforeEach(()=>{vi.stubGlobal("IntersectionObserver",class {observe(){} unobserve(){} disconnect(){}});window.dataLayer=[];window.iterConsent={necessary:true,analytics:true,marketing:true};Element.prototype.scrollIntoView=vi.fn();vi.spyOn(console,'error').mockImplementation(()=>{});});
 afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
 it.each([{ok:false,json:async()=>({success:false})},{ok:true,json:async()=>({success:false})}])('does not show success or emit a conversion when delivery fails (%j)',async(response)=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue(response));render(<LeadPage locale="fr"/>);await fillQuiz();
  expect(await screen.findByRole('alert')).toHaveTextContent('L’envoi a échoué');expect(events()).toHaveLength(0);
 });
 it('emits exactly one event after confirmed delivery',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({success:true})}));render(<LeadPage locale="fr"/>);await fillQuiz();
  await waitFor(()=>expect(events()).toHaveLength(1));expect(events()[0]).toMatchObject({form_id:'diagnostic'});
 });
});
