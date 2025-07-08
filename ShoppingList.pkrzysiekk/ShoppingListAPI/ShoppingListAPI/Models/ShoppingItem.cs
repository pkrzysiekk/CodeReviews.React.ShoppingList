namespace ShoppingListAPI.Models;

public class ShoppingItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool isChecked { get; set; } =  false; 
   
}