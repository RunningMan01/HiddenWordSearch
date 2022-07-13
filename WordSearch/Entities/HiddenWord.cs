using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using WordSearch.Extensions;
using WordSearch.Interfaces;
using WordSearch.Services;

[assembly: InternalsVisibleTo("WordSearch.Tests")]
[assembly: InternalsVisibleTo("DynamicProxyGenAssembly2")]
namespace WordSearch.Entities
{    
    public class HiddenWord
    {
        public string Word { get; set; }
        public Location Location { get; set; }
        private Location StartLocation { get; set; }
        private DirectionEnum StartDirection { get; set; }
        public DirectionEnum Direction { get; set; }
        internal bool BackToStart => Location.Equals(StartLocation) && Direction.Equals(StartDirection);

        private readonly IRandomNumberService _randomNumberService;

        internal HiddenWord(IRandomNumberService randomNumberService)
        {
            _randomNumberService = randomNumberService;
        }
      
        internal void GenerateLocationAndDirection (int rows, int columns)
        {                     
            var row = _randomNumberService.GetRandomNumber (rows);
            var column = _randomNumberService.GetRandomNumber(columns);

            // set initial random location
            Location  = new Location() { Row = row, Column = column };
            StartLocation = Location;

            Direction = (DirectionEnum)_randomNumberService.GetRandomNumber (Convert.ToInt32(Direction.GetMax()));
            StartDirection = Direction;
        }
      
        internal void MoveNext(char[,] grid)
        {
            Location = Location.MoveNext(grid.Rows(), grid.Columns());
            if (Location == StartLocation)
            {
                Direction = Direction.MoveNext();
            }
        }

        internal bool IsValid()
        {
            foreach(var ch in Word)
            {                
                bool isAlphaBet = Regex.IsMatch(ch.ToString(), "[a-z]", RegexOptions.IgnoreCase);
                if (!isAlphaBet)
                {
                    return false;
                }
            }

            return true;
        }

        internal Location GetEndLocation()
        {          
            ArgumentNullException.ThrowIfNull(Location);
            ArgumentNullException.ThrowIfNull(Direction);

            return new Location() { 
                Row = Location.Row + (Direction.GetRowDelta() * Word.Length),
                Column = Location.Column  + (Direction.GetColumnDelta() * Word.Length)
            };
        }
    }
}
