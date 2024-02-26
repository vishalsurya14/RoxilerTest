import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';

const { Header, Content, Footer } = Layout;


const navItems = [
  {
    key: 1,
    label: `Transactions`
  },
  {
    key: 2,
    label: `Stats`
  }
];
const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// const transactions = [
//   {
//     "_id": "65da9a6743525859fc0aabfc",
//     "id": "1",
//     "title": "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
//     "price": "329.85",
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "category": "men's clothing",
//     "sold": false,
//     "dateOfSale": "2021-11-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aabfd",
//     "id": "2",
//     "title": "Mens Casual Premium Slim Fit TShirts ",
//     "price": "44.6",
//     "description": "Slimfitting style contrast raglan long sleeve threebutton henley placket light weight  soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a threebutton placket.",
//     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     "category": "men's clothing",
//     "sold": false,
//     "dateOfSale": "2021-10-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aabfe",
//     "id": "3",
//     "title": "Mens Cotton Jacket",
//     "price": "615.89",
//     "description": "great outerwear jackets for SpringAutumnWinter suitable for many occasions such as working hiking camping mountainrock climbing cycling traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father husband or son in this thanksgiving or Christmas Day.",
//     "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     "category": "men's clothing",
//     "sold": true,
//     "dateOfSale": "2022-07-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aabff",
//     "id": "4",
//     "title": "Mens Casual Slim Fit",
//     "price": "31.98",
//     "description": "The color could be slightly different between on the screen and in practice.  Please note that body builds vary by person therefore detailed size information should be reviewed below on the product description.",
//     "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     "category": "men's clothing",
//     "sold": false,
//     "dateOfSale": "2021-10-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac00",
//     "id": "5",
//     "title": "John Hardy Womens Legends Naga Gold  Silver Dragon Station Chain Bracelet",
//     "price": "6950",
//     "description": "From our Legends Collection the Naga was inspired by the mythical water dragon that protects the oceans pearl. Wear facing inward to be bestowed with love and abundance or outward for protection.",
//     "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//     "category": "jewelery",
//     "sold": false,
//     "dateOfSale": "2022-06-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac01",
//     "id": "6",
//     "title": "Solid Gold Petite Micropave ",
//     "price": "168",
//     "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
//     "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     "category": "jewelery",
//     "sold": true,
//     "dateOfSale": "2021-09-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac02",
//     "id": "7",
//     "title": "White Gold Plated Princess",
//     "price": "99.9",
//     "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement Wedding Anniversary Valentines Day...",
//     "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
//     "category": "jewelery",
//     "sold": true,
//     "dateOfSale": "2022-06-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac03",
//     "id": "8",
//     "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
//     "price": "32.97",
//     "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
//     "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
//     "category": "jewelery",
//     "sold": false,
//     "dateOfSale": "2021-11-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac04",
//     "id": "9",
//     "title": "WD 2TB Elements Portable External Hard Drive  USB 30 ",
//     "price": "704",
//     "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity Compatibility Formatted NTFS for Windows 10 Windows 8.1 Windows 7 Reformatting may be required for other operating systems Compatibility may vary depending on users hardware configuration and operating system",
//     "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     "category": "electronics",
//     "sold": true,
//     "dateOfSale": "2022-07-27T14:59:54.000Z",
//     "__v": 0
//   },
//   {
//     "_id": "65da9a6743525859fc0aac05",
//     "id": "10",
//     "title": "SanDisk SSD PLUS 1TB Internal SSD  SATA III 6 Gbs",
//     "price": "763",
//     "description": "Easy upgrade for faster boot up shutdown application load and response As compared to 5400 RPM SATA 2.5 hard drive Based on published specifications and internal benchmarking tests using PCMark vantage scores Boosts burst write performance making it ideal for typical PC workloads The perfect balance of performance and reliability Readwrite speeds of up to 535MBs450MBs Based on internal testing Performance may vary depending upon drive capacity host device OS and application.",
//     "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     "category": "electronics",
//     "sold": false,
//     "dateOfSale": "2022-03-27T14:59:54.000Z",
//     "__v": 0
//   }
// ]


const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Dashboard</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={navItems}
          style={{
            flex: 1,
            padding: "0 60px"
          }}
        />
        <Select
          size="large"
          defaultValue={options[month]}
          onChange={handleMonthChange}
          style={{
            width: 200
          }}
          options={options.map((text, i) => {
            return {
              value: i,
              label: text
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: "0px 48px",
          backgroundColor: "white",
          minHeight: 600
        }}
      >

        {/* <Transactions month={month} monthText={options[month]} /> */}
        <Stats month={month} monthText={options[month]} />

{/* 
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
          title={() => <strong>Transactions for {options[month]}</strong>}
          scroll={{ y:540 }}
        /> */}


      </Content>
      <Footer
        style={{
          textAlign: "center"
        }}
      >
        Created by Saurabh Ghiya
      </Footer>
    </Layout>
  );
};

export default App;
