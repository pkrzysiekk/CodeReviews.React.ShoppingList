import type { MenuItem } from "../types/menuItem";

export interface MenuItemList {
  menuItems: MenuItem[];
  addItem: void;
  deleteItem: void;
  updateItem: void;
  getPagedItems: void;
}
