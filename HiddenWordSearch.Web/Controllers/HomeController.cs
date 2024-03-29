﻿using HiddenWordSearch.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WordSearch;
using WordSearch.Entities;
using WordSearch.Extensions;
using WordSearch.Interfaces;

namespace HiddenWordSearch.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IRandomNumberService _randomNumberService;
        private readonly IWordPlacementService _wordPlacementService;

        public HomeController(ILogger<HomeController> logger, IRandomNumberService randomNumberService, IWordPlacementService wordPlacementService)
        {
            _logger = logger;
            _randomNumberService = randomNumberService;
            _wordPlacementService = wordPlacementService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult GetWordSearch([FromBody]WordSearchSettingsModel settings)
        {
            var title = settings.Title;
            var rows = Convert.ToInt32(settings.Rows);
            var cols = Convert.ToInt32(settings.Columns); // Cols
            var hiddenWords = new List<string>(settings.Words.Split(','));

            //var hiddenWordSearch = new WordSearchGrid(rows, cols, hiddenWords);
            var hiddenWordSearch = new WordSearchGrid(_randomNumberService, _wordPlacementService);
            hiddenWordSearch.CreateWordSearchGrid(rows, cols, hiddenWords);

            var wordSearchModel = new WordSearchModel();
            wordSearchModel.Title = title;
            wordSearchModel.HiddenWords = hiddenWordSearch.HiddenWords.OrderBy(x => x.Word).ToList();
            wordSearchModel.WordGrid = new WordGridModel()
            {
                Rows = hiddenWordSearch.WordGrid.Rows,
                Columns = hiddenWordSearch.WordGrid.Columns,
                Grid = hiddenWordSearch.WordGrid.Grid.AsString()
            };

            return Json(wordSearchModel);
        }
    }
}