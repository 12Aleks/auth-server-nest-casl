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
    defineAbility(user: UserDto){
         const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

         if(user.role === 'admin'){
             can(Action.Manage, 'all')
         }else if(user.role === 'editor') {
             can(Action.Read, 'all')
             can(Action.Create, 'all')
             can(Action.Update, 'all')
         } else {
             can(Action.Read, 'all')
         }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
