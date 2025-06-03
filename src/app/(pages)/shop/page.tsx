import ShopClient from './ShopClient';
import JsonLd from '@/components/JsonLd';
import { shopSchema, shopProductListSchema } from './schema';
import { metadata } from './metadata';

export { metadata };

export default function Page() {
  return (
    <>
      <JsonLd data={shopSchema} />
      <JsonLd data={shopProductListSchema} />
      <ShopClient />
    </>
  );
}