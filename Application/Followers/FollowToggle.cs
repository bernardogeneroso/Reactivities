namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetUserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUserName);

                if (target == null) return null;

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

                if (following != null)
                {
                    _context.UserFollowings.Remove(following);
                }
                else
                {
                    _context.UserFollowings.Add(new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    });
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update following");
            }
        }
    }
}