using Microsoft.EntityFrameworkCore.Diagnostics;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;

namespace ShoppingListAPI.Repository;

public class ShoppingRepository : IRepository<ShoppingItem>
{
    private readonly ShoppingContext  _context;
    
    public ShoppingRepository(ShoppingContext context)
    {
        _context = context;
    }
    public async Task<ShoppingItem?> GetById(int id)
    {
        return await  _context.ShoppingItems.FindAsync(id);
    }

    public  IQueryable<ShoppingItem> GetAll()
    {
        return  _context.ShoppingItems.AsQueryable();
    }

    public async Task Add(ShoppingItem item)
    {
        await _context.ShoppingItems.AddAsync(item);
        await SaveChanges();
    }

    public async Task Update(ShoppingItem item)
    {
        var itemToUpdate = await GetById(item.Id);
        if (itemToUpdate != null)
        {
            itemToUpdate.Name = item.Name;
            itemToUpdate.isChecked = item.isChecked;
            
            await SaveChanges();
        }

    }

    public async Task Delete(ShoppingItem item)
    {
        var itemToDelete = await GetById(item.Id);
        if (itemToDelete != null)
        {
            _context.ShoppingItems.Remove(itemToDelete);
            await SaveChanges();
        }
    }

    public async Task SaveChanges()
    {
        await _context.SaveChangesAsync();
    }
}