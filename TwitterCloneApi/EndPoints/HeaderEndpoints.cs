using TwitterCloneApi.Services;
namespace TwitterCloneApi.Endpoints
{
    public static class HeaderEndpoints
    {

        public static void MapHeaderEndpoints(this WebApplication app)
        {
            app.MapGet("/api/header-test", (UserContextService userContextService) =>
            {
                var userId = userContextService.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    return Results.BadRequest("Header-user-id header is missing");
                }
                return Results.Ok(new
                {
                    message = "Header recived successfully.",
                    userId = userId
                });
            }

            );
        }
    }
}
