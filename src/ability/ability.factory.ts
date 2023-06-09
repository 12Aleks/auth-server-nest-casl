import {Injectable} from "@nestjs/common";
import {Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects} from "@casl/ability";
import {UserDto} from "../user/dto/user.dto";
import {ArticleDto} from "../article/dto/article.dto";


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof UserDto | typeof ArticleDto> | 'all'

export type AppAbility = Ability<[Action, Subjects]>


@Injectable()
export class AbilityFactory {
    defineAbility(user){
         const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
         if(user.userRole === 'admin'){
             can(Action.Manage, 'all')
         }else if(user.userRole === 'editor') {
             can(Action.Read, 'all')
             can(Action.Create, ArticleDto)
             can(Action.Update, ArticleDto)
             can(Action.Delete, ArticleDto)
             cannot(Action.Manage, UserDto).because("You do not have enough access privileges")
         }else if(user.userRole === 'user'){
             can(Action.Read, 'all')
             can(Action.Create, ArticleDto)
             can(Action.Update, ArticleDto)
             cannot(Action.Delete, 'all').because("You do not have enough access privileges")
             cannot(Action.Manage, UserDto).because("You do not have enough access privileges")
         }else{
             can(Action.Read, ArticleDto)
             cannot(Action.Manage, UserDto).because("You do not have enough access privileges")
             cannot(Action.Create, 'all').because("You do not have enough access privileges")
             cannot(Action.Update, 'all').because("You do not have enough access privileges")
             cannot(Action.Delete, 'all').because("You do not have enough access privileges")
         }

         // else{
         //     cannot(Action.Create, UserDto).because("You do not have enough access privileges")
         //     can(Action.Read, UserDto)
         // }

         // if (user.id == "644d1db4913bcfc305d521c3") {
         //     console.log(typeof user.id)
         //     cannot(Action.Read, UserDto).because("You do not have enough access privileges")
         // }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
