/** Reactivate only after a written logo agreement is archived in Iter check.
 * The client case permission and the logo permission are separate.
 * List names exactly as used by the approved logo inventory. */
export const APPROVED_CLIENT_LOGO_NAMES: readonly string[] = [];
export const isClientLogoApproved = (name: string) => APPROVED_CLIENT_LOGO_NAMES.includes(name);
