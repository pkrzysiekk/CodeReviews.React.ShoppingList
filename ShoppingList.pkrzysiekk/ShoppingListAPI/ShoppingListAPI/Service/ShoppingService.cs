using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Models;
using ShoppingListAPI.Repository;

namespace ShoppingListAPI.Service;

public class ShoppingService : IShoppingService
{
    private readonly IRepository<ShoppingItem> _repository;

    public ShoppingService(IRepository<ShoppingItem> repository)
    {
        _repository = repository;
    }

    public async Task<ShoppingItem?> GetItem(int id)
    {
       var item = await _repository.GetById(id);
        return item;
    }

    public async Task AddItem(ShoppingItem item)
    {
        await _repository.Add(item);
    }

    public async Task DeleteItem(ShoppingItem item)
    {
        await _repository.Delete(item);
    }

    public async Task UpdateItem(ShoppingItem item)
    {
        await _repository.Update(item);
    }

    public async Task<IEnumerable<ShoppingItem>> GetPagedItems(int pageNumber, int pageSize)
    {
        var pagedItems = await _repository.GetAll()
            .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return pagedItems;
    }
}