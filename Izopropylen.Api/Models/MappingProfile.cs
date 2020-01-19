using AutoMapper;
using Izopropylen.Api.Models.Output;
using Izopropylen.Core.Dto;
using Izopropylen.Data.Entity;

namespace Izopropylen.Api.Models
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Account, AccountModel>();
            CreateMap<ProjectMembershipDto, ProjectMembershipModel>()
                .ForMember(
                    pmm => pmm.Role,
                    o => o.MapFrom(pmd => pmd.Role.ToString())
                );
            CreateMap<CollaboratorDto, CollaboratorModel>()
                .ForMember(
                    cm => cm.Role,
                    o => o.MapFrom(cd => cd.Role.ToString())
                );
            CreateMap<TranslationKeyDto, TranslationKeyModel>();
        }
    }
}
