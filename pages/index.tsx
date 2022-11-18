import styles from '../styles/Home.module.css'
import Input from '../components/input';
import Toggle from '../components/toggle';
import { useEffect, useState } from 'react';
import PersonChooser from '../components/select';
import InputUnit from '../components/input-unit';
import Table from '../components/table';
const sheetdb = require("sheetdb-node");
const client = sheetdb({ address: '3dcm5cqh9m8wn' });

export default function Home() {
  const [isAll, setIsAll] = useState(true);
  const [users, setUsers] = useState([]) as any;
  const [allValue, setAllValue] = useState('') as any;
  const [paidUsers, setPaidUsers] = useState([]) as any;
  const [note, setNote] = useState('');
  const [selectedPeople, setSelectedPeople] = useState({}) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(Array(6).fill(null).map(() => ({
    name: "",
    money: "",
    lastUpdated: "",
  }))) as any;

  const [message, setMessage] = useState('');
  const API_ENDPOINT = 'https://sheetdb.io/api/v1/3dcm5cqh9m8wn';

  const getLastestData = async () => {
    setUsers([]);

    // setUsers([
    //   {
    //       "createdAt": "2022-11-15T19:25:52.788Z",
    //       "name": "An",
    //       "avatar": "https://i.ibb.co/Fg5n8VB/Screen-Shot-2022-04-07-at-12-26-11-PM-1.png",
    //       "money": "363.49",
    //       "bankName": "Checking Account",
    //       "bankNumber": "708788860",
    //       "id": "1"
    //   },
    //   {
    //       "createdAt": "2022-11-15T13:37:33.049Z",
    //       "name": "Khang",
    //       "avatar": "https://i.ibb.co/mB4Fgkm/profile-pic.png",
    //       "money": "236.52",
    //       "bankName": "Credit Card Account",
    //       "bankNumber": "868433327",
    //       "id": "2"
    //   },
    //   {
    //       "createdAt": "2022-11-15T14:45:10.341Z",
    //       "name": "Sơn",
    //       "avatar": "https://i.ibb.co/hBH27YY/IMG-3467-1.jpg",
    //       "money": "446.41",
    //       "bankName": "Checking Account",
    //       "bankNumber": "226893046",
    //       "id": "3"
    //   },
    //   {
    //       "createdAt": "2022-11-16T08:13:12.518Z",
    //       "name": "Hải",
    //       "avatar": "https://i.ibb.co/Dwzyjv6/IMG-0371.jpg",
    //       "money": "262.73",
    //       "bankName": "Auto Loan Account",
    //       "bankNumber": "705787482",
    //       "id": "4"
    //   },
    //   {
    //       "createdAt": "2022-11-15T18:55:34.179Z",
    //       "name": "Hiển",
    //       "avatar": "https://i.ibb.co/BPV43X5/315892130-1220501868528069-5969780953453200300-n-1.jpg",
    //       "money": "122.47",
    //       "bankName": "Personal Loan Account",
    //       "bankNumber": "967625379",
    //       "id": "5"
    //   },
    //   {
    //       "createdAt": "2022-11-16T08:17:54.514Z",
    //       "name": "Kiệt",
    //       "avatar": "https://i.ibb.co/DkhYb9n/315532370-555688256397251-3518760481267909697-n.jpg",
    //       "money": "111.00",
    //       "bankName": "Personal Loan Account",
    //       "bankNumber": "273661548",
    //       "id": "6"
    //   }
    // ]);

    
    // const filteredUsers = users.filter((user: any) => user.name !== selectedPeople.name);
    // setPaidUsers(filteredUsers);


    fetch(API_ENDPOINT).then(res => res.json()).then(data => {
      setUsers(data);
      const filteredUsers = users.filter((user: any) => user.name !== selectedPeople.name);
      setPaidUsers(filteredUsers);
    });
  }

  // On mount
  useEffect(() => {
    // Call API to get data
    getLastestData();
  }, []);

  const onPeopleSelected = (people: any) => {
    setSelectedPeople(people);
    const filteredUsers = users.filter((user: any) => user.name !== people.name);
    setPaidUsers(filteredUsers);
  };

  const onValueChanged = ( e: any, index: number) => {
    const newData = [...data] as any;
    newData[index].name = e.target.name;
    newData[index].money = parseInt(e.target.value);
    newData[index].lastUpdated = new Date().toLocaleString();
    setData(newData);
    console.log(newData);
  };

  const toggleAll = (isAll: boolean) => {
    setIsAll(isAll);
  }

  const changeAllValue = (e: any) => {
    setAllValue(e.target.value);
  };

  const reset = () => {
    // setData(Array(6).fill(null).map(() => ({
    //   name: "",
    //   money: "",
    //   lastUpdated: "",
    // })));
    setAllValue('');
    setNote('');
  }

  // Write a function to update user money
  const updateUserMoney = async () => {
    await getLastestData();

    let promises = [];

    // Update money for all people
    if (!isAll && allValue) {
      // Cong tien thang tra, tru tien thang an
      console.log('go here');
      const updatedUsers = paidUsers.map((user: any) => {
        return {
          userId: user.id,
          money: parseInt(user.money) - parseInt(allValue),
        }
      });

      const totalMoney = (parseInt(allValue)) * (users.length - 1);
      console.log(selectedPeople.money);
      console.log("🚀 ~ file: index.tsx ~ line 156 ~ updateUserMoney ~ totalMoney", totalMoney)
      console.log('total: ', parseInt(selectedPeople.money) + totalMoney)


      const mappedPayload = [...updatedUsers, {
        userId: selectedPeople.id,
        money: parseInt(selectedPeople.money) + totalMoney,
      }]
      
      promises = mappedPayload.map((payload: any) => {
        return client.update(
          'id',
          payload.userId,
          { 'money': payload.money } // object with updates
        );
      });
      
    } else {
      let moneyToBeSubtracted = 0;
      // Check if all fields are filled
      const newData = [...data] as any;
      const updatedUser = newData.filter((user: any) => user.money);

      const mappedPayload = updatedUser.map((data: any) => {
        moneyToBeSubtracted = parseInt(data.money);
        const user = users.find((user: any) => user.name == data.name);

        const updatedMoney = parseInt(user.money) - moneyToBeSubtracted;
        const userId = user.id;
        return {
          userId,
          money: updatedMoney,
          moneyToBeSubtracted,
        }
      });

      const totalMoney = mappedPayload.reduce((acc: any, cur: any) => {
        return acc + cur.moneyToBeSubtracted;
      }, 0);

      const update = [...mappedPayload, {
        userId: selectedPeople.id,
        money: parseInt(selectedPeople.money) + totalMoney
      }];

      promises = update.map((payload: any) => {
        return client.update(
          'id',
          payload.userId,
          { 'money': payload.money } // object with updates
        );
      });
    }

    setLoading(true);

    Promise.all(promises).then(res => {
      setMessage('Update successfully!');
      reset();
    }).catch(err => {
      console.log(err);
      setMessage('Update failed!');
    }).finally(
      () => {
        setLoading(false);
        getLastestData();
      }
    );
  };

  

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>ONOS</a>
        </h1>

        <div className='flex flex-col w-full items-center justify-center'>
          <h3 className="text-3xl font-bold text-gray-700 mr-8 mt-5">Chọn người trả tiền</h3>
          <div className="person mr-10">
            {users.length && <PersonChooser onChange={onPeopleSelected} people={users}/>}
          </div>  
          <div className="flex flex-row mt-6 justify-center w-full">
            <div className="">
              <div className={`${isAll ? 'hidden': 'block'}`}>
                <Input id={'everyone'} placeholder='Mỗi người thiệt hại ...' value={allValue} onChange={changeAllValue}/>
              </div>
              <div className={`${isAll ? 'block': 'hidden'}`}>
                {paidUsers.length && paidUsers.map((user: any, index: number) => (
                  <div className="flex flex-row">
                    <InputUnit id={index} name={user.name} value={data.name} placeholder={`đã thiệt hại ...`} onChange={(e) => {onValueChanged(e, index)}}/>
                  </div>
                ))}
              </div>
              <Input id={'note'} type={'text'} value={note} placeholder={'Ghi chú'} onChange={(e) => {setNote(e.target.value)}}/>
              <div className="mt-4">
                  
                {/* <a onClick={(e) => {updateUserMoney()}} className="rounded px-36 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 mt-4">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Lụm</span> 
                </a> */}
                <button onClick={(e) => {updateUserMoney()}} className={`btn btn-accent w-96 text-white ${loading ? 'loading btn-disabled text-gray-700': ''}`}>{loading ? 'đợi xíu đang lụm': 'Lụm'}</button>

              </div>
                <progress className={loading ? 'visible progress progress-success w-76' : 'invisible' }></progress>
            </div>
            <div className='flex flex-col'>
              <Toggle toggleAll={toggleAll}/>
            </div>
          </div>
        </div>
      </main>


      <Table people={users}/>

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
