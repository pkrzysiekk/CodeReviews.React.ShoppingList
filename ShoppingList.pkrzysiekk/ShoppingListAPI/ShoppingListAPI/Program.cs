using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;
using ShoppingListAPI.Repository;
using ShoppingListAPI.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ShoppingContext>(options=>options.UseSqlite("Data Source=ShoppingList.db"));
builder.Services.AddScoped<IRepository<ShoppingItem>, ShoppingRepository>();
builder.Services.AddScoped<IShoppingService, ShoppingService>();



var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ShoppingContext>();
    db.Database.EnsureCreated();
    if (!db.ShoppingItems.Any())
        db.Initialize();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();