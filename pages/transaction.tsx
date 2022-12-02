import React, { useState } from 'react';
import "ka-table/style.css";

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, SortingMode, ActionType } from 'ka-table/enums';
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
    },
    {
        key: 'hai',
        title: 'Hải',
        dataType: DataType.Number,
        filterRowOperator: '>',
    },
    {
        key: 'son',
        title: 'Sơn',
        dataType: DataType.Number,
        filterRowOperator: '>',
    },
    {
        key: 'khang',
        title: 'Khang',
        dataType: DataType.Number,
        filterRowOperator: '>',
    },
    {
        key: 'hien',
        title: 'Hiển',
        dataType: DataType.Number,
        filterRowOperator: '>',
    },
    {
        key: 'kiet',
        title: 'Kiệt',
        dataType: DataType.Number,
        filterRowOperator: '>',
    },
    {
        key: 'description',
        title: 'Nội dung',
        dataType: DataType.String,
    },
    {
        dataType: DataType.Date,
        key: 'createdAt',
        title: 'Date',
        filterRowOperator: '>',
    },
    ],
    format: ({ column, value }) => {
        if (column.dataType === DataType.Date){
            return value && value.toLocaleDateString('vi-VN', {month: '2-digit', day: '2-digit', year: 'numeric' });
        }
    },
    paging: {
        enabled: true,
        pageSize: 7,
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
            elementAttributes: ({ value }) => ({
                style: {
                backgroundColor: typeof value === "string" ? 'rgba(226, 224, 177, 0.8)': value == null ? 'rgba(177, 177, 177, 0.8)' : value > 0 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'
                },
            })
            }
        }}
        dispatch={dispatch}
        />
    );
};

export default Transactions;