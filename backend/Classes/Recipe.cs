namespace backend.Classes;

public class Recipe
{
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string Description { get; set; }
    public List<string> Ingredients { get; set; }
    public List<string> Steps { get; set; }
}