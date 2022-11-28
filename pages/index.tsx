import axios from 'axios';
import styles from '../styles/Home.module.css'
import Input from '../components/input';
import Toggle from '../components/toggle';
import { useEffect, useState } from 'react';
import PersonChooser from '../components/select';
import InputUnit from '../components/input-unit';
import Table from '../components/table';
// const sheetdb = require("sheetdb-node");
// const client = sheetdb({ address: '3dcm5cqh9m8wn' });

export default function Home() {
  const [isAll, setIsAll] = useState(true);
  const [users, setUsers] = useState([]) as any;
  const [allValue, setAllValue] = useState('') as any;
  const [paidUsers, setPaidUsers] = useState([]) as any;
  const [note, setNote] = useState('');
  const [selectedPeople, setSelectedPeople] = useState({}) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(Array(6).fill(null).map(() => ({
    id: "",
    name: "",
    money: "",
    lastUpdated: "",
  }))) as any;


  const [message, setMessage] = useState('');
  const BASE_API = 'https://easy-pear-lamb-gown.cyclic.app/api/';

  const getLastestData = async () => {
    setUsers([]);
    const { data } = await axios.get(`${BASE_API}users`);
    console.log('Updated after refresh', data);
    setUsers(data);
    setSelectedPeople(users[0]);
    console.log(selectedPeople);
    const filteredUsers = users.filter((user: any) => user._id !== selectedPeople._id);
    console.log("🚀 ~ file: index.tsx ~ line 45 ~ getLastestData ~ filteredUsers", paidUsers)
    setPaidUsers(filteredUsers);
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

  const isFieldFilled = (): string => {
    if (isAll) {
      const isSomeDataInputed = data.some((item: any) => item.money !== '' && Number.isFinite(item.money));
      return isSomeDataInputed ? '' : 'btn-disabled cursor-no-drop bg-[#50514F] text-gray-400 opacity-50';
    } else {
      return allValue.length > 0 ? '' : 'btn-disabled cursor-no-drop bg-[#50514F] text-gray-400 opacity-50';
    }
  };

  const onValueChanged = ( e: any, index: number) => {
    const newData = [...data] as any;
    newData[index].id = e.target.id;
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
    setData(Array(6).fill(null).map(() => ({
      id: "",
      name: "",
      money: "",
      lastUpdated: "",
    })));
    setAllValue(0);
    setNote('');
  }

  // Write a function to update user money
  const updateUserMoney = async () => {
    await getLastestData();

    // Update money for all people
    if (!isAll && allValue) {
      const payload = {
        paidUserId: selectedPeople._id,
        sameValue: parseInt(allValue),
        description: note,
      }
      
      setLoading(true);
      await axios.post(`${BASE_API}users/money/all`, payload).then((res) => {
        console.log('Updated all', res);
        setMessage('Cập nhật thành công');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }).catch((err) => {
        console.log('Error', err);
        setMessage('Cập nhật thất bại');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }).finally(() => {
        getLastestData();
        setLoading(false);
        });
      
    } else {
      const newData = [...data] as any;
      const updatedUser = newData.filter((item: any) =>  !isNaN(item.money) && item.money !== 0 && item.money != '');

      const upUsers = updatedUser.map((item: any) => {
        return {
          id: item.id,
          money: item.money
        }
      });

      const payload = {
        paidUserId: selectedPeople._id,
        unpaidUsers: upUsers,
        description: note,
      }

      setLoading(true);
      await axios.post(`${BASE_API}users/money`, payload).then((res) => {
        console.log('Updated all', res);
        setMessage('Cập nhật thành công');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }).catch((err) => {
        console.log('Error', err);
        setMessage('Cập nhật thất bại');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }).finally(() => {
        getLastestData();
        setLoading(false);
      });
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <main className={styles.main}>
        <h1 className="text-[#1D3461] text-6xl mr-12 min-[320px]:mr-0">
          ONOS
        </h1>

        <div className='flex flex-col w-full items-center justify-center'>
          <div className="text-3xl font-bold text-[#376996] mr-8 mt-5 min-[320px]:mr-0">Người trả tiền: <span className='text-[#F25F5C]'>{selectedPeople?.name}</span></div>
          <div className="person mr-10 min-[320px]:mr-0 my-6">
            {users.length && <PersonChooser onChange={onPeopleSelected} people={users}/>}
          </div>  
          <div className='flex flex-row items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1D3461" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            <Toggle toggleAll={toggleAll}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1D3461" className="w-6 h-6">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </div>
          <div className="flex flex-row mt-6 w-full min-[418px]:justify-center">
            <div className="w-full flex flex-col">
              <div className={`${isAll ? 'hidden': 'block min-[530px]:mx-auto'}`}>
                <Input id={'everyone'} placeholder='Mỗi người thiệt hại ...' value={allValue} onChange={changeAllValue}/>
              </div>
              <div className={`${isAll ? 'block min-[530px]:mx-auto': 'hidden'}`}>
                {paidUsers.length && paidUsers.map((user: any, index: number) => (
                  <div className="flex flex-row">
                    <InputUnit id={user._id} name={user.name} value={data.money} placeholder={`đã thiệt hại ...`} onChange={(e) => {onValueChanged(e, index)}}/>
                  </div>
                ))}
              </div>
              <div className="min-[530px]:mx-auto mt-2">
                <Input id={'note'} type={'text'} value={note} placeholder={'Ghi chú'} onChange={(e) => {setNote(e.target.value)}}/>
              </div>
              <div className="mt-4 min-[530px]:mx-auto">
                  
                {/* <a onClick={(e) => {updateUserMoney()}} className="rounded px-36 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 mt-4">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Lụm</span> 
                </a> */}
                <button onClick={(e) => {updateUserMoney()}} className={`btn bg-[#6290C8] min-[530px]:min-w-[340px] w-full border-[#376996] text-white ${isFieldFilled()} ${loading? 'loading btn-disabled cursor-no-drop': ''}`}>{loading ? 'đợi xíu đang lụm': 'Lụm'}</button>
                <progress className={loading ? 'visible progress progress-success w-76' : 'invisible' }></progress>
              </div>
            
            </div>
            
          </div>
        </div>
      </main>

      {users.length && <Table people={users}/>}

      <footer className={styles.footer}>
      <div className="btm-nav">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button className="active">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
      </div>
      </footer>
    </div>
  )
}
