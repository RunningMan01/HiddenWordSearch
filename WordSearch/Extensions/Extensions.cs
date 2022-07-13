using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;

namespace WordSearch.Extensions
{
    internal static class Extensions
    {
        internal static DirectionEnum GetMax(this DirectionEnum direction)
        {
            return Enum.GetValues(typeof(DirectionEnum)).Cast<DirectionEnum>().Max() + 1;
        }

        internal static DirectionEnum MoveNext(this DirectionEnum direction)
        {            
            var maxDirection = Convert.ToInt32(direction.GetMax());
            var nextDirection = (Convert.ToInt32(direction) + 1) % maxDirection;

            return (DirectionEnum)nextDirection;
        }
        
        internal static int GetRowDelta(this DirectionEnum direction)
        {                    
            switch (direction)
            {
                case DirectionEnum.Up:
                case DirectionEnum.UpLeft:
                case DirectionEnum.UpRight:
                    return -1;
                    break;

                case DirectionEnum.Down:
                case DirectionEnum.DownLeft:
                case DirectionEnum.DownRight:
                    return 1;
                    break;
            }

            return 0;
        }

        internal static int GetColumnDelta(this DirectionEnum direction)
        {
            switch (direction)
            {
                case DirectionEnum.Left:
                case DirectionEnum.UpLeft:
                case DirectionEnum.DownLeft:
                    return -1;
                    break;

                case DirectionEnum.Right:
                case DirectionEnum.UpRight:
                case DirectionEnum.DownRight:
                    return 1;
                    break;
            }

            return 0;
        }

        internal static int Rows(this char[,] grid)
        {
            // Value is zero based, ie. 10 rows would return 9, 0 -> 9
            return grid.GetUpperBound(0);
        }

        internal static int Columns(this char[,] grid)
        {
            // Value is zero based, ie. 10 rows would return 9, 0 -> 9
            return grid.GetUpperBound(1);
        }
               
        internal static string AsString(this char[,] grid)
        {
            var rows = grid.Rows();
            var columns = grid.Columns();
            var gridString = string.Empty;

            for (var row = 0; row <= rows; row++)
            {
                for (var column = 0; column <= columns; column++)
                {
                    gridString += grid[row, column];
                }
                gridString += Environment.NewLine;
            }

            return gridString;
        }

        internal static bool CanPlaceCharacter(this char[,] grid, Location location, char ch)
        {
            return grid[location.Row, location.Column] == ch || grid[location.Row, location.Column] == ' ';
        }
    }
}
