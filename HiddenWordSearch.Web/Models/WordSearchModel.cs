using WordSearch.Entities;

namespace HiddenWordSearch.Web.Models
{
    public class WordSearchModel
    {        
        public List<HiddenWord> HiddenWords { get; set; }

        public WordGridModel WordGrid { get; set; }

        public string Title { get; set; }
    }
}
