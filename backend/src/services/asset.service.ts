import prisma from "../lib/prisma.js";
import type { IFetchAssetsQuery, ICreateAssetInput } from "../types/types.js";
import type { AssetStatus } from "@prisma/client";

const fetchAssetsService = async (query: IFetchAssetsQuery) => {
    // Build Prisma `where` clause dynamically based on query params
    const whereClause: any = {};

    if (query.categoryId) {
        whereClause.categoryId = query.categoryId;
    }
    
    if (query.departmentId) {
        whereClause.departmentId = query.departmentId;
    }

    if (query.status) {
        whereClause.status = query.status as AssetStatus;
    }

    if (query.search) {
        whereClause.OR = [
            { name: { contains: query.search, mode: 'insensitive' } },
            { tag: { contains: query.search, mode: 'insensitive' } },
            { serialNumber: { contains: query.search, mode: 'insensitive' } }
        ];
    }

    return await prisma.asset.findMany({
        where: whereClause,
        include: {
            category: { select: { id: true, name: true } },
            department: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

const registerAssetService = async (input: ICreateAssetInput) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Auto-generate Tag
        // Easiest robust way is to count total assets + 1
        // (In a high concurrency production environment, you might want a sequence table, but this works well for us)
        const totalAssets = await tx.asset.count();
        const nextNumber = totalAssets + 1;
        const generatedTag = `AF-${String(nextNumber).padStart(4, '0')}`;

        // 2. Validate category exists
        const category = await tx.assetCategory.findUnique({ where: { id: input.categoryId } });
        if (!category) {
            throw new Error("Category not found");
        }

        // 3. Create the asset
        return await tx.asset.create({
            data: {
                name: input.name,
                tag: generatedTag,
                categoryId: input.categoryId,
                departmentId: input.departmentId ?? null,
                serialNumber: input.serialNumber ?? null,
                condition: input.condition ?? null,
                isBookable: input.isBookable ?? false,
                status: 'AVAILABLE'
            },
            include: {
                category: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } }
            }
        });
    });
};

export {
    fetchAssetsService,
    registerAssetService
};
