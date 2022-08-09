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
        public Location StartLocation { get; set; }
        public Location EndLocation { get; set; }
        private Location TempLocation { get; set; }
        private DirectionEnum TempDirection { get; set; }
        public DirectionEnum Direction { get; set; }
        public bool BackToStart => StartLocation.Equals(TempLocation) && Direction.Equals(TempDirection);

        private readonly IRandomNumberService _randomNumberService;

        public HiddenWord(IRandomNumberService randomNumberService)
        {
            _randomNumberService = randomNumberService;
        }

        public void GenerateLocationAndDirection (int rows, int columns)
        {                     
            var row = _randomNumberService.GetRandomNumber (rows);
            var column = _randomNumberService.GetRandomNumber(columns);

            // set initial random location
            StartLocation  = new Location() { Row = row, Column = column };
            TempLocation = StartLocation;

            Direction = (DirectionEnum)_randomNumberService.GetRandomNumber (Convert.ToInt32(Direction.GetMax()));
            TempDirection = Direction;
        }

        public void MoveNext(char[,] grid)
        {
            StartLocation = StartLocation.MoveNext(grid.Rows(), grid.Columns());
            if (StartLocation == TempLocation)
            {
                Direction = Direction.MoveNext();
            }
        }

        public bool IsValid()
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

        public Location GetEndLocation()
        {          
            ArgumentNullException.ThrowIfNull(StartLocation);
            ArgumentNullException.ThrowIfNull(Direction);

            var row = StartLocation.Row + (Direction.GetRowDelta() * (Word.Length - 1));
            var column = StartLocation.Column + (Direction.GetColumnDelta() * (Word.Length - 1));

            var location = new Location()
            {
                Row = row,
                Column = column
            };

            return location;

            //return new Location() { 
            //    Row = StartLocation.Row + (Direction.GetRowDelta() * Word.Length) - 1,
            //    Column = StartLocation.Column  + (Direction.GetColumnDelta() * Word.Length) - 1
            //};
        }

        public void SetEndLocation()
        {
            EndLocation = GetEndLocation();
        }
    }
}
