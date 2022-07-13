using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Entities;
using Xunit;
using Xunit.Extensions;

namespace WordSearch.Tests.Entities
{
    // https://jonlabelle.com/snippets/view/csharp/xunitnet-cheatsheet
    public class LocationTests
    {
        [Theory]
        [MemberData("LocationComparePropertyData")]
        public void PropertyDataExample(Location location1, Location location2, bool expectedResult)
        {
            Assert.Equal(location1.Equals(location2), expectedResult);
        }

        public static IEnumerable<object[]> LocationComparePropertyData
        {
            get
            {
                // Location1 Equals Location2, True is returned
                yield return new object[] {
                    new Location() { Row = 10, Column = 10 },
                    new Location() { Row = 10, Column = 10 },
                    true
                };

                // Location1 does not equal Location2, False is returned
                yield return new object[] {
                    new Location() { Row = 1, Column = 10 },
                    new Location() { Row = 10, Column = 10 },
                    false
                };
            }
        }
    }
}
