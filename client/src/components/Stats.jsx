import { Statistic, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";


export default function Stats({ month, monthText }) {
    let [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:8080/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    }

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        }
    }, [month])

    return (
        <>
            <h2>Stats for {monthText} </h2>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '48px',
                }}>

                <div style={{ minWidth: '720px' }}>
                    <Totals stats={data?.statsData} loading={loading} />
                    {data && <BarChart data={data?.barChartData} />}
                </div>
                
                {data && <PieChart data={data?.pieChartData} />}
            </div>
        </>
    )
}

function Totals({ stats, loading }) {
    return (
        <div className='stats'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '900px',
                padding: '12px 0px',
                borderTop: '1px solid #dadada',
                borderBottom: '1px solid #dadada',
            }}
        >
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sale"
                value={stats?.totalSale}
                loading={loading}
                prefix="₹"
            />

            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    )
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };

    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Product Price Range Distribution',
                data: values,
            }
        ]
    }

    return (
        <Bar
            data={chartData}
            options={options}
            style={{ margin: '24px 0px', maxWidth: '900px', maxHeight: '500px' }}
        />
    )
}

function PieChart({ data }) {
    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
            }
        ]
    }
    return (
        <Doughnut
            data={chartData}
            style={{ margin: '24px 0px', maxHeight: '400px', maxWidth: '400px' }}
        />
    )
}