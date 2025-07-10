import type { MenuItem } from "../types/MenuItem";

export interface AddComponent {
  handleItemAdd: (itemName: string) => Promise<void>;
}
