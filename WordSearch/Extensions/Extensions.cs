using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;

namespace WordSearch.Extensions
{
    public static class Extensions
    {
        public static DirectionEnum GetMax(this DirectionEnum direction)
        {
            return Enum.GetValues(typeof(DirectionEnum)).Cast<DirectionEnum>().Max() + 1;
        }

        public static DirectionEnum MoveNext(this DirectionEnum direction)
        {
            var maxDirection = Convert.ToInt32(direction.GetMax());
            var nextDirection = (Convert.ToInt32(direction) + 1) % maxDirection;

            return (DirectionEnum)nextDirection;
        }

        public static int GetRowDelta(this DirectionEnum direction)
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

        public static int GetColumnDelta(this DirectionEnum direction)
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

        public static int Rows(this char[,] grid)
        {
            // Value is zero based, ie. 10 rows would return 9, 0 -> 9
            return grid.GetUpperBound(0);
        }

        public static int Columns(this char[,] grid)
        {
            // Value is zero based, ie. 10 rows would return 9, 0 -> 9
            return grid.GetUpperBound(1);
        }

        public static string AsString(this char[,] grid)
        {
            return AsString(grid, false);
        }


        public static string AsString(this char[,] grid, bool includeNewLine)
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

                if (includeNewLine)
                {
                    gridString += Environment.NewLine;
                }
            }

            return gridString;
        }

        public static bool CanPlaceCharacter(this char[,] grid, Location location, char ch)
        {
            var maxRow = grid.GetUpperBound(0);
            var maxColumn = grid.GetUpperBound(1);
            if (location.Row > maxRow) return false;
            if (location.Column > maxColumn) return false;

            return grid[location.Row, location.Column] == ch || grid[location.Row, location.Column] == ' ';
        }

        public static void Fill(this char[,] grid, char fillChar)
        {
            var rows = grid.GetUpperBound(0);
            var columns = grid.GetUpperBound(1);
            for (var row = 0; row <= rows; row++)
            {
                for (var column = 0; column <= columns; column++)
                {
                    grid[row, column] = fillChar;
                }
            }
        }
    }
}
