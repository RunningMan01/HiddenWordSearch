namespace HiddenWordSearch.Web.Models
{
    public class WordGridModel
    {
        public int Rows { get; set;  }
        public int Columns { get; set; }
        public string Grid { get; set; } = string.Empty;
    }
}
