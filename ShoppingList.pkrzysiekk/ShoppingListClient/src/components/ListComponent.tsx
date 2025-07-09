import { useEffect, useState } from "react";
import type { MenuItem } from "../types/menuItem";

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

  useEffect(() => {
    fetchMenuItems(1, 20);
    const menuItem: MenuItem = {
      Name: "eyeyeyye",
      IsChecked: true,
    };
    createMenuItem(menuItem);
  }, []);
  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);
  return <></>;
}

export default ListComponent;
