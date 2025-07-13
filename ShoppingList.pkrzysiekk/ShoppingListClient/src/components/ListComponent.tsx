import React, { useEffect, useState } from "react";
import type { MenuItem } from "../types/MenuItem";
import type { MenuItemList } from "../interfaces/MenuItemList";
import type { AddComponent } from "../interfaces/AddComponent";
import type { PageButtonsProps } from "../interfaces/PageButtonsProps";

function ListComponent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const ENDPOINT_URL = "http://localhost:5217/ShoppingList";

  const fetchMenuItems = async (pageNumber: number, pageSize: number) => {
    const url = `${ENDPOINT_URL}?pagenumber=${pageNumber}&pagesize=${pageSize}`;
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
    const url = `${ENDPOINT_URL}/${menuId}`;
    try {
      await fetch(url, { method: "DELETE" });
    } catch (err) {
      alert("Couldn't delete item, check the connection or try again later");
    }
  };

  const createMenuItem = async (menuItem: MenuItem) => {
    const url = ENDPOINT_URL;
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItem),
      });
    } catch (err) {
      alert("Couldn't create item, check the connection or try again later");
    }
  };

  const updateMenuItem = async (menuItem: MenuItem) => {
    const url = ENDPOINT_URL;
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItem),
      });
    } catch (err) {
      alert("Couldn't update item, check the connection or try again later");
    }
  };

  return (
    <div className="main-list">
      <MenuItemsList
        menuItems={menuItems}
        addItem={createMenuItem}
        deleteItem={deleteMenuItem}
        updateItem={updateMenuItem}
        getPagedItems={fetchMenuItems}
      />
    </div>
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
  const pageSize = 12;

  const handlePageNumberDecrement = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  const handlePageNumberIncrement = () => {
    if (menuItems.length === pageSize) setPageNumber((prev) => prev + 1);
  };

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

  useEffect(() => {
    getPagedItems(pageNumber, pageSize);
  }, [pageNumber]);

  const items = menuItems.map((item) => (
    <li
      onClick={() => {
        handleItemStateChange(item);
      }}
      key={item.id}
    >
      <button
        onClick={() => {
          handleItemDelete(item.id!);
        }}
        className="delete-btn"
      >
        X
      </button>
      <p className={item.isChecked ? "checked" : "unchecked"}>{item.name}</p>
    </li>
  ));

  return (
    <div className="list-container">
      <div className="list-div">
        <ol>{items}</ol>
      </div>
      <div className="form-container">
        <PageButtons
          decrementPageNumber={handlePageNumberDecrement}
          incrementPageNumber={handlePageNumberIncrement}
        />
        <AddComponent handleItemAdd={handleItemAdd} />
      </div>
    </div>
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
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="input" />
        </label>
        <button type="submit">Add new item</button>
      </form>
    </div>
  );
}
function PageButtons({
  decrementPageNumber,
  incrementPageNumber,
}: PageButtonsProps) {
  return (
    <div className="page-buttons">
      <button onClick={decrementPageNumber} className="prev-page-btn">
        &lt;
      </button>
      <button onClick={incrementPageNumber} className="next-page-btn">
        &gt;
      </button>
    </div>
  );
}
export default ListComponent;
