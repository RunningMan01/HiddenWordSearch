﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;
using WordSearch.Extensions;
using WordSearch.Interfaces;

namespace WordSearch.Services
{
    public class WordPlacementService : IWordPlacementService
    {
        /// <summary>
        /// Given a HiddenWord word with a start location, check if it can be placed at this start location
        /// </summary>
        /// <param name="word"></param>
        /// <param name="grid"></param>
        /// <returns></returns>
        public bool CanWordStartAtLocation(HiddenWord word, char[,] grid)
        {
            var canStart = true;
            var startlocation = word.StartLocation;
            var rowDelta = word.Direction.GetRowDelta();
            var columnDelta = word.Direction.GetColumnDelta();

            for (var idx = 0; idx < word.Word.Length; idx++)
            {
                var characterLocation = new Location()
                {
                    Row = startlocation.Row + (idx * rowDelta),
                    Column = startlocation.Column + (idx * columnDelta)
                };

                if (!grid.CanPlaceCharacter(characterLocation, word.Word[idx]))
                {
                    canStart = false;
                    break;
                }
            }

            return canStart;
        }

        /// <summary>
        /// Place the HiddenWord word within the grid
        /// </summary>
        /// <param name="word"></param>
        /// <param name="grid"></param>
        /// <returns></returns>
        public char[,] PlaceWordAtLocation(HiddenWord word, char[,] grid)
        {
            var rowDelta = word.Direction.GetRowDelta();
            var columnDelta = word.Direction.GetColumnDelta();
            var updatedGrid = (char[,])grid.Clone();

            for (var idx = 0; idx < word.Word.Length; idx++)
            {                
                var wordLetterRow = word.StartLocation.Row + (idx * rowDelta);
                var wordLetterColumn = word.StartLocation.Column + (idx * columnDelta);
                updatedGrid[wordLetterRow, wordLetterColumn] = word.Word[idx];
            }
            word.SetEndLocation();
            return updatedGrid;
        }

        /// <summary>
        /// Checks whether the HiddenWord word is within the grid limits
        /// </summary>
        /// <param name="word"></param>
        /// <param name="grid"></param>
        /// <returns></returns>
        public bool WordWithinGridLimits(HiddenWord word, char[,] grid)
        {
            var endLocation = word.GetEndLocation();
            var rows = grid.Rows();
            var columns = grid.Columns();
            
            if (endLocation.Row < 0 || endLocation.Column < 0) { return false; }

            if (endLocation.Row > rows || endLocation.Column > columns) { return false; }

            return true;
        }
    }
}
