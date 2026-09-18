namespace TwitterCloneApi.Dtos
{
    public class TweetDto
    {
        public int Id { get; set; }
        public String UserId { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime CreatedAt { get; set; }
    }
}
