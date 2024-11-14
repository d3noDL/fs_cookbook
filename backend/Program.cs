using backend.Classes;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();


app.UseStaticFiles();
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    //.WithOrigins("https://localhost:44351")); // Allow only this origin can also have multiple origins seperated with comma
    .SetIsOriginAllowed(origin => true));// Allow any origin  

var UsersDB = File.ReadAllText("../database/users.json");
var RecipesDB = File.ReadAllText("../database/recipes.json");

var users = JsonConvert.DeserializeObject<List<User>>(UsersDB);
var recipes = JsonConvert.DeserializeObject<List<Recipe>>(RecipesDB);

app.MapGet("/users", () => users);
app.MapGet("/recipes", () => recipes);

app.Run("http://192.168.50.2:1234/");
