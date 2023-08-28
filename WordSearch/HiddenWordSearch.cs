using WordSearch.Entities;
using WordSearch.Interfaces;
using WordSearch.Services;

namespace WordSearch
{
    public class WordSearchGrid
    {
        private WordGrid _wordGrid;
        private List<HiddenWord> _hiddenWords = new List<HiddenWord>();
        private List<string> _errorWords = new List<string>();
        private IRandomNumberService _randomNumberService;
        private IWordPlacementService _wordPlacementService;

        public List<HiddenWord> HiddenWords => _hiddenWords;
        public WordGrid WordGrid => _wordGrid;
        public List<string> ErrorWords => _errorWords;        

        public WordSearchGrid(IRandomNumberService randomNumberService, IWordPlacementService wordPlacementService)
        {
            _randomNumberService = randomNumberService;
            _wordPlacementService = wordPlacementService;
        }

        public void CreateWordSearchGrid(int rows, int columns, List<string> words)
        {           
            words = words.OrderByDescending(x => x.Length).ToList();
           
            _wordGrid = new WordGrid(_randomNumberService, _wordPlacementService)
            {
                Rows = rows,
                Columns = columns,
            };
            _wordGrid.CreateEmptyGrid();

            foreach (var word in words)
            {
                var hiddenWord = new HiddenWord(_randomNumberService) { Word = word.ToUpper() };
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