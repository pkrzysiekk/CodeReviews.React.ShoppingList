using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Models;

namespace ShoppingListAPI.Data;

public class ShoppingContext  : DbContext
{
    public DbSet<ShoppingItem>  ShoppingItems { get; set; }
    public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options)
    {
    }

    

    public void Initialize()
    {
        Database.EnsureCreated();
        var items = new List<ShoppingItem>();
        items.Add(new ShoppingItem {  Name = "Eggs" });
        items.Add(new ShoppingItem { Name = "Pepperoni" });
        items.Add(new ShoppingItem { Name = "Pepper" });
        items.Add(new ShoppingItem { Name = "Chocolate" });
        this.ShoppingItems.AddRange(items);
        this.SaveChanges();
    }
    
}