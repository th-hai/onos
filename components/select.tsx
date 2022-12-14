import { useEffect, useState } from 'react'
import Avatar from './avatar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PersonChooser({people, selectedPeople, onChange} : {people: any[]; selectedPeople: {}; onChange: (e: any) => void}) {
//   const [people, setPeople] = useState(people);
  const [selected, setSelected] = useState(selectedPeople) as any;

  // Set people when component mounts
    useEffect(() => {
        onChange(selected);
    }, [selected]);

  return (
    <div className="person-chooser grid grid-cols-3 gap-3">
        {people.length && people.map((person: any, index) => (
            <Avatar key={index} src={person.avatar} alt={person.name} className={classNames(selected && person._id === selected._id ? 'border-dashed border-4 selected-border border-[#1F487E]' : 'border-2 border-transparent')} onClick={() => setSelected(person)} />
        ))}
    </div>
  )
}
