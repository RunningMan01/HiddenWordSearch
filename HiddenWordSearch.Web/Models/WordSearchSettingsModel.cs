namespace HiddenWordSearch.Web.Models
{
    public class WordSearchSettingsModel
    { 
        public string Title { get; set; } = string.Empty;
        public int Rows { get; set; }
        public int Columns { get; set; } // Cols
        public string Words { get; set; } = string.Empty;
    }
}
