import {Injectable} from "@nestjs/common";
import {User} from "../user/entities/user.entity";
import {Ability, AbilityBuilder, ExtractSubjectType, InferSubjects} from "@casl/ability";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>


@Injectable()
export class AbilityFactory {
    defineAbility(user: User){
         const {can, cannot, build} = new AbilityBuilder(Ability)

         if(user.isAdmin){
             can(Action.Manage, 'all')
         }else{
             can(Action.Read, 'all')
         }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
