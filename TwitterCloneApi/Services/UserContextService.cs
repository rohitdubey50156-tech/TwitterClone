namespace TwitterCloneApi.Services
{
    public class UserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string? GetUserId()
        {
            return _httpContextAccessor.HttpContext?
            .Request.Headers["X-User-Id"]
            .FirstOrDefault();
        }
    }
}
