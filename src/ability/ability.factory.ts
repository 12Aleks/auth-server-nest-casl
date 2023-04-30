import {Injectable} from "@nestjs/common";
import {Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects} from "@casl/ability";
import {UserDto} from "../user/dto/user.dto";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof UserDto> | 'all'

export type AppAbility = Ability<[Action, Subjects]>


@Injectable()
export class AbilityFactory {
    defineAbility(user){
        console.log(user.id === '644d1db4913bcfc305d521c3')
         const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
         if(user.userRole === 'admin'){
             can(Action.Manage, 'all')
         }else if(user.userRole === 'editor') {
             can(Action.Read, 'all')
             can(Action.Create, 'all')
             can(Action.Update, 'all')
         } else if (user.id === '644d1db4913bcfc305d521c3') {

             cannot(Action.Read, UserDto).because("You do not have enough access privileges")
         } else{
             cannot(Action.Create, UserDto).because("You do not have enough access privileges")
             can(Action.Read, UserDto)
         }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
