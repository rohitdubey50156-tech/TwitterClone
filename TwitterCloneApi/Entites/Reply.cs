namespace TwitterCloneApi.Entites
{
    public class Reply
    {
         public int Id { get; set; }
        public int TweetId { get; set; }
        public  int UserId { get; set; }
        public string Content { get; set; } = " ";
        public DateTime CreatedAt { get; set; }
    }
}
