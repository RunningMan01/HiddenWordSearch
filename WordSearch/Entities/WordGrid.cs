using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Extensions;
using WordSearch.Interfaces;
using WordSearch.Services;

namespace WordSearch.Entities
{
    public class WordGrid
    {      
        public int Rows { get; set; }
        public int Columns { get; set; }
        public char[,] Grid
        {
            get {
                return _grid;
            }
        }

        private char[,] _grid;

        private readonly IRandomNumberService _randomNumberService;
        private readonly IWordPlacementService _wordPlacementService;

        public WordGrid(IRandomNumberService randomNumberService, IWordPlacementService wordPlacementService)
        {
            _randomNumberService = randomNumberService;
            _wordPlacementService = wordPlacementService;
        }

        public void CreateEmptyGrid()
        {
            _grid = new char[Rows, Columns];
            _grid.Fill(' ');
        }     

        public bool PlaceWordInGrid(HiddenWord word)
        {           
            var canPlaceWordInGrid = false;

            do
            {
                word.MoveNext(_grid);              

                canPlaceWordInGrid = _wordPlacementService.WordWithinGridLimits(word, _grid) &&
                    _wordPlacementService.CanWordStartAtLocation(word, _grid);

            }
            while (!canPlaceWordInGrid && !word.BackToStart);

            if (canPlaceWordInGrid)
            {
                _grid = _wordPlacementService.PlaceWordAtLocation(word, _grid);
            }
            return canPlaceWordInGrid;
        }

        public void PopulateEmptySpaces()
        {
            for (var row = 0; row < Rows; row++)
            {
                for (var column = 0; column < Columns; column++)
                {
                    if (_grid[row, column] == ' ')
                    {
                        int ch = _randomNumberService.GetRandomNumber(26) + (int)'A';
                        _grid[row, column] = (char)ch;
                    }
                }
            }
        }

        public override string ToString()
        {
            return _grid.AsString();
        }
    }
}
