using WordSearch.Entities;
using WordSearch.Interfaces;
using WordSearch.Services;

namespace WordSearch
{
    public class HiddenWordSearch
    {
        private WordGrid _wordGrid;
        private List<HiddenWord> _hiddenWords = new List<HiddenWord>();
        private List<string> _errorWords = new List<string>();

        public List<HiddenWord> HiddenWords => _hiddenWords;
        public WordGrid WordGrid => _wordGrid;
        public List<string> ErrorWords => _errorWords;       

        public HiddenWordSearch(string title, int rows, int columns, List<string> words)
        {                    
            IRandomNumberService randomNumberService = new RandomNumberService();

            words = words.OrderByDescending(x => x.Length).ToList();

            _wordGrid = new WordGrid(randomNumberService, rows, columns);

            foreach (var word in words)
            {                              
                var hiddenWord = new HiddenWord(randomNumberService) { Word = word.ToUpper() };
                if (hiddenWord.IsValid())
                {
                    hiddenWord.GenerateLocationAndDirection(rows, columns);
                
                    if (_wordGrid.PlaceWordInGrid(hiddenWord))
                    {
                        // word is placed ok. within PlaceWordInGrid, word is added to internal list                       
                        _hiddenWords.Add(hiddenWord);
                    }                    
                }
                else
                {
                    _errorWords.Add(word);
                }
            }            
            _wordGrid.PopulateEmptySpaces();
        }
    }
}