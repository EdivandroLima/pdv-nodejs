class PaginateTrait {
    constructor() { }

    async paginate(Model, query, limit = 10, options= {}) {
        const { page = 1 } = query;

        const intLimit = parseInt(limit, 10) || 10;
        const intPage = parseInt(page, 10) || 1;
        const offset = (intPage - 1) * intLimit;

        const model = await Model.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: intLimit,
            offset: parseInt(offset),
            ...options,
        });

        const totalPages = Math.ceil(model.count / intLimit);

        const nextPage = intPage < totalPages ? `?page=${intPage + 1}` : null;
        const prevPage = intPage > 1 ? `?page=${intPage - 1}` : null;

        return {
            data: model.rows,
            total: model.count,
            currentPage: intPage,
            totalPages,
            nextPage,
            prevPage,
            limit
        };
    }
}

module.exports = new PaginateTrait;
