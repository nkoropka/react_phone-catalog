import { Product, ProductDetail } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>(`${BASE_URL}api/products.json`);
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetail> => {
  const [phones, tablets, accessories] = await Promise.all([
    request<ProductDetail[]>(`${BASE_URL}api/phones.json`).catch(() => []),
    request<ProductDetail[]>(`${BASE_URL}api/tablets.json`).catch(() => []),
    request<ProductDetail[]>(`${BASE_URL}api/accessories.json`).catch(() => []),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  const foundDetail = allDetails.find(item => item.id === productId);

  if (!foundDetail) {
    throw new Error(`Details for product "${productId}" not found`);
  }

  return foundDetail;
};
