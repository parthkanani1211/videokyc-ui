import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect';

import AiBlockPageComponent from './AiBlockPage.js';
import { list, deleteAiBlock } from '../../store/actions/aiBlocks';
import { set } from '../../store/actions/pages';
import {selectAiBlocks} from '../../store/selectors/aiBlocks';
import {createFilteredSortedDataSelector} from '../../util/selector';
import {createStringDataField} from '../../util/format';

const DEFAULT_SORT = [{id: 'name', orderBy: 'asc'}];

const selectFields = createSelector(
    () => [
        createStringDataField('name', 'Name', {sortable: true}),
        createStringDataField('description', 'Description')
    ]
);

const selectSort = createSelector(
    (state) => state.pages['aiBlocks-landing'].sort,
    (sort) => sort || DEFAULT_SORT,
);

const selectFilteredFields = createSelector(
    selectFields,
    (fields) => {
        return fields.map(field => field.id);
    }
);

const selectFilteredData = createFilteredSortedDataSelector(
    selectFilteredFields,
    (state) => state.pages['aiBlocks-landing'].filter,
    selectSort,
    selectAiBlocks,
);

export const AiBlockPage = connect(
        (state) => ({
            order: state.pages['aiBlocks-landing'].order,
            filter: state.pages['aiBlocks-landing'].filter,
            sort: selectSort(state),
            aiBlocks: selectAiBlocks(state),
            aiBlocksFilteredData: selectFilteredData(state),
            fields: selectFields(state),
            aiBlocksListPending: state.aiBlocks.list.pending,
            aiBlocksDeletePending: state.aiBlocks.delete.pending,
        }),
        (dispatch) => ({
            actions: bindActionCreators({
                aiBlocksList: list,
                aiBlocksDelete: deleteAiBlock,
                setFilter: (value) => set('aiBlocks-landing', 'filter', value),
                setOrder: (value) => set('aiBlocks-landing', 'order', value),
                setSort: (value) => set('aiBlocks-landing', 'sort', value),
            }, dispatch)
        })
)(AiBlockPageComponent);