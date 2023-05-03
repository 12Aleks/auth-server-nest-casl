import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AbilityFactory} from "./ability.factory";
import {CHECK_ABILITY, RequiredRule} from "./abilities.decorator";
import {ForbiddenError} from "@casl/ability";


@Injectable()

export class AbilitiesGuards implements CanActivate{
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || []

        const {user} = await context.switchToHttp().getRequest()
        const ability = await this.caslAbilityFactory.defineAbility(user)

        try{
           rules.forEach((rule) => {
               ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
           })

            return true
        }catch (e) {
            if(e instanceof  ForbiddenError){
                throw new ForbiddenException(e.message)
            }
        }
    }
}