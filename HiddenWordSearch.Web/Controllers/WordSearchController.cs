using Microsoft.AspNetCore.Mvc;

namespace HiddenWordSearch.Web.Controllers
{
    public class WordSearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
