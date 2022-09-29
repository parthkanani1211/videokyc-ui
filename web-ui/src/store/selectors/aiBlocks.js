import { createSelector } from 'reselect';
import { groupBy } from 'lodash';

export const selectAiBlockList = (state) => state.aiBlocks.data;

export const selectAiBlocks = createSelector(
    selectAiBlockList,
    (aiBlocks) => aiBlocks
);

export const createAiBlockSelector = (selectAiBlockId) =>
    createSelector(selectAiBlockId, selectAiBlocks, (aiBlockId, aiBlocks) => {
        return aiBlocks.find((aiBlock) => aiBlock.id === parseInt(aiBlockId));
    });

export const selectGroupedAiBlock = createSelector(
    selectAiBlockList,
    (aiBlocks) => {
        const blocks = groupBy(aiBlocks, (block) => block.categories[0].name);
        const categories = Object.keys(blocks);
        return categories.map((category) => {
            return {
                name: category,
                blocks: blocks[category],
            };
        });
    }
);
