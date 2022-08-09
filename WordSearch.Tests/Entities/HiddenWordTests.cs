using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;
using WordSearch.Interfaces;
using WordSearch.Services;

namespace WordSearch.Tests.Entities
{
    public class HiddenWordTests
    {
        // GenerateLocationAndDirection 10x10 Grid
        [Fact]
        public void GenerateLocationAndDirection_ForGrid_ReturnsLocationInRange()
        {
            var randomNumberServiceMock = new Mock<IRandomNumberService>();
            randomNumberServiceMock.Setup(x => x.GetRandomNumber(It.IsAny<int>())).Returns(5);

            var hiddenWord = new HiddenWord(randomNumberServiceMock.Object);

            hiddenWord.GenerateLocationAndDirection(10, 10);

            Assert.True(hiddenWord.StartLocation.Row == 5, "Location Row is incorrect");
            Assert.True(hiddenWord.StartLocation.Column == 5, "Location Column is incorrect");
            Assert.True(hiddenWord.Direction == DirectionEnum.DownLeft, "Direction is incorrect");
        }

        // MoveNext - Returning back to StartLocation - Direction changes
        // MoveNext - Move to next location - Back to original StartLocation and Direction

        // IsValid - Word contains non alphabetical character
        [Fact]
        public void IsValid_WordContainsNumber_ReturnsFalse()
        {
            var randomNumberServiceMock = new Mock<IRandomNumberService>();
            var hiddenWord = new HiddenWord(randomNumberServiceMock.Object)
            {
                Word = "qwe1rty"
            };

            Assert.True(hiddenWord.IsValid() == false);            
        }

        // IsValid - Word contains all alphabetical character
        [Fact]
        public void IsValid_WordContainsUpperCaseWord_ReturnsTrue()
        {
            var randomNumberServiceMock = new Mock<IRandomNumberService>();
            var hiddenWord = new HiddenWord(randomNumberServiceMock.Object)
            {
                Word = "VALID"
            };

            Assert.True(hiddenWord.IsValid() == true);
        }

        // IsValid - Word contains all lower case alphabetical character
        [Fact]
        public void IsValid_WordContainsLowerCaseWord_ReturnsTrue()
        {
            var randomNumberServiceMock = new Mock<IRandomNumberService>();
            var hiddenWord = new HiddenWord(randomNumberServiceMock.Object)
            {
                Word = "valid"
            };

            Assert.True(hiddenWord.IsValid() == true);
        }

        // IsValid - Word contains all alphabetical character
        [Fact]
        public void IsValid_WordContainsMixedCaseWord_ReturnsTrue()
        {
            var randomNumberServiceMock = new Mock<IRandomNumberService>();
            var hiddenWord = new HiddenWord(randomNumberServiceMock.Object)
            {
                Word = "VAlIDwOrd"
            };

            Assert.True(hiddenWord.IsValid() == true);
        }
    }
}
