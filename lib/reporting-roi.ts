export type ReportingInputs = { before: number; after: number; hourly: number; recurring: number; setup: number };
export function reportingRoi(input: ReportingInputs) {
  if (Object.values(input).some(value => !Number.isFinite(value) || value < 0)) return null;
  const hours = input.before - input.after;
  const capacity = hours * input.hourly;
  const net = capacity - input.recurring;
  const months = net > 0 ? input.setup / net : null;
  if (![hours, capacity, net, ...(months === null ? [] : [months])].every(Number.isFinite)) return null;
  return { hours, capacity, net, months };
}
