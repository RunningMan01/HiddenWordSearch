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
        //ToDo - not sure whether this should be internal or public
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

        public WordGrid(IRandomNumberService randomNumberService, int rows, int columns)
        {
            Rows = rows;
            Columns = columns;
            _randomNumberService = randomNumberService;

            _grid = new char[rows, columns];
            
            // ToDo - put following in Extensions method
            for(var row = 0; row < rows; row++)
            {
                for(var column = 0; column < columns; column++)
                {
                    _grid[row, column] = ' ';
                }
            }
        }      

        public bool PlaceWordInGrid(HiddenWord word)
        {
            // Console.WriteLine($"Placing word {word.Word})");
            var canPlaceWordInGrid = false;
            // var fullGridChecked = false;

            // ToDo - move this to constructor
            IWordPlacementService wordPlacementService = new WordPlacementService();

            do
            {
                word.MoveNext(_grid);                
                // Console.WriteLine($"Checking: {word.Location}");

                canPlaceWordInGrid = wordPlacementService.WordWithinGridLimits(word, _grid) &&
                    wordPlacementService.CanWordStartAtLocation(word, _grid);

            }
            while (!canPlaceWordInGrid && !word.BackToStart);

            if (canPlaceWordInGrid)
            {
                _grid = wordPlacementService.PlaceWordAtLocation(word, _grid);
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
