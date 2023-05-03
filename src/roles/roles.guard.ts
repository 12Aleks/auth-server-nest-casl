// import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
// import {Reflector} from "@nestjs/core";
// import {Role} from "./role.enum";
// import {ROLES_KEY} from "./roles.decorator";
// import {AbilityFactory} from "../ability/ability.factory";
// import {ForbiddenError} from "@casl/ability";
// import {CHECK_ABILITY, RequiredRule} from "../ability/abilities.decorator";
//
//
// @Injectable()
// export class RolesGuard implements CanActivate{
//     constructor(private reflector: Reflector,
//                 private abilityFactory: AbilityFactory
//                 ) {}
//
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//             context.getHandler(),
//             context.getClass(),
//         ]);
//
//         const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler) || []
//
//         if (!requiredRoles) {
//             return true;
//         }
//
//         const {user} = await context.switchToHttp().getRequest();
//         const ability = await this.abilityFactory.defineAbility(user)
//
//         try{
//             rules.forEach(rule => {
//                 ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
//             })
//             return requiredRoles.some((roles) => user.userRole?.includes(roles));
//
//         }catch (error){
//             if(error instanceof ForbiddenError){
//                 throw new ForbiddenException(error.message)
//             }
//         }
//
//
//         return false
//     }
// }