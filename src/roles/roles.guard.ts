import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "./role.enum";
import {ROLES_KEY} from "./roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const {user} = await context.switchToHttp().getRequest();
        const result = requiredRoles.some((roles) => user.userRole?.includes(roles));
        console.log('Result', result)
        return  result

        return true
    }
}