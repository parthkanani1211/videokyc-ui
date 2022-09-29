import React from 'react';
import HeaderColumn from './HeaderColumn';

export default function Header(props) {

    const { fields, hasActions, onSort, orderBy, columnOrder } = props;

    return (
        <>
            {fields.map((field, index) => (
                <HeaderColumn
                    key={`column-${index}`}
                    field={field}
                    onSort={onSort}
                    orderBy={orderBy}
                    columnOrder={columnOrder}
                />
            ))}
            {hasActions && (
                <HeaderColumn field={{label:'Actions'}} />
            )}
        </>
    )
}