export interface Product {
images: any;
category: any;
discountPercentage: number|undefined;
brand: any;
warrantyInformation: any;
shippingInformation: any;
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
    description: string;
    quantity: number;
    stock: number;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
  }
  