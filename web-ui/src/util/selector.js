import { createSelector } from 'reselect';

export const createFilteredDataSelector = (
    selectFields,
    selectFilter,
    selectData
) => {
    return createSelector(
        selectFields,
        selectFilter,
        selectData,
        (fields, filter, data) => {
            if (!data) {
                return [];
            }
            if (!filter || !filter.length || !data.length) {
                return data;
            }

            return data.filter((o) =>
                fields.some((k) =>
                    String(o[k])
                        .toLowerCase()
                        .trim()
                        .includes(filter.toLowerCase().trim())
                )
            );
        }
    );
};

export const createSortedDataSelector = (
    selectFields,
    selectSort,
    selectData
) => {
    return createSelector(
        selectFields,
        selectSort,
        selectData,
        (fields, sort, data) => {
            if (!data) {
                return [];
            }
            if (
                data.length < 2 ||
                !fields ||
                !fields.length ||
                !sort ||
                !sort.length
            ) {
                return data;
            }
            return data.sort(function (a, b) {
                const { id, orderBy } = sort[0];
                const sortA = String(a[id]).toUpperCase();
                const sortB = String(b[id]).toUpperCase();

                let comparison = 0;
                if (sortA > sortB) {
                    comparison = 1;
                } else if (sortA < sortB) {
                    comparison = -1;
                }
                if (orderBy === 'desc') {
                    return comparison * -1;
                }
                return comparison;
            });
        }
    );
};

export const createFilteredSortedDataSelector = (
    selectFields,
    selectFilter,
    selectSort,
    selectData
) => {
    const selectFilteredData = createFilteredDataSelector(
        selectFields,
        selectFilter,
        selectData
    );
    return createSortedDataSelector(
        selectFields,
        selectSort,
        selectFilteredData
    );
};
