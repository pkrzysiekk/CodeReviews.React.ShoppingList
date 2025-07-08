using ShoppingListAPI.Models;

namespace ShoppingListAPI.Service;

public interface IShoppingService
{
   public Task<ShoppingItem?> GetItem(int id);
   public Task AddItem(ShoppingItem item);
   public Task DeleteItem(ShoppingItem item);
   public Task UpdateItem(ShoppingItem item);
   public Task<IEnumerable<ShoppingItem>> GetPagedItems(int pageNumber, int pageSize);
}