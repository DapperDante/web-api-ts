import { RoleFactory } from "../classes/role.class";
import { ErrorFactory } from "../classes/error.class";
import { RoleType } from "../interfaces/role.interface";
import { RouteHandler } from "../interfaces/route.interface";

export const applyRole = (...role: RoleType[]): RouteHandler => {
	return (req, res, next) => {
		try {
			const roles = role.map(r => RoleFactory.createRole(r));
			const isValidRole = roles.some(r => r.isSameRole(req.user.role.name));
			if (!isValidRole) {
				throw ErrorFactory.createError(
					"PermissionDeniedError",
					"You do not have permission to access this resource"
				);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
