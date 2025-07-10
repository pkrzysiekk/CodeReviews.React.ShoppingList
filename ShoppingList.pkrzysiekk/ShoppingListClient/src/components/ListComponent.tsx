import React, { useEffect, useState } from "react";
import type { MenuItem } from "../types/MenuItem";
import type { MenuItemList } from "../interfaces/MenuItemList";
import type { AddComponent } from "../interfaces/AddComponent";

function ListComponent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuPageNumber, setMenuPageNumber] = useState<number>(1);

  const fetchMenuItems = async (pageNumber: number, pageSize: number) => {
    const url = `http://localhost:5217/ShoppingList?pagenumber=${pageNumber}&pagesize=${pageSize}`;
    try {
      const data = await fetch(url);
      const menu = await data.json();
      setMenuItems(menu);
      console.log(menu);
    } catch (err) {
      alert("Couldn't fetch data, check the connection or try again later");
    }
  };

  const deleteMenuItem = async (menuId: number) => {
    const url = `http://localhost:5217/ShoppingList/${menuId}`;
    await fetch(url, { method: "DELETE" });
  };

  const createMenuItem = async (menuItem: MenuItem) => {
    const url = `http://localhost:5217/ShoppingList`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuItem),
    });
  };

  const updateMenuItem = async (menuItem: MenuItem) => {
    const url = `http://localhost:5217/ShoppingList`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuItem),
    });
  };

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  useEffect(() => {
    fetchMenuItems(1, 20);
  }, []);

  return (
    <>
      <MenuItemsList
        menuItems={menuItems}
        addItem={createMenuItem}
        deleteItem={deleteMenuItem}
        updateItem={updateMenuItem}
        getPagedItems={fetchMenuItems}
      />
    </>
  );
}

function MenuItemsList({
  menuItems,
  addItem,
  deleteItem,
  updateItem,
  getPagedItems,
}: MenuItemList) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 20;

  const handleItemAdd = async (itemName: string) => {
    const item: MenuItem = { name: itemName, isChecked: false };
    await addItem(item);
    getPagedItems(pageNumber, pageSize);
  };

  const handleItemStateChange = async (item: MenuItem) => {
    item.isChecked = !item.isChecked;
    await updateItem(item);
    getPagedItems(pageNumber, pageSize);
  };

  const handleItemDelete = async (itemId: number) => {
    await deleteItem(itemId);
    getPagedItems(pageNumber, pageSize);
  };

  const items = menuItems.map((item) => (
    <li
      onClick={() => {
        handleItemStateChange(item);
      }}
      className={item.isChecked ? "checked" : "unchecked"}
      key={item.id}
    >
      {item.name}
      <button
        onClick={() => {
          handleItemDelete(item.id!);
        }}
        className="delete-btn"
      >
        X
      </button>
    </li>
  ));

  return (
    <>
      <ul>{items}</ul>
      <AddComponent handleItemAdd={handleItemAdd} />
    </>
  );
}
function AddComponent({ handleItemAdd }: AddComponent) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("input") as HTMLInputElement;
    const itemName = input.value.trim();

    if (itemName) {
      handleItemAdd(itemName);
      input.value = "";
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="input" />
        </label>
        <button type="submit">Add new item</button>
      </form>
    </>
  );
}
export default ListComponent;
