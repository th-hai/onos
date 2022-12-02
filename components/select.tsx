import { useEffect, useState } from 'react'
import Avatar from './avatar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PersonChooser({people, onChange} : {people: any[]; onChange: (e: any) => void}) {
//   const [people, setPeople] = useState(people);
  const [selected, setSelected] = useState(people[0]);

  // Set people when component mounts
    useEffect(() => {
        onChange(selected);
    }, [selected]);

  return (
    <div className="person-chooser grid grid-cols-3 gap-3">
        {people.length && people.map((person: any, index) => (
            <Avatar key={index} src={person.avatar} alt={person.name} className={classNames(person._id === selected._id ? 'border-dashed border-4 selected-border border-[#1F487E]' : 'border-2 border-transparent')} onClick={() => setSelected(person)} />
        ))}
    </div>
  )
}
