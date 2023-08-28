using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;
using WordSearch.Extensions;
using WordSearch.Services;

namespace WordSearch.Tests
{
    public class WordPlacementServiceTests
    {        
        [Theory]
        [InlineData("TenCharact", 0, 0, DirectionEnum.Down ,true)]
        [InlineData("TenCharacte", 0, 0, DirectionEnum.Down, false)]
        [InlineData("Ten", 6, 6, DirectionEnum.DownRight, true)]
        public void CanWordStartAtLocation_VariousFirstWords_Locations(string word, int row, int column, DirectionEnum direction, bool result)
        {            
            var randomNumberService = new Mock<RandomNumberService>();

            var hiddenWord = new HiddenWord(randomNumberService.Object)
            {
                StartLocation = new Location() { Row = row, Column = column },
                Word = word,
                Direction = direction
            };

            var grid = new char[10, 10];
            grid.Fill(' ');

            var wordService = new WordPlacementService();            
            var canStart = wordService.CanWordStartAtLocation(hiddenWord, grid);
            Assert.Equal(canStart, result);
        }

        [Theory]
        [InlineData("TenCharact", 0, 0, DirectionEnum.DownRight, true)]
        [InlineData("Character", 0, 0, DirectionEnum.DownRight, false)]
        [InlineData("Characters", 9, 9, DirectionEnum.UpLeft, false)]
        [InlineData("abcdefghit", 9, 9, DirectionEnum.UpLeft, false)]
        public void CanWordStartAtLocation_PartialPopulatedGrid_VariousWords(string word, int row, int column, DirectionEnum direction, bool result)
        {
            var randomNumberService = new Mock<RandomNumberService>();

            var hiddenWord = new HiddenWord(randomNumberService.Object)
            {
                StartLocation = new Location() { Row = row, Column = column },
                Word = word,
                Direction = direction
            };

            var grid = new char[10, 10];
            grid.Fill(' ');
            grid[0, 0] = 'T';

            var wordService = new WordPlacementService();
            var canStart = wordService.CanWordStartAtLocation(hiddenWord, grid);
            Assert.Equal(canStart, result);
        }

        //[Fact]
        //public void CanWordStartAtLocation_WordTooLong_NotAllowed()
        //{
        //    var randomNumberService = new Mock<RandomNumberService>();

        //    var hiddenWord = new HiddenWord(randomNumberService.Object)
        //    {
        //        StartLocation = new Location() { Row = 0, Column = 0 },
        //        Word = "TenCharacte",
        //        Direction = DirectionEnum.Down
        //    };

        //    var grid = new char[10, 10];
        //    grid.Fill(' ');

        //    var wordService = new WordPlacementService();
        //    var canStart = wordService.CanWordStartAtLocation(hiddenWord, grid);
        //    Assert.False(canStart);
        //}
    }
}
