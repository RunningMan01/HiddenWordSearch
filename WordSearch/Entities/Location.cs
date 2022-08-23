using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

[assembly: InternalsVisibleTo("WordSearch.Tests")]
namespace WordSearch.Entities
{
    public class Location : IEquatable<Location>
    {
        public int Row { get; set; }
        public int Column { get; set; }

        public bool Equals(Location? other)
        {
            return (Row == other?.Row && Column == other?.Column);
        }

        public Location MoveNext(int rows, int columns)
        {
            var newCol = Column + 1;
            var newRow = Row;
            
            if (newCol > columns)
            {
                newCol = 0;
                newRow += 1;

                if (newRow > rows)
                {
                    newRow = 0;
                }
            }

            return new Location()
            {
                Row = newRow,
                Column = newCol
            };
        }

        //public override string ToString()
        //{
        //    return $"Location: {Row}, {Column}";
        //}
    }
}
