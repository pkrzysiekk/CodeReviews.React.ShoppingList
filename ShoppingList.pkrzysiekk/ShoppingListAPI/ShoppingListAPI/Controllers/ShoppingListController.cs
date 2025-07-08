using Microsoft.AspNetCore.Mvc;
using ShoppingListAPI.Models;
using ShoppingListAPI.Service;

namespace ShoppingListAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ShoppingListController : ControllerBase
{
    private readonly IShoppingService _service;
    public ShoppingListController(IShoppingService service)
    {
       _service = service; 
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetPagedItems([FromQuery] int pageNumber,
        [FromQuery] int pageSize)
    {
        var list = await _service.GetPagedItems( pageNumber,pageSize);
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ShoppingItem>> GetItem(int id)
    {
        var item = await _service.GetItem(id);
        if (item == null)
            return NotFound();
        return Ok(item);
    }
    [HttpPost]
    public async Task<ActionResult<ShoppingItem>> CreateItem([FromBody] ShoppingItem item)
    {
        await _service.AddItem(item);
        return Created(nameof(GetItem), new { id = item.Id });
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingItem>> UpdateItem([FromBody] ShoppingItem item)
    {
        await _service.UpdateItem(item);
        return Created(nameof(GetItem), new { id = item.Id });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ShoppingItem>> DeleteItem(int id)
    {
        var item = await _service.GetItem(id);
        if (item == null)
            return NotFound();
        await _service.DeleteItem(item);
        return Ok("Item deleted");
        
    }
}