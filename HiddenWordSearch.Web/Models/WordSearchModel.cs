using WordSearch.Entities;

namespace HiddenWordSearch.Web.Models
{
    public class WordSearchModel
    {
        public string Grid { get; set; } = string.Empty;

        public List<HiddenWord> HiddenWords { get; set; }

        public WordGridModel WordGrid { get; set; }
    }
}
