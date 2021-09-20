export interface ItemInt {
  id: number;
  isActive: boolean;
  balance: string;
  name: string;
  email: string;
  parentId: number;
  items?: Array<ItemInt>;
}