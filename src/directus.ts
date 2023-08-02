import { createDirectus } from '@directus/sdk';
const directusUrl: any = import.meta.env.VITE_REACT_APP_DIRECTUS_URL

export const directusClient = createDirectus(directusUrl);