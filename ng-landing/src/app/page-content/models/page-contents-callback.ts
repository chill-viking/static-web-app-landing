import { Observable } from 'rxjs';
import { PageContents } from '@shared/models';

export type PageContentsCallback = (slug: string) => Observable<PageContents>;
