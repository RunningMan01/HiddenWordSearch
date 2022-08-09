namespace HiddenWordSearch.Web.Models
{
    public class WordSearchSettingsModel
    { 

        public string Title { get; set; } = string.Empty;
        public int Rows { get; set; }
        public int Cols { get; set; }
        public string Words { get; set; } = string.Empty;
    }
}
