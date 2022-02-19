using Application.Activities;

var builder = WebApplication.CreateBuilder(args);

// Add services to container

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
})
    .AddFluentValidation(config =>
{
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configure the http request pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// app.UseXContentTypeOptions();
// app.UseReferrerPolicy(opt => opt.NoReferrer());
// app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
// app.UseXfo(opt => opt.Deny());
// app.UseCsp(opt => opt
//     .BlockAllMixedContent()
//     .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=", "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI=", "sha256-r3x6D0yBZdyG8FpooR5ZxcsLuwuJ+pSQ/80YzwXS5IU="))
//     .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
//     .FormActions(s => s.Self())
//     .FrameAncestors(s => s.Self())
//     .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "https://www.facebook.com", "https://platform-lookaside.fbsbx.com", "https://scontent.flis11-1.fna.fbcdn.net", "blob:", "data:"))
//     .ScriptSources(s => s.Self().CustomSources("https://connect.facebook.net", "sha256-nFoujaKSdKarl6bRahKaiBIRfMRXWA3gGKrm/n3Rc+A=", "sha256-J9TgqjRbHEQvoVIg/4OgPTAl/8WGh7s6hI8X1n/Ur4M="))
// );

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

// app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");


using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

await app.RunAsync();