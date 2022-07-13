using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordSearch.Interfaces
{
    internal interface IRandomNumberService
    {
        int GetRandomNumber(int min, int max);
        int GetRandomNumber(int max);
    }
}
