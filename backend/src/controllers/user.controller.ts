import type { Request, Response } from "express";
import { fetchUsersService, updateUserRoleService } from "../services/user.service.js";
import type { IFetchUsersQuery, RoleType } from "../types/types.js";

const fetchUsers = async (req: Request, res: Response) => {
    try {
        const query: IFetchUsersQuery = {
            departmentId: req.query.departmentId as string,
            role: req.query.role as RoleType
        };

        const users = await fetchUsersService(query);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ error: "Missing required field: role" });
        }

        const validRoles = ['ADMIN', 'ASSET_MANAGER', 'DEPT_HEAD', 'EMPLOYEE'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
        }

        const updatedUser = await updateUserRoleService(userId, role as RoleType);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user role:", error);
        if (error instanceof Error && error.message === "User not found") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    fetchUsers,
    updateUserRole
};
