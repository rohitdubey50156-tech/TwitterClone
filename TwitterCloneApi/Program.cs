using Microsoft.EntityFrameworkCore;
using TwitterCloneApi.Data;
using TwitterCloneApi.Endpoints;
using TwitterCloneApi.Services;

var builder = WebApplication.CreateBuilder(args);

//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserContextService>();
builder.Services.AddScoped<TweetService>();
builder.Services.AddScoped<ReplyService>();
builder.Services.AddScoped<FollowService>();

var app = builder.Build();

app.UseCors("ReactPolicy");

app.MapUserEndpoints();
app.MapHeaderEndpoints();
app.MapTweetEndpoints();
app.MapReplyEndpoints();
app.MapFollowEndpoints();
app.Run();