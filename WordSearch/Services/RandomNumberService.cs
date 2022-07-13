using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordSearch.Interfaces;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("WordSearch.Tests")]
[assembly: InternalsVisibleTo("DynamicProxyGenAssembly2")]
namespace WordSearch.Services
{
    internal class RandomNumberService : IRandomNumberService
    {
        private readonly Random _random;

        public RandomNumberService()
        {
            _random = new Random();
        }
        public int GetRandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }

        public int GetRandomNumber(int max)
        {
            return GetRandomNumber(0, max);
        }
    }
}
