import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Table, Input } from 'antd';
import axios from 'axios';

const { Search } = Input;
const columns = [
    {
        title: "#",
        dataIndex: "id",
    },
    {
        title: "Title",
        dataIndex: "title",
        width: "20%",
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (price) => parseFloat(price).toFixed(2),
        sorter: true
    },
    {
        title: "Description",
        dataIndex: "description",
        width: "50%"
    },
    {
        title: "Category",
        dataIndex: "category"
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => sold ? "Yes" : "No"
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => moment(date).format("DD MMM YYYY")
    }
];

function Transactions({ month, monthText }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            position: ['bottomCenter']
        }
    });


    const fetchData = async () => {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:8080/transactions`, {
            params: {
                month,
                page: tableParams.pagination.current,
                limit: tableParams.pagination.pageSize
            }
        });

        setData(data.transactions);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams), month]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };



    return (
        <>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={() => { }}
                style={{
                    width: 300,
                    padding: "12px 0px"
                }}
            />

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size='small'
                bordered
                title={() => <strong>Transactions for {monthText}</strong>}
                scroll={{ y: 540 }}
            />
        </>
    )
}

export default Transactions