import { getPrismaClient } from '../lib/prisma.js';
export function createPrismaDepartmentRepository() {
    const client = getPrismaClient();
    return {
        async findAll() {
            return client.department.findMany();
        },
        async findById(id) {
            return client.department.findUnique({
                where: { id },
            });
        },
        async create(input) {
            const data = {
                name: input.name,
            };
            if (input.status !== undefined)
                data.status = input.status;
            if (input.headId !== undefined) {
                data.head = { connect: { id: input.headId } };
            }
            if (input.parentId !== undefined) {
                data.parent = { connect: { id: input.parentId } };
            }
            return client.department.create({ data });
        },
        async update(id, input) {
            const data = {};
            if (input.name !== undefined)
                data.name = input.name;
            if (input.status !== undefined)
                data.status = input.status;
            if (input.headId !== undefined) {
                data.head = input.headId ? { connect: { id: input.headId } } : { disconnect: true };
            }
            else if (input.headId === null) {
                data.head = { disconnect: true };
            }
            if (input.parentId !== undefined) {
                data.parent = input.parentId ? { connect: { id: input.parentId } } : { disconnect: true };
            }
            else if (input.parentId === null) {
                data.parent = { disconnect: true };
            }
            return client.department.update({
                where: { id },
                data,
            });
        },
        async delete(id) {
            await client.department.delete({
                where: { id },
            });
        },
    };
}
//# sourceMappingURL=prismaDepartmentRepository.js.map