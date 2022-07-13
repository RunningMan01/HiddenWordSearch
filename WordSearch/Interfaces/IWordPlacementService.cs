using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;

namespace WordSearch.Interfaces
{
    internal interface IWordPlacementService
    {
        //bool IsValidWord(string word);

        //string PlaceWordInGrid(string word, WordGrid grid);

        //Location GetStartingLocation(string word, WordGrid grid);

        bool CanWordStartAtLocation(HiddenWord word, char[,] grid);

        bool WordWithinGridLimits(HiddenWord word, char [,] grid);

        char[,] PlaceWordAtLocation(HiddenWord word, char[,] grid);
    }
}
