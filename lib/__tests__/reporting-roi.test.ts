import { describe, it, expect } from "vitest";
import { reportingRoi } from "../reporting-roi";
import { getGlossaryEntryContent } from "../content/glossary-entries";
import { getDafSubContent } from "../content/daf-sub";
describe("Reporting economics and approved offer", () => {
  it("includes recurring costs and uses net capacity for payback", () => {
    expect(reportingRoi({before:20,after:8,hourly:50,recurring:250,setup:3000})).toEqual({hours:12,capacity:600,net:350,months:3000/350});
  });
  it("does not promise payback for zero or negative net gain", () => {
    for (const after of [15,20,30]) expect(reportingRoi({before:20,after,hourly:50,recurring:250,setup:3000})?.months).toBeNull();
  });
  it("rejects invalid assumptions", () => {
    for (const before of [-1,NaN,Infinity,Number.MAX_VALUE]) expect(reportingRoi({before,after:8,hourly:50,recurring:250,setup:3000})).toBeNull();
  });
  it("links definitions to the central price page without promising ROI", () => {
    for (const slug of ['fractional-cfo']) {
      const text=JSON.stringify(getGlossaryEntryContent('fr',slug)).replace(/[\u00a0\u202f ]/g,'');
      expect(text).toContain("/daf-externalise/tarifs");
      expect(text).not.toContain('ROIduDAFexternaliséestgénéralementpositif');
      expect(text).not.toContain('2000€/mois');
    }
    expect(getGlossaryEntryContent('fr','daf')).toBeUndefined();
    const role = JSON.stringify(getDafSubContent('fr','metier'));
    expect(role).toContain('/daf-externalise/tarifs');
    expect(role).not.toContain('/ressources/glossaire/daf');

  });
});
