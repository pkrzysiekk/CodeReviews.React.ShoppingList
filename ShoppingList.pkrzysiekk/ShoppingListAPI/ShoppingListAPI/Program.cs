using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;
using ShoppingListAPI.Repository;
using ShoppingListAPI.Service;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ShoppingContext>(options =>
    options.UseSqlite("Data Source=ShoppingList.db")
);
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
app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
