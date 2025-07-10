import type { MenuItem } from "../types/MenuItem";

export interface MenuItemList {
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => Promise<void>;
  deleteItem: (menuId: number) => Promise<void>;
  updateItem: (item: MenuItem) => Promise<void>;
  getPagedItems: (pageNumber: number, pageSize: number) => Promise<void>;
}
