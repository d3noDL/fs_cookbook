using backend.Classes;
using Microsoft.Data.Sqlite;
using Newtonsoft.Json;

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

var apiKey = File.ReadAllText("../database/api.key");
var databaseConnection = new SqliteConnection("database.db");



app.Use(async (context, next) =>
{
    if (!context.Request.Headers.TryGetValue("Authorization", out var extractedApiKey) || extractedApiKey != apiKey)
    {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("API Key is missing.");
        return;
    }

    await next();
});

var UsersDB = File.ReadAllText("../database/users.json");
var RecipesDB = File.ReadAllText("../database/recipes.json");

var users = JsonConvert.DeserializeObject<List<User>>(UsersDB);
var recipes = JsonConvert.DeserializeObject<List<Recipe>>(RecipesDB);

app.MapGet("/users", () => users);
app.MapGet("/recipes", () => recipes);

app.MapPost("/addrecipe", async (HttpRequest request) =>
{
    using var reader = new StreamReader(request.Body);
    var requestBody = await reader.ReadToEndAsync();
    
    recipes.Add(JsonConvert.DeserializeObject<Recipe>(requestBody));
    File.WriteAllText("../database/recipes.json", JsonConvert.SerializeObject(recipes));
    
});

app.Run("http://192.168.50.2:1234/");
