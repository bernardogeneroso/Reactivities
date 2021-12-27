using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserName = null;

            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, opt => opt.MapFrom(s => s.Attendees
                      .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, opt => opt.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, opt => opt.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, opt => opt.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUserName)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, opt => opt.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, opt => opt.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, opt => opt.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUserName)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<ActivityAttendee, Profiles.UserActivityDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Title, opt => opt.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Activity.Category))
                .ForMember(d => d.Date, opt => opt.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.HostUserName, opt => opt.MapFrom(s => s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}