import styles from '../styles/Home.module.css'
import Input from '../components/input';
import Toggle from '../components/toggle';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isAll, setIsAll] = useState(true);
  const [users, setUsers] = useState([]) as any;
  const [allValue, setAllValue] = useState('');
  const [note, setNote] = useState('');
  const [data, setData] = useState(Array(6).fill(null).map(() => ({
    name: "",
    money: "",
    lastUpdated: "",
  }))) as any;

  const [message, setMessage] = useState('');

  const onValueChanged = ( e: any, index: number) => {
    const newData = [...data] as any;
    newData[index].name = e.target.name;
    newData[index].money = parseInt(e.target.value);
    newData[index].lastUpdated = new Date().toLocaleString();
    setData(newData);
  };

  const toggleAll = (isAll: boolean) => {
    setIsAll(isAll);
  }

  const changeAllValue = (e: any) => {
    setAllValue(e.target.value);
  };

  const reset = () => {
    setData(Array(6).fill(null).map(() => ({
      name: "",
      money: "",
      lastUpdated: "",
    })));
    setAllValue('');
    setNote('');
  }

  const getLastestData = () => {
    setUsers([{
      "name": "Hai",
      "money": "0",
      "bankName": "MB",
      "bankNumber": "999999221299",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }, {
      "name": "Son",
      "money": "86",
      "bankName": "",
      "bankNumber": "",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }, {
      "name": "Hien",
      "money": "86",
      "bankName": "",
      "bankNumber": "",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }, {
      "name": "Kiet",
      "money": "48",
      "bankName": "",
      "bankNumber": "",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }, {
      "name": "Khang",
      "money": "176",
      "bankName": "",
      "bankNumber": "",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }, {
      "name": "An",
      "money": "176",
      "bankName": "",
      "bankNumber": "",
      "lastUpdated": "11\/13\/2022, 2:27:58 AM"
    }]);
    // fetch('https://api.apispreadsheets.com/data/M3cpOZaXpWpqrWNO/').then(res=>{
    //   if (res.status === 200){
    //     // SUCCESS
    //     res.json().then(data=>{
    //       setUsers(data.data);
    //       console.log(data.data);
    //     }).catch(err => console.log(err))
    //   }
    //   else{
    //     // ERROR
    //   }
    // })
  }

  // Write a function to update user money
  const updateUserMoney = async () => {
    await getLastestData();

    let moneyToBeSubtracted = 0;
    // Check if all fields are filled
    

    const newData = [...data] as any;

    const mappedPayload = newData.map((data: any, index: number) => {
      if (!isAll && allValue !== '' || !isAll && allValue !== '0') {
        moneyToBeSubtracted = parseInt(allValue);
      } else {
        moneyToBeSubtracted = parseInt(data.money);
      }
      console.log("🚀 ~ file: index.tsx ~ line 75 ~ mappedPayload ~ moneyToBeSubtracted", moneyToBeSubtracted)

      const updatedMoney = users[index].money - moneyToBeSubtracted;
      const userName = users[index].name;
      console.log("🚀 ~ file: index.tsx ~ line 80 ~ mappedPayload ~ updatedMoney", updatedMoney)
      return {
        "data": {
          "money": updatedMoney,
          "lastUpdated": new Date().toLocaleString()
        },
        "query": "select * from M3cpOZaXpWpqrWNO where name='" + userName +"'"
      }
    });

    // remove empty data
    const filteredPayload = mappedPayload.filter((data: any) => data.data.money !== '');
    console.log("🚀 ~ To be updated", filteredPayload)

    const promises = filteredPayload.map((payload: any) => {
      return fetch('https://api.apispreadsheets.com/data/M3cpOZaXpWpqrWNO/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    });

    Promise.all(promises).then(res => {
      console.log(res);
      setMessage('Update successfully!');
      reset();
    }).catch(err => {
      console.log(err);
      setMessage('Update failed!');
    });
    
  };

  useEffect(() => {
    // Call API to get data
    getLastestData();
  }, []);

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nextjs.org">ONOS</a>
        </h1>

        <div className='flex flex-col w-full items-center'>
          <div className="flex flex-row mt-6 justify-center w-full">
            <div className="">
              <div className={`${isAll ? 'hidden': 'block'}`}>
                <Input id={'everyone'} placeholder='Mỗi người thiệt hại ...' value={allValue} onChange={changeAllValue}/>
              </div>
              <div className={`${isAll ? 'block': 'hidden'}`}>
                {users.length && users.map((user: any, index: number) => (
                  <Input id={index} name={user.name} value={data.name} placeholder={`${user.name} đã thiệt hại ...`} onChange={(e) => {onValueChanged(e, index)}}/>
                ))}
              </div>
              <Input id={'note'} value={note} placeholder={'Ghi chú'} onChange={(e) => {setNote(e.target.value)}}/>
              <div className="mt-4">
                <a onClick={(e) => {updateUserMoney()}} className="rounded px-36 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 mt-4">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Lụm</span> 
                </a>
              </div>
            </div>
            <div className='flex flex-col'>
              <Toggle toggleAll={toggleAll}/>
              <div className="paid">
                <h3 className='m-4'>Ai trả tiền z?</h3>
              </div>
            </div>
          </div>
          <div className="paid-section w-24 h-24 rounded-full mt-4">
            <img src="https://i.ibb.co/hcKNZJq/Screen-Shot-2022-04-07-at-12-31-15-PM.png" className='rounded-full hover:scale-125 ease-in duration-500 active:border-dashed border-2 border-red-600' alt="" />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"

          rel="noopener noreferrer"
        >
          Powered by Thanh Hai a.k.a James
          {/* <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} /> */}
        </a>
      </footer>
    </div>
  )
}
