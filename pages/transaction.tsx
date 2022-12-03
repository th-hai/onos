import React, { useState } from 'react';
import "ka-table/style.css";

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, SortingMode, ActionType, SortDirection } from 'ka-table/enums';
import { loadData, updateData } from 'ka-table/actionCreators';
import { DispatchFunc } from 'ka-table/types';
import { getAllTransactions } from './api/user';

const tablePropsInit: ITableProps = {
    columns: [
    {
        key: 'an',
        title: 'An',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'hai',
        title: 'Hải',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'son',
        title: 'Sơn',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'khang',
        title: 'Khang',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'hien',
        title: 'Hiển',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'kiet',
        title: 'Kiệt',
        dataType: DataType.Number,
        filterRowOperator: '>',
        width: 60,
    },
    {
        key: 'description',
        title: 'Nội dung',
        dataType: DataType.String,
        width: 200,
    },
    {
        dataType: DataType.Date,
        key: 'createdAt',
        title: 'Ngày',
        sortDirection: SortDirection.Descend,
        filterRowOperator: '>',
        width: 200,
    },
    ],
    format: ({ column, value }) => {
        if (column.dataType === DataType.Date){
            return value && value.toLocaleDateString('vi-VN', {month: '2-digit', day: '2-digit', year: 'numeric' });
        }

        if (column.dataType === DataType.Number){
            return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    paging: {
        enabled: true,
        pageSize: 10,
        pageIndex: 0
    },
    singleAction: loadData(),
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
}

const Transactions: React.FC = () => {
    const [tableProps, changeTableProps] = useState(tablePropsInit);

    const dispatch: DispatchFunc = async (action) => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

        if (action.type === ActionType.LoadData) {
        const response = await getAllTransactions();
        dispatch(updateData(response));
        }
    };

    return (
        <Table
        {...tableProps}
        childComponents={{
            cell: {
                elementAttributes: ({ value, column }) => ({
                    style: {
                    backgroundColor: typeof value === "string" ? 'rgba(226, 224, 177, 0.8)': value == null ? 'rgba(177, 177, 177, 0.8)' : value > 0 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'
                    },
                    'data-column': column.title
                })
            }
        }}
        dispatch={dispatch}
        />
    );
};

export default Transactions;