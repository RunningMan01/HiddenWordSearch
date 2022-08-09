using HiddenWordSearch.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WordSearch;
using WordSearch.Entities;
using WordSearch.Extensions;

namespace HiddenWordSearch.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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
            var rows = Convert.ToInt32(settings.Rows);
            var cols = Convert.ToInt32(settings.Cols);
            var hiddenWords = new List<string>(settings.Words.Split(','));

            // ToDo - check what we're passing back, wordgrid is undefined
            var hiddenWordSearch = new WordSearch.HiddenWordSearch(rows, cols, hiddenWords);

            var wordSearchModel = new WordSearchModel();
            wordSearchModel.HiddenWords = hiddenWordSearch.HiddenWords;
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