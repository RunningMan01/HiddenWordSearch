﻿// See https://aka.ms/new-console-template for more information
using WordSearch;
using WordSearch.Entities;

Console.WriteLine("Hello, World!");

var words = new List<string>()
{
    "Wales",
    "Scotland",
    "England",
    "France",
    "Brazil",
    "Chile",
    "Finland",
    "Germany",
    "Thailand"
};

var wordSearch = new HiddenWordSearch(15, 15, words);
// wordSearch.Grid.
Console.WriteLine(wordSearch.WordGrid.ToString());
//var location = new Location();

Console.ReadKey();

