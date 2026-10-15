import { editorialWebPageSchema as baseSchema } from './editorial';
import { primaryThumbnailSchema } from '../thumbnails';

/** Server callers enrich images; shared client-side author helpers stay lightweight. */
export function editorialWebPageSchema(options: Parameters<typeof baseSchema>[0]) {
  return {...baseSchema(options),...primaryThumbnailSchema(options.path)};
}
