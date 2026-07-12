import prisma from "../lib/prisma.js";
import type { IFetchUsersQuery, RoleType } from "../types/types.js";
import type { Role } from "@prisma/client";

const fetchUsersService = async (query: IFetchUsersQuery) => {
    return await prisma.user.findMany({
        where: {
            departmentId: query.departmentId,
            role: query.role ? (query.role as Role) : undefined
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: {
                select: { id: true, name: true }
            }
        },
        orderBy: { name: 'asc' }
    });
};

const updateUserRoleService = async (userId: string, newRole: RoleType) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return await prisma.user.update({
        where: { id: userId },
        data: { role: newRole as Role },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: {
                select: { id: true, name: true }
            }
        }
    });
};

export {
    fetchUsersService,
    updateUserRoleService
};
