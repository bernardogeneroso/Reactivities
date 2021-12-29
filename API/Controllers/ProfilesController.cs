using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userName}")]
        public async Task<ActionResult<Profile>> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = userName }));
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{userName}/activities")]
        public async Task<IActionResult> GetUserActivities(string userName, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query { UserName = userName, Predicate = predicate }));
        }
    }
}