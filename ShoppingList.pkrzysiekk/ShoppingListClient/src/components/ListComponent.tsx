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
  useEffect(() => {
    fetchMenuItems(1, 20);
  }, []);
  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);
  return <></>;
}

export default ListComponent;
