export type LayoutType = 'vertical' | 'horizontal';

export interface CarProps {
  id: number;
  image: string;
  model: string;
  version: string;
  details: string[];
  price: string;
  year: string;
  mileage: string;
  location: string;
}

export type FeatureFlag = {
  id: number;
  name: string;
  status: number;
};